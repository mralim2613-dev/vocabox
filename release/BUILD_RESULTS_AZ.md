# Son EAS build nəticələri — 30 oktyabr 2026

Versiya 1.0.0, build 2. Android ID-si `com.vocabox.app`; yeni iOS ID-si `com.zehniapp.vocabox`. Əvvəlki simulator build-i köhnə iOS ID-si ilədir. Heç bir store submission edilməyib.

| Quruluş | EAS ID | Nəticə |
|---|---|---|
| Android production AAB | `18541313-0e7e-4d83-8291-4b9f9cf123f5` | FINISHED, imzalı |
| Android preview APK | `01f67133-894a-4130-a0ce-98d87734be9f` | FINISHED, debug/test |
| iOS simulator tətbiqi | `2f5c453f-4190-433d-8000-60ab05b1988d` | FINISHED, imzasız simulator; IPA deyil |
| iOS production IPA | `e314759a-4b15-43ad-a4bb-522f4cee818f` | FINISHED; imzalı App Store distribution IPA, `com.zehniapp.vocabox` |

Fayllar `release/private/builds/` qovluğundadır və EAS-a yenidən yüklənmir.

- AAB SHA-256: `3A10BB4486DADC567A10D9B9C5D9DC20CB4740659F2576A123C78A990978F2ED`
- APK SHA-256: `E3D0C0CC268C86F9BFF6ED899BA1F1BAE1850609AD615B0D50C697F5CA5638A9`
- iOS simulator SHA-256: `7B389264539888CEAFA93DDD40D7BE235BA03DB3D95CC1E1098DA0F4A1BCB748`
- iOS IPA SHA-256: `27DF4851A16045241FD05039AFF2304DFD81FBA3D1517990760318206AB13EDA`
- IPA metadatası yoxlanıldı: `com.zehniapp.vocabox`, 1.0.0 (2), ARM64, iOS device. App Store provisioning profili bundle ID və Apple komandası ilə uyğun gəlir, debug imzalama bağlıdır, profil 30 oktyabr 2027-dək qüvvədədir. Məxfilik manifesti, CodeResources, təsdiqlənmiş e-poçt yoxlanılıb. Tam `codesign` yoxlaması macOS-da, real cihaz sınağı ayrıca aparılmalıdır.
- AAB imzası və imzalanmış manifestin bütün 465 faylının SHA-256 bütövlüyü yoxlanıldı.
- İmzalama sertifikatının SHA-256 izi: `92FBE33CB95D9A704ADA22C8398615F3585394D4F02F936C9B01630E3A944642`
- AAB-də `.so` kitabxanası yoxdur. Fiziki cihaz/Play pre-launch yoxlaması hələ tələb olunur.
- AAB içindəki web HTML lokal yoxlanmış `dist/index.html` ilə eynidir; təsdiqlənmiş e-poçtu ehtiva edir, köhnə uydurulmuş ünvan yoxdur.

EAS səhifələri:

- https://expo.dev/accounts/zehniboop/projects/vocabox/builds/18541313-0e7e-4d83-8291-4b9f9cf123f5
- https://expo.dev/accounts/zehniboop/projects/vocabox/builds/01f67133-894a-4130-a0ce-98d87734be9f
- https://expo.dev/accounts/zehniboop/projects/vocabox/builds/2f5c453f-4190-433d-8000-60ab05b1988d
- https://expo.dev/accounts/zehniboop/projects/vocabox/builds/e314759a-4b15-43ad-a4bb-522f4cee818f

İlk imzalı iOS cəhdi (`5553004b-915b-4702-8fd1-9baeb0259937`) yanlış Gymfile workspace seçimi və credentials input-u verilmədiyinə görə dayandı. Production şablonu real `App/App.xcworkspace` və build credentials ilə düzəldildikdən sonra yuxarıdakı son build uğurlu oldu.

Köhnə aralıq build-lər bu nəticələri əvəz etmir. Davam edərkən yalnız yuxarıdakı son build-lərdən istifadə edin.
