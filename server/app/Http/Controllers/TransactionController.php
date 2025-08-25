<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function index()
    {
        $user = Auth::user(); 

        return response()->json([
            "transactions" => Transaction::where('user_id', $user->id)->get(),
        ], 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric',
            'date' => 'required|date',
            'description' => 'nullable|string',
        ]);

        $data['user_id'] = $request->user()->id();
        
        $transaction = Transaction::create($data);

        return response()->json([
            'message' => 'Added transaction successuly',
            'transaction' => $transaction
        ], 201);
    }

}
