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
    public function up()
    {
        // Update the column type using a raw SQL query
        DB::statement('ALTER TABLE controles ALTER COLUMN number_equip TYPE integer USING number_equip::integer');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Revert the column type back to string
        DB::statement('ALTER TABLE controles ALTER COLUMN number_equip TYPE varchar USING number_equip::varchar');
    }
};