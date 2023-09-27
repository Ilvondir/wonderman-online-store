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
        
        $pid = fake()->numberBetween(1, 35);
        return [
            "user_id" => fake()->numberBetween(1, 32),
            "product_id" => $pid,
            "date" => fake()->dateTimeBetween("- 1 year", "- 1 day"),
            "price" => round(Product::find($pid)->price * 1.18, 2)
        ];
    }
}
