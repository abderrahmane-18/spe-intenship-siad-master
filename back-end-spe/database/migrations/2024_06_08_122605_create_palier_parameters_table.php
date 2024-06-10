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
        Schema::create('palier_parameters', function (Blueprint $table) {
            $table->id();
            $table->string('palier_name');
            $table->string('parameter_name');
            $table->float('value_horizental');
            $table->float('value_vertical');
            $table->float('value_axial');
            $table->foreignId('planification_id')->constrained('planifications')->onDelete('cascade');

            $table->unique(['palier_name', 'parameter_name', 'planification_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('palier_parameters');
    }
};
