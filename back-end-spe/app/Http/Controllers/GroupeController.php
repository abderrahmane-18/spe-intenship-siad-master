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
            'categories' =>  $groupe,
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
}
