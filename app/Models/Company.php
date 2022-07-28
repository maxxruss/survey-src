<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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

    public function role() {
        return $this->hasOne(Role::class, "id", "role_id");
    }
}
