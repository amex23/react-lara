<?php
 
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
 
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('shopify_webhook_secret')->nullable()->after('shopify_customer_id');
            $table->string('woocommerce_webhook_secret')->nullable()->after('shopify_webhook_secret');
            $table->string('store_platform')->nullable()->after('woocommerce_webhook_secret'); // 'shopify' | 'woocommerce' | null
        });
    }
 
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'shopify_webhook_secret',
                'woocommerce_webhook_secret',
                'store_platform',
            ]);
        });
    }
};