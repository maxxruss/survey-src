<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    protected $table = 'surveys';
    public $timestamps = true;
    // protected $primaryKey = 'id';

    // public $incrementing = false;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
    ];

    public function questions() {
        return $this->hasMany(Question::class, "survey_id", "id");
    }

    public function participants() {
        return $this->belongsToMany(Responder::class, 'survey_responder', 'survey_id', 'responder_id')->withTimestamps();
    }
}
