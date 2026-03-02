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
            $table->string('checkout_url1')->nullable()->after('image1');
            $table->string('checkout_url2')->nullable()->after('image2');
            $table->string('checkout_url3')->nullable()->after('image3');
            $table->string('checkout_url4')->nullable()->after('image4');
            $table->string('checkout_url5')->nullable()->after('image5');
            $table->string('checkout_url6')->nullable()->after('image6');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'checkout_url1','checkout_url2','checkout_url3',
                'checkout_url4','checkout_url5','checkout_url6',
            ]);
        });
    }
};
