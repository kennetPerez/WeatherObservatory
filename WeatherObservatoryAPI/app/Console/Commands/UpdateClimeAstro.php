<?php namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use App\Station;
use App\Astronomic;
use App\Climate;

class UpdateClimeAstro extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'ClimeAstro:update';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Command description.';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function fire()
	{
        $myStations=Station::orderBy('id', 'asc')->get();
        $client = new Client();
        foreach ($myStations as $station) {
            if($station->idService==1)
            {
                //Apixu
                $response = $client->get('http://api.apixu.com/v1/forecast.json?key=02c94d02506a4d92b0a165013160803&q='.$station->lat.','.$station->lon.'&days=1');
                $body = $response->getBody();
                $stringBody = (string) $body;
                $this->comment(json_decode($stringBody)->location->localtime);

                $astronomicInfo = new Astronomic;
                $astronomicInfo->idStation = $station->id;
                $astronomicInfo->date = json_decode($stringBody)->location->localtime;
                $astronomicInfo->sunrise = $request->input('sunrise');
                $astronomicInfo->sunset = $request->input('sunset');
                $astronomicInfo->moonrise = $request->input('moonrise');
                $astronomicInfo->moonset = $request->input('moonset');
                $astronomicInfo->save();

                $climateInfo = new Climate;
                $climateInfo->idStation = $station->id;
                $climateInfo->date = json_decode($stringBody)->location->localtime;
                $climateInfo->weatherText = json_decode($stringBody)->current->condition->text;
                $climateInfo->windKmH = json_decode($stringBody)->current->wind_kph;
                $climateInfo->windDir = json_decode($stringBody)->current->wind_dir;
                $climateInfo->iconURL = '';
                $climateInfo->temp = json_decode($stringBody)->current->condition->temp_c;
                $climateInfo->humidity = json_decode($stringBody)->current->humidity;
                $climateInfo->precipitation = json_decode($stringBody)->current->precip_mm;
                $climateInfo->pressure = json_decode($stringBody)->current->pressure_mb;
                $climateInfo->save();


            }
            else
            {
                    //Wunderground
                $response = $client->get('http://api.wunderground.com/api/073663611ee62e30/conditions/lang:SP/q/'.$station->lat.','.$station->lon.'.json');
                $body = $response->getBody();
                $stringBody = (string) $body;
                $this->comment(json_decode($stringBody)->current_observation->weather);

                $response = $client->get('http://api.wunderground.com/api/073663611ee62e30/astronomy/lang:SP/q/'.$station->lat.','.$station->lon.'.json');
                $body = $response->getBody();
                $stringBody = (string) $body;
                $this->comment(json_decode($stringBody)->moon_phase->sunrise->hour);

                $astronomicInfo = new Astronomic;
                $astronomicInfo->idStation = $station->id;
                $astronomicInfo->date = json_decode($stringBody)->location->localtime;
                $astronomicInfo->sunrise = $request->input('sunrise');
                $astronomicInfo->sunset = $request->input('sunset');
                $astronomicInfo->moonrise = $request->input('moonrise');
                $astronomicInfo->moonset = $request->input('moonset');
                $astronomicInfo->save();

                $climateInfo = new Climate;
                $climateInfo->idStation = $request->input('idStation');
                $climateInfo->date = $request->input('date');
                $climateInfo->weatherText = $request->input('weatherText');
                $climateInfo->windKmH = $request->input('windKmH');
                $climateInfo->windDir = $request->input('windDir');
                $climateInfo->iconURL = '';
                $climateInfo->temp = $request->input('temp');
                $climateInfo->humidity = $request->input('humidity');
                $climateInfo->precipitation = $request->input('precipitation');
                $climateInfo->pressure = $request->input('pressure');
                $climateInfo->save();
            }
        }
    }

	/**
	 * Get the console command arguments.
	 *
	 * @return array
	 */
	protected function getArguments()
	{
		return [
			//['example', InputArgument::REQUIRED, 'An example argument.'],
		];
	}

	/**
	 * Get the console command options.
	 *
	 * @return array
	 */
	protected function getOptions()
	{
		return [
			//['example', null, InputOption::VALUE_OPTIONAL, 'An example option.', null],
		];
	}

}
