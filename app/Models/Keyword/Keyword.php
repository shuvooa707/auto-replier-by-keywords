<?php

namespace App\Models\Keyword;

use App\Models\Article\Article;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Keyword extends Model
{
    use HasFactory;


    public function articles()
    {
        return $this->belongsToMany(Article::class, "article_keywords", "keyword_id", "article_id");
    }
}
