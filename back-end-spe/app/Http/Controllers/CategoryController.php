<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'designation' => 'required|string|max:255',
            'codification' => 'required',
            'description' => 'required|min:8|max:20',

        ]);

        $category = Category::create([
            'designation' => $request->designation,
            'codification' => $request->codification,
            'description' => $request->description

        ]);
        return response()->json([
            'success' => true,
            'data' => $category
        ], 201);
    }
    public function index()
    {
        $category = Category::get();
        return response()->json([
            'success' => true,
            'categories' =>  $category,
        ]);
    }
}