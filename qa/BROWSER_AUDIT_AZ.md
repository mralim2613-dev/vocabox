# Vocabox — brauzer yoxlaması

Bu ilkin auditdir. Sonrakı düzəlişlər və təkrar yoxlama üçün [FIX_REPORT_AZ.md](FIX_REPORT_AZ.md) faylına baxın.

Tarix: 30 oktyabr 2026. Mühit: Windows, tətbiqdaxili Chromium brauzeri.

Yoxlanılan versiya: cari lokal fayllar. Bu qovluq Git deposu deyil, commit identifikatoru yoxdur.
Development: http://127.0.0.1:3000/; production preview: http://127.0.0.1:4173/.
Mobil görünüş: 375×812 və 320×740; yoxlamadan sonra viewport bərpa edilib.

Tətbiqin mənbə koduna düzəliş edilməyib. `npm run build` ilə dist yenidən yaradılıb. Brauzer testləri lokal test irəliləyişi və bir `qa-browser-word` kartı yaradıb; tətbiq həmin məlumatları yenidən oxuya bilməyib. İstifadəçi hesabı, canlı bazadakı məlumatlar və hesab silmə əməliyyatları dəyişdirilməyib.

## Nəticə

Cari versiyada əsas istifadəçi axınları tam işlək deyil. Build uğurludur, lakin həm development, həm production səhifəsində başlanğıc JavaScript xətası var. Açılış xətası bir neçə sonrakı problemi yaradır; aşağıdakı B01–B04 tapıntıları ayrı istifadəçi təsirləridir, dörd müstəqil kök səbəb kimi sayılmamalıdır.

P0: açılışı dayandıran və ya istifadəçilərarası məlumat təhlükəsizliyinə təsir edən problem.
P1: əsas əməliyyatı və ya məlumatın qorunmasını pozan problem.
P2: performans, məzmun və əlçatanlıq problemi.

## Brauzerdə və build-də təsdiqlənən problemlər

### B01 — P0 — İlk açılışda tətbiq yarımçıq yüklənir

- Addım: təmiz origin-də development və production ünvanlarını aç.
- Faktiki nəticə: söz dəsti boşdur, statistika və yaddaş qutuları dolmur; konsolda `Error: Təkrar kart var.`.
- Mənbə: `src/main.js:25`, `src/main.js:203`, `src/main.js:216`.
- Səbəb: seed məlumatları validatorun eyni dəst + növ + normallaşdırılmış söz unikallığı şərtini pozur.
- Saylar: Alman dilində 120 təkrar qrup / 136 artıq kart; İspan dilində 24 təkrar qrup / 28 artıq kart. İngilis və Rus dəstlərində bu yoxlamada təkrar yoxdur. Ümumi 13 870 kart var.
- Nümunə: `abfahren`: `de_core_0003`, `de_core_0876`, `de_core_0877`; `uno`: `es_core_0002`, `es_core_0066`.
- İstiqamət: təkrarların mənalarını və səviyyələrini qoruyan birləşdirmə və ya identifikasiya qaydasını dəyişmək; sonra bütün seed-i tətbiqin öz validatorundan keçirmək.

### B02 — P1 — Qiymətləndirmə və idxal məlumatı yazır, amma əməliyyatı tamamlamır

- Addım: Məşqə başla → Cavabı göstər → Düz bildim. Variant seç rejimində də cavab seç. Digər sınaq: düzgün JSON → önbaxış → Dəstə əlavə et.
- Faktiki nəticə: `ReferenceError: Cannot access 'activeUserNumber' before initialization`.
- Fləşkartda Növbəti düyməsi yaranmır. Variantların hamısı deaktiv olur, növbəti karta keçid yaranmır. İdxalda önbaxış açıq qalır, tamamlanma təsdiqi gəlmir.
- Lokal state artıq dəyişib: Bitir-dən sonra 1 məşq edilmiş kart statistikası var, sessiya nəticəsi isə 0 düz / 0 səhv göstərir. İdxalda kart sayı 2970-dən 2971-ə yüksəlir.
- Mənbə: `commit` (`src/main.js:46`) state-i və yaddaşı dəyişəndən sonra `triggerCloudPush` çağırır; `activeUserNumber` elanı isə başlanğıc xətası səbəbindən icra olunmayıb (`src/main.js:220–223`).
- Bu xəta B01-in kaskad nəticəsidir. İlkin bundle yeniləməsi də bu dəyişənin elanından əvvəl commit edə bilər; başlanğıc sırası ayrıca düzəldilməlidir.

