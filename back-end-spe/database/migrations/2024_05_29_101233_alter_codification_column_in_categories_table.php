<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        /*
        Schema::table('categories', function (Blueprint $table) {
            DB::statement('ALTER TABLE categories ALTER COLUMN codification TYPE INTEGER USING codification::integer');
        });
        */
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        /*
        Schema::table('categories', function (Blueprint $table) {
            DB::statement('ALTER TABLE categories ALTER COLUMN codification TYPE TEXT');
        });
        */
    }
};