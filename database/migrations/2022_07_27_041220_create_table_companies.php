<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableCompanies extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('title', 200);
            $table->integer('role_id');
            $table->foreign('role_id')->references('id')->on('roles');
            $table->boolean('is_active')->default(false);
            $table->integer('inn')->unsigned()->nullable();
            $table->integer('kpp')->unsigned()->nullable();
            $table->string('manager', 200)->nullable();
            $table->string('address', 200)->nullable();
            $table->string('phone', 100)->nullable();
            $table->string('email', 100)->nullable();
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
        Schema::dropIfExists('companies');
    }
}
