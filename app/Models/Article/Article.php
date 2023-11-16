<?php

namespace App\Models\Article;

use App\Models\Keyword\Keyword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function keywords()
    {
        return $this->belongsToMany(Keyword::class, "article_keywords", "article_id", "keyword_id");
    }
}
