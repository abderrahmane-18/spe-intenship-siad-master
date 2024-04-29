<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('login',[AuthController::class,'login']);
//Route::put('update-profile', [AuthController::class, 'updateProfile']);
Route::patch('{id}/update', [AuthController::class, 'update']);
Route::get('user', [AuthController::class, 'index']);
Route::get('user/{id}', [AuthController::class, 'showUser']);



//->middleware('auth:sanctum')

