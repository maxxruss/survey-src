<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
use App\Http\Controllers\Auth\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('auth', [AuthController::class, 'auth']);
Route::post('logout', [AuthController::class, 'logout']);
Route::post('check', [AuthController::class, 'check']);
Route::post('test', [TestController::class, 'test']);

Route::group(['middleware' => ['auth']], function () {
    //    Route::post('test', [TestController::class, 'test']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
