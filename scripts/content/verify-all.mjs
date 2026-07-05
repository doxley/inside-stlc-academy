// Deep render-safety check: verify every lesson's enhancement shapes match what
// main's LessonEnhancements components access, so rendering cannot crash.
const isStr = (v) => typeof v === 'string' && v.length > 0;
let errs = [], totalLessons = 0, totalVis = 0;
for (let n = 1; n <= 10; n++) {
  const m = (await import(`./api-module${n}.mjs`)).default;
  for (const l of m.lessons) {
    totalLessons++;
    const tag = `M${n}L${l.lessonNumber}`;
    const e = l.enhancements || {};
    for (const k of ['industryStory','davidTip','miniChallenge','modelAnswer']) if (!isStr(e[k])) errs.push(`${tag}: enh.${k} not a string`);
    const v = e.visualAid;
    if (v) {
      totalVis++;
      if (v.type === 'comparison') {
        if (!Array.isArray(v.headers) || !v.headers.every(h => typeof h==='string')) errs.push(`${tag}: visualAid.headers`);
        if (!Array.isArray(v.rows) || !v.rows.every(r => Array.isArray(r) && r.every(c => typeof c==='string'))) errs.push(`${tag}: visualAid.rows`);
      } else if (['timeline','flow','steps'].includes(v.type)) {
        if (!Array.isArray(v.steps) || !v.steps.every(s => s && typeof s==='object' && isStr(s.label))) errs.push(`${tag}: visualAid.steps`);
      } else errs.push(`${tag}: visualAid.type='${v.type}' unsupported`);
    }
    if (e.badGood && !(isStr(e.badGood.bad) && isStr(e.badGood.good))) errs.push(`${tag}: badGood.bad/good`);
    if (e.managersReview) {
      const r = e.managersReview;
      for (const k of ['strengths','improvements','gaps']) if (r[k] !== undefined && !(Array.isArray(r[k]) && r[k].every(isStr))) errs.push(`${tag}: managersReview.${k}`);
    }
    if (e.resourcePreview && e.resourcePreview.formats !== undefined && !Array.isArray(e.resourcePreview.formats)) errs.push(`${tag}: resourcePreview.formats`);
  }
}
if (errs.length) { console.log(`RENDER-SAFETY FAIL (${errs.length}):\n  ` + errs.join('\n  ')); process.exit(1); }
console.log(`RENDER-SAFETY OK: ${totalLessons} lessons, ${totalVis} visual aids, all enhancement shapes valid`);
