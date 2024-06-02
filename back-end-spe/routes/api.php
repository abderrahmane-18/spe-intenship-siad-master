<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ControleController;
use App\Http\Controllers\GroupeController;
use App\Http\Controllers\PlanificationController;
use App\Http\Controllers\RoleController;
use App\Models\Controle;
use App\Models\Planification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PermissionController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('login', [AuthController::class, 'login']);
//Route::put('update-profile', [AuthController::class, 'updateProfile']);
Route::patch('{id}/update', [AuthController::class, 'update']);
Route::get('user', [AuthController::class, 'index']);
Route::get('user/{id}', [AuthController::class, 'showUser']);




Route::group(['middleware' => ['auth:sanctum', 'role:super-admin|admin|Staff']], function () {
    Route::post('add-category', [CategoryController::class, "store"]);
    Route::put('update-category/{cat_id}', [CategoryController::class, "update"]);
    Route::delete('categories/delete/{id}',  [CategoryController::class, "destroy"]);


    Route::get('roles', [RoleController::class, "index"]);
    Route::get('role/{id}', [RoleController::class, "showRole"]);
    Route::get('permissions', [PermissionController::class, "index"]);
    Route::get('permissions/{permissionId}/delete', [App\Http\Controllers\PermissionController::class, 'destroy']);

    Route::get('roles/{roleId}/delete', [App\Http\Controllers\RoleController::class, 'destroy']);
    Route::get('role/{roleId}/give-permissions', [App\Http\Controllers\RoleController::class, 'addPermissionToRole']);
    Route::put('roles/{roleId}/give-permissions', [App\Http\Controllers\RoleController::class, 'givePermissionToRole']);

    Route::resource('users', App\Http\Controllers\UserController::class);
    Route::patch('user/{id}', [App\Http\Controllers\UserController::class]);
    Route::get('categories/search/{designation}', [App\Http\Controllers\CategoryController::class, 'search']);

    Route::get('users/{userId}/delete', [App\Http\Controllers\UserController::class, 'destroy']);

    Route::get('categories/paginate', [CategoryController::class, "index"]);
    Route::get('categories', [CategoryController::class, "getAllCategories"]);

    Route::get('groupes', [GroupeController::class, "index"]);
    Route::post('groupe', [GroupeController::class, "store"]);
    Route::post('planification', [PlanificationController::class, "store"]);

    Route::post('controle', [ControleController::class, "store"]);
    Route::get('controle/data', [ControleController::class, "getControlData"]);
    Route::get('controle/data/{id}', [ControleController::class, "getControlDataById"]);
    Route::get('controles', [ControleController::class, 'index']);
    Route::get('/planifications', [PlanificationController::class, 'getPlanificationsByMonthYear']);
    Route::delete('/planifications', [PlanificationController::class, 'deleteAll']);
    //  Route::get('/planifications', [PlanificationController::class, 'getPlanificationsByMonthYear']);
    Route::get('/planifications/today', [PlanificationController::class, 'getPlanificationsForToday']);
    Route::get('/controls/parameters', [ControleController::class, 'getControlDataForParameters']);
    // Route::get('categories', [CategoryController::class, "index"]);
});
