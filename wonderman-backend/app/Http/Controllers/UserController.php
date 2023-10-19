<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangeAvatarRequest;
use App\Http\Requests\ChangeDataRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\Slide;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Laravolt\Avatar\Avatar;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function getAdmins()
    {
        return response(UserResource::collection(User::where("role_id", "=", 1)->orderByDesc("created")->get()), Response::HTTP_OK);
    }

    public function createAdmin(RegisterRequest $request)
    {
        $this->authorize("is_admin", $request->user());

        $first_name = $request->validated(["first_name"]);
        $last_name = $request->validated(["last_name"]);

        $filename = strtolower(Str::random(15)) . ".png";
        $generator = new Avatar();
        $file = $generator->create($first_name . " " . $last_name)->setBackground("#7f00ff")->toBase64();
        $url = env("APP_URL") . ":8000/storage/img/avatars/" . $filename;
        Storage::putFileAs("public/img/avatars", $file, $filename);

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
        /** @var User $user */
        $user = $request->user();

        if (Hash::check($request->validated("old_password"), $user->password)) {
            $user->update(["password" => Hash::make($request->validated("new_password"))]);
            return response(["message" => "success"], Response::HTTP_ACCEPTED);
        }

        return response(["message" => "Old password is incorrect."], Response::HTTP_FORBIDDEN);
    }

    public function changeData(ChangeDataRequest $request)
    {
        /** @var User $user */
        $user = $request->user();
        $user->update($request->validated());
        return response(new UserResource($user->load("role")), Response::HTTP_ACCEPTED);
    }

    public function changeAvatar(ChangeAvatarRequest $request)
    {
        /** @var User $user */
        $user = $request->user();
        $file = $request->validated(["avatar"]);

        $f = User::find($request->user()->id)->avatar;
        $index = strrpos($f, "/");
        $name = substr($f, $index + 1);
        if (Storage::exists("public/img/avatars/" . $name)) Storage::delete("public/img/avatars/" . $name);

        $filename = strtolower(Str::random(15)) . "." . $file->extension();
        Storage::putFileAs("public/img/avatars", $file, $filename);
        $new_path = env("APP_URL") . ":8000/storage/img/avatars/" . $filename;
        $user->update(["avatar" => $new_path]);

        return response(new UserResource($user->load("role")), Response::HTTP_ACCEPTED);
    }

    public function removeAvatar(Request $request)
    {
        /** @var User $user */
        $user = $request->user();
        $f = User::find($request->user()->id)->avatar;
        $index = strrpos($f, "/");
        $name = substr($f, $index + 1);
        if (Storage::exists("public/img/avatars/" . $name)) Storage::delete("public/img/avatars/" . $name);

        $generator = new Avatar();
        $newname = strtolower(Str::random(15)) . ".png";
        $avatar = $generator->create($user->first_name . " " . $user->last_name)->setBackground("#7f00ff")->toBase64();
        Storage::putFileAs("public/img/avatars", $avatar, $newname);
        $new_path = env("APP_URL") . ":8000/storage/img/avatars/" . $newname;

        $user->update(["avatar" => $new_path]);

        return response(new UserResource($user->load("role")), Response::HTTP_ACCEPTED);
    }

    public function destroy(int $id, Request $request)
    {
        $this->authorize("is_admin", $request->user());

        $f = User::find($id)->avatar;
        $index = strrpos($f, "/");
        $name = substr($f, $index + 1);
        if (Storage::exists("public/img/avatars/" . $name)) Storage::delete("public/img/avatars/" . $name);

        User::destroy($id);

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
