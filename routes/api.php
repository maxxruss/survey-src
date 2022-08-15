<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\VerifyController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Asker\AskerMainController;
use App\Http\Controllers\Asker\SurveyController;

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
Route::post('verify', [VerifyController::class, 'verifyEmail']);

Route::group(['middleware' => ['auth']], function () {
    Route::group(['prefix' => 'asker'], function () {
        Route::post('saveProfile', [AskerMainController::class, 'saveProfile']);
        Route::post('saveCompany', [AskerMainController::class, 'saveCompany']);
        Route::post('getlist', [SurveyController::class, 'getlist']);
        Route::post('survey/add', [SurveyController::class, 'add']);
        Route::post('survey/edit', [SurveyController::class, 'edit']);
        Route::post('survey/delete', [SurveyController::class, 'delete']);
        Route::get('getSurvey/{id}', [SurveyController::class, 'getSurvey']);
    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
