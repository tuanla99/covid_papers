<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use App\Http\Resources\NewsResource;
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
        return $this->newsService->getAll();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $new_id
     * @return \Illuminate\Http\Response
     */
    public function show($new_id)
    {
        return response()->json($this->newsService->getById($new_id));
    }

    public function getNewsByCategory($category)
    {
        return response()->json($this->newsService->getNewsByCategory($category));
    }

    /**
     * search newspapers
     *
     * @param   Request  $request
     *
     * @return  NewsCollection           newspapers
     */
    public function search(Request $request)
    {
        return response()->json($this->newsService->search($request));
    }

    public function addAllToIndex()
    {
        return($this->newsService->addAllToIndex())
        ->response()
        ->setStatusCode(200);
    }

    public function createIndex()
    {
        return($this->newsService->createIndex())
        ->response()
        ->setStatusCode(200);
    }
}
