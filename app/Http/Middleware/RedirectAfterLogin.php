<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectAfterLogin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only modify redirects that go to the default dashboard/home after login
        if ($response->isRedirect() && (
            str_contains($response->headers->get('Location'), '/dashboard') ||
            str_contains($response->headers->get('Location'), '/home')
        )) {
            $user = $request->user();

            if ($user) {
                // Normal users → /products
                // Admins → /dashboard (or change to whatever you want)
                $redirectTo = $user->user_type === 'admin' ? '/dashboard' : '/dashboard';
                return redirect($redirectTo);
            }
        }

        return $response;
    }
}