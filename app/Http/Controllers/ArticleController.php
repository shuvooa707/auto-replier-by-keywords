<?php

namespace App\Http\Controllers;

use App\Models\Article\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::all();
        return Inertia::render('Dashboard', [
            "_token" => csrf_token(),
            "articles" => $articles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $article = Article::with(["keywords"])->find($id);
        return Inertia::render('Article/ShowArticlePage', [
            "article" => $article,
            "_token" => csrf_token()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        //
    }


    public function search(Request $request)
    {
        $query = $request->get("query");
        $keywords = explode(" ", $query);

        DB::enableQueryLog();
        $articleQeuryBuilder = Article::with(["keywords"])->where("title", );

        for ($i = 0; $i < count($keywords); $i++) {
            $articleQeuryBuilder->orWhere("title", 'like', '%' . $keywords[$i] . '%');
            $articleQeuryBuilder->orWhere("description", 'like', '%' . $keywords[$i] . '%');
            $articleQeuryBuilder->orWhere("body", 'like', '%' . $keywords[$i] . '%');
        }
        sleep(1);
        return [
            "msg" => "success",
            "articles" => $articleQeuryBuilder->get()
        ];
        return DB::getQueryLog();
    }
}
