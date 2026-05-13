<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('ls_subscription_id')->nullable()->after('subscription');
            $table->string('ls_customer_id')->nullable()->after('ls_subscription_id');
            $table->string('ls_variant_id')->nullable()->after('ls_customer_id');
            $table->string('ls_status')->nullable()->after('ls_variant_id');
            $table->timestamp('ls_renews_at')->nullable()->after('ls_status');
            $table->timestamp('ls_ends_at')->nullable()->after('ls_renews_at');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'ls_subscription_id',
                'ls_customer_id',
                'ls_variant_id',
                'ls_status',
                'ls_renews_at',
                'ls_ends_at',
            ]);
        });
    }
};