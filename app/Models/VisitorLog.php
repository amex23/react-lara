<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// app/Models/VisitorLog.php
class VisitorLog extends Model
{
    protected $fillable = [
        'ip', 'country', 'region', 'city',
        'isp', 'lat', 'lon', 'timezone', 'url',
        'precise_lat', 'precise_lon', 'precise_accuracy',
    ];
}
