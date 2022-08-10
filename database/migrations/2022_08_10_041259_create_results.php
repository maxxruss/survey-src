<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResults extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('results', function (Blueprint $table) {
            $table->id();
            $table->integer('question_id');
            $table->foreign('question_id')->references('id')->on('questions');
            $table->integer('answer_id')->nullable();
            $table->foreign('answer_id')->references('id')->on('answers');
            $table->integer('responder_id');
            $table->foreign('responder_id')->references('id')->on('responders');
            $table->string('own_answer')->nullable();
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
        Schema::dropIfExists('results');
    }
}
