'use strict';
/* Гримуар партии — offline D&D 5e (2014) spell helper.
   Spells come from a file the user imports (dnd.su export or prepared spells.json);
   characters live in localStorage and can be exported/imported as files. */

// English names of SRD 5.1 spells (CC-BY-4.0, Wizards of the Coast), keyed by letters-only slug
const EN = {"acidarrow":"Acid Arrow","acidsplash":"Acid Splash","aid":"Aid","alarm":"Alarm","alterself":"Alter Self","animalfriendship":"Animal Friendship","animalmessenger":"Animal Messenger","animalshapes":"Animal Shapes","animatedead":"Animate Dead","animateobjects":"Animate Objects","antilifeshell":"Antilife Shell","antimagicfield":"Antimagic Field","antipathysympathy":"Antipathy/Sympathy","arcaneeye":"Arcane Eye","arcanehand":"Arcane Hand","arcanelock":"Arcane Lock","arcanesword":"Arcane Sword","arcanistsmagicaura":"Arcanist's Magic Aura","astralprojection":"Astral Projection","augury":"Augury","awaken":"Awaken","bane":"Bane","banishment":"Banishment","barkskin":"Barkskin","beaconofhope":"Beacon of Hope","bestowcurse":"Bestow Curse","blacktentacles":"Black Tentacles","bladebarrier":"Blade Barrier","bless":"Bless","blight":"Blight","blindnessdeafness":"Blindness/Deafness","blink":"Blink","blur":"Blur","brandingsmite":"Branding Smite","burninghands":"Burning Hands","calllightning":"Call Lightning","calmemotions":"Calm Emotions","chainlightning":"Chain Lightning","charmperson":"Charm Person","chilltouch":"Chill Touch","circleofdeath":"Circle of Death","clairvoyance":"Clairvoyance","clone":"Clone","cloudkill":"Cloudkill","colorspray":"Color Spray","command":"Command","commune":"Commune","communewithnature":"Commune With Nature","comprehendlanguages":"Comprehend Languages","compulsion":"Compulsion","coneofcold":"Cone of Cold","confusion":"Confusion","conjureanimals":"Conjure Animals","conjurecelestial":"Conjure Celestial","conjureelemental":"Conjure Elemental","conjurefey":"Conjure Fey","conjureminorelementals":"Conjure Minor Elementals","conjurewoodlandbeings":"Conjure Woodland Beings","contactotherplane":"Contact Other Plane","contagion":"Contagion","contingency":"Contingency","continualflame":"Continual Flame","controlwater":"Control Water","controlweather":"Control Weather","counterspell":"Counterspell","createfoodandwater":"Create Food and Water","createundead":"Create Undead","createordestroywater":"Create or Destroy Water","creation":"Creation","curewounds":"Cure Wounds","dancinglights":"Dancing Lights","darkness":"Darkness","darkvision":"Darkvision","daylight":"Daylight","deathward":"Death Ward","delayedblastfireball":"Delayed Blast Fireball","demiplane":"Demiplane","detectevilandgood":"Detect Evil and Good","detectmagic":"Detect Magic","detectpoisonanddisease":"Detect Poison and Disease","detectthoughts":"Detect Thoughts","dimensiondoor":"Dimension Door","disguiseself":"Disguise Self","disintegrate":"Disintegrate","dispelevilandgood":"Dispel Evil and Good","dispelmagic":"Dispel Magic","divination":"Divination","divinefavor":"Divine Favor","divineword":"Divine Word","dominatebeast":"Dominate Beast","dominatemonster":"Dominate Monster","dominateperson":"Dominate Person","dream":"Dream","druidcraft":"Druidcraft","earthquake":"Earthquake","eldritchblast":"Eldritch Blast","enhanceability":"Enhance Ability","enlargereduce":"Enlarge/Reduce","entangle":"Entangle","enthrall":"Enthrall","etherealness":"Etherealness","expeditiousretreat":"Expeditious Retreat","eyebite":"Eyebite","fabricate":"Fabricate","faeriefire":"Faerie Fire","faithfulhound":"Faithful Hound","falselife":"False Life","fear":"Fear","featherfall":"Feather Fall","feeblemind":"Feeblemind","findfamiliar":"Find Familiar","findsteed":"Find Steed","findtraps":"Find Traps","findthepath":"Find the Path","fingerofdeath":"Finger of Death","firebolt":"Fire Bolt","fireshield":"Fire Shield","firestorm":"Fire Storm","fireball":"Fireball","flameblade":"Flame Blade","flamestrike":"Flame Strike","flamingsphere":"Flaming Sphere","fleshtostone":"Flesh to Stone","floatingdisk":"Floating Disk","fly":"Fly","fogcloud":"Fog Cloud","forbiddance":"Forbiddance","forcecage":"Forcecage","foresight":"Foresight","freedomofmovement":"Freedom of Movement","freezingsphere":"Freezing Sphere","gaseousform":"Gaseous Form","gate":"Gate","geas":"Geas","gentlerepose":"Gentle Repose","giantinsect":"Giant Insect","glibness":"Glibness","globeofinvulnerability":"Globe of Invulnerability","glyphofwarding":"Glyph of Warding","goodberry":"Goodberry","grease":"Grease","greaterinvisibility":"Greater Invisibility","greaterrestoration":"Greater Restoration","guardianoffaith":"Guardian of Faith","guardsandwards":"Guards and Wards","guidance":"Guidance","guidingbolt":"Guiding Bolt","gustofwind":"Gust of Wind","hallow":"Hallow","hallucinatoryterrain":"Hallucinatory Terrain","harm":"Harm","haste":"Haste","heal":"Heal","healingword":"Healing Word","heatmetal":"Heat Metal","hellishrebuke":"Hellish Rebuke","heroesfeast":"Heroes' Feast","heroism":"Heroism","hideouslaughter":"Hideous Laughter","holdmonster":"Hold Monster","holdperson":"Hold Person","holyaura":"Holy Aura","huntersmark":"Hunter's Mark","hypnoticpattern":"Hypnotic Pattern","icestorm":"Ice Storm","identify":"Identify","illusoryscript":"Illusory Script","imprisonment":"Imprisonment","incendiarycloud":"Incendiary Cloud","inflictwounds":"Inflict Wounds","insectplague":"Insect Plague","instantsummons":"Instant Summons","invisibility":"Invisibility","irresistibledance":"Irresistible Dance","jump":"Jump","knock":"Knock","legendlore":"Legend Lore","lesserrestoration":"Lesser Restoration","levitate":"Levitate","light":"Light","lightningbolt":"Lightning Bolt","locateanimalsorplants":"Locate Animals or Plants","locatecreature":"Locate Creature","locateobject":"Locate Object","longstrider":"Longstrider","magearmor":"Mage Armor","magehand":"Mage Hand","magiccircle":"Magic Circle","magicjar":"Magic Jar","magicmissile":"Magic Missile","magicmouth":"Magic Mouth","magicweapon":"Magic Weapon","magnificentmansion":"Magnificent Mansion","majorimage":"Major Image","masscurewounds":"Mass Cure Wounds","massheal":"Mass Heal","masshealingword":"Mass Healing Word","masssuggestion":"Mass Suggestion","maze":"Maze","meldintostone":"Meld Into Stone","mending":"Mending","message":"Message","meteorswarm":"Meteor Swarm","mindblank":"Mind Blank","minorillusion":"Minor Illusion","miragearcane":"Mirage Arcane","mirrorimage":"Mirror Image","mislead":"Mislead","mistystep":"Misty Step","modifymemory":"Modify Memory","moonbeam":"Moonbeam","moveearth":"Move Earth","nondetection":"Nondetection","passwithouttrace":"Pass Without Trace","passwall":"Passwall","phantasmalkiller":"Phantasmal Killer","phantomsteed":"Phantom Steed","planarally":"Planar Ally","planarbinding":"Planar Binding","planeshift":"Plane Shift","plantgrowth":"Plant Growth","poisonspray":"Poison Spray","polymorph":"Polymorph","powerwordkill":"Power Word Kill","powerwordstun":"Power Word Stun","prayerofhealing":"Prayer of Healing","prestidigitation":"Prestidigitation","prismaticspray":"Prismatic Spray","prismaticwall":"Prismatic Wall","privatesanctum":"Private Sanctum","produceflame":"Produce Flame","programmedillusion":"Programmed Illusion","projectimage":"Project Image","protectionfromenergy":"Protection From Energy","protectionfromevilandgood":"Protection from Evil and Good","protectionfrompoison":"Protection from Poison","purifyfoodanddrink":"Purify Food and Drink","raisedead":"Raise Dead","rayofenfeeblement":"Ray of Enfeeblement","rayoffrost":"Ray of Frost","regenerate":"Regenerate","reincarnate":"Reincarnate","removecurse":"Remove Curse","resilientsphere":"Resilient Sphere","resistance":"Resistance","resurrection":"Resurrection","reversegravity":"Reverse Gravity","revivify":"Revivify","ropetrick":"Rope Trick","sacredflame":"Sacred Flame","sanctuary":"Sanctuary","scorchingray":"Scorching Ray","scrying":"Scrying","secretchest":"Secret Chest","seeinvisibility":"See Invisibility","seeming":"Seeming","sending":"Sending","sequester":"Sequester","shapechange":"Shapechange","shatter":"Shatter","shield":"Shield","shieldoffaith":"Shield of Faith","shillelagh":"Shillelagh","shockinggrasp":"Shocking Grasp","silence":"Silence","silentimage":"Silent Image","simulacrum":"Simulacrum","sleep":"Sleep","sleetstorm":"Sleet Storm","slow":"Slow","sparethedying":"Spare the Dying","speakwithanimals":"Speak with Animals","speakwithdead":"Speak with Dead","speakwithplants":"Speak with Plants","spiderclimb":"Spider Climb","spikegrowth":"Spike Growth","spiritguardians":"Spirit Guardians","spiritualweapon":"Spiritual Weapon","stinkingcloud":"Stinking Cloud","stoneshape":"Stone Shape","stoneskin":"Stoneskin","stormofvengeance":"Storm of Vengeance","suggestion":"Suggestion","sunbeam":"Sunbeam","sunburst":"Sunburst","symbol":"Symbol","telekinesis":"Telekinesis","telepathicbond":"Telepathic Bond","teleport":"Teleport","teleportationcircle":"Teleportation Circle","thaumaturgy":"Thaumaturgy","thunderwave":"Thunderwave","timestop":"Time Stop","tinyhut":"Tiny Hut","tongues":"Tongues","transportviaplants":"Transport via Plants","treestride":"Tree Stride","truepolymorph":"True Polymorph","trueresurrection":"True Resurrection","trueseeing":"True Seeing","truestrike":"True Strike","unseenservant":"Unseen Servant","vampirictouch":"Vampiric Touch","viciousmockery":"Vicious Mockery","walloffire":"Wall of Fire","wallofforce":"Wall of Force","wallofice":"Wall of Ice","wallofstone":"Wall of Stone","wallofthorns":"Wall of Thorns","wardingbond":"Warding Bond","waterbreathing":"Water Breathing","waterwalk":"Water Walk","web":"Web","weird":"Weird","windwalk":"Wind Walk","windwall":"Wind Wall","wish":"Wish","wordofrecall":"Word of Recall","zoneoftruth":"Zone of Truth"};

