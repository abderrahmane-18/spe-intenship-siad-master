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
            'codification' => 'required|string',
            'frequence_rpm' => 'required',

        ]);

        $category = Category::create([
            'designation' => $request->designation,
            'codification' => $request->codification,
            'frequence_rpm' => $request->frequence_rpm

        ]);
        return response()->json([
            'success' => true,
            'data' => $category
        ], 201);
    }
    /*
    public function index()
    {
        $category = Category::get();
        return response()->json([
            'success' => true,
            'categories' =>  $category,
        ]);
    }
*/

    public function index()
    {
        // $categories = Category::paginate(3);
        $categories = Category::paginate(4);

        return response()->json($categories);

        //return response()->json($categories);
    }
    public function getAllCategories()
    {
        // $categories = Category::paginate(3);
        $categories = Category::get();

        return response()->json($categories);

        //return response()->json($categories);
    }

    public function search()
    {
        $searchQuery = request('query');
        $categories = Category::where('designation', 'like,"%{$ $searchQuery}')->get();
        return  response()->json([
            'success' => true,
            'categories' => $categories
        ]);
    }
    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Category not found',
            ], 404);
        }

        $request->validate([
            'designation' => 'required|string|max:255',
            'codification' => 'required|string',
            'frequence_rpm' => 'required',
        ]);

        $data = [
            'designation' => $request->designation,
            'codification' => $request->codification,
            'frequence_rpm' => $request->frequence_rpm,
        ];

        $category->update($data);

        $result = [
            'status' => true,
            'message' => 'Category has been updated successfully',
            'data' => $category,
        ];

        return response()->json($result, 200);
    }
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }
}
