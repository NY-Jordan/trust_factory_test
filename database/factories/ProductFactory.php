<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $products = [
            'Premium Wireless Headphones',
            'Ultra-thin Laptop Stand',
            'Mechanical Keyboard RGB',
            'Wireless Mouse Pro',
            '4K Webcam',
            'USB-C Hub 7-in-1',
            'Monitor Light Bar',
            'Desk Organizer Set',
            'Ergonomic Office Chair',
            'Portable Phone Charger',
            'Wireless Charging Pad',
            'HD Monitor 27 inch',
            'Bluetooth Speaker',
            'USB-C Cable Pack',
            'Laptop Backpack',
            'HDMI Cable Premium',
            'Screen Protector Glass',
            'Keyboard Wrist Rest',
            'Monitor Stand Riser',
            'Desk Lamp LED',
        ];

        $descriptions = [
            'High-quality sound with noise cancellation',
            'Ergonomic aluminum laptop stand for better posture',
            'Professional mechanical keyboard with RGB lighting',
            'Precision mouse with 10-hour battery life',
            'Crystal clear 4K video for streaming and calls',
            'Multi-port USB-C hub for maximum connectivity',
            'Smart lighting for better display visibility',
            'Premium desk organization solution',
            'Comfortable seating for long work sessions',
            'Fast charging on the go',
            'Wireless convenience at your desk',
            'Stunning display quality',
            'Rich bass and clear sound',
            'Durable and reliable cables',
            'Spacious and comfortable to carry',
            'Ultra-fast data transfer',
            'Protects your device screen',
            'Reduces wrist strain',
            'Improves monitor viewing angle',
            'Reduces eye strain with adjustable brightness',
        ];

        return [
            'name' => $this->faker->randomElement($products),
            'description' => $this->faker->randomElement($descriptions),
            'price' => $this->faker->randomFloat(2, 19.99, 299.99),
            'stock' => $this->faker->numberBetween(0, 50),
            'image' => $this->faker->randomElement([
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
                'https://images.unsplash.com/photo-1572365992253-3cb3e56dd362?w=500&h=500&fit=crop',
                'https://images.unsplash.com/photo-1587829191301-7d4c02ef5410?w=500&h=500&fit=crop',
                'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
                'https://images.unsplash.com/photo-1598986646514-8982f1b50eae?w=500&h=500&fit=crop',
                'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
                'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=500&h=500&fit=crop',
                'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&h=500&fit=crop',
            ]),
        ];
    }
}
