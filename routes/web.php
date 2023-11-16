<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route("login");
});

Route::group([ "prefix" => "admin", "middleware" => [ "auth", "admin" ] ], function (){
    Route::get('/dashboard', [\App\Http\Controllers\Admin\AdminDashboardController::class, "index"])->name("admin.dashboard");
    Route::get('/article/create', [\App\Http\Controllers\Admin\AdminDashboardController::class, "create"])->name("admin.article.create");
    Route::post('/article/store', [\App\Http\Controllers\Admin\AdminDashboardController::class, "store"])->name("admin.article.store");
    Route::get('/article/{id}', [\App\Http\Controllers\Admin\AdminDashboardController::class, "show"])->name("admin.article.show");
    Route::post('/article/delete', [\App\Http\Controllers\Admin\AdminDashboardController::class, "destroy"])->name("admin.article.destroy");
});


Route::group([ "middleware" => [ "auth" ] ], function (){
    Route::get('/dashboard', [ArticleController::class, "index"])->name('dashboard');
    Route::get('/article/{id}', [ArticleController::class, "show"])->name("article.show");
    Route::post('/article/search', [ArticleController::class, "search"])->name("article.search");

});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
