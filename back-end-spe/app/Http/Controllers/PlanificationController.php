<?php

namespace App\Http\Controllers;

use App\Models\Planification;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PlanificationController extends Controller
{
    public function index(Request $request)
    {
        $month = $request->query('month');
        $year = $request->query('year');

        $planifications = Planification::with(['controle.category', 'controle.groupe'])
            ->whereMonth('date', '=', $month)
            ->whereYear('date', '=', $year)
            ->get();

        return response()->json($planifications);
    }
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
                // Format the date to Y-m-d format
                $formattedDate = \Carbon\Carbon::parse($date)->format('Y-m-d');

                // Check for unique constraint
                $existingPlanification = Planification::where('controle_id', $controleId)
                    ->where('date', $formattedDate)
                    ->first();

                if ($existingPlanification) {
                    $response[] = [
                        'controle_id' => $controleId,
                        'date' => $formattedDate,
                        'status' => 'exists',
                    ];
                } else {
                    // Create a new Planification
                    $newPlanification = new Planification();
                    $newPlanification->controle_id = $controleId;
                    $newPlanification->date = $formattedDate;
                    $newPlanification->save();

                    $response[] = [
                        'controle_id' => $controleId,
                        'date' => $formattedDate,
                        'status' => 'created',
                    ];
                }
            }
        }

        return response()->json($response);
    }



    public function getPlanificationsByMonthYear(Request $request)
    {
        $request->validate([
            'month' => 'required|integer|min:1|max:12',
            'year' => 'required|integer|min:1900|max:' . date('Y'),
        ]);

        $month = $request->input('month');
        $year = $request->input('year');

        // Fetch the planifications for the given month and year
        $planifications = Planification::whereYear('date', $year)
            ->whereMonth('date', $month)
            ->with('controle.category', 'controle.groupe')
            ->get();

        // Group the planifications by category and format the response
        $response = $planifications->groupBy('controle.id_categorie')->map(function ($groupedPlanifications, $idCategory) {
            $category = $groupedPlanifications->first()->controle->category;
            return [
                'id_category' => $category->id,
                'designation' => $category->designation,
                'groupes' => $groupedPlanifications->groupBy('controle.number_group')->map(function ($groupedPlanifications, $numberGroup) {
                    return [
                        'number_group' => $numberGroup,
                        'equipments' => $groupedPlanifications->groupBy('controle.number_equip')->map(function ($groupedPlanifications) {
                            $controle = $groupedPlanifications->first()->controle;
                            return [
                                'number_equip' => $controle->number_equip,
                                'dates' => $groupedPlanifications->pluck('date')->map(function ($date) {
                                    return $date->format('Y-m-d');
                                })->values()->all(),
                            ];
                        })->values()->all(),
                    ];
                })->values()->all(),
            ];
        })->values()->all();

        return response()->json($response);
    }
}
