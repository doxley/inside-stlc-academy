const OK = ['h1','h2','p','ul','ol','table','callout','spacer'];
const name = process.argv[2];
const arr = (await import(`./content/${name}.mjs`)).default;
let errs = [];
if (!Array.isArray(arr)) errs.push('not an array');
for (const r of arr) {
  const id = r.slug || '?';
  for (const k of ['slug','title','courseTitle','category','blocks']) if (!r[k]) errs.push(`${id}: missing ${k}`);
    if (!Array.isArray(r.blocks) || r.blocks.length < 5) errs.push(`${id}: too few blocks`);
  (r.blocks||[]).forEach((b,i) => {
    if (!OK.includes(b.t)) errs.push(`${id} block ${i}: bad type '${b.t}'`);
    if ((b.t==='ul'||b.t==='ol') && !Array.isArray(b.items)) errs.push(`${id} block ${i}: ${b.t} no items`);
    if (b.t==='table' && (!Array.isArray(b.headers)||!Array.isArray(b.rows))) errs.push(`${id} block ${i}: table shape`);
    if (b.t==='table' && b.rows.some(row => !Array.isArray(row) || row.length !== b.headers.length)) errs.push(`${id} block ${i}: table row width != headers`);
    if (b.t==='callout' && !['tip','pro','mistake','best'].includes(b.variant)) errs.push(`${id} block ${i}: callout variant '${b.variant}'`);
  });
}
if (errs.length) { console.log('FAIL '+name+':\n  '+errs.join('\n  ')); process.exit(1); }
console.log(`OK ${name}: ${arr.length} resources, slugs: ${arr.map(r=>r.slug).join(', ')}`);