// ---------- rules tables ----------
const FULL = [[2],[3],[4,2],[4,3],[4,3,2],[4,3,3],[4,3,3,1],[4,3,3,2],[4,3,3,3,1],[4,3,3,3,2],[4,3,3,3,2,1],[4,3,3,3,2,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1,1],[4,3,3,3,2,1,1,1],[4,3,3,3,2,1,1,1,1],[4,3,3,3,3,1,1,1,1],[4,3,3,3,3,2,1,1,1],[4,3,3,3,3,2,2,1,1]];
const HALF = [[],[2],[3],[3],[4,2],[4,2],[4,3],[4,3],[4,3,2],[4,3,2],[4,3,3],[4,3,3],[4,3,3,1],[4,3,3,1],[4,3,3,2],[4,3,3,2],[4,3,3,3,1],[4,3,3,3,1],[4,3,3,3,2],[4,3,3,3,2]];
const ARTIF = [[2],[2],[3],[3],[4,2],[4,2],[4,3],[4,3],[4,3,2],[4,3,2],[4,3,3],[4,3,3],[4,3,3,1],[4,3,3,1],[4,3,3,2],[4,3,3,2],[4,3,3,3,1],[4,3,3,3,1],[4,3,3,3,2],[4,3,3,3,2]];
const steps = (lvl, base, at) => base + at.filter(a => lvl >= a).length;
const CLASSES = {
  'бард':        {ab:'Хар', slots:FULL,  cantrips:l=>steps(l,2,[4,10]), known:[4,5,6,7,8,9,10,11,12,14,15,15,16,18,19,19,20,22,22,22]},
  'жрец':        {ab:'Мдр', slots:FULL,  cantrips:l=>steps(l,3,[4,10]), prep:(l,m)=>Math.max(1,m+l)},
  'друид':       {ab:'Мдр', slots:FULL,  cantrips:l=>steps(l,2,[4,10]), prep:(l,m)=>Math.max(1,m+l)},
  'волшебник':   {ab:'Инт', slots:FULL,  cantrips:l=>steps(l,3,[4,10]), prep:(l,m)=>Math.max(1,m+l)},
  'чародей':     {ab:'Хар', slots:FULL,  cantrips:l=>steps(l,4,[4,10]), known:[2,3,4,5,6,7,8,9,10,11,12,12,13,13,14,14,15,15,15,15], points:true},
  'колдун':      {ab:'Хар', pact:true,   cantrips:l=>steps(l,2,[4,10]), known:[2,3,4,5,6,7,8,9,10,10,11,11,12,12,13,13,14,14,15,15]},
  'паладин':     {ab:'Хар', slots:HALF,  cantrips:()=>0, prep:(l,m)=>l<2?0:Math.max(1,m+Math.floor(l/2))},
  'следопыт':    {ab:'Мдр', slots:HALF,  cantrips:()=>0, known:[0,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11]},
  'изобретатель':{ab:'Инт', slots:ARTIF, cantrips:l=>steps(l,2,[10,14]), prep:(l,m)=>Math.max(1,m+Math.floor(l/2))},
};
const COST = {1:2,2:3,3:5,4:6,5:7};
const pactSlots = l => l<2?1: l<11?2: l<17?3: 4;
const pactLevel = l => Math.min(5, Math.ceil(l/2));
const arcanum = l => [6,7,8,9].filter(c => l >= c*2 - 1);   // 11→6, 13→7, 15→8, 17→9
const pb = l => Math.ceil(l/4) + 1;
const CIRCLE = c => c === 0 ? 'Заговоры' : c + ' круг';

