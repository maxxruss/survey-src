<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $table = 'questions';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'survey_id', 'text'
    ];

    // public function role() {
    //     return $this->hasOne(Role::class, "id", "role_id");
    // }
}
