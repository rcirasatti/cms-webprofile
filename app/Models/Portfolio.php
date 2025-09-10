<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image_path',
        'category',
        'is_active',
        'order',
        'tags',
        'features'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
        'tags' => 'array',
        'features' => 'array'
    ];

    // Scope untuk portfolio yang aktif
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope untuk mengurutkan berdasarkan order
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }
}
