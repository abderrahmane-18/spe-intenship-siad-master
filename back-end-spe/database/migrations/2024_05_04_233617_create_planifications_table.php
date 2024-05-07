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
            $table->unsignedBigInteger('controle_id');
            $table->date('date');
            $table->primary(['controle_id', 'date']);
            $table->timestamps();
            $table->foreign('controle_id')->references('id')->on('controles');
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
