<?php

namespace App\Services;

use App\News;

class NewsServiceIml implements IBaseService
{

  public function getById($id)
  {
    $news = News::find($id);
    if ($news) {
      $similarNews = $news->similars()->orderByDesc('created_at')->limit(10)->get()->toArray();
      $news->similars = $similarNews;
    }

    return $news;
  }

  public function getAll()
  {
    return News::orderByDesc('created_at')->paginate(10);
  }
  public function createIndex()
  {
    return News::createIndex($shards = null, $replicas = null);
  }

  public function addAllToIndex()
  {
    return News::addAllToIndex();
  }

  public function search($request)
  {
    $searchText = $request->query('q');
    $perPage = $request->query('per') ?? 10;
    $offset = (($request->query('page') ?? 1) - 1) * $perPage;

    $params = [
      'index' => 'news',
      'body' => [
        'from' => $offset,
        'size' => $perPage,
        'query' => [
          'multi_match' => [
            'query' => $searchText,
            'fields' => ['title', 'author', 'abstract'],
            'fuzziness' => 'AUTO',
          ]
          ],
          'highlight' => [
            'fields' => [
              'title' => ['type' => 'plain'], 'author' => ['type' => 'plain'], 'abstract' => ['type' => 'plain']
            ]
          ]
      ]
    ];

    $result = News::complexSearch($params);

    return $result->getHits();
  }

  public function getNewsByCategory($category)
  {
    $query = News::where('category', $category)->orderByDesc('created_at')->paginate(10);

    return $query->toArray();
  }
}