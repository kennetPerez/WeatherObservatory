<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('stations', function(Blueprint $table)
		{
			$table->increments('id');
            $table->integer('idPerson')->unsigned(); $table->integer('idService')->unsigned();
            $table->string('lat');
            $table->string('lon');
            $table->string('locationName');
			$table->timestamps();
		});

        Schema::table('stations', function(Blueprint $table)
		{
            $table->foreign('idPerson')->references('id')->on('people')->onDelete('cascade');
            $table->foreign('idService')->references('id')->on('services')->onDelete('cascade');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('stations');
	}

}