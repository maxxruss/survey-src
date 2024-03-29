<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableCompanyResponders extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company_responders', function (Blueprint $table) {
            $table->integer('company_id');
            $table->foreign('company_id')->references('id')->on('companies');
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
        Schema::dropIfExists('company_responders');
    }
}
