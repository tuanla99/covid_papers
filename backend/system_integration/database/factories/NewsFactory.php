<?php

namespace Database\Factories;

use App\News;
use Illuminate\Database\Eloquent\Factories\Factory;

class NewsFactory extends Factory
{
        /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = News::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'url' => 'https://arxiv.org/pdf/1904.06690.pdf',
            'title' => $this->faker->text(100),
            'author' => $this->faker->userName(),
            'abstract' => $this->faker->text(500)
        ];
    }
}
