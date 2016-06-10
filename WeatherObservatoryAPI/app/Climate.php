<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Climate extends Model {

	protected $fillable = array('id', 'idStation', 'date', 'weatherText', 'iconURL', 'windKmH', 'windDir', 'temp', 'humidity', 'precipitation', 'pressure');
    protected $hidden = array('created_at', 'updated_at');
}