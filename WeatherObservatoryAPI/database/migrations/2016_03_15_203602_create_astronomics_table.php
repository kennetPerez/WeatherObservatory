<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAstronomicsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('astronomics', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('idStation')->unsigned();
            $table->string('date');
            $table->string('sunrise');
            $table->string('sunset');
            $table->string('moonrise');
            $table->string('moonset');
			$table->timestamps();
		});

        Schema::table('astronomics', function(Blueprint $table)
		{
            $table->foreign('idStation')->references('id')->on('stations')->onDelete('cascade');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('astronomics');
	}

}
