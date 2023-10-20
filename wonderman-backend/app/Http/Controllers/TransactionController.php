<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionResource;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Cashier\Cashier;
use Symfony\Component\HttpFoundation\Response;

class TransactionController extends Controller
{
//    /**
//     * Display a listing of the resource.
//     */
//    public function index()
//    {
//        return response(TransactionResource::collection(Transaction::all()->load("user")), Response::HTTP_OK);
//    }

    public function show(int $id)
    {
        return response(new TransactionResource(Transaction::find($id)->load("user")), Response::HTTP_OK);
    }

    public function getTransactionsForUser(Request $request)
    {
        /** @var User $user */
        $user = $request->user();

        //SELECT transactions.*
        //FROM transactions
        //INNER JOIN users
        //ON transactions.user_id = users.id
        //WHERE users.id= ...
        //ORDER BY transactions.created DESC

        $transactions = Transaction::query()
            ->join("users", "transactions.user_id", "=", "users.id")
            ->selectRaw("transactions.*")
            ->where("users.id", "=", $user->id)
            ->orderByDesc("transactions.created")
            ->get();

        return response(TransactionResource::collection($transactions), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, int $id)
    {
        /** @var User $user */
        $user = $request->user();

        /** @var Product $product */
        $product = Product::find($id);

        $transaction = Transaction::create([
            "user_id" => $user->id,
            "product_id" => $id,
            "created" => date("Y-m-d"),
            "price" => round($product->price + ($product->price * ($product->tax / 100)), 2),
            "payed" => 0,
            "payment_date" => null
        ]);

        return response(new TransactionResource($transaction), Response::HTTP_CREATED);
    }

    public function create_checkout(Request $request, int $id)
    {
        /** @var User $user */
        $user = $request->user();
        $tr = Transaction::find($id);
        return $user->checkoutCharge($tr->price * 100, $tr->product->name, 1, [
            'payment_method_types' => ['card', 'p24'],
            'success_url' => "http://" . $request->input("hostname") . ":3000/transactions/" . $id . "/success",
            'cancel_url' => "http://" . $request->input("hostname") . ":3000/transactions/" . $id,
        ])->jsonSerialize();
    }

    public function pay(Request $request, int $id)
    {
        //TODO:Paying

        $transaction = Transaction::find($id);

        $transaction->update([
            "payed" => 1,
            "payment_date" => date("Y-m-d")
        ]);

        return response(new TransactionResource($transaction->load("user")), Response::HTTP_ACCEPTED);
    }

    public function destroy(int $id, Request $request)
    {
        $tr = Transaction::find($id);
        if ($tr->payed == 0 && $request->user()->id == $tr->user->id) {
            Transaction::destroy($id);
            return response(null, Response::HTTP_NO_CONTENT);
        } else return response(["message" => "You cannot destroy this resource."], Response::HTTP_PRECONDITION_FAILED);
    }
}