// ---------- storage ----------
const K_SPELLS = 'grimoire-spells-v1', K_STATE = 'grimoire-state-v1';
const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
const store = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { toast('Не удалось сохранить: память браузера заполнена'); return false; } };

let SPELLS = load(K_SPELLS, []);
let BY = {};
const indexSpells = () => { BY = Object.fromEntries(SPELLS.map(s => [s.id, s])); };
indexSpells();

const newChar = () => ({id: 'c' + Date.now().toString(36), name: 'Новый персонаж', cls: 'чародей', sub: '', lvl: 1, mod: 3,
  spells: [], cur: null, pact: null, arc: {}, sp: null, conc: null});
let S = load(K_STATE, null) || {chars: [], active: null};
let ui = {tab: 'fight', open: new Set(), q: '', circle: 'all', scope: 'class'};

const char = () => S.chars.find(c => c.id === S.active) || null;
const cfg = c => CLASSES[c.cls] || CLASSES['чародей'];
const slotsFor = c => cfg(c).pact ? [] : (cfg(c).slots[c.lvl - 1] || []);
const maxCircle = c => cfg(c).pact ? Math.max(pactLevel(c.lvl), ...arcanum(c.lvl), 0) : slotsFor(c).length;
const maxPoints = c => cfg(c).points && c.lvl >= 2 ? c.lvl : 0;
function norm(c) {
  if (!Array.isArray(c.cur)) c.cur = slotsFor(c).slice();
  while (c.cur.length < 9) c.cur.push(0);
  if (c.pact == null) c.pact = pactSlots(c.lvl);
  if (c.sp == null) c.sp = maxPoints(c);
  c.arc = c.arc || {};
}
function save() { const c = char(); if (c) c.t = Date.now(); store(K_STATE, S); }

