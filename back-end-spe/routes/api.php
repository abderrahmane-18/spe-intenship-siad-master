<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('login', [AuthController::class, 'login']);
//Route::put('update-profile', [AuthController::class, 'updateProfile']);
Route::patch('{id}/update', [AuthController::class, 'update']);
Route::get('user', [AuthController::class, 'index']);
Route::get('user/{id}', [AuthController::class, 'showUser']);




Route::group(['middleware' => ['auth:sanctum', 'role:super-admin|admin']], function () {

    Route::get('roles', [RoleController::class, "index"]);
    Route::get('roles/{id}', [RoleController::class, "showRole"]);
    Route::resource('permissions', App\Http\Controllers\PermissionController::class);
    Route::get('permissions/{permissionId}/delete', [App\Http\Controllers\PermissionController::class, 'destroy']);

    Route::get('roles/{roleId}/delete', [App\Http\Controllers\RoleController::class, 'destroy']);
    Route::get('roles/{roleId}/give-permissions', [App\Http\Controllers\RoleController::class, 'addPermissionToRole']);
    Route::put('roles/{roleId}/give-permissions', [App\Http\Controllers\RoleController::class, 'givePermissionToRole']);

    Route::resource('users', App\Http\Controllers\UserController::class);
    Route::get('users/{userId}/delete', [App\Http\Controllers\UserController::class, 'destroy']);
});
