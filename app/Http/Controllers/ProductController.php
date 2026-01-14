<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Products/Index');
    }

    public function create()
    {
        return Inertia::render('Products/Create');
    }
}
