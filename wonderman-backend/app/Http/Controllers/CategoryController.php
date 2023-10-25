<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::query()
            ->join("products", "products.category_id", "=", "categories.id")
            ->selectRaw("categories.*, COUNT(products.category_id) AS number")
            ->groupBy("products.category_id")
            ->get();

        return response(CategoryResource::collection($categories), Response::HTTP_OK);
    }
}
