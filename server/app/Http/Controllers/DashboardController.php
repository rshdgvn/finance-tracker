<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function totals()
    {
        $user = Auth::user();

        $totalIncome = Transaction::where('user_id', $user->id)
            ->where('type', 'income')
            ->sum('amount');

        $totalExpenses = Transaction::where('user_id', $user->id)
            ->where('type', 'expense')
            ->sum('amount');

        $balance = $totalIncome - $totalExpenses;

        return response()->json([
            'total_income' => $totalIncome,
            'total_expenses' => $totalExpenses,
            'balance' => $balance,
        ]);
    }
    
    public function stats()
    {
        $user = Auth::user();

        $income = Transaction::selectRaw('YEAR(date) as year, MONTH(date) as month, SUM(amount) as total')
            ->where('user_id', $user->id)
            ->where('type', 'income')
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();

        $expenses = Transaction::selectRaw('YEAR(date) as year, MONTH(date) as month, SUM(amount) as total')
            ->where('user_id', $user->id)
            ->where('type', 'expense')
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();

        return response()->json([
            'income' => $income,
            'expenses' => $expenses,
        ]);
    }
}
