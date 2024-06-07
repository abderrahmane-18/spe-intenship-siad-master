<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class PermissionController extends Controller implements HasMiddleware
{

    public static function middleware(): array
    {
        return [
            new Middleware(middleware: ('permission:view permission'), only: ['index']),
            new Middleware(middleware: ('permission:create permission'), only: ['create', 'store']),
            new Middleware(middleware: ('permission:update permission'), only: ['update', 'edit']),
            new Middleware(middleware: ('permission:delete permission'), only: ['destroy']),

        ];
    }

    public function index()
    {
        $permissions = Permission::orderBy('id', 'asc')->get();
        return response()->json([
            'permissions' => $permissions,
        ]);
    }

    public function create()
    {
        return view('role-permission.permission.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => [
                'required',
                'string',
                'unique:permissions,name'
            ]
        ]);

        $permission = Permission::create([
            'name' => $request->name
        ]);
        return response()->json([
            'success' => true,
            'data' => $permission
        ], 201);
    }



    public function update(Request $request, $permissionId)
    {
        $permission = Permission::findOrFail($permissionId);

        $request->validate([
            'name' => [
                'required',
                'string',
                'unique:permissions,name,' . $permission->id
            ]
        ]);

        $permission->update([
            'name' => $request->name
        ]);
        $result = array('status' => true, 'message' => 'user hase been updated succefully', 'data' => $permission);
        return response()->json($result, 200);
    }
    public function destroy($permissionId)
    {
        $permission = Permission::find($permissionId);
        $permission->delete();
        return response()->json(['message' => 'Permission Deleted Successfully']);
    }
}