### B03 — P1 — Özünün yazdığı yaddaşı yeniləmədən sonra oxuya bilmir

- Addım: B02-də qiymətləndirmə/idxal et → səhifəni yenilə.
- Faktiki nəticə: “Yaddaş dəyişib və ya oxuna bilmir” xəbərdarlığı; Məşqə başla deaktivdir. Ekran ilkin 2970 karta və sıfır irəliləyişə qayıdır. Məlumatın silindiyi təsdiqlənməyib: saxlanmış state rədd edilir.
- Xəbərdarlıqdakı Yenilə düyməsinə basdıqdan sonra da blok qalır.
- Mənbə: `decodeLocal` / `validateState`, `src/main.js:26–44`. B01-dəki təkrarlar patch bərpasında yenidən yığılır və rədd edilir.
- İstiqamət: saxlanan və oxunan state eyni invariantlara cavab verməlidir; mövcud zədələnmiş kimi görünən yaddaş üçün məlumatı qoruyan miqrasiya lazımdır.

### B04 — P1 — Tətbiqin öz ehtiyat nüsxəsi bərpa olunmur

- Addım: Ayarlar → Ehtiyat nüsxə endir. Endirilən `vocabox-ehtiyat-2026-10-30.json` faylını production preview-də bərpa üçün seç.
- Faktiki nəticə: təsdiq mərhələsinə çatmadan “Təkrar kart var.” bildirişi.
- Fayl təxminən 8.49 MB-dır; 10 MB giriş limitindən kiçikdir. Səbəb ölçü deyil, B01-dəki unikallıq uyğunsuzluğudur.
- Mənbə: `src/main.js:212–213`.

### B05 — P1 — Giriş və hüquqi məlumat düymələrinin hadisələri başlanğıcda qoşulmur

- Addım: Ayarlar → boş istifadəçi nömrəsi ilə Nömrəni təsdiqlə və daxil ol; sonra Məxfilik Siyasəti düyməsinə bas.
- Faktiki nəticə: boş nömrə xəbərdarlığı belə çıxmır; məxfilik dialoqu açılmır.
- Müstəqil mənbə problemi: `initCloudEvents()` və `checkCloudAuth()` çağırışları yalnız `applyImport()` daxilindədir (`src/main.js:147`). Normal startup-da bu funksiyalar çağırılmır.
- Eyni init funksiyası şərtlər, bağlantı parametrlərini saxlama, çıxış, sinxronizasiya və lokal sıfırlama düymələrini də bağlayır. Bunların hamısının işləməməsi koddan görünür; dağıdıcı düymələr icra edilməyib.
- İstiqamət: hadisələri DOM hazır olduqda bir dəfə qoşmaq və cloud yoxlamasını normal başlanğıcdan çağırmaq.

### B06 — P1 — Dil seçimi istifadəçi üçün gizlidir

- Addım: ilk açılış və ya Bitir-dən sonra dəst seçiminə bax.
- Faktiki nəticə: yalnız cari İngilis dəsti seçilə bilir; Rus, Alman və İspan dillərinə keçən görünən seçim yoxdur.
- Mənbə: `index.html:15` — `#language` elementinin valideynində daimi `hidden` atributu var. `renderSelectors` seçimləri yaratsa da valideyni göstərmir. Dəst siyahısı da yalnız cari dili göstərir.
- İstiqamət: hesabı olmayan/oflayn istifadəçi üçün dil seçimini açmaq; paket məhdudiyyəti olduqda onu izahlı şəkildə göstərmək.

### B07 — P2 — İlkin JavaScript paketi böyükdür

- `npm run build` uğurludur, amma chunk ölçüsü xəbərdarlığı verir.
- Tək JS faylı: 6 446.93 kB; gzip: 1 143.53 kB. Bütün dillərin seed məlumatları `src/main.js:1` vasitəsilə ilk paketə daxil olur.
- Təsir: xüsusilə mobil və zəif şəbəkədə ilk yüklənmə və JS emalı üçün əlavə xərc. Konkret gecikmə saniyəsi ölçülməyib.
- İstiqamət: məlumatları dil/dəst üzrə tələb zamanı yükləmək.

### B08 — P2 — Hazır kartların çoxunda nümunə cümlə yoxdur

