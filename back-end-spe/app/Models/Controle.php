<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Controle extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_categorie',
        'number_group',
        'number_equip',
    ];
    public function category()
    {
        return $this->belongsTo(Category::class, 'id_categorie');
    }

    public function groupe()
    {
        return $this->belongsTo(Groupe::class, 'number_group');
    }
    public function planifications()
    {
        return $this->hasMany(Planification::class, 'controle_id');
    }
}
