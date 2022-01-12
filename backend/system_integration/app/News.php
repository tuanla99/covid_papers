<?php

namespace App;

use Elasticquent\ElasticquentTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    /**
     * Elasticquent trait
     */
    use ElasticquentTrait;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'news';

    /**
     * $fillable
     *
     * @var array{int: id, string: url, string: title, string: author, string: abstract}
     */
    protected $fillable = [
        'id',
        'url',
        'title',
        'author',
        'abstract'
    ];

    protected $mappingProperties = [
        'title' => [
            'type' => 'text',
            "analyzer" => "standard",
        ],
        'author' => [
          'type' => 'text',
          "analyzer" => "standard",
        ],
        'abstract' => [
          'type' => 'text',
          "analyzer" => "standard",
        ],
    ];

    /**
     * Get similar news
     */
    public function similars()
    {
        return $this->belongsToMany(News::class, 'similar_news', 'news_id', 'similar_id');
    }
}
