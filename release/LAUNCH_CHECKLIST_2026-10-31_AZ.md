# Vocabox — 31 oktyabr 2026 təqdimat planı

Məqsəd: bloklayan məsələlər həll edilirsə App Store və Google Play review göndərişini tamamlamaq. Təsdiq və ictimai yayım mağazaların qərarından asılıdır; 1 noyabr üçün zəmanətli deyil.

Hazırdır: imzalı AAB və IPA, ikon/feature graphic, ilkin mağaza mətnləri, Supabase təhlükəsizlik yeniləməsi və canlı brauzer sinxronizasiya/silmə yoxlamaları. Fiziki cihaz sınaqları və mağaza göndərişi edilməyib.

## 1. Səhər ilk olaraq hesab və çıxış yoxlamaları

- [ ] App Store Connect-də tətbiq yaratmaq və review göndərmək icazəsini yoxlamaq; açıq müqavilə/hesab xəbərdarlıqlarını həll etmək.
- [ ] Play Console hesabının aktivliyini, kimlik/əlaqə/cihaz təsdiqlərini və production çıxışını yoxlamaq.
- [ ] Google-un qapalı test tələbinin bu hesaba aid olub-olmadığını yoxlamaq. 13 noyabr 2023-dən sonra yaradılmış şəxsi hesablar üçün ən azı 12 testçinin 14 gün fasiləsiz qoşulduğu test tələb olunur; sonra production access müraciəti edilir. Bu tələb tamamlanmayıbsa sabah production göndərişi əvəzinə qapalı testi başlatmaq.
- [ ] Yayım ölkələri, hədəf yaş qrupu və mağaza dili barədə qərar vermək. EU yayımı seçilirsə portalların trader status/əlaqə yoxlamalarını tamamlamaq.

## 2. Kod dəyişə biləcək buraxılış qərarları

- [ ] Hesabsız istifadədə açıq olan funksiyaları yoxlamaq. Hazırda oflayn istifadə mümkündür; ödənişin hansı xidmətə çıxış verdiyini dəqiq müəyyənləşdirmək.
- [ ] Kartdan-karta ödənişdən sonra nömrə/şifrə vermə modelinin seçilmiş ölkələr və hər iki platformanın digital goods qaydalarına uyğun yolunu müəyyənləşdirmək. Bu model təsdiqlənmiş uyğun sayılmır; hazır build-də IAP yoxdur.
- [ ] Paket qiyməti, müddəti, dil məhdudiyyəti, hesabın verilmə vaxtı və geri ödəmə qaydasını müəyyənləşdirmək. Store ödənişi/IAP seçilərsə tələb olunan müqavilə, vergi və bank sahələrini də tamamlamaq.
- [ ] Lüğət mənbələrinin kommersiya yayımı üzrə hüquqlarını, xüsusən Rus/İspan dəstləri və nümunələri yoxlamaq. Həll olunmayan məzmun üçün icazə almaq, uyğun məzmunla əvəz etmək və ya buraxılışdan çıxarmaq barədə qərar vermək.
- [ ] Bu qərarlar funksiyanı və ya məzmunu dəyişdirərsə əvvəlcə düzəliş, test və yeni build etmək. Yüklənmiş build nömrəsini təkrar istifadə etməmək.

## 3. Mağaza qeydlərini yaratmaq

- [ ] App Store Connect-də Vocabox üçün tətbiq qeydi yaratmaq: iOS bundle ID com.zehniapp.vocabox, ilkin dil, SKU və yayımlayan hesab.
- [ ] Play Console-da Vocabox qeydi yaratmaq: Android package com.vocabox.app, ilkin dil, tətbiq növü və pulsuz/pullu endirmə seçimi.
- [ ] Versiya 1.0.0 / build 2 fayllarının son təsdiqlənmiş fayllar olduğunu BUILD_RESULTS_AZ.md ilə tutuşdurmaq.

## 4. Açıq dəstək və məxfilik səhifələri

