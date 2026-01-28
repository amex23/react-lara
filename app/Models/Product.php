<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'price',
        'description',
        'image1',
        'image2',
        'image3',
        'image4',
        'image5',
        'image6',
        'subscription',
    ];
}