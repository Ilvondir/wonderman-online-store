<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Laravolt\Avatar\Avatar;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $first_name = fake()->unique()->firstName();
        $last_name = fake()->lastName();

        $filename = strtolower(Str::random(15)) . ".png";
        $generator = new Avatar();
        $file = $generator->create($first_name . " " . $last_name)->setBackground("#7f00ff")->toBase64();
        Storage::putFileAs("public/img/avatars", $file, $filename);
        $url = env("APP_URL") . ":8000/storage/img/avatars/" . $filename;

        return [
            'first_name' => $first_name,
            'last_name' => $last_name,
            'login' => $first_name,
            'email' => fake()->unique()->safeEmail(),
            'created' => fake()->date(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'role_id' => fake()->numberBetween(1, 2),
            'avatar' => $url
        ];
    }
}
