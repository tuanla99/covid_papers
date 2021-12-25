<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NewsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'url' => $this->url,
            'title' => $this->title,
            'author' => $this->author,
            'abstract' => $this->abstract,
            'similar_news' => NewsResource::collection($this->similars),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
