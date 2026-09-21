<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * One optional thumbnail per media slot. The thumbnail is a separate file
     * from image{N} — image{N} stays exactly as it is.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            for ($i = 1; $i <= 12; $i++) {
                $table->string("thumb{$i}")->nullable()->after("image{$i}");
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'thumb1', 'thumb2', 'thumb3', 'thumb4', 'thumb5', 'thumb6',
                'thumb7', 'thumb8', 'thumb9', 'thumb10', 'thumb11', 'thumb12',
            ]);
        });
    }
};