<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/budget/get-all', 'App\Http\Controllers\BudgetsController@getAllBudgets');
Route::post('/budget/create', 'App\Http\Controllers\BudgetsController@createBudgets');

Route::get('/budget-items/get/{budget_id}', 'App\Http\Controllers\BudgetsController@getBudgetItems');
Route::get('/budget-items/details/{budget_id}', 'App\Http\Controllers\BudgetsController@getBudgetDetails');
Route::post('/budget-items/create', 'App\Http\Controllers\BudgetsController@createBudgetItems');
