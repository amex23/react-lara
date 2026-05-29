<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'user_type',
        'store_name',
        'price',
        'currency',
        'description',
        'image1','image2','image3','image4','image5','image6',
        'subscription',
        'shopify_customer_id',
        'shopify_webhook_secret',
        'woocommerce_webhook_secret',
        'store_platform',
        'profile_views',
        'profile_checkouts',
        'checkout_url1', 'checkout_url2', 'checkout_url3',
        'checkout_url4', 'checkout_url5', 'checkout_url6',
        'default_checkout_url',
        // Lemon Squeezy
        'ls_subscription_id',
        'ls_customer_id',
        'ls_variant_id',
        'ls_status',
        'ls_renews_at',
        'ls_ends_at',
    ];

    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
        'shopify_webhook_secret',       // never expose to frontend
        'woocommerce_webhook_secret',    // never expose to frontend
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at'      => 'datetime',
            'password'               => 'hashed',
            'two_factor_confirmed_at'=> 'datetime',
            'ls_renews_at'           => 'datetime',
            'ls_ends_at'             => 'datetime',
        ];
    }
}