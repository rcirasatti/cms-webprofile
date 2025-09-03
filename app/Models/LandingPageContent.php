<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LandingPageContent extends Model
{
    protected $fillable = [
        'section',
        'key',
        'value',
        'metadata',
        'order',
        'is_active'
    ];

    protected $casts = [
        'metadata' => 'array',
        'is_active' => 'boolean'
    ];

    // Scope untuk mendapatkan content berdasarkan section
    public function scopeBySection($query, $section)
    {
        return $query->where('section', $section);
    }

    // Scope untuk content yang aktif
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope untuk ordering
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }
}
