<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'designation',
        'codification',
        'frequence_rpm',
    ];
    public function controles()
    {
        return $this->hasMany(Controle::class, 'id_categorie');
    }
}
