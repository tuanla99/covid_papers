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
    return News::paginate();
  }
}