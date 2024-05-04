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
        Schema::create('controles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_categorie');
            $table->unsignedBigInteger('number_group');
            $table->string('number_equip');
            $table->unique(['id_categorie', 'number_group', 'number_equip']);
            $table->timestamps();

            $table->foreign('id_categorie')->references('id')->on('category_equipments');
            $table->foreign('number_group')->references('id')->on('groupes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('controles');
    }
};
