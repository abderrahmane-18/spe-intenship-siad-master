<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::create(['name' => 'admin']);
        $userRole = Role::create(['name' => 'simple_user']);
    
        // Create permissions
        $createPermission = Permission::create(['name' => 'create']);
        $readPermission = Permission::create(['name' => 'read']);
        $updatePermission = Permission::create(['name' => 'update']);
        $deletePermission = Permission::create(['name' => 'delete']);
    
        // Assign permissions to roles
        $adminRole->permissions()->attach([$createPermission->id, $readPermission->id, $updatePermission->id, $deletePermission->id]);
        $userRole->permissions()->attach([$readPermission->id]);
    }
}
