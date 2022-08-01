<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EditInnKppTableCompany extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->dropColumn('inn');
            $table->dropColumn('kpp');
        });

        Schema::table('companies', function (Blueprint $table) {
            $table->string('kpp')->nullable();
            $table->string('inn')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->dropColumn('inn');
            $table->dropColumn('kpp');
        });

        Schema::table('companies', function (Blueprint $table) {
            $table->integer('inn')->unsigned()->nullable();
            $table->integer('kpp')->unsigned()->nullable();
        });
    }
}
