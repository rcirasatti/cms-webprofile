# CMS Landing Page - Panduan Penggunaan

## Masalah yang Telah Diperbaiki

Sebelumnya, sistem CMS tidak berfungsi dengan baik karena:
1. Landing page tidak mengambil data dari database
2. Data diambil dari API terpisah yang tidak terintegrasi
3. Komponen React tidak menerima data dinamis dari server

## Solusi yang Diterapkan

### 1. Perubahan pada Route Web (routes/web.php)
```php
Route::get('/', function () {
    $sections = ['hero', 'about', 'project', 'portfolio', 'client', 'contact', 'navbar', 'footer'];
    $content = [];

    foreach ($sections as $section) {
        $content[$section] = \App\Models\LandingPageContent::bySection($section)
            ->active()
            ->ordered()
            ->get()
            ->map(function ($item) {
                return [
                    'key' => $item->key,
                    'value' => $item->value,
                    'metadata' => $item->metadata,
                    'order' => $item->order
                ];
            });
    }

    return Inertia::render('LandingPage', [
        'content' => $content
    ]);
});
```

### 2. Update Komponen React
Semua komponen section sudah diupdate untuk menerima dan menggunakan data dari props:

- **HeroSection**: Menggunakan title, subtitle, button_text dari database
- **AboutSection**: Menggunakan title, description, image dari database  
- **ContactSection**: Menggunakan title, email, phone, address dari database
- **Navbar**: Menggunakan logo_text, logo_image dari database
- **Footer**: Menggunakan copyright, social links dari database
- **ProjectsSection**: Menggunakan title dari database
- **PortfolioSection**: Menggunakan title dari database
- **ClientsSection**: Menggunakan title dari database

### 3. Helper Function
Setiap komponen menggunakan helper function untuk mengambil data:
```javascript
const getContentValue = (key, defaultValue = '') => {
    const item = content.find(item => item.key === key);
    return item ? item.value : defaultValue;
};
```

## Cara Menggunakan CMS

### 1. Akses CMS
- Login ke sistem: `http://localhost:8000/login`
- Akses CMS: `http://localhost:8000/cms/sections`

### 2. Edit Konten per Section
- Hero Section: `http://localhost:8000/cms/hero`
- About Section: `http://localhost:8000/cms/about`
- Project Section: `http://localhost:8000/cms/project` 
- Portfolio Section: `http://localhost:8000/cms/portfolio`
- Client Section: `http://localhost:8000/cms/client`
- Contact Section: `http://localhost:8000/cms/contact`
- Navbar: `http://localhost:8000/cms/navbar`
- Footer: `http://localhost:8000/cms/footer`

### 3. Preview Changes
- Setelah mengedit konten, buka: `http://localhost:8000/`
- Perubahan akan langsung terlihat di landing page

## Struktur Database

Tabel `landing_page_contents` memiliki struktur:
- `section`: Nama section (hero, about, contact, dll)
- `key`: Kunci/identifier untuk data (title, subtitle, email, dll)
- `value`: Nilai/konten yang akan ditampilkan
- `metadata`: Data tambahan (format JSON)
- `order`: Urutan tampil
- `is_active`: Status aktif/tidak

## Testing

Untuk testing apakah sistem berfungsi:

1. **Cek data di database:**
```bash
php artisan check:content
```

2. **Update data manual (untuk testing):**
```bash
php artisan tinker --execute="App\Models\LandingPageContent::where('section', 'hero')->where('key', 'title')->update(['value' => 'JUDUL BARU']); echo 'Updated!';"
```

3. **Refresh landing page** dan lihat perubahannya

## Keunggulan Sistem Ini

1. **Real-time Updates**: Perubahan di CMS langsung terlihat di landing page
2. **Modular**: Setiap section dapat diedit terpisah
3. **Flexible**: Mudah menambah konten baru atau field baru
4. **User-friendly**: Interface CMS yang mudah digunakan
5. **SEO-friendly**: Data server-side rendering untuk SEO yang baik

## Troubleshooting

### Jika perubahan tidak muncul:
1. Pastikan data tersimpan di database dengan `php artisan check:content`
2. Clear cache browser (Ctrl+F5)
3. Restart Laravel server jika perlu
4. Build ulang assets dengan `npm run build`

### Jika ada error:
1. Cek log Laravel di `storage/logs/laravel.log`
2. Pastikan semua migration sudah dijalankan
3. Pastikan model dan controller sudah benar
