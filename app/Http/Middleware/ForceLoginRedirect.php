<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ForceLoginRedirect
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only modify successful login redirects (302 to dashboard/home)
        if ($response->isRedirect() && (
            str_contains($response->headers->get('Location'), '/dashboard') ||
            str_contains($response->headers->get('Location'), '/home')
        )) {
            return redirect('/products');
        }

        return $response;
    }
}