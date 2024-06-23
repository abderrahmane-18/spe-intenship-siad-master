<?php

namespace App\Http\Controllers;

use App\Models\PalierParameter;
use Illuminate\Http\Request;
use App\Events\NewNotification;
use App\Events\NotificationEvent1;
use App\Models\Planification;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use MyEvent;

class PalierParameterController extends Controller
{
    public function store(Request $request) 
    {
        try {
            $validatedData = $request->validate([
                'planification_id' => 'required|exists:planifications,id',
                'palier_values' => 'required|array',
                'palier_values.*.palier_name' => 'required|in:palier1,palier2,palier3,palier4',
                'palier_values.*.parameter_name' => 'required|in:speed,acceleration,deplacement',
                'palier_values.*.value_horizental' => 'required|numeric',
                'palier_values.*.value_vertical' => 'required|numeric',
                'palier_values.*.value_axial' => 'required|numeric',
            ]);
    
            $palierValues = $validatedData['palier_values'];
            $planificationId = $validatedData['planification_id'];
    
            foreach ($palierValues as $palierValue) {
                PalierParameter::create([
                    'planification_id' => $planificationId,
                    'palier_name' => $palierValue['palier_name'],
                    'parameter_name' => $palierValue['parameter_name'],
                    'value_horizental' => $palierValue['value_horizental'],
                    'value_vertical' => $palierValue['value_vertical'],
                    'value_axial' => $palierValue['value_axial'],
                ]);
            }
    
            return response()->json(['message' => 'ok']);
        } catch (\Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred'], 500);
        }
    }
   
}