<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PalierParameter extends Model
{
    use HasFactory;
    protected $fillable = [
        'palier_name', 'parameter_name', 'value_horizental', 'value_vertical', 'value_axial', 'planification_id'
    ];

    public function planification()
    {
        return $this->belongsTo(Planification::class);
    }
}
