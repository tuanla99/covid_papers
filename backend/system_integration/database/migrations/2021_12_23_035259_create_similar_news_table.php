<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSimilarNewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('similar_news', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('news_id');
            $table->integer('similar_id');
            $table->foreign('news_id')->references('id')->on('news');
            $table->foreign('similar_id')->references('id')->on('news');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('similar_news');
    }
}
