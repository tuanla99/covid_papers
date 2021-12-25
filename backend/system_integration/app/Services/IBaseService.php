<?php

namespace App\Services;

interface IBaseService
{
    public function getById($id);
    public function getAll();
}
