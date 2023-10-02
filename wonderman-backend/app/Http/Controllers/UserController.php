<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangeDataRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Laravolt\Avatar\Avatar;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function createAdmin(RegisterRequest $request)
    {
        $this->authorize("is_admin", $request->user());

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
            "role_id" => 1
        ]);

        return response(new UserResource($user->load("role")), Response::HTTP_CREATED);
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        $user = $request->user();

        if (Hash::check($request->validated("old_password"), $user->password)) {
            $user->update(["password" => Hash::make($request->validated("new_password"))]);
            return response(["message" => "success"], Response::HTTP_ACCEPTED);
        }

        return response(["error" => "Old password is incorrect."], Response::HTTP_FORBIDDEN);
    }

    public function changeData(ChangeDataRequest $request)
    {
        $user = $request->user();
        $user->update($request->validated());
        return response($user, Response::HTTP_ACCEPTED);
    }


}
