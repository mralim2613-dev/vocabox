import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import sharp from 'sharp';
import {BuildProfileSchema} from '@expo/eas-json/build/build/schema.js';
import {writeNativeExport} from '../src/lib/native-export-core.js';

test('native backup keeps UTF-8 content, stays in cache and shares the written file',async()=>{
  let write,share;
  const plugins={Directory:{Cache:'CACHE'},Encoding:{UTF8:'utf8'},Filesystem:{writeFile:async options=>{write=options;return {uri:'file:///cache/backup.json'}}},Share:{share:async options=>{share=options}}};
  const data='{"söz":"öyrənmək — şəkil"}';
  await writeNativeExport(plugins,'../öz-backup.json',data);
  assert.equal(write.data,data);assert.equal(write.encoding,'utf8');assert.equal(write.directory,'CACHE');
  assert.equal(write.path.split('/').length,2);
  assert.deepEqual(share.files,['file:///cache/backup.json']);
  plugins.Share.share=async()=>{throw Error('cancelled')};
  await assert.rejects(writeNativeExport(plugins,'backup.json',data),/cancelled/);
  plugins.Filesystem.writeFile=async()=>{throw Error('disk full')};
  await assert.rejects(writeNativeExport(plugins,'backup.json',data),/disk full/);
});

test('EAS production and test build profiles match the pinned CLI schema',async()=>{
  const config=JSON.parse(await fs.readFile(new URL('../eas.json',import.meta.url),'utf8'));
  for(const [name,profile] of Object.entries(config.build)) {
    const {error}=BuildProfileSchema.validate(profile);
    assert.equal(error,undefined,`${name}: ${error?.message}`);
  }
  assert.equal(config.build.preview.android.withoutCredentials,true);
  assert.equal(config.build.simulator.ios.simulator,true);
  assert.match(config.build.production.ios.image,/xcode-26\./);
});

test('store icons have the required dimensions and iOS icon has no alpha channel',async()=>{
  const ios=await sharp(await fs.readFile(new URL('../release/assets/icon-1024.png',import.meta.url))).metadata();
  assert.equal(ios.width,1024);assert.equal(ios.height,1024);assert.equal(ios.hasAlpha,false);
  const play=await sharp(await fs.readFile(new URL('../release/assets/google-play-icon-512.png',import.meta.url))).metadata();
  assert.equal(play.width,512);assert.equal(play.height,512);
});
