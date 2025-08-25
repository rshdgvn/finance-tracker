<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index() 
    {
        return response()->json([
            "Transacation" => Transaction::all(), 
        ], 201);
    }
}
