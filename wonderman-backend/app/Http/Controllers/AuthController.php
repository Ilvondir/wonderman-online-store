<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Laravolt\Avatar\Avatar;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {

        $first_name = $request->validated(["first_name"]);
        $last_name = $request->validated(["last_name"]);
        
        if ($request->exists("avatar")) {

            $filename = strtolower(Str::random(15)) . "." . $request->file("avatar")->extension();
            $url = Storage::putFileAs("public/img/avatars", $request->validated("avatar"), $filename);

        } else {

            $filename = strtolower(Str::random(15)) . ".png";
            $generator = new Avatar();
            $file = $generator->create($first_name . " " . $last_name)->setBackground("#7f00ff")->toBase64();
            $url = Storage::putFileAs("public/img/avatars", $file, $filename);

        }

        $user = User::create([
            "first_name" => $first_name,
            "last_name" => $last_name,
            "email" => $request->validated(["email"]),
            "login" => $request->validated(["login"]),
            "password" => Hash::make($request->validated(["password"])),
            "created" => date("Y-m-d"),
            "avatar" => $url,
            "role_id" => 2
        ]);

        return response(new UserResource($user), Response::HTTP_CREATED);
    }
}
