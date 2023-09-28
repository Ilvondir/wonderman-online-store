<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "first_name" => $this->first_name,
            "last_name" => $this->last_name,
            "email" => $this->email,
            "login" => $this->login,
            "avatar" => $this->avatar,
            "created" => $this->created,
            "role" => new RoleResource($this->role)
        ];
    }
}
