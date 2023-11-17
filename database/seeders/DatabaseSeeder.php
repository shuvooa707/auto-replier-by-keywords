<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Article\Article;
use App\Models\Keyword\Keyword;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        try {
            User::create([
                'name' => fake()->name(),
                'email' => "a@a.a",
                'email_verified_at' => now(),
                'role' => "Admin",
                'password' => Hash::make("a@a.a"),
                'remember_token' => Str::random(10),
            ]);
            Keyword::factory(20)->create();
            Article::factory(100)->create();

            $keywordIds = Keyword::all("id")->toArray();
            $articles = Article::all();
        } catch (\Exception $exception) {

        }
    }
}
