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
            "netto" => round($this->price, 2),
            "tax" => $this->tax,
            "brutto" => round($this->price + ($this->price * $this->tax / 100), 2),
            "description" => $this->description,
            "photo" => $this->photo,
            "added" => $this->added,
            "author" => new UserResource($this->whenLoaded("author")),
            "category" => new CategoryResource($this->whenLoaded("category"))
        ];
    }
}
