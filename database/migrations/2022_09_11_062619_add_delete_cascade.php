<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDeleteCascade extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('company_responders', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
            $table->dropForeign(['responder_id']);
            $table->foreign('responder_id')->references('id')->on('responders')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('company_responders', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->foreign('company_id')->references('id')->on('companies');
            $table->dropForeign(['responder_id']);
            $table->foreign('responder_id')->references('id')->on('responders');
        });
    }
}
