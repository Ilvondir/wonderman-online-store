<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('login')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('avatar');
            $table->date("created");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Storage::deleteDirectory("public/img/avatars");
        Schema::dropIfExists('users');
    }
};
