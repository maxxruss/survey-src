<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Responder;


class Company extends Model
{
    protected $table = 'companies';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'inn',
        'kpp',
        'address',
        'manager',
        'phone',
        'is_active',
        'role_id'
    ];

    public function role()
    {
        return $this->hasOne(Role::class, "id", "role_id");
    }

    /*Ответственные, связанные с собранием.*/
    //belongsToMany:
    // Модель, с которой связываемся, 
    // название соединительной таблицы, 
    // столбец соединительной таблицы (который относится к таблице, с которой связываемся), 
    // столбец соединительной таблицы (который относится к текущей модели)
    public function responders()
    {
        return $this->belongsToMany(Responder::class, 'company_responders', 'company_id', 'responder_id');
    }
}