// ---------- import of the spell file ----------
function parseExport(arr) {
  const FIELD = /^(Время накладывания|Дистанция|Компоненты|Длительность|Классы|Подклассы)\s*:/;
  const out = [];
  for (const x of arr) {
    if (!x || typeof x.text !== 'string') continue;
    const ru = String(x.ru || '').trim().replace(/\s*—\s*Заклинания\s*$/, '');
    const slug = String(x.url || '').replace(/^https?:\/\/[^/]+\/spells\/\d+-/, '').replace(/\/+$/, '');
    const lines = x.text.split('\n').map(l => l.trim());
    const m = lines[0].match(/^(Заговор|(\d) уровень),\s*(.+)$/);
    if (!m) continue;
    let school = m[3];
    const ritual = /ритуал/.test(school);
    school = school.replace(/\s*\(ритуал\)\s*/, '').replace(/\(ритуал,\s*/, '(').trim().toLowerCase();
    const f = {}; let i = 1;
    while (i < lines.length && FIELD.test(lines[i])) { const p = lines[i].indexOf(':'); f[lines[i].slice(0, p).trim()] = lines[i].slice(p + 1).trim(); i++; }
    let body = lines.slice(i).join('\n').trim(), higher = '';
    const hm = body.search(/\n*(На больших уровнях\.|Улучшение заговора\.)/);
    if (hm >= 0) { higher = body.slice(hm).trim(); body = body.slice(0, hm).trim(); }
    const dur = f['Длительность'] || '';
    out.push({id: slug || ru, n: ru, e: EN[slug.replace(/[^a-z]/g, '')] || slug.split('-').map(w => w ? w[0].toUpperCase() + w.slice(1) : w).join(' '),
      l: m[1] === 'Заговор' ? 0 : +m[2], s: school, r: ritual, t: f['Время накладывания'] || '', d: f['Дистанция'] || '',
      c: f['Компоненты'] || '', u: dur, k: /Концентрация/.test(dur),
      cl: (f['Классы'] || '').split(',').map(s => s.trim().replace(/[A-Z]+$/, '')).filter(Boolean),
      sc: f['Подклассы'] || '', x: body.replace(/\n{3,}/g, '\n\n'), h: higher});
  }
  return out;
}
function importFile(file) {
  const rd = new FileReader();
  rd.onload = () => {
    let data;
    try { data = JSON.parse(rd.result); } catch (e) { toast('Это не JSON-файл. Нужен dndsu_spells.json или файл персонажа.'); return; }
    if (data && data.kind === 'grimoire-character' && data.char) {
      const c = Object.assign(newChar(), data.char, {id: 'c' + Date.now().toString(36)});
      S.chars.push(c); S.active = c.id; norm(c); save(); toast('Персонаж «' + c.name + '» добавлен'); render(); return;
    }
    if (!Array.isArray(data)) { toast('Не узнал формат файла.'); return; }
    const list = data.length && 'n' in data[0] && 'l' in data[0] ? data : parseExport(data);
    if (!list.length) { toast('В файле не нашлось заклинаний.'); return; }
    if (!store(K_SPELLS, list)) return;
    SPELLS = list; indexSpells();
    if (!S.chars.length) { const c = newChar(); S.chars.push(c); S.active = c.id; norm(c); save(); ui.tab = 'char'; }
    toast('Загружено заклинаний: ' + list.length); render();
  };
  rd.readAsText(file);
}
function pickFile() {
  const inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.json,application/json';
  inp.onchange = () => inp.files[0] && importFile(inp.files[0]); inp.click();
}
function exportChar(c) {
  const blob = new Blob([JSON.stringify({kind: 'grimoire-character', v: 1, char: c}, null, 1)], {type: 'application/json'});
  const name = (c.name || 'персонаж').replace(/[^\p{L}\p{N}_-]+/gu, '_') + '.json';
  const file = new File([blob], name, {type: 'application/json'});
  if (navigator.canShare && navigator.canShare({files: [file]})) { navigator.share({files: [file]}).catch(() => {}); return; }
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

// ---------- helpers ----------
const h = (tag, attrs = {}, ...kids) => {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'on') for (const [ev, fn] of Object.entries(v)) e.addEventListener(ev, fn);
    else if (k === 'text') e.textContent = v;
    else if (v !== false && v != null) e.setAttribute(k, v === true ? '' : v);
  }
  for (const c of kids.flat()) if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c));
  return e;
};
function toast(t) { const el = document.getElementById('toast'); el.textContent = t; el.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => el.hidden = true, 2200); }
const ru = (a, b) => a.n.localeCompare(b.n, 'ru');
const picked = (c, id) => c.spells.find(x => x.id === id);
const shortTime = t => /^1 действие/.test(t) ? 'действие' : /^1 бонусное/.test(t) ? 'бонус' : /^1 реакция/.test(t) ? 'реакция' : t;

