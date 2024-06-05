<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Carbon\Carbon;
use Illuminate\Support\Str;

class UserRolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Permissions
        $permissions = [
            'view roles', 'create role', 'update role', 'delete role',
            'view permission', 'create permission', 'update permission', 'delete permission',
            'view user', 'create user', 'update user', 'delete user',
            'view dashboard', 'view planfification', 'view category', 'create category',
            'update category', 'delete category'
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create Roles
        $roles = [
            'super-admin', 'admin', 'staff', 'user'
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        // Let's give all permission to super-admin role.
        $superAdminRole = Role::where('name', 'super-admin')->first();
        $allPermissions = Permission::all();
        $superAdminRole->syncPermissions($allPermissions);

        // Let's give few permissions to admin role.
        $adminRole = Role::where('name', 'admin')->first();
        $adminPermissions = ['create role', 'view roles', 'update role', 'create permission', 'view permission', 'create user', 'view user', 'update user', 'create product', 'view product', 'update product'];
        $adminRole->syncPermissions($adminPermissions);

        // Let's Create User and assign Role to it.
        $superAdminUser = User::firstOrCreate([
            'email' => 'superadmin@gmail.com',
        ], [
            'name' => 'Super Admin Abderrahmane',
            'password' => Hash::make('12345678'),
            'email_verified_at' => Carbon::now(),
            'remember_token' => Str::random(10),
        ]);
        $superAdminUser->assignRole($superAdminRole);

        $adminUser = User::firstOrCreate([
            'email' => 'admin@gmail.com'
        ], [
            'name' => 'Admin',
            'password' => Hash::make('12345678'),
            'email_verified_at' => Carbon::now(),
            'remember_token' => Str::random(10),
        ]);
        $adminUser->assignRole($adminRole);

        $staffUser = User::firstOrCreate([
            'email' => 'staff@gmail.com',
        ], [
            'name' => 'Staff',
            'password' => Hash::make('12345678'),
            'email_verified_at' => Carbon::now(),
            'remember_token' => Str::random(10),
        ]);
        $staffUser->assignRole('staff');
    }
}
