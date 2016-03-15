<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Astronomic extends Model {

	protected $fillable = array('id', 'idStation', 'day', 'mount', 'year', 'sunrise', 'sunset', 'moonrise', 'moonset');
    protected $hidden = array('created_at', 'updated_at');
}
