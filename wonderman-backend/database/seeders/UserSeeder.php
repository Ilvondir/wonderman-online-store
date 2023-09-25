<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(30)->create();

        User::insert([
            [
                "first_name" => "Michael",
                "last_name" => "Connor",
                "login" => "admin",
                "password" => Hash::make("admin"),
                "email" => "admin@wonderman.com",
                "created" => date("Y-m-d", strtotime("last Sunday")),
                "role_id" => 1
            ],
            [
                "first_name" => "Agatha",
                "last_name" => "Jenkins",
                "login" => "user",
                "password" => Hash::make("user"),
                "email" => "agatha_agatha@gmail.com",
                "created" => date("Y-m-d", strtotime("yesterday")),
                "role_id" => 2
            ]
        ]);
    }
}
