<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('profile_events', function (Blueprint $table) {
            $table->unsignedTinyInteger('image_index')->nullable()->after('type');
        });
    }

    public function down(): void
    {
        Schema::table('profile_events', function (Blueprint $table) {
            $table->dropColumn('image_index');
        });
    }
};