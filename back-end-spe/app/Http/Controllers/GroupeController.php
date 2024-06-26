<?php

namespace App\Http\Controllers;

use App\Models\Groupe;
use Illuminate\Http\Request;

class GroupeController extends Controller
{
    public function index()
    {
        $groupe = Groupe::get();
        return response()->json([
            'success' => true,
            'groupes' =>  $groupe,
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'start_date' => 'required|date|max:255',


        ]);

        $groupe = Groupe::create([
            'start_date' => $request->start_date,


        ]);
        return response()->json([
            'success' => true,
            'data' => $groupe
        ], 201);
    }
    public function getGroupRealizationData()
    {
        $groups = Groupe::with(['controles.planifications' => function($query) {
            $query->whereNotNull('date_realized');
        }])->get();

        $data = $groups->map(function ($group) {
            $totalEquipments = $group->controles->count();
            $realizedEquipments = $group->controles->reduce(function ($carry, $controle) {
                return $carry + $controle->planifications->count();
            }, 0);

            $realizationPercentage = $totalEquipments ? ($realizedEquipments / $totalEquipments) * 100 : 0;

            return [
                'group' => $group->id,
                'realizationPercentage' => $realizationPercentage,
            ];
        });

        return response()->json($data);
    }
}