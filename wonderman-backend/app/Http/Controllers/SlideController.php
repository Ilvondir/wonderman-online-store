<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSlideRequest;
use App\Http\Resources\SlideResource;
use App\Models\Slide;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class SlideController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response(SlideResource::collection(Slide::all()), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSlideRequest $request)
    {
	$this->authorize("is_admin", $request->user());
        $filename = strtolower(Str::random(15)) . "." . $request->file("image")->extension();
        Storage::putFileAs("public/img/slides", $request->validated("image"), $filename);
        $url = env("APP_URL") . ":8000/storage/img/slides/" . $filename;

        $slide = Slide::create([
            "image" => $url,
            "title" => $request->validated("title"),
            "description" => $request->validated("description"),
        ]);

        return response(new SlideResource($slide), Response::HTTP_CREATED);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $slide, Request $request)
    {
	$this->authorize("is_admin", $request->user());
        $f = Slide::find($slide)->image;
        $index = strrpos($f, "/");
        $name = substr($f, $index + 1);

        if (Storage::exists("public/img/slides/" . $name)) Storage::delete("public/img/slides/" . $name);

        Slide::destroy($slide);
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
