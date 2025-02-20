<?php

namespace Database\Factories;

use App\Models\Listing;
use Illuminate\Database\Eloquent\Factories\Factory;

class ListingFactory extends Factory
{
    protected $model = Listing::class;

    public function definition()
    {
        return [
            'beds' => $this->faker->numberBetween(1, 5),
            'baths' => $this->faker->numberBetween(1, 3),
            'area' => $this->faker->numberBetween(50, 200),
            'city' => $this->faker->city,
         'code' => $this->faker->regexify('[A-Z]{2}[0-9]{1,2}\s[0-9][A-Z]{2}'),
            'street' => $this->faker->streetName,
            'street_nr' => $this->faker->buildingNumber,
            'price' => $this->faker->numberBetween(100000, 1000000),
            
        ];
    }
}