- Brauzerdə açılan İngilis kartlarında cavab və izah var, nümunə görünmür.
- Seed yoxlaması: İngilis 2970/2970, Rus 4625/5000 kartda nümunə boşdur. Ümumi 7595/13870 kart.
- Kömək mətni cavabı açandan sonra nümunə cümlə göstərildiyini bildirir; mövcud məzmun bunu hər kartda təmin etmir.
- İstiqamət: nümunələri tamamlamaq və ya kömək mətnini faktiki təminata uyğunlaşdırmaq.

### B09 — P2 — Mobil böyütmə məhdudlaşdırılıb

- Mənbə: `index.html:5` — `maximum-scale=1.0, user-scalable=no`.
- Təsir: bu atributlara əməl edən mobil brauzerlərdə zəif görən istifadəçinin böyütmə imkanı məhdudlaşır.
- 320 və 375 px enlərdə əsas düzülüşə baxılıb. Ümumi səhifə üzrə üfüqi daşma aşkar edilməyib; menyunun üfüqi sürüşməsi mövcuddur. Faktiki telefonda pinch jesti yoxlanmayıb.

## Koddan müəyyən olunan əlavə problemlər — canlı buludda təsdiqlənməyib

Bulud hissəsinin baxışında Supabase bacarığından istifadə edilib. Canlı bazanın sxemi, grant-ları və deploy konfiqurasiyası bu auditdə yoxlanmayıb. Aşağıdakı nəticələr repodakı implementasiyaya aiddir.

### S01 — P0 — SQL siyasətləri istifadəçilərin məlumatlarını ayırmır

- `supabase_schema.sql:69–84` siyasətlərində `using (true)` və `with check (true)` var; sahiblik yoxlaması yoxdur. Lisenziya siyahısı da filtrsiz oxuna bilir.
- Əgər bu sxem Data API-yə çıxışı olan rollara tətbiq edilibsə, həmin rollar digər istifadəçilərin irəliləyişini, şəxsi kartlarını və dəstlərini oxuya və dəyişə bilər. Brauzerin `.eq(user_number, ...)` filtri giriş nəzarəti deyil.
- `create_licenses` və `delete_user_account` funksiyaları da `security definer` kimi təyin edilib, funksiyanın daxilində çağıranın səlahiyyəti yoxlanmır; bu faylda EXECUTE məhdudlaşdırılması görünmür. Canlı grant-ları yoxlamaq lazımdır.
- İstiqamət: təsdiqlənmiş istifadəçi identifikasiyası, sahiblik əsaslı RLS və minimum funksiya icra hüquqları.
- İstinad: https://supabase.com/docs/guides/database/postgres/row-level-security

### S02 — P1 — Şəxsi dəst və kartlar buludla sinxronlaşdırılmır

- `pushProgressToCloud` yalnız `user_progress` yazır; `pullProgressFromCloud` yalnız həmin cədvəli oxuyur.
- `custom_decks` və `custom_items` cədvəlləri sxemdə olsa da onları göndərən və yükləyən axın yoxdur. Yeni cihazda şəxsi kartlar və onların UUID-ləri olmayacaq.
- İstiqamət: dəstlər → kartlar → irəliləyiş ardıcıllığı ilə tam sinxronizasiya.

### S03 — P1 — Bulud xətaları uğur kimi görünə bilər

- `pushProgressToCloud`: upsert xətasını yalnız `console.warn` edir, çağırana ötürmür.
- `pullProgressFromCloud`: oxuma xətasını `null` qaytarır; `syncWithCloud` bunu boş bulud kimi qəbul edib göndərməyə keçir və sonunda “Sinxronizasiya tamamlandı” göstərir.
- İstiqamət: boş nəticə ilə uğursuz sorğunu ayırmaq; hissəvi və tam uğursuzluğu UI-yə ötürmək.

### S04 — P1 — Hesab silmə vədi ilə implementasiya uyğun deyil

- Dialoq həm bulud, həm cihaz məlumatlarının birdəfəlik silinəcəyini bildirir.
- `deleteUserAccountAndData` üç məlumat cədvəlindən silir, amma `licenses` qeydini silmir/deaktiv etmir. Sxemdəki `delete_user_account` RPC-si çağırılmır.
- Ayrı-ayrı DELETE xətaları yalnız loglanır; funksiya yenə `{success:true}` qaytarır.
- UI lokal `state`, `KEY` və `OLD_KEY` məlumatlarını silmir; yalnız aktiv istifadəçi məlumatını təmizləyir.
- Heç bir hesab və ya məlumat bu auditdə silinməyib.
- İstiqamət: verilən vədə uyğun, atomik və nəticəsi yoxlanılan silmə axını.

