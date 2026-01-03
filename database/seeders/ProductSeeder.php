<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 20 products using the factory
        Product::factory()
            ->count(20)
            ->create();

        // Or manually create specific products with guaranteed data
        Product::create([
            'name' => 'Premium Wireless Headphones',
            'description' => 'High-quality sound with active noise cancellation',
            'price' => 149.99,
            'stock' => 15,
            'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'name' => 'Ultra-thin Laptop Stand',
            'description' => 'Ergonomic aluminum stand for better posture',
            'price' => 49.99,
            'stock' => 25,
            'image' => 'https://images.unsplash.com/photo-1572365992253-3cb3e56dd362?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'name' => 'Mechanical Keyboard RGB',
            'description' => 'Professional mechanical keyboard with RGB lighting',
            'price' => 129.99,
            'stock' => 20,
            'image' => 'https://images.unsplash.com/photo-1587829191301-7d4c02ef5410?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'name' => 'Wireless Mouse Pro',
            'description' => 'Precision mouse with 10-hour battery life',
            'price' => 59.99,
            'stock' => 0,
            'image' => 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'name' => '4K Webcam',
            'description' => 'Crystal clear 4K video for streaming and calls',
            'price' => 199.99,
            'stock' => 8,
            'image' => 'https://images.unsplash.com/photo-1598986646514-8982f1b50eae?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'name' => 'USB-C Hub 7-in-1',
            'description' => 'Multi-port USB-C hub for maximum connectivity',
            'price' => 79.99,
            'stock' => 30,
            'image' => 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'name' => 'Monitor Light Bar',
            'description' => 'Smart lighting for better display visibility',
            'price' => 89.99,
            'stock' => 12,
            'image' => 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'name' => 'Desk Organizer Set',
            'description' => 'Premium desk organization solution',
            'price' => 39.99,
            'stock' => 40,
            'image' => 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'name' => 'Ergonomic Office Chair',
            'description' => 'Comfortable seating for long work sessions',
            'price' => 299.99,
            'stock' => 5,
            'image' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'name' => 'Portable Phone Charger',
            'description' => 'Fast charging on the go with 20000mAh capacity',
            'price' => 29.99,
            'stock' => 50,
            'image' => 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'name' => 'Wireless Charging Pad',
            'description' => 'Fast wireless charging for compatible devices',
            'price' => 34.99,
            'stock' => 18,
            'image' => 'https://images.unsplash.com/photo-1591290621236-d79e63694ba2?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'name' => 'HD Monitor 27 inch',
            'description' => 'Stunning 4K display quality with HDR support',
            'price' => 349.99,
            'stock' => 7,
            'image' => 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
        ]);
    }
}
