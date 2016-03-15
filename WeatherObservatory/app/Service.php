<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model {

    protected $fillable = array('id', 'serviceName', 'serviceURL');
    protected $hidden = array('created_at', 'updated_at');
}