- [ ] Vercel bağlantısını EnglishCamp-in olduğu musa-0578 hesabı ilə tamamlamaq. Qadağa: zehniapp.com və onun layihəsi dəyişdirilməməlidir. EnglishCamp tətbiqini Vocabox faylları ilə əvəz etməmək.
- [ ] Hazır release/support-site səhifələrini ayrıca uyğun layihədə yayımlamaq: dəstək, privacy.html, delete-account.html və terms.html.
- [ ] Səhifələrin giriş etmədən telefondan açıldığını və bütün linklərin işlədiyini yoxlamaq.
- [ ] musabayramov@zehniapp.com ünvanının məktub qəbul etdiyini yoxlamaq; dəstək və hesab silmə müraciətlərinin cavablandırılmasını təşkil etmək.
- [ ] İctimai URL-ləri mağaza formalarına yazmaq. Yeni domain almaq məcburi deyil.

## 5. Build-ləri test kanallarına yükləmək

- [ ] IPA-ni App Store Connect-ə yükləmək, processing və encryption/export-compliance suallarını faktiki istifadəyə uyğun tamamlamaq.
- [ ] Hazır build-i daxili TestFlight testi üçün əlçatan etmək və fiziki iPhone-da qurmaq. App Store üçün imzalanmış IPA adi APK kimi birbaşa quraşdırılmır.
- [ ] AAB-ni Play Console-a yükləmək, Play App Signing-i qurmaq və mövcud upload imzasını qorumaq.
- [ ] Android-də daxili/qapalı test quruluşunu quraşdırmaq; test APK-si lazım olduqda ayrıca istifadə oluna bilər.

## 6. Fiziki cihazlarda buraxılış sınağı

- [ ] Android telefonu və iPhone-da təmiz quraşdırma, ilk açılış, ikon, splash, ekran kəsikləri, klaviatura, portret/landşaft və uyğun sistem naviqasiyasını yoxlamaq. iPad dəstəyi saxlanılırsa iPad-i də yoxlamaq.
- [ ] Hər üç məşq rejimində tam sessiya, nəticə və yaddaş qutularının dəyişməsini yoxlamaq.
- [ ] Şəxsi dəst/kart yaratmaq, redaktə/silmə, axtarış və import yoxlamaları aparmaq.
- [ ] Native paylaşma ilə ehtiyat nüsxə saxlamaq, həmin faylı bərpa etmək və Azərbaycan hərflərini yoxlamaq.
- [ ] Tətbiqi bağlayıb açmaq, background/foreground və təyyarə rejimində bütün hazır dəstlərlə məşqi yoxlamaq.
- [ ] İki cihazda giriş, dəst/kart/tərəqqi sinxronizasiyası, şəbəkə kəsilməsi/bərpası və hesablararası məlumat ayrılmasını yoxlamaq.
- [ ] Ayrıca birdəfəlik test hesabında hesabın silinməsi və köhnə sessiya/girişin rədd edilməsini yoxlamaq; real müştəri və reviewer hesabını silməmək.
- [ ] Böyük şrift, VoiceOver/TalkBack əsas axınlarını; Play pre-launch və Apple upload/validation nəticələrini yoxlamaq.
- [ ] Kritik xəta varsa düzəltmək, build nömrəsini artırmaq və təsirlənən axınları yenidən yoxlamaq.

## 7. Mağaza şəkilləri və mətnləri

- [ ] Son native build-dən mağazaların istədiyi telefon və dəstəklənən iPad ekran görüntülərini hazırlamaq.
- [ ] Mövcud ikonları və Google feature graphic-i yükləmək.
- [ ] Ad, qısa/uzun təsvir, altbaşlıq, keywords/tags, kateqoriya, copyright və əlaqə sahələrini tamamlamaq.
- [ ] Təsvirlərin faktiki məhsulla uyğunluğunu yoxlamaq: 4 hazır dil, Fransız/İtalyan üçün şəxsi dəst, hər kartda nümunə cümlə olmadığı, oflayn/bulud imkanları və ödənişin nəyi açdığı.

## 8. Məxfilik və digər store formaları

