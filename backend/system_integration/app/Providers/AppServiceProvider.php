<?php

namespace App\Providers;

use App\Services\IBaseService;
use App\Services\NewsServiceIml;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * All of the container singletons that should be registered.
     *
     * @var array
     */
    public $singletons = [
        IBaseService::class => NewsServiceIml::class,
    ];
}
