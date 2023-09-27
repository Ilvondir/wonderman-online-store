<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->decimal("price", 7, 2);
            $table->text("description");
            $table->string("photo");
            $table->date("added");
            $table->integer("tax");
            $table->unsignedBigInteger("author_id")->nullable();
            $table->foreign("author_id")->references("id")->on("users")->onDelete("set null");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(["author_id"]);
        });
        Schema::dropIfExists('products');
    }
};
