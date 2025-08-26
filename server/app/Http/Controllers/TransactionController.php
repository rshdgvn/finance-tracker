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

        $data['user_id'] = $request->user()->id;

        $transaction = Transaction::create($data);

        return response()->json([
            'message' => 'Added transaction successfully',
            'transaction' => $transaction
        ], 201);
    }
    
    public function update(Request $request, $id)
    {
        $user = $request->user();
        $transaction = Transaction::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric',
            'date' => 'required|date',
            'description' => 'nullable|string',
        ]);

        $transaction->update($data);

        return response()->json([
            'message' => 'Transaction updated successfully',
            'transaction' => $transaction
        ], 200);
    }

    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        $transaction = Transaction::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        $transaction->delete();

        return response()->json([
            'message' => 'Transaction deleted successfully'
        ], 200);
    }
}