// ---------- views ----------
const app = document.getElementById('app');
function render() {
  app.replaceChildren();
  if (!SPELLS.length) return renderWelcome();
  const c = char();
  if (!c) { const n = newChar(); S.chars.push(n); S.active = n.id; norm(n); save(); return render(); }
  norm(c);
  app.append(renderTop(c));
  const panel = h('section', {class: 'panel'});
  app.append(panel);
  if (ui.tab === 'fight') renderFight(c, panel);
  else if (ui.tab === 'book') renderBook(c, panel);
  else renderChar(c, panel);
}

function renderWelcome() {
  app.append(h('div', {class: 'lock'},
    h('h1', {}, 'Гримуар партии'),
    h('p', {class: 'note'}, 'Помощник по заклинаниям D&D 5e. Работает без интернета, всё хранится только на этом устройстве.'),
    h('div', {class: 'box'},
      h('h2', {}, 'Загрузите файл заклинаний'),
      h('p', {class: 'note'}, 'Выберите файл dndsu_spells.json (или spells.json), который вам прислали в чате партии. Это нужно сделать один раз.'),
      h('button', {class: 'btn primary', on: {click: pickFile}}, 'Выбрать файл'))));
}

function renderTop(c) {
  const sel = h('select', {class: 'grow', 'aria-label': 'Персонаж', on: {change: e => { S.active = e.target.value; ui.open.clear(); save(); render(); }}},
    ...S.chars.map(x => h('option', {value: x.id, selected: x.id === c.id}, x.name)));
  const add = h('button', {class: 'step', 'aria-label': 'Новый персонаж', on: {click: () => { const n = newChar(); S.chars.push(n); S.active = n.id; norm(n); ui.tab = 'char'; save(); render(); }}}, '+');
  const k = cfg(c), m = c.mod, p = pb(c.lvl);
  const tabs = h('div', {class: 'tabs', role: 'tablist'},
    ...[['fight', 'Бой'], ['book', 'Книга'], ['char', 'Персонаж']].map(([id, t]) =>
      h('button', {class: 'tab', role: 'tab', 'aria-selected': ui.tab === id ? 'true' : 'false', on: {click: () => { ui.tab = id; render(); window.scrollTo(0, 0); }}}, t)));
  return h('div', {class: 'top'},
    h('div', {class: 'row'}, sel, add),
    h('div', {class: 'sub'}, `${cap(c.cls)}${c.sub ? ' · ' + c.sub : ''} · ${c.lvl} ур. · СЛ ${8 + p + m} · атака ${sign(p + m)} (${k.ab} ${sign(m)})`),
    tabs);
}
const cap = s => s ? s[0].toUpperCase() + s.slice(1) : s;
const sign = n => (n >= 0 ? '+' : '') + n;

function spellCard(c, s, mode) {
  const key = mode + s.id, open = ui.open.has(key), mine = picked(c, s.id);
  const tags = [];
  const st = shortTime(s.t);
  if (st === 'бонус' || st === 'реакция') tags.push(h('span', {class: 'tag a'}, st));
  if (s.k) tags.push(h('span', {class: 'tag k'}, 'К'));
  if (s.r) tags.push(h('span', {class: 'tag'}, 'Р'));
  const head = h('div', {class: 'sh'});
  if (mode === 'book') head.append(h('button', {class: 'pick' + (mine ? ' on' : '') + (mine && mine.b ? ' b' : ''), 'aria-pressed': mine ? 'true' : 'false',
    'aria-label': mine ? 'Убрать из выбранных' : 'Выбрать', on: {click: () => togglePick(c, s)}}, mine ? '✓' : '+'));
  head.append(h('button', {class: 'open', 'aria-expanded': open ? 'true' : 'false', on: {click: () => { open ? ui.open.delete(key) : ui.open.add(key); render(); }}},
    h('b', {}, s.n), h('span', {}, [s.e, s.d, /^(действие|бонус|реакция)$/.test(st) ? '' : st].filter(Boolean).join(' · '))), ...tags);
  const card = h('div', {class: 'spell' + (mine && mine.b ? ' bonus' : '')}, head);
  if (!open) return card;
  const body = h('div', {class: 'sb'},
    h('div', {class: 'facts'},
      h('div', {}, h('span', {}, 'Круг и школа'), `${s.l ? s.l + ' круг' : 'Заговор'}, ${s.s}${s.r ? ', ритуал' : ''}`),
      h('div', {}, h('span', {}, 'Время'), s.t),
      h('div', {}, h('span', {}, 'Дистанция'), s.d),
      h('div', {}, h('span', {}, 'Длительность'), s.u),
      h('div', {style: 'grid-column:1/-1'}, h('span', {}, 'Компоненты'), s.c),
      h('div', {style: 'grid-column:1/-1'}, h('span', {}, 'Классы'), s.cl.join(', ') + (s.sc ? '; ' + s.sc : ''))),
    h('p', {class: 'text', text: s.x}));
  if (s.h) body.append(h('p', {class: 'higher', text: s.h}));
  if (mode === 'book' && mine) body.append(h('label', {class: 'row sub'},
    h('input', {type: 'checkbox', checked: !!mine.b, on: {change: e => { mine.b = e.target.checked; save(); render(); }}}),
    'Не считается в лимит (подкласс, домен, психоника и т. п.)'));
  if (mode === 'fight') body.append(castRow(c, s));
  card.append(body);
  return card;
}

