<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string("title")->unique();
            $table->string("description");
            $table->string("body");

            $table->timestamps();
        });
        Schema::create('article_keywords', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("article_id");
            $table->unsignedBigInteger("keyword_id");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