### S05 — P1 — Lokal irəliləyiş hesab üzrə ayrılmır

- Bütün istifadəçilər üçün eyni `vocabox.sales.v1` state-i var. Çıxış və yeni nömrə ilə giriş state-i ayırmır.
- `syncWithCloud` mövcud lokal və bulud progress-i birləşdirib aktiv nömrəyə göndərir. Bir cihazda A hesabından B hesabına keçəndə A-nın lokal irəliləyişinin B-yə qarışması mümkündür.
- İstiqamət: lokal state-i hesab üzrə saxlamaq və oflayn məlumatın hansı hesaba köçürüləcəyini açıq idarə etmək.

### S06 — P2 — Veb versiyanın təkrar oflayn açılışı təmin olunmur

- Ayarlarda tətbiqin tam oflayn işlədiyi yazılıb. Lokal məlumat localStorage-da saxlanır, amma veb mənbələrində service worker və offline cache qeydiyyatı yoxdur.
- Açıq səhifədə oflayn işləmək və native Capacitor paketinin lokal asset-ləri ayrı hallardır. Veb səhifənin şəbəkəsiz yenidən açılmasına hazırda zəmanət yoxdur; bu auditdə şəbəkə emulyasiyası edilməyib.
- İstiqamət: veb üçün offline asset cache əlavə etmək və ya vədi açıq səhifə/native tətbiq sərhədi ilə dəqiqləşdirmək.

## İşlədiyi müşahidə edilən hissələr

- Əsas menyuda bölmələr arasında keçid.
- Axtarış: `book` sorğusu 11 uyğun kart göstərdi; nəticəyə definition mətninə görə uyğunluq da daxildir.
- Kart formunun açılması və mövcud `book` kartını yenidən əlavə etməyə qarşı doğrulama.
- Üç məşq rejimində ilkin kartın göstərilməsi; fləşkart və yazılı rejimdə cavabın açılması; variantların hazırlanması.
- Boş idxala izahlı xəta və düzgün JSON-a 1 yeni kart önbaxışı.
- Ehtiyat nüsxənin fayl kimi endirilməsi. Onun bərpası B04 səbəbindən uğursuzdur.
- Production build-in yığılması. Bu, tətbiqin runtime-da işlədiyini təsdiqləmir.

## Tamamlana bilməyən ssenarilər

- Normal qiymətləndirmə ilə tam 10/20 kartlıq sessiya, bütün qutuların sərhədləri və nəticə ekranının düzgün hesablanması B01/B02 səbəbindən tam yoxlanmayıb.
- Digər dillərin real UI axınları B06 səbəbindən əlçatan deyil.
- Etibarlı hesabla giriş, iki cihaz sinxronizasiyası, şəbəkə xətaları və canlı RLS davranışı yoxlanmayıb.
- Hesab silmə, lokal sıfırlama və istifadəçinin mövcud məlumatlarını dəyişən dağıdıcı testlər edilməyib.
- Safari/Firefox və real Android/iOS cihazları yoxlanmayıb.

“Bütün problemlər tapılıb” zəmanəti verilmir: əsas bloklayıcılar aradan qaldırıldıqdan sonra qalan axınlar yenidən yoxlanmalıdır.

## Tövsiyə edilən düzəliş sırası

1. B01: seed və validator uyğunluğu; B02: dəyişənlərin və commit-in başlanğıc sırası.
2. B03/B04: mövcud yaddaş və ehtiyat nüsxələri qoruyan bərpa/miqrasiya.
3. B05/B06: event init və dil seçimi.
4. S01: canlı sxemə uyğun istifadəçi izolyasiyası və funksiya hüquqları.
5. S02–S05: sinxronizasiya, hesab keçidi və silmə davranışı.
6. Qalan performans, məzmun, əlçatanlıq və oflayn davranış; sonra tam regresiya yoxlaması.

## Sübut faylları

- `browser-errors.json`: development və production konsol xətaları.
- `production-startup.jpg`: production açılışında boş dəst və statistika.
- `reload-blocked.jpg`: yaddaş bloklandıqdan sonrakı ekran.
- `mobile-320.jpg`: dar ekran görünüşü.
