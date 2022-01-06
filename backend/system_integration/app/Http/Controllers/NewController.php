<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use App\News;
use App\Services\IBaseService;
use Illuminate\Http\Request;

class NewController extends Controller
{
    private $newsService;

    public function __construct(IBaseService $newsService) {
        $this->newsService = $newsService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return (new NewsCollection($this->newsService->getAll()))
        ->response()
        ->setStatusCode(200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $new_id
     * @return \Illuminate\Http\Response
     */
    public function show($new_id)
    {
        return (new NewsCollection($this->newsService->getById($new_id)))
        ->response()
        ->setStatusCode(200);
    }
}
