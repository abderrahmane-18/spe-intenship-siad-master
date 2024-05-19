<?php

namespace App\Http\Controllers;

use App\Models\Planification;
use Illuminate\Http\Request;

class PlanificationController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'controle_id' => 'required|exists:controles,id',

            'date' => 'required|date',
        ]);

        Planification::create($validatedData);

        return response()->json(['message' => 'Planification créée avec succès']);
    }
}
