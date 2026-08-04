import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const sourceDir = process.argv[2];
const outputFile = process.argv[3];

if (!sourceDir || !outputFile) {
  console.error('Usage: node scripts/zip.js <sourceDir> <outputFile>');
  process.exit(1);
}

function zipDirectory(src, out) {
  const files = [];

  function walk(dir, baseDir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath, baseDir);
      } else {
        const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
        files.push({ fullPath, relPath });
      }
    }
  }

  walk(src, src);

  const localHeaders = [];
  const cdHeaders = [];
  let offset = 0;

  for (const item of files) {
    const content = fs.readFileSync(item.fullPath);
    const uncompressedSize = content.length;
    const crc32 = zlib.crc32(content);
    const compressedData = zlib.deflateRawSync(content);
    const compressedSize = compressedData.length;
    const fileNameBuffer = Buffer.from(item.r || item.relPath, 'utf8');
    const fileNameLength = fileNameBuffer.length;

    // Local file header (30 bytes + filename)
    const lh = Buffer.alloc(30 + fileNameLength);
    lh.writeUInt32LE(0x04034b50, 0);
    lh.writeUInt16LE(20, 4);
    lh.writeUInt16LE(0x0800, 6); // UTF-8 flag
    lh.writeUInt16LE(8, 8); // Deflate
    lh.writeUInt16LE(0, 10);
    lh.writeUInt16LE(0, 12);
    lh.writeUInt32LE(crc32, 14);
    lh.writeUInt32LE(compressedSize, 18);
    lh.writeUInt32LE(uncompressedSize, 22);
    lh.writeUInt16LE(fileNameLength, 26);
    lh.writeUInt16LE(0, 28);
    fileNameBuffer.copy(lh, 30);

    localHeaders.push(lh, compressedData);

    // Central directory header (46 bytes + filename)
    const cd = Buffer.alloc(46 + fileNameLength);
    cd.writeUInt32LE(0x02014b50, 0);
    cd.writeUInt16LE(0x0314, 4); // Unix 2.0
    cd.writeUInt16LE(20, 6);
    cd.writeUInt16LE(0x0800, 8); // UTF-8 flag
    cd.writeUInt16LE(8, 10);
    cd.writeUInt32LE(crc32, 16);
    cd.writeUInt32LE(compressedSize, 20);
    cd.writeUInt32LE(uncompressedSize, 24);
    cd.writeUInt16LE(fileNameLength, 28);
    cd.writeUInt16LE(0, 30);
    cd.writeUInt16LE(0, 32);
    cd.writeUInt16LE(0, 34);
    cd.writeUInt16LE(0, 36);
    cd.writeUInt32LE(0, 38);
    cd.writeUInt32LE(offset, 42);
    fileNameBuffer.copy(cd, 46);

    cdHeaders.push(cd);
    offset += lh.length + compressedData.length;
  }

  const cdBuffer = Buffer.concat(cdHeaders);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(files.length, 8);
  eocd.writeUInt16LE(files.length, 10);
  eocd.writeUInt32LE(cdBuffer.length, 12);
  eocd.writeUInt32LE(offset, 16);
  eocd.writeUInt16LE(0, 20);

  fs.writeFileSync(out, Buffer.concat([...localHeaders, cdBuffer, eocd]));
}

zipDirectory(sourceDir, outputFile);
