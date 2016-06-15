<?php namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use App\Station;
use App\Astronomic;
use App\Climate;
use Carbon\Carbon;

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
                $this->comment('Insertando informacion del servico Apixu');
                $this->comment('Ala estacion '.$station->locationName);
                $responseClime=json_decode($stringBody);
                
                $sunrise=substr($responseClime->forecast->forecastday[0]->astro->sunrise,6,8);
                $sunset=substr($responseClime->forecast->forecastday[0]->astro->sunset,6,8);
                $moonrise=substr($responseClime->forecast->forecastday[0]->astro->moonrise,6,8);
                $moonset=substr($responseClime->forecast->forecastday[0]->astro->moonset,6,8);
                
                if($sunrise=='PM'){
                    $sunrise=(intval(substr($responseClime->forecast->forecastday[0]->astro->sunrise,0,2))+12).substr($responseClime->forecast->forecastday[0]->astro->sunrise,2,4);
                }
                else{
                    $sunrise=substr($responseClime->forecast->forecastday[0]->astro->sunrise,0,5);
                }
                if($sunset=='PM'){
                    $sunset=(intval(substr($responseClime->forecast->forecastday[0]->astro->sunset,0,2))+12).substr($responseClime->forecast->forecastday[0]->astro->sunset,2,4);
                }
                else{
                    $sunset=substr($responseClime->forecast->forecastday[0]->astro->sunset,0,5);
                }
                if($moonrise=='PM'){
                    $moonrise=(intval(substr($responseClime->forecast->forecastday[0]->astro->moonrise,0,2))+12).substr($responseClime->forecast->forecastday[0]->astro->moonrise,2,4);
                }
                else{
                    $moonrise=substr($responseClime->forecast->forecastday[0]->astro->moonrise,0,5);
                    
                }
                if($moonset=='PM'){
                    $moonset=intval((substr($responseClime->forecast->forecastday[0]->astro->moonset,0,2))+12).substr($responseClime->forecast->forecastday[0]->astro->moonset,2,4);
                }
                else{
                    $moonset=substr($responseClime->forecast->forecastday[0]->astro->moonset,0,5);
                }
                
                
                $astronomicInfo = new Astronomic;
                $astronomicInfo->idStation = $station->id;
                $astronomicInfo->date = $responseClime->location->localtime;
                $astronomicInfo->sunrise = $sunrise;
                $astronomicInfo->sunset = $sunset;
                $astronomicInfo->moonrise = $moonrise;
                $astronomicInfo->moonset = $moonset;
                $astronomicInfo->save();

                //Listo : Mainor Gamboa
                $climateInfo = new Climate;
                $climateInfo->idStation = $station->id;
                $climateInfo->date = $responseClime->location->localtime;
                $climateInfo->weatherText = $responseClime->current->condition->text;
                $climateInfo->windKmH = $responseClime->current->wind_kph;
                $climateInfo->windDir = $responseClime->current->wind_dir;
                $climateInfo->iconURL = '';
                $climateInfo->temp = $responseClime->current->temp_c;
                $climateInfo->humidity = $responseClime->current->humidity;
                $climateInfo->precipitation = $responseClime->current->precip_mm;
                $climateInfo->pressure = $responseClime->current->pressure_mb;
                $climateInfo->save();


            }
            else
            {
                    //Wunderground
                $responseClime = $client->get('http://api.wunderground.com/api/073663611ee62e30/conditions/lang:SP/q/'.$station->lat.','.$station->lon.'.json');
                $body = $responseClime->getBody();
                $stringBody = (string) $body;
                $responseClimate=json_decode($stringBody);
                $this->comment('insertando informacion del servicio wunderground');
                $this->comment('Ala estacion '.$station->locationName);
                $date = Carbon::parse($responseClimate->current_observation->local_time_rfc822)->format('d-m-Y m-s');
                
                $responseAstro = $client->get('http://api.wunderground.com/api/073663611ee62e30/astronomy/lang:SP/q/'.$station->lat.','.$station->lon.'.json');
                $body = $responseAstro->getBody();
                $stringBody = (string) $body;
                $responseAstronomic=json_decode($stringBody);

                $astronomicInfo = new Astronomic;
                $astronomicInfo->idStation = $station->id;
                $astronomicInfo->date = $date;
                $astronomicInfo->sunrise = $responseAstronomic->moon_phase->sunrise->hour.':'.$responseAstronomic->moon_phase->sunrise->minute;
                $astronomicInfo->sunset = $responseAstronomic->moon_phase->sunset->hour.':'.$responseAstronomic->moon_phase->sunset->minute;
                $astronomicInfo->moonrise = $responseAstronomic->moon_phase->moonrise->hour.':'.$responseAstronomic->moon_phase->moonrise->minute;
                $astronomicInfo->moonset = $responseAstronomic->moon_phase->moonset->hour.':'.$responseAstronomic->moon_phase->moonset->minute;
                $astronomicInfo->save();
                //Listo : Mainor Gamboa
                $climateInfo = new Climate;
                $climateInfo->idStation = $station->id;
                $climateInfo->date = $date;
                $climateInfo->weatherText = $responseClimate->current_observation->weather;
                $climateInfo->windKmH = $responseClimate->current_observation->wind_kph;
                $climateInfo->windDir = $responseClimate->current_observation->wind_dir;
                $climateInfo->iconURL = '';
                $climateInfo->temp = $responseClimate->current_observation->temp_c;
                $climateInfo->humidity = $responseClimate->current_observation->relative_humidity;
                $climateInfo->precipitation = $responseClimate->current_observation->precip_today_in;
                $climateInfo->pressure = $responseClimate->current_observation->pressure_mb;
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
