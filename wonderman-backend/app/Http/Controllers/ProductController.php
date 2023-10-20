<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    public function getUserProducts(Request $request)
    {
        //SELECT products.*
        //FROM products
        //INNER JOIN users
        //ON users.id=products.author_id
        //WHERE users.id=4
        //ORDER BY products.added DESC;

        $products = Product::query()
            ->join("users", "users.id", "=", "products.author_id")
            ->selectRaw("products.*")
            ->where("users.id", "=", $request->user()->id)
            ->orderByDesc("products.added")
            ->paginate(32);

        return response(ProductResource::collection($products), Response::HTTP_OK);
    }

    public function getProductsByCategory(string $category)
    {

        //SELECT products.name AS name, price, photo, added, products.description AS description
        //FROM products
        //INNER JOIN categories
        //ON categories.id = products.category_id
        //ORDER BY products.id DESC
        //WHERE catgories.name = ...

        $products = Product::query()
            ->join("categories", "categories.id", "=", "products.category_id")
            ->select([
                "products.id",
                "products.name AS name",
                "price",
                "products.description AS description",
                "photo",
                "added",
                "tax"
            ])
            ->orderByDesc("products.id")
            ->where("categories.name", "=", $category)
            ->paginate(32);

        return response(ProductResource::collection($products), Response::HTTP_OK);
    }

    public function getBestProducts()
    {
        //SELECT products.name, COUNT(transactions.id) AS freq
        //FROM products
        //INNER JOIN transactions
        //ON products.id = transactions.product_id
        //GROUP BY transactions.product_id
        //ORDER BY freq DESC;

        $products = Product::query()
            ->join("transactions", "transactions.product_id", "=", "products.id")
            ->selectRaw("products.id, name, products.price AS price, description, added, photo, COUNT(transactions.id) AS freq, tax")
            ->groupBy("transactions.product_id")
            ->orderByDesc("freq")
            ->paginate(12);

        return response(ProductResource::collection($products), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $filename = strtolower(Str::random(15)) . "." . $request->file("photo")->extension();
        Storage::putFileAs("public/img/products", $request->validated("photo"), $filename);
        $url = "/storage/img/products/" . $filename;

        $product = Product::create([
                "photo" => $url,
                "added" => date("Y-m-d"),
                "author_id" => $request->user()->id,
            ] +
            $request->validated()
        );

        return response(new ProductResource($product->load("category")), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        return response(new ProductResource(Product::find($id)->load(["author", "category"])), Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, int $id)
    {
        $product = Product::find($id);

        if ($request->exists("photo")) {
            $f = $product->photo;
            $index = strrpos($f, "/");
            $name = substr($f, $index + 1);
            Storage::delete("public/img/products/" . $name);

            $filename = strtolower(Str::random(15)) . "." . $request->file("photo")->extension();
            Storage::putFileAs("public/img/products", $request->validated("photo"), $filename);
            $url = "/storage/img/products/" . $filename;
            $product->update(["photo" => $url]);
        }

        $product->update($request->only(["name", "description", "category_id", "price"]));
        return response(new ProductResource($product->load(["author", "category"])), Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $image = Product::find($id)->photo;
        if (Storage::exists($image)) Storage::delete($image);
        Product::destroy($id);
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
