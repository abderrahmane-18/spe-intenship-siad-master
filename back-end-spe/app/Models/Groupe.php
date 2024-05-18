<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Groupe extends Model
{
    use HasFactory;
    protected $fillable = [
        'start_date',

    ];
    public function controles()
    {
        return $this->hasMany(Controle::class, 'id_categorie');
    }
}
