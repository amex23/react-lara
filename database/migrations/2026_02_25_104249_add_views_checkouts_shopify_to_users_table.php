<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'shopify_customer_id')) {
                $table->string('shopify_customer_id')->nullable()->after('id');
            }
            if (!Schema::hasColumn('users', 'profile_views')) {
                $table->unsignedBigInteger('profile_views')->default(0)->after('shopify_customer_id');
            }
            if (!Schema::hasColumn('users', 'profile_checkouts')) {
                $table->unsignedBigInteger('profile_checkouts')->default(0)->after('profile_views');
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(array_filter([
                Schema::hasColumn('users', 'shopify_customer_id') ? 'shopify_customer_id' : null,
                Schema::hasColumn('users', 'profile_views') ? 'profile_views' : null,
                Schema::hasColumn('users', 'profile_checkouts') ? 'profile_checkouts' : null,
            ]));
        });
    }
    
};
