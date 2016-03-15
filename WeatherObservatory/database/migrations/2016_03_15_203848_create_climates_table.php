<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClimatesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('climates', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('idStation')->unsigned();
            $table->string('day');
            $table->string('mount');
            $table->string('year');
            $table->string('hour');
            $table->string('weatherText');
            $table->string('iconURL');
            $table->string('windKmH');
            $table->string('windDir');
            $table->string('temp');
            $table->string('humidity');
            $table->string('precipitation');
            $table->string('pressure');
			$table->timestamps();
		});

        Schema::table('climates', function(Blueprint $table)
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
		Schema::drop('climates');
	}

}
