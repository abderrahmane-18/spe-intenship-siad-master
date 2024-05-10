<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class ControleController extends Controller
{
    public function search()
    {
        $searchQuery = request('query');
        $categories = Category::where('designation', 'like,"%{$ $searchQuery}')->get();
        return  response()->json($categories);
    }
}
