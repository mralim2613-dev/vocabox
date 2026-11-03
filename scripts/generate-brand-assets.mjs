import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const html=await fs.readFile('index.html','utf8');
const logo=html.match(/<svg class="logo"[\s\S]*?<\/svg>/)?.[0];
if(!logo)throw Error('Vocabox logo SVG tapılmadı.');
await fs.mkdir('release/assets',{recursive:true});
await fs.writeFile('release/assets/icon-source.svg',logo);
const icon=await sharp(Buffer.from(logo)).resize(1024,1024).flatten({background:'#173f35'}).removeAlpha().png().toBuffer();
await fs.writeFile('release/assets/icon-1024.png',icon);
await sharp(icon).resize(512,512).ensureAlpha().png().toFile('release/assets/google-play-icon-512.png');
await fs.writeFile('ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png',icon);
const foreground=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108"><g fill="none" transform="translate(23 23) scale(1.3)">${logo.replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')}</g></svg>`;
for(const [density,size] of Object.entries({mdpi:48,hdpi:72,xhdpi:96,xxhdpi:144,xxxhdpi:192})) {
 const directory=`android/app/src/main/res/mipmap-${density}`;
 await fs.mkdir(directory,{recursive:true});
 for(const name of ['ic_launcher.png','ic_launcher_round.png'])await sharp(icon).resize(size,size).png().toFile(path.join(directory,name));
 await sharp(Buffer.from(foreground)).resize(Math.round(size*108/48),Math.round(size*108/48)).png().toFile(path.join(directory,'ic_launcher_foreground.png'));
}
const vector=`<vector xmlns:android="http://schemas.android.com/apk/res/android" android:width="108dp" android:height="108dp" android:viewportWidth="108" android:viewportHeight="108">
<path android:fillColor="#54786A" android:pathData="M33,28 L70,24 L73,49 L36,53 Z"/>
<path android:fillColor="#8BA393" android:pathData="M40,27 L78,32 L74,56 L36,51 Z"/>
<path android:fillColor="@android:color/transparent" android:strokeColor="#BAE681" android:strokeWidth="8" android:strokeLineCap="round" android:strokeLineJoin="round" android:pathData="M32,42 L54,74 L76,42"/>
<path android:fillColor="@android:color/transparent" android:strokeColor="#FFFFFF" android:strokeWidth="4" android:strokeLineCap="round" android:strokeLineJoin="round" android:pathData="M42,44 L54,61 L66,44"/>
<path android:fillColor="#E2F59E" android:pathData="M49,31 A5,5 0,1 0,59 31 A5,5 0,1 0,49 31"/>
</vector>`;
await fs.writeFile('android/app/src/main/res/drawable/ic_launcher_foreground.xml',vector);
const splash=async(width,height)=>sharp({create:{width,height,channels:3,background:'#173f35'}}).composite([{input:await sharp(icon).resize(Math.round(Math.min(width,height)*.21)).toBuffer(),gravity:'centre'}]).png().toBuffer();
for(const folder of await fs.readdir('android/app/src/main/res')) {
 const file=`android/app/src/main/res/${folder}/splash.png`;
 try{const {width,height}=await sharp(await fs.readFile(file)).metadata();await fs.writeFile(file,await splash(width,height))}catch(error){if(error.code!=='ENOENT')throw error;}
}
const imageset='ios/App/App/Assets.xcassets/Splash.imageset';
const splashImage=await splash(2732,2732);
for(const file of (JSON.parse(await fs.readFile(`${imageset}/Contents.json`,'utf8'))).images)await fs.writeFile(`${imageset}/${file.filename}`,splashImage);
const graphic=`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="500"><rect width="1024" height="500" fill="#173f35"/><g fill="none" transform="translate(80 150) scale(4)">${logo.replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')}</g><text x="340" y="244" fill="#FFFFFF" font-family="Arial,sans-serif" font-size="80" font-weight="bold">Vocabox</text><text x="345" y="307" fill="#D8ED9B" font-family="Arial,sans-serif" font-size="32">Sözləri yadda saxla</text></svg>`;
await sharp(Buffer.from(graphic)).png().toFile('release/assets/google-play-feature-1024x500.png');
console.log('Vocabox icons, splash screens and store graphics generated.');
