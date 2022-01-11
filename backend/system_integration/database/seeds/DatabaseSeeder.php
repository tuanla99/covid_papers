<?php


use App\News;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $news = News::factory()
                ->count(50)
                ->create();
        foreach($news as $newspaper) {
            for($i=0; $i<10; $i++) {
                DB::table('similar_news')->insert([
                    'news_id' => $newspaper->id,
                    'similar_id' => rand(1, 49),
                    'created_at' => Carbon::now()
                ]);
            }
        }
    }
}
