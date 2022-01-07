<?php

namespace App\Services;

use App\News;

class NewsServiceIml implements IBaseService
{

  public function getById($id)
  {
    return News::find($id);
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
}