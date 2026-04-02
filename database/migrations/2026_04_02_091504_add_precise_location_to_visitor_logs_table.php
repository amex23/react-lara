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
        Schema::table('visitor_logs', function (Blueprint $table) {
            $table->decimal('precise_lat', 10, 7)->nullable()->after('lon');
            $table->decimal('precise_lon', 10, 7)->nullable()->after('precise_lat');
            $table->integer('precise_accuracy')->nullable()->after('precise_lon');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('visitor_logs', function (Blueprint $table) {
            //
        });
    }
};
