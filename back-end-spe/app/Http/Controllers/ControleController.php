<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Controle;
use App\Models\Groupe;
use Illuminate\Http\Request;

class ControleController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'id_categorie' => 'required|exists:categories,id',
            'number_group' => 'required|exists:groupes,id',
            'number_equip' => 'required|string|unique:controles,number_equip,NULL,NULL,id_categorie,' . $request->input('id_categorie') . ',number_group,' . $request->input('number_group'),
        ]);

        // Create a new Controle instance
        $controle = Controle::create($validatedData);

        // Return a response
        return response()->json([
            'message' => 'Controle created successfully',
            'data' => $controle,
        ], 201);
    }
    public function index()
    {
        $controles = Controle::with('category', 'groupe')->get();

        return response()->json($controles);
    }
    public function getControlData()
    {


        $categories = Category::with('controles.groupe')->get();

        $data = $categories->map(function ($category) {
            $groups = [];

            $category->controles->groupBy('groupe.id')->each(function ($controles, $groupId) use (&$groups) {
                if ($groupId === '' || $groupId === null) {
                    $equipments = $controles->pluck('number_equip')->toArray();

                    $groups[] = [
                        'number_group' => null,
                        'equipments' => array_values(array_unique($equipments)),
                    ];
                } else {
                    $group = Groupe::findOrNew($groupId);
                    $equipments = $controles->pluck('number_equip')->toArray();

                    $groups[] = [
                        'number_group' => $group->id,
                        'equipments' => array_values(array_unique($equipments)),
                    ];
                }
            });

            return [
                'id' => $category->id,
                'designation' => $category->designation,
                'groupes' => $groups,
            ];
        });

        return response()->json($data);
    }
    public function getControlDataById($id)
    {
        $category = Category::with('controles.groupe')
            ->findOrFail($id);

        $groups = [];
        $category->controles->groupBy('groupe.id')->each(function ($controles, $groupId) use (&$groups) {
            if ($groupId === '' || $groupId === null) {
                $equipments = $controles->pluck('number_equip')->toArray();
                $groups[] = [
                    'number_group' => null,
                    'equipments' => array_values(array_unique($equipments)),
                ];
            } else {
                $group = Groupe::findOrNew($groupId);
                $equipments = $controles->pluck('number_equip')->toArray();
                $groups[] = [
                    'number_group' => $group->id,
                    'equipments' => array_values(array_unique($equipments)),
                ];
            }
        });

        $data = [
            'id' => $category->id,
            'designation' => $category->designation,
            'groups' => $groups,
        ];

        return response()->json([$data]);
    }
}
