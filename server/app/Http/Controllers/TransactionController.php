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
}
