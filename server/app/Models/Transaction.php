<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Transaction extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'type',
        'amount',
        'date',
        'description',
    ];

    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }
}
