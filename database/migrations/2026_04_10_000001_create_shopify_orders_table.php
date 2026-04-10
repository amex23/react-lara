<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('shopify_orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->index();
            $table->string('shopify_order_id')->unique();
            $table->string('customer_name')->nullable();
            $table->string('customer_email')->nullable();
            $table->decimal('total_price', 10, 2)->default(0);
            $table->json('line_items')->nullable();
            $table->text('landing_site')->nullable();
            $table->timestamp('ordered_at')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('shopify_orders');
    }
};