# Təhlükəsiz bulud yeniləməsi

Layihənin `.env` ünvanı `mhegdrwpqtemmsxemyql.supabase.co`-dur. Audit zamanı qoşulmuş Supabase hesabında bu layihə görünmədiyi üçün canlı bazaya dəyişiklik edilməyib.

## Tətbiq etmək

1. Doğru Supabase layihəsində bazanın ehtiyat nüsxəsini götürün.
2. Mövcud dörd cədvəl varsa `secure_cloud.sql` faylını SQL Editor-da icra edin. Yeni qurulum üçün kökdəki `supabase_schema.sql` həm cədvəlləri, həm təhlükəsiz RPC-ləri yaradır.
3. Köhnə qısa istifadəçi nömrəsi artıq təkbaşına giriş vermir. Hər mövcud aktiv nömrə üçün administrator aşağıdakı funksiyanı icra edir və qaytarılan məxfi açarı yalnız həmin istifadəçiyə verir:

```sql
select public.vocabox_provision_access_key('İSTİFADƏÇİ-NÖMRƏSİ');
```

Yeni nömrə yaradılacaqsa əvvəl `licenses` cədvəlinə administrator tərəfindən əlavə edilməlidir. Açarlara və `service_role` açarına frontend kodunda yer verməyin. Giriş açarı istifadəçinin giriş formasına yazılır; açıq build-ə daxil edilmir.

4. İstifadəçi öz nömrəsi və giriş açarı ilə daxil olur. Tətbiq açarın özünü saxlamır; yalnız 30 günlük, ləğv edilə bilən sessiya tokenini bu cihazda saxlayır. Nömrə + layihə ünvanı üzrə lokal məlumatlar ayrılır. Hesabsız sözlər avtomatik başqa hesaba ötürülmür; köçürmək üçün ehtiyat nüsxə/idxal axını istifadə olunur.
5. İki cihazda şəxsi dəst, kart və irəliləyişi yoxlayın. Köhnə `user_progress`, `custom_decks`, `custom_items` məlumatları ilk sinxronizasiyada qorunan snapshot-a keçirilir.

Miqrasiya ictimai cədvəllərin birbaşa oxunmasını və dəyişdirilməsini bağlayır. Mövcud açıq lisenziya yaratma və hesab silmə funksiyalarının `anon`/`authenticated` icra hüquqları da ləğv edilir. Yeni RPC-lər serverdə sessiyanı yoxlayır; brauzerin göndərdiyi istifadəçi nömrəsinə əsasən başqa hesab seçmək mümkün deyil.

Snapshot yazıları versiya müqayisəsi ilə qorunur. Mətn dəyişiklikləri və silinmələr vaxt qeydləri ilə, irəliləyiş isə son məşq vaxtı ilə birləşdirilir. Eyni vaxtda eyni kartı iki cihazda məşq etdikdə son qeydin qutu səviyyəsi seçilir; bu sistem hər məşq üçün ayrıca hadisə jurnalı saxlamır.

## Yoxlama

`npm test` təmiz lokal PostgreSQL (PGlite) bazasında bütün SQL-i icra edir: təkrar miqrasiya, yanlış/boş açar, bağlı cədvəllər, hesab izolyasiyası, paralel yazı konflikti, hesabın tam silinməsi və tokenin ləğvi yoxlanır. Bu, canlı layihənin deploy/grant konfiqurasiyasının yoxlanmasını əvəz etmir.

`pgcrypto` genişlənməsi `extensions` sxemində olmalıdır (standart Supabase quruluşu). Başqa sxemdə quraşdırılıbsa, miqrasiyadan əvvəl administrator bunu uyğunlaşdırmalıdır.
