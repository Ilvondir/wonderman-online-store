<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "name" => $this->name,
            "price" => $this->price + ($this->price * $this->tax / 100),
            "description" => $this->description,
            "photo" => $this->photo,
            "added" => $this->added,
            "author" => new UserResource($this->whenLoaded("author")),
            "category" => new CategoryResource($this->whenLoaded("category"))
        ];
    }
}
