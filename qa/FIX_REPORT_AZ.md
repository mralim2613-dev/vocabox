# Vocabox — düzəliş və təkrar yoxlama

30 oktyabr 2026. Əvvəlki tapıntılar: `BROWSER_AUDIT_AZ.md`.

## Nə dəyişdi

| Audit | Nəticə |
|---|---|
| B01 — açılış xətası | Hazır dəstlərdəki 164 artıq kart eyni sözün mənaları, izahları, nümunələri və səviyyələri saxlanaraq birləşdirilir. Hazır kart sayı 13 706-dır. İstifadəçinin öz yaratdığı təkrar kartlara qarşı doğrulama qalır. |
| B02 — yarımçıq qiymətləndirmə/idxal | Bulud dəyişənləri ilk yaddaş yazısından əvvəl yaradılır. Məşq və idxal axınları tamamlanır. |
| B03 — yeniləmədə bloklanma | Köhnə tam və patch formatlı yaddaşlar təmir edilərək oxunur. İlk yenidən yazıdan əvvəl lokal əvvəlki nüsxə qorunur. |
| B04 — ehtiyat nüsxə | Köhnə fayllar miqrasiya ilə bərpa olunur. Bərpa bloklanmış yaddaş halında da açıq təsdiqlə mümkündür. Bərpa faylının limiti 50 MB-dır. |
| B05 — işləməyən düymələr | Hesab və hüquqi məlumat hadisələri normal başlanğıcda bir dəfə qoşulur. Çıxış və bərpa kimi təsdiqlər tətbiqdaxili dialoqla işləyir. |
| B06 — gizli dil seçimi | Hesabsız istifadəçi bütün dilləri seçə bilir. Paketə bağlı hesabda dil görünür və məhdudiyyət izah olunur. |
| B07 — böyük paket | Lüğətlər ilk JavaScript paketindən çıxarılıb, dil seçildikcə ayrıca JSON kimi yüklənir. JS 6 446.93 kB-dan 285.34 kB-a düşüb; gzip 81.02 kB-dır. |
| B08 — nümunəsiz kartlar | Kömək mətni düzəldilib: nümunə yalnız kartda varsa göstərilir. Mövcud olmayan 7 595 nümunə cümlə bu işdə uydurulmayıb və əlavə edilməyib. |
| B09 — mobil böyütmə | Zoom-u məhdudlaşdıran viewport atributları çıxarılıb. |
| S01 — hesabların təhlükəsizliyi | Birbaşa cədvəl girişlərini bağlayan, sessiya ilə hesabı serverdə müəyyən edən SQL və RPC-lər hazırlanıb. Nömrəyə əlavə administratorun verdiyi məxfi giriş açarı tələb olunur. **Canlı bazaya tətbiq edilməyib.** |
| S02 — şəxsi sözlərin sinxronizasiyası | Dəstlər, kartlar, irəliləyiş və silinmələr qorunan snapshot ilə ötürülür. Köhnə bulud qeydləri ilk sinxronizasiyada oxunur. |
| S03 — xətanın uğur kimi göstərilməsi | Sorğu xətaları yuxarı ötürülür; uğur statusu yalnız tamamlanmış göndərmədən sonra göstərilir. Paralel yazılar revision müqayisəsi ilə təkrar birləşdirilir. |
| S04 — hesab silmə | Serverdə bir tranzaksiyada məlumatlar, lisenziya və sessiyalar silinir. İstənilən silmə xətası bütün əməliyyatı geri qaytarır. Cari cihazın həmin hesaba aid lokal məlumatları da silinir. |
| S05 — hesab keçidi | Lokal state layihə ünvanı və hesab nömrəsi üzrə ayrılır. Qonaq məlumatları avtomatik başqa hesaba göndərilmir. |
| S06 — oflayn veb açılış | Production build üçün bütün statik resursları və lüğətləri saxlayan service worker əlavə edilib. Oflayn hazırlıq vəziyyəti Ayarlarda görünür. |

Buludla bağlı S01–S05 kodları lokal PostgreSQL-də və iki ayrı brauzer yaddaşında yoxlanıb. Onların canlı istifadəsi SQL yeniləməsindən asılıdır.

