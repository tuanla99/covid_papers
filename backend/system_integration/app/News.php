<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'news';

    /**
     * Get similar news
     */
    public function similars()
    {
        return $this->belongsToMany(News::class, 'similar_news', 'news_id', 'similar_id');
    }
}
