<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\VerifyController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Asker\ResponderController;
use App\Http\Controllers\Asker\SurveyController;
use App\Http\Controllers\Asker\ProfileController;

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
        Route::post('profile/save', [ProfileController::class, 'saveProfile']);
        Route::post('company/save', [ProfileController::class, 'saveCompany']);
        Route::get('responders/getlist', [ResponderController::class, 'getRespondersList']);
        Route::post('responders/getListCandidats', [ResponderController::class, 'getListCandidats']);
        Route::post('responders/getListParticipants', [ResponderController::class, 'getListParticipants']);
        Route::get('responders/{id}', [ResponderController::class, 'getResponder']);
        Route::get('responders/delete/{id}', [ResponderController::class, 'removeResponder']);
        Route::post('responders/save', [ResponderController::class, 'saveResponder']);
        Route::post('responders/saveParticipants', [ResponderController::class, 'saveParticipants']);
        Route::post('survey/getlist', [SurveyController::class, 'getlist']);
        Route::post('survey/add', [SurveyController::class, 'add']);
        Route::post('survey/edit', [SurveyController::class, 'edit']);
        Route::post('survey/delete', [SurveyController::class, 'delete']);
        Route::get('getSurvey/{id}', [SurveyController::class, 'getSurvey']);

    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
