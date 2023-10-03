<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
