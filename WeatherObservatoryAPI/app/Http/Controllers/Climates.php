<?php namespace App\Http\Controllers;

use App\Climate;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class Climates extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
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
    public function store(Request $request){
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

            return json_encode(array('clime'=>$climateInfo));;
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
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
