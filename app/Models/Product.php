<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'user_id',
    ];

    /**
     * Get the user that owns this product / storefront.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Alias: sometimes it's clearer to call it "owner" instead of "user"
     * (especially in views / controllers when dealing with store owners)
     */
    public function owner(): BelongsTo
    {
        return $this->user();
    }

    /**
     * Optional: If you ever want to add a scope for convenience
     * Example usage: Product::ownedBy($user)->get();
     */
    public function scopeOwnedBy($query, $user)
    {
        return $query->where('user_id', $user instanceof User ? $user->id : $user);
    }
}