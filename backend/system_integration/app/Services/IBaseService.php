<?php

namespace App\Services;

interface IBaseService
{
    public function getById($id);
    public function getAll();
    public function createIndex();
    public function addAllToIndex();
    public function search($request);
    public function getNewsByCategory($category);
}