function castRow(c, s) {
  const row = h('div', {class: 'cast'});
  const k = cfg(c);
  if (s.l === 0) { if (s.k) row.append(h('button', {class: 'btn conc', on: {click: () => cast(c, s, 0)}}, 'Сотворить')); return row; }
  if (k.pact && s.l >= 6) {
    const used = !!c.arc[s.l];
    row.append(h('button', {class: 'btn primary', disabled: used || !arcanum(c.lvl).includes(s.l), on: {click: () => { c.arc[s.l] = true; cast(c, s, -1); }}}, used ? 'Арканум потрачен' : 'Таинственный арканум'));
    return row;
  }
  if (k.pact) {
    const pl = pactLevel(c.lvl);
    row.append(h('button', {class: 'btn primary', disabled: c.pact <= 0 || s.l > pl, on: {click: () => { c.pact--; cast(c, s, pl); }}}, `Ячейка договора ${pl} кр. (${c.pact})`));
    return row;
  }
  for (let lv = s.l; lv <= 9; lv++) {
    const left = c.cur[lv - 1] || 0, max = slotsFor(c)[lv - 1] || 0;
    if (!left && !max) continue;
    row.append(h('button', {class: 'btn' + (lv === s.l ? ' primary' : ''), disabled: left <= 0, on: {click: () => { c.cur[lv - 1]--; cast(c, s, lv); }}}, `${lv} кр. (${left})`));
  }
  if (s.r) row.append(h('button', {class: 'btn', on: {click: () => cast(c, s, 'r')}}, 'Ритуалом'));
  return row;
}
function cast(c, s, lv) {
  let msg = s.n + (lv === 'r' ? ' — ритуал' : lv > 0 ? ` — ${lv} круг` : '');
  if (s.k) { const was = c.conc; c.conc = s.id; if (was && was !== s.id && BY[was]) msg += ` · ${BY[was].n} спадает`; }
  save(); toast(msg); render();
}

