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
        Schema::create('planifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('controle_id');
            $table->date('date_planified');
            $table->date('date_planned');
            $table->date('date_realized');
            $table->unique(['controle_id', 'date_planned']);
            $table->foreign('controle_id')->references('id')->on('controles')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('planifications');
    }
};
