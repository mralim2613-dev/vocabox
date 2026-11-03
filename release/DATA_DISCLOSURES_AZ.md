# Məlumat açıqlamaları — doldurmaq üçün layihə

Bu sənəd hazır store formunun təqdim edilməsi deyil. Tətbiq sahibinin operator məlumatları, real server logları, məlumat emalı və saxlanma qaydaları ilə tutuşdurulmalıdır.

| Məlumat | Cihazda | Bulud hesabı ilə | Məqsəd |
|---|---|---|---|
| İstifadəçi nömrəsi / hesab ID-si | Bəli | Bəli | Giriş və hesabın seçilməsi |
| Şəxsi dəst və kart məzmunu | Bəli | Bəli | Lüğətin cihazlar arasında saxlanması |
| Qutu, təkrar, düzgün cavab sayı, son məşq vaxtı | Bəli | Bəli | İrəliləyişin saxlanması |
| Sessiya tokeni | Bəli | Serverdə yoxlama üçün | Hesaba təhlükəsiz giriş |
| Giriş açarı | Açıq mətnlə saxlanmır | Yoxlama üçün göndərilir, hash saxlanır | Autentifikasiya |

Hesabsız oflayn söz və məşq məlumatları tətbiq kodu tərəfindən serverə göndərilmir. Bulud hesabı ilə yuxarıdakı məlumatlar hesab ID-si ilə əlaqələndirilir. Reklam və davranış izləmə SDK-sı əlavə edilməyib.

iOS manifestində User ID, Other User Content və Other Usage Data App Functionality məqsədi ilə, hesaba bağlı və izləmə üçün istifadə edilməyən məlumatlar kimi qeyd edilib. Filesystem üçün File Timestamp / C617.1 səbəbi əlavə edilib.

Google Play Data safety formunda uyğun kateqoriyalar ayrıca yoxlanmalıdır: User IDs, Other user-generated content, App activity. “Heç bir məlumat toplanmır” cavabı bulud funksiyası olan bu versiyanı düzgün təsvir etmir. Supabase emalçı kimi istifadə olunur; server/provayder loglarında IP və texniki qeydlərin faktiki saxlanması ayrıca yoxlanmalıdır.

Sessiyalar 30 günlüklə verilir. Çıxışda cari sessiya, hesab silindikdə bütün bulud sessiyaları ləğv edilir. Hesab silmə əməliyyatı işlək təhlükəsiz RPC tələb edir. İstifadəçinin özü başqa yerə çıxardığı ehtiyat nüsxələr onun nəzarətində qalır.

Sahibin bildirdiyi kartdan-karta ödəniş tətbiqin daxilində emal edilmir. Operatorun bu prosesdə əldə etdiyi məlumatlar və onların saxlanması üçün ayrıca, faktiki qayda hazırlanmalıdır; tətbiq kodundan bu xarici prosesin məlumatlarını müəyyən etmək mümkün deyil.
