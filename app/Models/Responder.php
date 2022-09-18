<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Responder extends Model
{
    protected $table = 'responders';

    protected $casts = [
        'created_at' => 'datetime:d.m.Y H:i',
    ];

    public function companies()
    {
        return $this->belongsToMany(Company::class, 'company_responders', 'responder_id', 'company_id');
    }
}
