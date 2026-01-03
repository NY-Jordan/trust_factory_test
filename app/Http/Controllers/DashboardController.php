<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function fetch(): Response
    {
        return Inertia::render('dashboard', [
            'products' => Product::all(),
        ]);
    }
}
