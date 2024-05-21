<?php

namespace App\Http\Controllers;

use App\Models\Planification;
use Illuminate\Http\Request;

class PlanificationController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            '*.controle_id' => 'required|exists:controles,id',
            '*.dates' => 'required|array',
            '*.dates.*' => 'required|date',
        ]);

        $planifications = $request->all();
        $response = [];

        foreach ($planifications as $plan) {
            $controleId = $plan['controle_id'];
            foreach ($plan['dates'] as $date) {
                // Check for unique constraint
                $existingPlanification = Planification::where('controle_id', $controleId)
                    ->where('date', $date)
                    ->first();

                if ($existingPlanification) {
                    $response[] = [
                        'controle_id' => $controleId,
                        'date' => $date,
                        'status' => 'exists',
                    ];
                } else {
                    // Create a new Planification
                    $newPlanification = new Planification();
                    $newPlanification->controle_id = $controleId;
                    $newPlanification->date = $date;
                    $newPlanification->save();

                    $response[] = [
                        'controle_id' => $controleId,
                        'date' => $date,
                        'status' => 'created',
                    ];
                }
            }
        }

        return response()->json($response, 201);
    }
}
