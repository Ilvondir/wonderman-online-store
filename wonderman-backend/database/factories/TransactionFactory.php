<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $pid = fake()->numberBetween(1, 60);

        $payed = fake()->numberBetween(0, 1);

        if ($payed == 1) $payment_date = fake()->dateTimeBetween("- 1 year", "- 1 week");
        else $payment_date = null;

        return [
            "user_id" => fake()->numberBetween(1, 32),
            "product_id" => $pid,
            "created" => fake()->dateTimeBetween("- 1 year", "- 1 day"),
            "price" => round(Product::find($pid)->price * 1.18, 2),
            "payed" => $payed,
            "payment_date" => $payment_date,
        ];
    }
}
