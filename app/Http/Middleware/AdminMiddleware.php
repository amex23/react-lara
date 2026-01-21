<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // If not logged in, redirect to login
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        // If user_type is not admin, redirect to dashboard
        if (Auth::user()->user_type !== 'admin') {
            return redirect()->route('dashboard');
        }

        return $next($request);
    }
}
