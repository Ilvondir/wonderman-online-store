<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Laravolt\Avatar\Avatar;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(30)->create();

        $generator = new Avatar();
        $filename1 = strtolower(Str::random(15)) . ".png";
        $filename2 = strtolower(Str::random(15)) . ".png";
        $file1 = $generator->create("Michael Connor")->setBackground("#7f00ff")->toBase64();
        $file2 = $generator->create("Agatha Jenkins")->setBackground("#7f00ff")->toBase64();
        Storage::putFileAs("public/img/avatars", $file1, $filename1);
        Storage::putFileAs("public/img/avatars", $file2, $filename2);
        $url1 = "/storage/img/avatars/" . $filename1;
        $url2 = "/storage/img/avatars/" . $filename2;

        User::insert([
            [
                "first_name" => "Michael",
                "last_name" => "Connor",
                "login" => "admin",
                "password" => Hash::make("admin"),
                "email" => "admin@wonderman.com",
                "created" => date("Y-m-d", strtotime("last Sunday")),
                "role_id" => 1,
                "avatar" => $url1
            ],
            [
                "first_name" => "Agatha",
                "last_name" => "Jenkins",
                "login" => "user",
                "password" => Hash::make("user"),
                "email" => "agatha_agatha@gmail.com",
                "created" => date("Y-m-d", strtotime("yesterday")),
                "role_id" => 2,
                "avatar" => $url2
            ]
        ]);
    }
}
