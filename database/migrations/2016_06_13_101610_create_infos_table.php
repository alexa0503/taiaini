<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('infos', function (Blueprint $table) {
            //$table->increments('id');
            $table->integer('id')->unsigned()->primary();
            $table->foreign('id')->references('id')->on('lotteries');
            $table->string('name',60);
            $table->string('mobile',60);
            $table->string('address',60);
            //$table->dateTime('created_time')->index();
            $table->string('ip_address',120)->nullable();
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
        Schema::drop('infos');
    }
}
