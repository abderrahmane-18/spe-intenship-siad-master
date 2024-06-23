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
            $table->double('value_horizental');
            $table->double('value_vertical');
            $table->double('value_axial');
            $table->unsignedBigInteger('planification_id');

            $table->foreign('planification_id')->references('id')->on('planifications')->onDelete('cascade');

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