function renderFight(c, panel) {
  const k = cfg(c), p = pb(c.lvl);
  panel.append(h('div', {class: 'stats'},
    h('div', {class: 'stat'}, h('b', {}, String(8 + p + c.mod)), h('span', {}, 'СЛ спасброска')),
    h('div', {class: 'stat'}, h('b', {}, sign(p + c.mod)), h('span', {}, 'Атака')),
    h('div', {class: 'stat'}, h('b', {}, sign(p)), h('span', {}, 'Мастерство'))));
  if (c.conc && BY[c.conc]) panel.append(h('div', {class: 'concbar'}, h('span', {}, 'Концентрация: ', h('b', {}, BY[c.conc].n)),
    h('button', {class: 'btn', on: {click: () => { c.conc = null; save(); render(); }}}, 'Сбросить')));

  const box = h('div', {class: 'box'});
  const rests = h('div', {class: 'row'});
  if (k.pact) rests.append(h('button', {class: 'btn', on: {click: () => { c.pact = pactSlots(c.lvl); c.conc = null; save(); toast('Короткий отдых: ячейки договора восстановлены'); render(); }}}, 'Короткий отдых'));
  rests.append(h('button', {class: 'btn', on: {click: () => longRest(c)}}, 'Длинный отдых'));
  box.append(h('div', {class: 'boxh'}, h('h2', {}, 'Ячейки'), rests));
  const grid = h('div', {class: 'slots'});
  if (k.pact) {
    grid.append(slotPips(`Договор · ${pactLevel(c.lvl)} круг`, c.pact, pactSlots(c.lvl), v => { c.pact = v; }));
    for (const a of arcanum(c.lvl)) grid.append(slotPips(`Арканум · ${a} круг`, c.arc[a] ? 0 : 1, 1, v => { c.arc[a] = v === 0; }));
  } else {
    const m = slotsFor(c);
    for (let lv = 1; lv <= 9; lv++) {
      const max = m[lv - 1] || 0, cur = c.cur[lv - 1] || 0;
      if (!max && !cur) continue;
      grid.append(slotPips(`${lv} круг · ${cur}/${max}`, cur, max, v => { c.cur[lv - 1] = v; }));
    }
  }
  if (!grid.childNodes.length) box.append(h('p', {class: 'note'}, 'На этом уровне у класса ещё нет ячеек.'));
  else box.append(grid);
  if (maxPoints(c)) {
    box.append(h('div', {class: 'row'},
      h('span', {class: 'sub grow'}, 'Очки чародейства'),
      h('button', {class: 'step', disabled: c.sp <= 0, 'aria-label': 'Потратить очко', on: {click: () => { c.sp--; save(); render(); }}}, '−'),
      h('span', {class: 'num'}, `${c.sp}/${maxPoints(c)}`),
      h('button', {class: 'step', 'aria-label': 'Добавить очко', on: {click: () => { c.sp++; save(); render(); }}}, '+')));
    const top = Math.min(5, slotsFor(c).length);
    const mk = h('div', {class: 'cast'}, h('span', {class: 'sub', style: 'width:100%'}, 'Очки → ячейка'));
    for (let lv = 1; lv <= top; lv++) mk.append(h('button', {class: 'btn', disabled: c.sp < COST[lv], on: {click: () => { c.sp -= COST[lv]; c.cur[lv - 1]++; save(); toast(`Создана ячейка ${lv} круга`); render(); }}}, `${lv} кр. за ${COST[lv]}`));
    const back = h('div', {class: 'cast'}, h('span', {class: 'sub', style: 'width:100%'}, 'Ячейка → очки'));
    for (let lv = 1; lv <= slotsFor(c).length; lv++) back.append(h('button', {class: 'btn', disabled: !(c.cur[lv - 1] > 0), on: {click: () => { c.cur[lv - 1]--; c.sp += lv; save(); toast(`+${lv} очк.`); render(); }}}, `${lv} кр. → ${lv}`));
    box.append(mk, back);
  }
  panel.append(box);

  const mine = c.spells.map(x => BY[x.id]).filter(Boolean);
  if (!mine.length) { panel.append(h('p', {class: 'empty'}, 'Заклинания не выбраны. Откройте «Книгу» и отметьте, что знает персонаж.')); return; }
  for (let lv = 0; lv <= 9; lv++) {
    const g = mine.filter(s => s.l === lv).sort(ru);
    if (!g.length) continue;
    panel.append(h('div', {class: 'lvlh'}, CIRCLE(lv)));
    g.forEach(s => panel.append(spellCard(c, s, 'fight')));
  }
}
function slotPips(label, cur, max, set) {
  const pips = h('div', {class: 'pips'});
  for (let i = 0; i < Math.max(cur, max); i++) {
    const on = i < cur;
    pips.append(h('button', {class: 'pip' + (on ? '' : ' off') + (i >= max ? ' extra' : ''), 'aria-label': `${label}: ячейка ${i + 1} ${on ? 'есть' : 'потрачена'}`,
      on: {click: () => { set(on ? i : i + 1); save(); render(); }}}));
  }
  return h('div', {class: 'slot'}, h('span', {class: 'lbl'}, label), pips);
}
function longRest(c) { c.cur = slotsFor(c).slice(); norm(c); c.pact = pactSlots(c.lvl); c.arc = {}; c.sp = maxPoints(c); c.conc = null; save(); toast('Длинный отдых: всё восстановлено'); render(); }

function togglePick(c, s) {
  const i = c.spells.findIndex(x => x.id === s.id);
  if (i >= 0) c.spells.splice(i, 1); else c.spells.push({id: s.id, b: false});
  save(); render();
}

function renderBook(c, panel) {
  const k = cfg(c), mc = maxCircle(c);
  const counted = c.spells.filter(x => !x.b && BY[x.id]);
  const nC = counted.filter(x => BY[x.id].l === 0).length, nS = counted.length - nC;
  const limC = k.cantrips(c.lvl), limS = k.known ? k.known[c.lvl - 1] : k.prep(c.lvl, c.mod);
  panel.append(h('p', {class: 'note'}, `Заговоры ${nC}/${limC} · ${k.known ? 'Известные' : 'Подготовленные'} ${nS}/${limS}` +
    (c.spells.some(x => x.b) ? ` · вне лимита ${c.spells.filter(x => x.b).length}` : '')));
  const q = h('input', {type: 'search', id: 'q', placeholder: 'Поиск: огненный, fireball, некромантия', value: ui.q, autocomplete: 'off',
    on: {input: e => { ui.q = e.target.value; renderList(); }}});
  panel.append(q);
  const scope = h('div', {class: 'filters'},
    ...[['class', 'Список класса'], ['mine', 'Выбранные'], ['all', 'Все заклинания']].map(([id, t]) =>
      h('button', {class: 'f', 'aria-pressed': ui.scope === id ? 'true' : 'false', on: {click: () => { ui.scope = id; render(); }}}, t)));
  const circles = h('div', {class: 'filters'},
    h('button', {class: 'f', 'aria-pressed': ui.circle === 'all' ? 'true' : 'false', on: {click: () => { ui.circle = 'all'; render(); }}}, 'Любой круг'),
    ...Array.from({length: 10}, (_, i) => i).filter(i => ui.scope === 'all' || i <= Math.max(mc, 0) || (i === 0)).map(i =>
      h('button', {class: 'f', 'aria-pressed': ui.circle === String(i) ? 'true' : 'false', on: {click: () => { ui.circle = String(i); render(); }}}, i ? i + ' кр.' : 'Заговоры')));
  panel.append(scope, circles);
  const list = h('div', {class: 'panel'});
  panel.append(list);
  function renderList() {
    list.replaceChildren();
    const qq = ui.q.trim().toLowerCase();
    let arr = SPELLS;
    if (ui.scope === 'class') arr = arr.filter(s => s.cl.includes(c.cls) && (s.l <= mc));
    else if (ui.scope === 'mine') arr = arr.filter(s => picked(c, s.id));
    if (ui.circle !== 'all') arr = arr.filter(s => s.l === +ui.circle);
    if (qq) arr = arr.filter(s => (s.n + ' ' + s.e + ' ' + s.s).toLowerCase().includes(qq));
    if (!arr.length) { list.append(h('p', {class: 'empty'}, 'Ничего не нашлось. Попробуйте «Все заклинания» или другой круг.')); return; }
    for (let lv = 0; lv <= 9; lv++) {
      const g = arr.filter(s => s.l === lv).sort(ru);
      if (!g.length) continue;
      list.append(h('div', {class: 'lvlh'}, CIRCLE(lv) + ` · ${g.length}`));
      g.forEach(s => list.append(spellCard(c, s, 'book')));
    }
  }
  renderList();
}

