<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $table = 'answers';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'question_id', 'text'
    ];

    // public function role() {
    //     return $this->hasOne(Role::class, "id", "role_id");
    // }
}
