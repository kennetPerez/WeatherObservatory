<?php namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;

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
        //"http://api.apixu.com/v1/forecast.json?key=02c94d02506a4d92b0a165013160803&q=10.741173858409025,-84.57046882656255&days=1"
        $client = new Client();
        $response = $client->get('http://api.apixu.com/v1/forecast.json?key=02c94d02506a4d92b0a165013160803&q=10.741173858409025,-84.57046882656255&days=1');
        $body = $response->getBody();
        $stringBody = (string) $body;
        $this->comment(json_decode($stringBody)->location->localtime);
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
