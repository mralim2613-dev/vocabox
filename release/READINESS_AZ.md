# Mağaza təqdimatına hazırlıq — 30 oktyabr 2026

Status: Android üçün imzalı AAB və iOS üçün imzalı IPA EAS-da uğurla hazırlanıb. Sahib mağaza hazırlığının qalan hissəsini sonraya saxlayıb. Mağazaya tam hazır statusu verilmir. Heç bir mağazaya göndəriş edilməyib.

## Tamamlananlar

- Expo CLI `zehniboop` hesabına qoşuldu. Layihə: `@zehniboop/vocabox`.
- Android API 36, Capacitor 8.6.0, iOS 15.4+ və native fayl paylaşması hazırlandı.
- Android identifikatoru `com.vocabox.app` olaraq saxlanıldı. Apple bu identifikatoru sahibin komandası üçün qəbul etmədiyindən iOS `com.zehniapp.vocabox` olaraq dəyişdirildi və uğurla qeydiyyatdan keçirildi.
- Android APK və imzalı AAB, iOS üçün imzasız simulator tətbiqi EAS-da kompilyasiya olundu.
- Son AAB-nin JAR imzası, imzalanmış manifest və 465 faylın SHA-256 bütövlüyü yoxlanıldı. Nəticələr `BUILD_RESULTS_AZ.md` sənədindədir.
- Supabase `mhegdrwpqtemmsxemyql` layihəsinin boş köhnə `user_id` cədvəlləri istifadəçi nömrəsi modelinə uyğunlaşdırıldı; mövcud 3 lisenziya saxlanıldı.
- Cədvəllərə açıq giriş bağlandı; giriş açarı heşi, 30 günlük sessiya və hesab üzrə sinxronizasiya RPC-ləri tətbiq olundu.
- Köhnə `create_licenses` və `handle_new_user` funksiyalarının axtarış yolu sərtləşdirildi; administrator funksiyalarının açıq icrası bağlandı.
- Canlı Supabase ilə iki ayrı brauzer yaddaşı arasında dəst və Azərbaycan hərfləri olan kart sinxronlaşdırıldı. İkinci yaddaşda edilən redaktə birincidə göründü.
- Birdəfəlik `QA-RELEASE-20261030` hesabı silindi. Bazada test lisenziyası, açarı, sessiyaları və snapshot sayı 0-dır; əvvəlki lisenziya sayı 3-dür.
- Silmədən sonra silinmiş lokal hesabı yenidən saxlama xətası düzəldildi və brauzerdə təkrar sınaq keçdi.
- 11 avtomatlaşdırılmış test, web build, native konfiqurasiya yoxlaması və canlı RPC yoxlaması keçdi. Production dependency audit: 0 zəiflik.
- Təsdiqlənməmiş e-poçt çıxarıldı; sahibin bildirdiyi `musabayramov@zehniapp.com` tətbiqə və məxfilik/dəstək/silmə səhifələrinə yazıldı.

## Qalan konkret addımlar

1. **Apple imzalama tamamlandı:** 30 oktyabrda Apple girişi və iki addımlı təsdiq uğurlu oldu. Sahib yeni Program License Agreement-i özü qəbul etdiyini təsdiqlədi. `com.zehniapp.vocabox` qeydiyyatdan keçirildi, paylama sertifikatı və aktiv provisioning profile yaradıldı. İmzalı IPA build `e314759a-4b15-43ad-a4bb-522f4cee818f` FINISHED oldu. Nəticə və yoxlamalar `BUILD_RESULTS_AZ.md`-dədir. Gələcək imzalama idarəsi üçün layihə qovluğunda PowerShell:
   ```powershell
   $env:EAS_NO_VCS='1'
   .\node_modules\.bin\eas.cmd credentials --platform ios
   ```
   `production` və Build Credentials seçilərək sahib Apple hesabına özü daxil olmalıdır. Sonra `eas build --platform ios --profile production` işlədilir. Şifrə və təsdiq kodu çata göndərilmir.
2. **Açıq səhifələr və Vercel sonraya saxlanılıb:** `release/support-site/` statik yayım üçün hazırdır. Plugin `musa-6b4f`, brauzer isə `zehnipro-boop / musa-0578` (`team_1EAZ9hX56hf9HZYx3b3IZwf7`) hesabını göstərir. Sahib `zehniapp.com`-a müdaxiləni qadağan edib, gələcək iş üçün EnglishCamp-in olduğu `musa-0578` hesabını seçib. CLI device girişi başladıldı, lakin sahib bağlantını sonraya saxladığı üçün ləğv edildi. Düzgün bağlantı hələ qurulmayıb. Heç bir sayt dəyişdirilməyib və yayım edilməyib.
3. **Fiziki cihaz yoxlaması:** `DEVICE_TESTS_AZ.md` üzrə Android telefonu və iPhone/iPad sınaqları keçirilməlidir. Simulator kompilyasiyası bu sınaqları əvəz etmir. Mağaza şəkilləri son native build-dən alınmalıdır.
4. **Ödəniş modeli:** sahib kartdan-karta ödənişdən sonra istifadəçi nömrəsi və şifrə verəcək. Bu, rəqəmsal çıxışın tətbiqdən kənar satılmasıdır. Google consumption-only və Apple qaydalarına uyğunluq yayım ölkələri/modelə görə tamamlanmalıdır; təsdiqlənmiş uyğunluq kimi təqdim edilmir. IAP əlavə edilməyib.
5. **Məzmun hüquqları:** sahib sözləri emal etdiyini bildirib. Mənbə seçimi/sırası, nümunələr və qeydə alınmış lisenziya məhdudiyyətləri üzrə ayrıca yayım hüququ sənədi təqdim edilməyib. Bu məsələ avtomatik hüquqi cəhətdən həll edilmiş sayılmır.
6. **Store formaları:** hüquqi yayımçı adı, ölkələr, yaş reytinqi, məxfilik/Data safety cavablarının son təsdiqi, reviewer hesabı və native ekran görüntüləri tamamlanmalıdır. `STORE_LISTING_AZ.md`, `REVIEW_NOTES.md`, `DATA_DISCLOSURES_AZ.md` layihə mətnləridir.

## Təhlükəsizlik hesabatının şərhi

Supabase Security Advisor yoxlanarkən 0 error, 16 warning göstərirdi. Onlardan 4-ü köhnə funksiyaların mutable search_path/açıq trigger icrası ilə bağlı idi və düzəldildi. Digər 12 xəbərdarlıq custom access-key/session yoxlaması edən 6 `SECURITY DEFINER` RPC-nin anon/authenticated rollarına açıq olmasını bildirirdi. Bu endpointlər hesabın açarını və ya sessiyasını özləri yoxlayır; xəbərdarlıq gizlədilməyib və bütün təhlükəsizlik risklərinin sıfır olduğu iddia edilmir.

Private qovluqda yeniləmədən əvvəlki lisenziya/sxem/policy ehtiyat nüsxəsi və build faylları saxlanır. Bu qovluq EAS upload-dan çıxarılıb. Test giriş açarının lokal faylı silinib.
