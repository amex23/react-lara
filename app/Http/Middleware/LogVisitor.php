<?php

// app/Http/Middleware/LogVisitor.php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\VisitorLog;
use Illuminate\Support\Facades\Http;

class LogVisitor
{
    public function handle(Request $request, Closure $next)
    {
        // Only log web page visits, skip API/asset calls
        if (!$request->isMethod('GET') || $request->is('api/*')) {
            return $next($request);
        }

        $ip = $request->ip();

        // Skip localhost
        if (in_array($ip, ['127.0.0.1', '::1'])) {
            return $next($request);
        }

        try {
            $geo = Http::timeout(3)->get("http://ip-api.com/json/{$ip}")->json();

            VisitorLog::create([
                'ip'       => $ip,
                'country'  => $geo['country']     ?? null,
                'region'   => $geo['regionName']  ?? null,
                'city'     => $geo['city']         ?? null,
                'isp'      => $geo['isp']          ?? null,
                'lat'      => $geo['lat']          ?? null,
                'lon'      => $geo['lon']          ?? null,
                'timezone' => $geo['timezone']     ?? null,
                'url'      => $request->fullUrl(),
            ]);
        } catch (\Exception $e) {
            // Silently fail — never break the page for a failed geo lookup
        }

        return $next($request);
    }
}
