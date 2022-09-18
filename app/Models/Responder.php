<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;


class Responder extends Model
{
    protected $table = 'responders';

    protected $casts = [
        'created_at' => 'datetime:d.m.Y H:i',
    ];

    // Для получения аттрибута created_at выставляем часовой пояс МСК
    public function getCreatedAtAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->setTimezone("Europe/Moscow")->format('d.m.Y H:i');
    }

    public function companies()
    {
        return $this->belongsToMany(Company::class, 'company_responders', 'responder_id', 'company_id');
    }
}
