<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use App\Service;
use App\Person;
use App\Station;
use App\Climate;
use App\Astronomic;

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
        );

        foreach($services as $service){
            Service::create($service);
        }


        DB::table('stations')->delete();

        $stations = array(
            ['idPerson' => 1, 'idService' => 1, 'lat' => '10.741173858409025', 'lon' => '-84.57046882656255', 'locationName' => 'Santa Rosa'],
            ['idPerson' => 2, 'idService' => 2, 'lat' => '9.529931587524796', 'lon' => '-83.21915046718755', 'locationName' => 'Telire']
        );

        foreach($stations as $station){
            Station::create($station);
        }
        

        DB::table('climates')->delete();

        $climates = array(
            ['idStation' => 1, 'date' => '2016-04-26 09:25', 'weatherText' => 'Nublado', 'iconURL' => '', 'windKmH' => '28', 'windDir' => 'E', 'temp' => '28', 'humidity' => '56', 'precipitation' => '0.0', 'pressure' => '1025.0'],

            ['idStation' => 2, 'date' => '2016-04-26 09:25', 'weatherText' => 'Nublado', 'iconURL' => '', 'windKmH' => '28', 'windDir' => 'E', 'temp' => '28', 'humidity' => '56', 'precipitation' => '0.0', 'pressure' => '1025.0']
        );

        foreach($climates as $climate){
            Climate::create($climate);
        }

        DB::table('astronomics')->delete();

        $astronomics = array(
            ['idStation' => 1, 'date' => '2016-04-26 09:25', 'sunrise' => '05:00', 'sunset' => '05:00', 'moonrise' => '05:00', 'moonset' => '05:00'],
            ['idStation' => 2, 'date' => '2016-04-26 09:25', 'sunrise' => '05:00', 'sunset' => '05:00', 'moonrise' => '05:00', 'moonset' => '05:00']
        );

        foreach($astronomics as $astronomic){
            Astronomic::create($astronomic);
        }





        $this->command->info('Persons/Services/Stations/Climate/Astronomic tables seededs!');
	}

}