function renderChar(c, panel) {
  const set = (f, v) => { c[f] = v; save(); };
  const name = h('input', {id: 'name', value: c.name, on: {change: e => { set('name', e.target.value.trim() || 'Без имени'); render(); }}});
  const cls = h('select', {id: 'cls', on: {change: e => { c.cls = e.target.value; c.cur = null; c.pact = null; c.sp = null; norm(c); save(); render(); }}},
    ...Object.keys(CLASSES).map(k => h('option', {value: k, selected: k === c.cls}, cap(k))));
  const sub = h('input', {id: 'sub', value: c.sub, placeholder: 'например, Аберрантный разум', on: {change: e => { set('sub', e.target.value.trim()); render(); }}});
  const stepper = (label, val, fn) => h('label', {class: 'fld'}, label, h('div', {class: 'row'},
    h('button', {class: 'step', 'aria-label': label + ' меньше', on: {click: () => fn(-1)}}, '−'),
    h('span', {class: 'num'}, val),
    h('button', {class: 'step', 'aria-label': label + ' больше', on: {click: () => fn(1)}}, '+')));
  panel.append(h('div', {class: 'box'},
    h('h2', {}, 'Персонаж'),
    h('label', {class: 'fld'}, 'Имя', name),
    h('div', {class: 'grid2'}, h('label', {class: 'fld'}, 'Класс', cls), h('label', {class: 'fld'}, 'Подкласс', sub)),
    h('div', {class: 'grid2'},
      stepper('Уровень', String(c.lvl), d => { const n = Math.min(20, Math.max(1, c.lvl + d)); if (n !== c.lvl) { c.lvl = n; c.cur = slotsFor(c).slice(); c.pact = pactSlots(n); c.sp = maxPoints(c); c.arc = {}; norm(c); save(); render(); } }),
      stepper(`Модификатор (${cfg(c).ab})`, sign(c.mod), d => { const n = Math.min(10, Math.max(-5, c.mod + d)); if (n !== c.mod) { c.mod = n; save(); render(); } }))));
  panel.append(h('div', {class: 'box'},
    h('h2', {}, 'Файлы'),
    h('p', {class: 'note'}, 'Сохраните персонажа в файл, чтобы перенести на другое устройство или не потерять при смене телефона. Импорт принимает и файл персонажа, и новый файл заклинаний.'),
    h('div', {class: 'row'},
      h('button', {class: 'btn primary', on: {click: () => exportChar(c)}}, 'Сохранить персонажа в файл'),
      h('button', {class: 'btn', on: {click: pickFile}}, 'Импорт файла'))));
  const del = h('div', {class: 'box'}, h('h2', {}, 'Удаление'));
  const confirmRow = h('div', {class: 'row', hidden: true},
    h('span', {class: 'sub grow'}, `Удалить «${c.name}» насовсем?`),
    h('button', {class: 'btn danger', on: {click: () => { S.chars = S.chars.filter(x => x.id !== c.id); S.active = S.chars[0] ? S.chars[0].id : null; save(); ui.tab = 'fight'; render(); }}}, 'Да, удалить'),
    h('button', {class: 'btn', on: {click: () => { confirmRow.hidden = true; ask.hidden = false; }}}, 'Отмена'));
  const ask = h('button', {class: 'btn danger', on: {click: () => { ask.hidden = true; confirmRow.hidden = false; }}}, 'Удалить персонажа');
  del.append(ask, confirmRow);
  panel.append(del);
  panel.append(h('p', {class: 'note'}, `Загружено заклинаний: ${SPELLS.length}. Всё хранится только на этом устройстве.`));
}

// ---------- start ----------
render();
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  const hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.register('sw.js').catch(() => {});
  let reloaded = false;
  // a new version took over: reload once so the fresh code runs (skip on the very first install)
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (hadController && !reloaded) { reloaded = true; location.reload(); } });
}
