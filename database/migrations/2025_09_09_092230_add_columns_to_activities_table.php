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
        Schema::table('activities', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->nullable()->after('id');
            $table->string('action')->after('user_id'); // created, updated, deleted
            $table->string('model_type')->after('action'); // App\Models\Portfolio, App\Models\Project, etc.
            $table->unsignedBigInteger('model_id')->after('model_type');
            $table->string('description')->after('model_id');
            $table->json('old_values')->nullable()->after('description'); // for tracking changes
            $table->json('new_values')->nullable()->after('old_values'); // for tracking changes
            $table->string('ip_address')->nullable()->after('new_values');

            $table->index(['model_type', 'model_id']);
            $table->index(['user_id']);
            $table->index(['created_at']);
        });
    }

    public function down(): void
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->dropIndex(['model_type', 'model_id']);
            $table->dropIndex(['user_id']);
            $table->dropIndex(['created_at']);

            $table->dropColumn([
                'user_id',
                'action',
                'model_type',
                'model_id',
                'description',
                'old_values',
                'new_values',
                'ip_address'
            ]);
        });
    }
};
