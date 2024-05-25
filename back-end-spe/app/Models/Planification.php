<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Planification extends Model
{
    use HasFactory;
    protected $fillable = [
        'controle_id',
        'date'
    ];
    protected $casts = [
        'date' => 'date',
    ];
    public function controle()
    {
        return $this->belongsTo(Controle::class, 'controle_id');
    }
}
