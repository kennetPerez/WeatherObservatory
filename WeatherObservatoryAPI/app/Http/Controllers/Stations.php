<?php namespace App\Http\Controllers;

use App\Station;
use App\Climate;
use App\Astronomic;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class Stations extends Controller {

    /**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
    public function index()
    {
        return Station::orderBy('id', 'asc')->get();
    }

    /**
	 * Display a listing of my stations.
	 *
	 * @return Response
	 */
    public function myStations(Request $request)
    {
        if($request->input('type')==0) {
            $myStations = Station::orderBy('id', 'asc')->get();  }

        else{
            $myStations = Station::where('idPerson', '=', $request->input('idUser'))->orderBy('id', 'asc')->get();}

        $output = [];
        foreach($myStations as $station){
            $idStation = $station->id;
            $climate = Climate::where('idStation', '=', $idStation)->orderBy('id', 'asc')->get();
            $astro = Astronomic::where('idStation', '=', $idStation)->orderBy('id', 'asc')->get();

            $output[] = array('station'=>$station, 'climate'=>$climate, 'astro'=>$astro);
        }
        return json_encode($output);
    }

    /**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
    public function create()
    {
        //
    }

    /**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
    public function store(Request $request)
    {
        $station = new Station;
        $station->idPerson = $request->input('idPersona');
        $station->idService = $request->input('idService');
        $station->lat = $request->input('lat');
        $station->lon = $request->input('lon');
        $station->locationName = $request->input('locationName');
        $station->save();

        return json_encode(array('station'=>$station, 'climate'=>array(), 'astro'=>array()));
    }

    /**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
    public function show($id)
    {
        //
    }

    /**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
    public function edit($id)
    {
        //
    }

    /**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
    public function update(Request $request)
    {
        $station = Station::find($request->input('id'));
        $station->locationName = $request->input('locationName');
        $station->idService = $request->input('idService');
        $station->save();
        return 0;
    }

    /**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
    public function destroy($id)
    {
        $station = Station::find($id);

        $station->delete();
        return 0;
    }

}
