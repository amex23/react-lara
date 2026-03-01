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
            $table->string('shopify_customer_id')->nullable()->after('id');
            $table->unsignedBigInteger('profile_views')->default(0)->after('shopify_customer_id');
            $table->unsignedBigInteger('profile_checkouts')->default(0)->after('profile_views');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['shopify_customer_id', 'profile_views', 'profile_checkouts']);
        });
    }
    
};
