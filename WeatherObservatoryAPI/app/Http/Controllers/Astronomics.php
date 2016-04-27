<?php namespace App\Http\Controllers;

use App\Astronomic;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class Astronomics extends Controller {

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
	public function store(Request $request)
    {
        $astronomicInfo = new Astronomic;
        $astronomicInfo->idStation = $request->input('idStation');
        $astronomicInfo->date = $request->input('date');
        $astronomicInfo->sunrise = $request->input('sunrise');
        $astronomicInfo->sunset = $request->input('sunset');
        $astronomicInfo->moonrise = $request->input('moonrise');
        $astronomicInfo->moonset = $request->input('moonset');
        $astronomicInfo->save();

        return json_encode(array('astro'=>$astronomicInfo));;
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
