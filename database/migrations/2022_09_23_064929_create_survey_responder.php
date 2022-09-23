<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSurveyResponder extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('survey_responder', function (Blueprint $table) {          
            $table->integer('survey_id');
            $table->foreign('survey_id')->references('id')->on('surveys');
            $table->integer('responder_id');
            $table->foreign('responder_id')->references('id')->on('responders');
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
        Schema::dropIfExists('survey_responder');
    }
}
