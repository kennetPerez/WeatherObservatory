<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Station extends Model {

	protected $fillable = array('id', 'idPerson', 'idService', 'lat', 'lon', 'locationName');
    protected $hidden = array('created_at', 'updated_at');
}
