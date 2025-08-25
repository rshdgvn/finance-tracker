<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;
use Faker\Factory as Faker;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 30) as $i) {
            Transaction::create([
                'user_id' => 1, 
                'title' => $faker->sentence(3),
                'type' => $faker->randomElement(['income', 'expense']),
                'amount' => $faker->randomFloat(2, 100, 5000),
                'date' => $faker->date(),
                'description' => $faker->optional()->sentence(10),
            ]);
        }
    }
}
