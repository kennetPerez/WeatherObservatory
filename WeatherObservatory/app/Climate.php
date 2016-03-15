<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Climate extends Model {

	protected $fillable = array('id', 'idStation', 'day', 'mount', 'year', 'hour', 'weatherText', 'iconURL', 'windKmH', 'windDir', 'temp', 'humidity', 'precipitation', 'pressure');
    protected $hidden = array('created_at', 'updated_at');
}
