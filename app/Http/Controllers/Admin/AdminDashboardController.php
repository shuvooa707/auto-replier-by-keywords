<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::with(["keywords"])->get();
        return Inertia::render('Admin/DashboardPage',[
            "articles" => $articles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Article/CreateArticlePage', [
            "_token" => csrf_token()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $title = $request->get("title");
        $description = $request->get("description");
        $body = $request->get("body");

        $article = Article::create([
            "title" => $title,
            "description" => $description,
            "body" => $body
        ]);

        return [ "msg" => "success" ];
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $article = Article::with(["keywords"])->find($id);
        return Inertia::render('Admin/Article/ShowArticlePage', [
            "article" => $article,
            "_token" => csrf_token()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $id = $request->get("id");
        $article = Article::find($id);
        if ($article) {
            $article->delete();
            return [ "msg" => "success" ];
        }
        return [ "msg" => "failed" ];
    }
}
