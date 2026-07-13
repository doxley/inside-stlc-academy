const name = process.argv[2];
const m = (await import(`./${name}.mjs`)).default;
const req = ['lessonNumber','title','estimatedTime','lessonOverview','learningObjectives','lessonNotes','workedExample','commonMistakes','realWorldTip','exercise','reflectionQuestion','knowledgeCheck','completionChecklist','enhancements'];
const enh = ['industryStory','davidTip','miniChallenge','modelAnswer','visualAid'];
let errs = [];
if (!m.courseSlug || typeof m.courseSlug !== 'string') errs.push('bad courseSlug');
m.lessons.forEach((l,i) => {
  req.forEach(k => { if (l[k] === undefined || l[k] === null || (typeof l[k]==='string' && !l[k].trim())) errs.push(`L${l.lessonNumber||i+1}: missing ${k}`); });
  if (!Array.isArray(l.learningObjectives) || l.learningObjectives.length < 2) errs.push(`L${l.lessonNumber}: objectives`);
  enh.forEach(k => { if (!l.enhancements || l.enhancements[k]===undefined) errs.push(`L${l.lessonNumber}: enh.${k} missing`); });
  const v = l.enhancements?.visualAid;
  if (v && !['comparison','timeline','steps'].includes(v.type)) errs.push(`L${l.lessonNumber}: visualAid.type=${v.type}`);
  if (!l.knowledgeCheck?.includes('Answer')) errs.push(`L${l.lessonNumber}: knowledgeCheck no Answer`);
});
const last = m.lessons[m.lessons.length-1];
['managersReview','portfolioBuilder','resourcePreview'].forEach(k => { if (!last.enhancements?.[k]) errs.push(`final lesson missing enh.${k}`); });
if (errs.length) { console.log('FAIL '+name+':\n  '+errs.join('\n  ')); process.exit(1); }
console.log('OK '+name+': '+m.lessons.length+' lessons, all fields present');
