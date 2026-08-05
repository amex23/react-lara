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
            $table->string('plan', 20)->default('basic')->after('subscription');
            $table->unsignedTinyInteger('display_count')->default(6)->after('plan');

            $table->string('image7')->nullable()->after('image6');
            $table->string('image8')->nullable()->after('image7');
            $table->string('image9')->nullable()->after('image8');
            $table->string('image10')->nullable()->after('image9');
            $table->string('image11')->nullable()->after('image10');
            $table->string('image12')->nullable()->after('image11');

            $table->string('checkout_url7', 500)->nullable()->after('checkout_url6');
            $table->string('checkout_url8', 500)->nullable()->after('checkout_url7');
            $table->string('checkout_url9', 500)->nullable()->after('checkout_url8');
            $table->string('checkout_url10', 500)->nullable()->after('checkout_url9');
            $table->string('checkout_url11', 500)->nullable()->after('checkout_url10');
            $table->string('checkout_url12', 500)->nullable()->after('checkout_url11');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'plan', 'display_count',
                'image7', 'image8', 'image9', 'image10', 'image11', 'image12',
                'checkout_url7', 'checkout_url8', 'checkout_url9',
                'checkout_url10', 'checkout_url11', 'checkout_url12',
            ]);
        });
    }
};
