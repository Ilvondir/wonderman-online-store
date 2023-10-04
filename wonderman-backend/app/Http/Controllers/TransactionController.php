<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionResource;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
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

        $transactions = Transaction::query()
            ->join("users", "transactions.user_id", "=", "users.id")
            ->selectRaw("transactions.*")
            ->where("users.id", "=", $user->id)
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
}
