<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCascadeToControlesForeignKeys extends Migration
{
    public function up()
    {
        Schema::table('controles', function (Blueprint $table) {
            // Drop the existing foreign key constraints
            $table->dropForeign(['id_categorie']);
            $table->dropForeign(['number_group']);

            // Add the foreign key constraints with cascade on delete
            $table->foreign('id_categorie')
                ->references('id')
                ->on('categories')
                ->onDelete('cascade');

            $table->foreign('number_group')
                ->references('id')
                ->on('groupes')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('controles', function (Blueprint $table) {
            // Drop the foreign key constraints with cascade on delete
            $table->dropForeign(['id_categorie']);
            $table->dropForeign(['number_group']);

            // Add the original foreign key constraints
            $table->foreign('id_categorie')
                ->references('id')
                ->on('categories');

            $table->foreign('number_group')
                ->references('id')
                ->on('groupes');
        });
    }
}