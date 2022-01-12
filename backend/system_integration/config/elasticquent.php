<?php

return array(

    /*
    |--------------------------------------------------------------------------
    | Custom Elasticsearch Client Configuration
    |--------------------------------------------------------------------------
    |
    | This array will be passed to the Elasticsearch client.
    | See configuration options here:
    |
    | http://www.elasticsearch.org/guide/en/elasticsearch/client/php-api/current/_configuration.html
    */

    'config' => [
        'hosts' => ['https://elastic:vFNZqBVuV6N6H4FbU9Joxvo5@covid-papers.es.us-east4.gcp.elastic-cloud.com:9243'],
        
        'retries'   => 1,
    ],

    /*
    |--------------------------------------------------------------------------
    | Default Index Name
    |--------------------------------------------------------------------------
    |
    | This is the index name that Elasticquent will use for all
    | Elasticquent models.
    */

    'default_index' => env('ELASTICSEARCH_INDEX', 'news'),

);
