<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\DB;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class RoleController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware(middleware: ('permission:view role'), only: ['index']),
            new Middleware(middleware: ('permission:create role'), only: ['create', 'store', 'addPermissionToRole', 'givePermissionToRole']),
            new Middleware(middleware: ('permission:update role'), only: ['update', 'edit']),
            new Middleware(middleware: ('permission:delete role'), only: ['destroy']),

        ];
    }
    /*
    public function __construct()
    {
        $this->middleware('permission:view role')->only(['index']);
        $this->middleware('permission:create role')->only(['create','store','addPermissionToRole','givePermissionToRole']);
        $this->middleware('permission:update role')->only(['update','edit']);
        $this->middleware('permission:delete role')->only(['destroy']);
    }
*/
    public function index()
    {
        $roles = Role::get();
        return response()->json([
            'roles' => $roles,
        ]);
        // return view('role-permission.role.index', ['roles' => $roles]);
    }
    public function showRole($id)
    {
        $role = Role::findOrFail($id);
        $result = array('status' => true, 'message' => 'user hase been fetch succefully', 'data' => $role);

        return response()->json($result, 200);
    }

    public function create()
    {
        return view('role-permission.role.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => [
                'required',
                'string',
                'unique:roles,name'
            ]
        ]);

        Role::create([
            'name' => $request->name
        ]);

        return redirect('roles')->with('status', 'Role Created Successfully');
    }

    public function edit(Role $role)
    {
        return view('role-permission.role.edit', [
            'role' => $role
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => [
                'required',
                'string',
                'unique:roles,name,' . $role->id
            ]
        ]);

        $role->update([
            'name' => $request->name
        ]);

        return redirect('roles')->with('status', 'Role Updated Successfully');
    }

    public function destroy($roleId)
    {
        $role = Role::find($roleId);
        $role->delete();
        return redirect('roles')->with('status', 'Role Deleted Successfully');
    }

    public function addPermissionToRole($roleId)
    {
        $permissions = Permission::get();
        $role = Role::findOrFail($roleId);
        $rolePermissions = DB::table('role_has_permissions')
            ->where('role_has_permissions.role_id', $role->id)
            ->pluck('role_has_permissions.permission_id', 'role_has_permissions.permission_id')
            ->all();
        return response()->json([
            'role' => $role,
            'permissions' => $permissions,
            'rolePermissions' => $rolePermissions
        ]);
    }

    public function givePermissionToRole(Request $request, $roleId)
    {
        $request->validate([
            'permission' => 'required'
        ]);

        $role = Role::findOrFail($roleId);
        $role->syncPermissions($request->permission);

        return redirect()->back()->with('status', 'Permissions added to role');
    }
}
