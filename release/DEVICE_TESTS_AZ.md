# Native cihaz sınağı

Status: hələ icra edilməyib. Brauzer testləri və mock plagin testləri real cihaz sınağını əvəz etmir.

Hər nəticəyə build ID-si, cihaz/OS, tarix və ekran sübutu əlavə edin. Android preview APK-sı və iOS simulator build-i EAS profillərində hazırlanıb. Fiziki iPhone sınağı üçün düzgün imzalanmış build/TestFlight lazımdır.

1. Təmiz quraşdırma: ikon, splash, ilk açılış və dörd hazır dil dəsti.
2. Ekran kəsikləri və sistem çubuqları: portret/landşaft, Android gesture/3-button navigation, iPhone safe area.
3. Fləşkart, yazılı və variant rejimində tam 10 kartlıq sessiyalar; düzgün nəticə və qutu dəyişməsi.
4. Klaviatura açılıb-bağlanarkən giriş və redaktə düymələrinin əlçatan qalması.
5. Modal dialoqların açılması, bağlanması və ləğv edilməsi.
6. Şəxsi dəst/kart yaratma, dəyişmə, silmə və axtarış.
7. Native paylaşma ilə JSON ehtiyat nüsxəsini Files/Downloads-a saxlama; eyni faylı seçib bərpa etmə; Azərbaycan hərflərini yoxlama.
8. Proses bağlanıb yenidən açıldıqda məlumatların qorunması; tətbiq background/foreground keçidi.
9. Təyyarə rejimində bütün paketlənmiş lüğətlərin açılması və məşq.
10. Test hesabı ilə giriş və iki cihazda şəxsi dəst, kart, irəliləyiş və silinmələrin sinxronizasiyası.
11. Şəbəkə kəsilməsi zamanı yanlış uğur statusunun olmaması və sonra bərpa.
12. A hesabından B hesabına keçid: A-nın məlumatlarının B-yə keçməməsi.
13. Birdəfəlik sınaq hesabının silinməsi: təkrar girişin rədd edilməsi və lokal məlumatların ayrılması.
14. VoiceOver/TalkBack, böyüdülmüş şrift və zoom ilə əsas düymələr.
15. Android bundle-də yerli `.so` kitabxanası varsa 16 KB səhifə uyğunluğunun yoxlanması; Play pre-launch report və Xcode archive validation nəticələri.
