<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ControleController;
use App\Http\Controllers\GroupeController;
use App\Http\Controllers\PalierParameterController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PlanificationController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Models\Controle;
use App\Models\PalierParameter;
use App\Models\Planification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Broadcast;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('login', [AuthController::class, 'login']);
Route::put('update-profile', [AuthController::class, 'updateProfile']);
Route::patch('{id}/update', [AuthController::class, 'update']);
Route::get('user', [AuthController::class, 'index']);
Route::get('user/{id}', [AuthController::class, 'showUser']);

;
Broadcast::routes(['middleware' => ['auth:sanctum']]);


Broadcast::routes(['predix' => 'api', 'middleware' => ['auth:sanctum']]);
Route::group(['middleware' => ['auth:sanctum', 'role:super-admin|admin|staff']], function () {

    Route::put('cat/{id}', [PlanificationController::class, "update"]);
    Route::put('cat/{id}', [PlanificationController::class, "update"]);
    Route::post('add-category', [CategoryController::class, "store"]);
    Route::put('update-category/{cat_id}', [CategoryController::class, "update"]);
    Route::delete('categories/delete/{id}',  [CategoryController::class, "destroy"]);

    Route::get('roles', [RoleController::class, "index"]);
    Route::get('/palier-data', [PalierParameterController::class, 'getPalierData']);
    Route::get('roles/{id}', [RoleController::class, "showRole"]);
    //Route::resource('permissions', App\Http\Controllers\PermissionController::class);
    Route::put('permission/{permissionId}', [PermissionController::class, 'update']);
    Route::post('permission', [PermissionController::class, 'store']);
    Route::get('permissions', [App\Http\Controllers\PermissionController::class, 'index']);
    Route::post('/realization', [PalierParameterController::class, 'store']);
    Route::get('/planificationsDelay', [PlanificationController::class, 'indexDelay']);


    Route::get('/group-realization-data', [GroupeController::class, 'getGroupRealizationData']);


Route::patch('planifications/3',[PlanificationController::class, "updateDateRealized"]);
    //Route::post('/store-collaborator', [PalierParameterController::class, 'store']);
    Route::patch('/planification/{id}/date-realized', [PlanificationController::class, 'updateDateRealized']);

    Route::get('planifications', [PlanificationController::class,'get']);
    Route::delete('permissions/delete/{per_id}',  [PermissionController::class, "destroy"]);

    //Route::delete('permissions/{per_id}/delete', [PermissionController::class, 'destroy']);

    Route::get('roles/{roleId}/delete', [App\Http\Controllers\RoleController::class, 'destroy']);
    Route::get('roles/{roleId}/give-permissions', [App\Http\Controllers\RoleController::class, 'addPermissionToRole']);
    Route::put('roles/{roleId}/give-permissions', [App\Http\Controllers\RoleController::class, 'givePermissionToRole']);

    Route::resource('users', App\Http\Controllers\UserController::class);
    //Route::put('/user/{id}', [UserController::class,'update']);
   // Route::put('/user/{user}', [UserController::class, 'update']);

    //Route::get('user/role/{id}', [UserController::class, 'getUserWithById']);

    Route::get('categories/search/{designation}', [App\Http\Controllers\CategoryController::class, 'search']);

    //Route::get('users/{userId}/delete', [App\Http\Controllers\UserController::class, 'destroy']);

    Route::get('categories/paginate', [CategoryController::class, "index"]);
    Route::get('categories', [CategoryController::class, "getAllCategories"]);
                  
   Route::get('groupes', [GroupeController::class, "index"]);
    Route::post('groupe', [GroupeController::class, "store"]);
    Route::post('planification', [PlanificationController::class, "store"]);
    Route::delete('/palier-parameters', [PalierParameterController::class, 'destroyAll']);

    Route::post('controle', [ControleController::class, "store"]);
    Route::get('controle/data', [ControleController::class, "getControlData"]);
    Route::get('controle/data/{id}', [ControleController::class, "getControlDataById"]);
    Route::get('controles', [ControleController::class, 'index']);
  //  Route::get('/planifications', [PlanificationController::class, 'getPlanificationsByMonthYear']);
    Route::delete('/planifications', [PlanificationController::class, 'deleteAll']);
    Route::delete('/controles', [ControleController::class, 'deleteAll']);

      Route::get('/planifications', [PlanificationController::class, 'getPlanificationsByMonthYear']);

    // Route::get('categories', [CategoryController::class, "index"]);
 

});