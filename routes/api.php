<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\VerifyController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Asker\AskerMainController;

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
        Route::post('getSurveys', [AskerMainController::class, 'getSurveys']);
        Route::post('survey/add', [AskerMainController::class, 'addSurvey']);
        Route::post('survey/edit', [AskerMainController::class, 'editSurvey']);
        Route::post('deleteSurvey', [AskerMainController::class, 'deleteSurvey']);
        Route::get('getSurvey/{id}', [AskerMainController::class, 'getSurvey']);
    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
