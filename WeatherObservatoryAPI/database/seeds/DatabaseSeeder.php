<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use App\Service;
use App\Person;

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Model::unguard();


        DB::table('people')->delete();

        $persons = array(
            ['type' => 0, 'pass' => md5('12345'), 'name' => 'Kenneth Pérez Alfaro', 'email' => 'kenn.perez@gmail.com'],
            ['type' => 0, 'pass' => md5('12345'), 'name' => 'Cristian Salas Salazar', 'email' => 'cs.salas94@gmail.com'],
            ['type' => 0, 'pass' => md5('12345'), 'name' => 'Mainor Gamboa Rodriguez', 'email' => 'mainor.gamboa.rodriguez@gmail.com']
        );

        foreach($persons as $person){
            Person::create($person);
        }

        DB::table('services')->delete();

        $services = array(
            ['serviceName' => 'Apixu', 'serviceURL' => 'http://api.apixu.com/v1/current.json?key=795f8650076447ffa8465846161503'],
            ['serviceName' => 'Wunderground', 'serviceURL' => 'http://api.wunderground.com/api/073663611ee62e30/conditions/q/CR/'],
            ['serviceName' => 'Forecast', 'serviceURL' => 'https://api.forecast.io/forecast/3aedeecbc7dd5f6475e00a689a869cda/']
        );

        foreach($services as $service){
            Service::create($service);
        }

        $this->command->info('Persons/Services tables seededs!');
	}

}
