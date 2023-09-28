<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => fake()->unique()->word(),
            "price" => round(fake()->numberBetween(1, 500) / fake()->randomDigitNotZero(), 2),
            "description" => fake()->text(350),
            "photo" => fake()->imageUrl(),
            "added" => fake()->dateTimeBetween("- 2 year", "now"),
            "tax" => 18,
            "author_id" => fake()->numberBetween(1, 32),
            "category_id" => fake()->numberBetween(1, 10),
        ];
    }
}
