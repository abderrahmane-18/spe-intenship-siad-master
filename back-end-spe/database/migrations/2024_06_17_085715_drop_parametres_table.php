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
        Schema::dropIfExists('parametres');

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('parametres', function (Blueprint $table) {
            $table->id();
            $table->string('part_name'); // P1, P2, P3, P4
            $table->float('speed_h'); // Horizontal speed
            $table->float('speed_v'); // Vertical speed
            $table->float('speed_a'); // Axial speed
            $table->unsignedBigInteger('controle_id');
            $table->foreign('controle_id')->references('id')->on('controles')->onDelete('cascade');

            $table->timestamps();
        });
    }
};