## Yoxlama nəticələri

- `npm test`: 6 test keçdi. Testlər köhnə yaddaş/bərpa, kart birləşdirməsi, dəyişiklik/silinmə birləşməsi və real PostgreSQL SQL davranışını əhatə edir.
- `npm run build`: uğurludur, böyük JavaScript chunk xəbərdarlığı yoxdur.
- Mövcud zədələnmiş kimi görünən test yaddaşı açıldı; əvvəlki `qa-browser-word` kartı və irəliləyiş bərpa olundu.
- Fləşkartda 10 kartlıq sessiya: 8 düz / 2 səhv nəticəsi göstərildi.
- Variant seçimində 10 kartlıq sessiya: 3 düz / 7 səhv nəticəsi göstərildi.
- Yazılı rejimdə cavab yazıldı, açıldı, qiymətləndirildi və ikinci karta keçildi.
- Alman dəsti 3 064, İspan dəsti 2 672 kart göstərdi.
- JSON idxalı tamamlandı. Şəxsi dəst və kart lokal test buludundan ikinci ayrı yaddaşlı səhifəyə gəldi.
- Hesab A-dan B-yə keçiddən sonra B-nin tam ehtiyat nüsxəsində A-nın şəxsi dəsti və kartı yox idi.
- Süni göndərmə xətasında “Sinxronizasiya alınmadı” göstərildi.
- Əvvəl rədd edilən 8.49 MB köhnə ehtiyat nüsxə təsdiqlə bərpa edildi, səhifə yeniləndi və içindəki test kartı tapıldı. Sonra yeni formatlı əvvəlki nüsxə də geri bərpa edildi.
- Məxfilik və istifadə şərtləri dialoqları açıldı.
- Production serveri dayandırıldıqdan sonra səhifə keşdən yenidən açıldı; həmin səhifədə daha əvvəl açılmamış İspan dəsti oflayn yükləndi.
- 375×812 görünüşündə ümumi üfüqi daşma müşahidə edilmədi. Zoom məhdudiyyəti yoxdur; real telefonda pinch jesti yoxlanmayıb.

SQL testləri ayrıca `anon` rolu ilə işləyir: cədvəllərin oxunması/silinməsi və köhnə açıq funksiyalar rədd edilir; yanlış/boş açar və bitmiş token rədd edilir; A sessiyası B məlumatını almır; köhnə revision yazını əvəz etmir; süni silmə xətası əvvəlki silinmələri də geri qaytarır; uğurlu hesab silinməsi bütün qeydləri və tokenləri ləğv edir.

## Canlı bulud üçün qalan addım

`.env` layihəsi `mhegdrwpqtemmsxemyql` qoşulmuş Supabase hesabının layihə siyahısında yoxdur. Buna görə başqa layihəyə SQL tətbiq edilməyib və canlı məlumatlar dəyişdirilməyib.

Doğru layihəyə `supabase/secure_cloud.sql` tətbiq edilməli və mövcud istifadəçilər üçün məxfi giriş açarları verilməlidir. Addımlar `supabase/README.md` faylındadır. Yeni qurulum üçün kökdəki `supabase_schema.sql` istifadə olunur. Canlı buludun təhlükəsizliyi miqrasiya tətbiq edilənə qədər həll edilmiş hesab edilməməlidir.

Android/iOS native build və mağazaya yayım bu brauzer yoxlamasının hissəsi deyil; hazır native paketlər yenidən yığılmayıb. `sync` skripti yeni kataloq və oflayn build addımlarını da daxil edəcək şəkildə düzəldilib.

## Sübutlar

- `fixed-session.jpg`: tam fləşkart sessiyası.
- `fixed-choice.jpg`: tam variant seçim sessiyası.
- `fixed-offline.jpg`: server dayanmış halda İspan dəsti.
- `fixed-mobile.jpg`: mobil görünüş.

Testlər yalnız lokal test yaddaşlarına əlavə irəliləyiş və test kartları yazıb. Müvəqqəti lokal bulud serveri və iki test dev serveri dayandırılıb; yaradılan test açarları faylı silinib. Əsas development serveri istifadə üçün açıq saxlanıb.