- [ ] Apple App Privacy və Google Data safety formalarında hesab ID-si, fərdi məzmun, məşq məlumatları, provayder emalı və silinmə qaydalarını faktiki davranışa uyğun doldurmaq. Bulud olan versiyada “heç bir məlumat toplanmır” cavabını seçməmək.
- [ ] Yaş/content rating, hədəf auditoriya, tətbiqdaxili reklam statusu, tətbiqə giriş və tələb edilən icazə bəyanlarını doldurmaq. Tətbiqi xaricdə reklam etmək tətbiqin daxilində reklam olması demək deyil.
- [ ] Hazır iOS privacy manifesti ilə formaların uyğunluğunu yoxlamaq. Sonradan reklam/analitika SDK-si əlavə edilərsə açıqlamaları və build-i yeniləmək.
- [ ] Ölkələr, qiymət/əlçatanlıq və tələb olunan hüquq bəyannamələrini tamamlayıb məsul hesab sahibi kimi təsdiqləmək.

## 9. Mağaza yoxlayıcısının girişini hazırlamaq

- [ ] Hər iki mağaza üçün işlək, aktiv reviewer hesabı yaratmaq və şifrə ilə girişini ayrıca yoxlamaq. Bu gün silinmiş QA hesabını istifadə etməmək.
- [ ] Reviewer-in ödəniş etmədən yoxlaya bilməsi üçün təqdim edilən bütün funksiyalara çıxış vermək; birdən çox dil paketi varsa yoxlama yollarını izah etmək.
- [ ] App Review Notes / App access bölmələrinə giriş addımları, hesab məlumatları, hesabın necə alındığı və faktiki xarici ödəniş modelini aydın yazmaq.
- [ ] Review müddətində Supabase-i, reviewer hesabını və əlaqə ünvanını işlək saxlamaq.

## 10. Son göndəriş

- [ ] App Store Connect-də uyğun build-i seçmək, bütün səhifələrin tamamlandığını yoxlamaq və Submit for Review etmək. Avtomatik və ya manual yayımlama seçimini bilərəkdən müəyyənləşdirmək.
- [ ] Play Console-da production çıxışı varsa production release və release notes hazırlamaq; Publishing overview-dan Send for review etmək. Çıxış yoxdursa uyğun qapalı test yolunu tamamlamaq.
- [ ] Hər iki portaldan review-ya göndərilməni göstərən status/sübutu və tətbiq ID-lərini saxlamaq. Sadəcə fayl yükləməni review göndərişi saymamaq.

## 11. 1 noyabr reklamına hazırlıq

- [ ] Kreativləri, mətnləri, auditoriyanı, kampaniya büdcəsini və dəstək/hesab verilməsi prosesini hazırlamaq.
- [ ] Reklamın və mağazanın qiymət/funksiya vədlərinin bir-birinə uyğunluğunu yoxlamaq.
- [ ] Yükləmə reklamını yalnız faktiki yayımlanmış, seçilmiş ölkədə işlək mağaza linklərinə yönəltmək.
- [ ] Review bitməzsə 1 noyabr fəaliyyətini kreativ hazırlığı və ya ayrıca işlək maraq/qeydiyyat səhifəsinə yönəltmək; tətbiqin mağazada mövcud olduğunu elan etməmək.

## Vaxt məhdudiyyətləri və rəsmi mənbələr

- Apple review müddətləri məqsəddir, zəmanət deyil: https://developer.apple.com/help/app-review/after-submitting-for-review/review-status
- Google review bir neçə saatdan 7 günə, istisna hallarda daha uzun çəkə bilər: https://support.google.com/googleplay/android-developer/answer/9859654?hl=en
- Yeni şəxsi Play hesablarının test tələbi: https://support.google.com/googleplay/android-developer/answer/14151465?hl=en
- Apple ödəniş və təqdimat qaydaları: https://developer.apple.com/app-store/review/guidelines/
- Google ödəniş qaydaları: https://support.google.com/googleplay/android-developer/answer/10281818?hl=en

Sabah üçün uğur meyarı: tələb olunan ilkin şərtlər keçibsə iki review göndərişinin təsdiqi; Play test qapısı varsa App Store review + Google qapalı testin başladılması. İctimai yayıma çıxış və reklam tarixi mağaza statusuna görə müəyyənləşdirilir.
