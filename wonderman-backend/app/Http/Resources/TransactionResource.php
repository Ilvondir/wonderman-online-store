<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "product" => new ProductResource($this->product),
            "user" => new UserResource($this->whenLoaded("user")),
            "created" => $this->created,
            "price" => $this->price,
            "payed" => $this->payed,
            "payment_date" => $this->payment_date,
        ];
    }
}
