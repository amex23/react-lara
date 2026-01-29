<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Only drop columns that exist to avoid errors
            $columnsToDrop = [
                'price',
                'description',
                'subscription',
                'image1',
                'image2',
                'image3',
                'image4',
                'image5',
                'image6',
            ];

            foreach ($columnsToDrop as $column) {
                if (Schema::hasColumn('products', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }

    public function down(): void
    {
        // Optional: you can recreate columns here if you ever need to rollback
        // But usually left empty for cleanup migrations
    }
};