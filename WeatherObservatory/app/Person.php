<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Person extends Model {

	protected $fillable = array('id', 'type', 'user', 'pass', 'name', 'lastName', 'email');
    protected $hidden = array('created_at', 'updated_at');
}
