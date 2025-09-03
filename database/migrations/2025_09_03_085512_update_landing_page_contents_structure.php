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
        Schema::table('landing_page_contents', function (Blueprint $table) {
            $table->string('section')->after('id'); // hero, about, project, portfolio, client, contact, navbar, footer
            $table->string('key')->after('section'); // title, subtitle, description, etc
            $table->text('value')->after('key'); // actual content
            $table->text('metadata')->nullable()->after('value'); // JSON for additional data like images, links
            $table->integer('order')->default(0)->after('metadata'); // for ordering items
            $table->boolean('is_active')->default(true)->after('order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('landing_page_contents', function (Blueprint $table) {
            $table->dropColumn(['section', 'key', 'value', 'metadata', 'order', 'is_active']);
        });
    }
};
