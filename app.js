'use strict';
/* Гримуар партии — offline D&D 5e (2014) helper.
   Spells come from a file the user imports (dnd.su export or prepared spells.json);
   characters live in localStorage and can be exported/imported as files. */

// English names of SRD 5.1 spells (CC-BY-4.0, Wizards of the Coast), keyed by letters-only slug
const EN = {"acidarrow":"Acid Arrow","acidsplash":"Acid Splash","aid":"Aid","alarm":"Alarm","alterself":"Alter Self","animalfriendship":"Animal Friendship","animalmessenger":"Animal Messenger","animalshapes":"Animal Shapes","animatedead":"Animate Dead","animateobjects":"Animate Objects","antilifeshell":"Antilife Shell","antimagicfield":"Antimagic Field","antipathysympathy":"Antipathy/Sympathy","arcaneeye":"Arcane Eye","arcanehand":"Arcane Hand","arcanelock":"Arcane Lock","arcanesword":"Arcane Sword","arcanistsmagicaura":"Arcanist's Magic Aura","astralprojection":"Astral Projection","augury":"Augury","awaken":"Awaken","bane":"Bane","banishment":"Banishment","barkskin":"Barkskin","beaconofhope":"Beacon of Hope","bestowcurse":"Bestow Curse","blacktentacles":"Black Tentacles","bladebarrier":"Blade Barrier","bless":"Bless","blight":"Blight","blindnessdeafness":"Blindness/Deafness","blink":"Blink","blur":"Blur","brandingsmite":"Branding Smite","burninghands":"Burning Hands","calllightning":"Call Lightning","calmemotions":"Calm Emotions","chainlightning":"Chain Lightning","charmperson":"Charm Person","chilltouch":"Chill Touch","circleofdeath":"Circle of Death","clairvoyance":"Clairvoyance","clone":"Clone","cloudkill":"Cloudkill","colorspray":"Color Spray","command":"Command","commune":"Commune","communewithnature":"Commune With Nature","comprehendlanguages":"Comprehend Languages","compulsion":"Compulsion","coneofcold":"Cone of Cold","confusion":"Confusion","conjureanimals":"Conjure Animals","conjurecelestial":"Conjure Celestial","conjureelemental":"Conjure Elemental","conjurefey":"Conjure Fey","conjureminorelementals":"Conjure Minor Elementals","conjurewoodlandbeings":"Conjure Woodland Beings","contactotherplane":"Contact Other Plane","contagion":"Contagion","contingency":"Contingency","continualflame":"Continual Flame","controlwater":"Control Water","controlweather":"Control Weather","counterspell":"Counterspell","createfoodandwater":"Create Food and Water","createundead":"Create Undead","createordestroywater":"Create or Destroy Water","creation":"Creation","curewounds":"Cure Wounds","dancinglights":"Dancing Lights","darkness":"Darkness","darkvision":"Darkvision","daylight":"Daylight","deathward":"Death Ward","delayedblastfireball":"Delayed Blast Fireball","demiplane":"Demiplane","detectevilandgood":"Detect Evil and Good","detectmagic":"Detect Magic","detectpoisonanddisease":"Detect Poison and Disease","detectthoughts":"Detect Thoughts","dimensiondoor":"Dimension Door","disguiseself":"Disguise Self","disintegrate":"Disintegrate","dispelevilandgood":"Dispel Evil and Good","dispelmagic":"Dispel Magic","divination":"Divination","divinefavor":"Divine Favor","divineword":"Divine Word","dominatebeast":"Dominate Beast","dominatemonster":"Dominate Monster","dominateperson":"Dominate Person","dream":"Dream","druidcraft":"Druidcraft","earthquake":"Earthquake","eldritchblast":"Eldritch Blast","enhanceability":"Enhance Ability","enlargereduce":"Enlarge/Reduce","entangle":"Entangle","enthrall":"Enthrall","etherealness":"Etherealness","expeditiousretreat":"Expeditious Retreat","eyebite":"Eyebite","fabricate":"Fabricate","faeriefire":"Faerie Fire","faithfulhound":"Faithful Hound","falselife":"False Life","fear":"Fear","featherfall":"Feather Fall","feeblemind":"Feeblemind","findfamiliar":"Find Familiar","findsteed":"Find Steed","findtraps":"Find Traps","findthepath":"Find the Path","fingerofdeath":"Finger of Death","firebolt":"Fire Bolt","fireshield":"Fire Shield","firestorm":"Fire Storm","fireball":"Fireball","flameblade":"Flame Blade","flamestrike":"Flame Strike","flamingsphere":"Flaming Sphere","fleshtostone":"Flesh to Stone","floatingdisk":"Floating Disk","fly":"Fly","fogcloud":"Fog Cloud","forbiddance":"Forbiddance","forcecage":"Forcecage","foresight":"Foresight","freedomofmovement":"Freedom of Movement","freezingsphere":"Freezing Sphere","gaseousform":"Gaseous Form","gate":"Gate","geas":"Geas","gentlerepose":"Gentle Repose","giantinsect":"Giant Insect","glibness":"Glibness","globeofinvulnerability":"Globe of Invulnerability","glyphofwarding":"Glyph of Warding","goodberry":"Goodberry","grease":"Grease","greaterinvisibility":"Greater Invisibility","greaterrestoration":"Greater Restoration","guardianoffaith":"Guardian of Faith","guardsandwards":"Guards and Wards","guidance":"Guidance","guidingbolt":"Guiding Bolt","gustofwind":"Gust of Wind","hallow":"Hallow","hallucinatoryterrain":"Hallucinatory Terrain","harm":"Harm","haste":"Haste","heal":"Heal","healingword":"Healing Word","heatmetal":"Heat Metal","hellishrebuke":"Hellish Rebuke","heroesfeast":"Heroes' Feast","heroism":"Heroism","hideouslaughter":"Hideous Laughter","holdmonster":"Hold Monster","holdperson":"Hold Person","holyaura":"Holy Aura","huntersmark":"Hunter's Mark","hypnoticpattern":"Hypnotic Pattern","icestorm":"Ice Storm","identify":"Identify","illusoryscript":"Illusory Script","imprisonment":"Imprisonment","incendiarycloud":"Incendiary Cloud","inflictwounds":"Inflict Wounds","insectplague":"Insect Plague","instantsummons":"Instant Summons","invisibility":"Invisibility","irresistibledance":"Irresistible Dance","jump":"Jump","knock":"Knock","legendlore":"Legend Lore","lesserrestoration":"Lesser Restoration","levitate":"Levitate","light":"Light","lightningbolt":"Lightning Bolt","locateanimalsorplants":"Locate Animals or Plants","locatecreature":"Locate Creature","locateobject":"Locate Object","longstrider":"Longstrider","magearmor":"Mage Armor","magehand":"Mage Hand","magiccircle":"Magic Circle","magicjar":"Magic Jar","magicmissile":"Magic Missile","magicmouth":"Magic Mouth","magicweapon":"Magic Weapon","magnificentmansion":"Magnificent Mansion","majorimage":"Major Image","masscurewounds":"Mass Cure Wounds","massheal":"Mass Heal","masshealingword":"Mass Healing Word","masssuggestion":"Mass Suggestion","maze":"Maze","meldintostone":"Meld Into Stone","mending":"Mending","message":"Message","meteorswarm":"Meteor Swarm","mindblank":"Mind Blank","minorillusion":"Minor Illusion","miragearcane":"Mirage Arcane","mirrorimage":"Mirror Image","mislead":"Mislead","mistystep":"Misty Step","modifymemory":"Modify Memory","moonbeam":"Moonbeam","moveearth":"Move Earth","nondetection":"Nondetection","passwithouttrace":"Pass Without Trace","passwall":"Passwall","phantasmalkiller":"Phantasmal Killer","phantomsteed":"Phantom Steed","planarally":"Planar Ally","planarbinding":"Planar Binding","planeshift":"Plane Shift","plantgrowth":"Plant Growth","poisonspray":"Poison Spray","polymorph":"Polymorph","powerwordkill":"Power Word Kill","powerwordstun":"Power Word Stun","prayerofhealing":"Prayer of Healing","prestidigitation":"Prestidigitation","prismaticspray":"Prismatic Spray","prismaticwall":"Prismatic Wall","privatesanctum":"Private Sanctum","produceflame":"Produce Flame","programmedillusion":"Programmed Illusion","projectimage":"Project Image","protectionfromenergy":"Protection From Energy","protectionfromevilandgood":"Protection from Evil and Good","protectionfrompoison":"Protection from Poison","purifyfoodanddrink":"Purify Food and Drink","raisedead":"Raise Dead","rayofenfeeblement":"Ray of Enfeeblement","rayoffrost":"Ray of Frost","regenerate":"Regenerate","reincarnate":"Reincarnate","removecurse":"Remove Curse","resilientsphere":"Resilient Sphere","resistance":"Resistance","resurrection":"Resurrection","reversegravity":"Reverse Gravity","revivify":"Revivify","ropetrick":"Rope Trick","sacredflame":"Sacred Flame","sanctuary":"Sanctuary","scorchingray":"Scorching Ray","scrying":"Scrying","secretchest":"Secret Chest","seeinvisibility":"See Invisibility","seeming":"Seeming","sending":"Sending","sequester":"Sequester","shapechange":"Shapechange","shatter":"Shatter","shield":"Shield","shieldoffaith":"Shield of Faith","shillelagh":"Shillelagh","shockinggrasp":"Shocking Grasp","silence":"Silence","silentimage":"Silent Image","simulacrum":"Simulacrum","sleep":"Sleep","sleetstorm":"Sleet Storm","slow":"Slow","sparethedying":"Spare the Dying","speakwithanimals":"Speak with Animals","speakwithdead":"Speak with Dead","speakwithplants":"Speak with Plants","spiderclimb":"Spider Climb","spikegrowth":"Spike Growth","spiritguardians":"Spirit Guardians","spiritualweapon":"Spiritual Weapon","stinkingcloud":"Stinking Cloud","stoneshape":"Stone Shape","stoneskin":"Stoneskin","stormofvengeance":"Storm of Vengeance","suggestion":"Suggestion","sunbeam":"Sunbeam","sunburst":"Sunburst","symbol":"Symbol","telekinesis":"Telekinesis","telepathicbond":"Telepathic Bond","teleport":"Teleport","teleportationcircle":"Teleportation Circle","thaumaturgy":"Thaumaturgy","thunderwave":"Thunderwave","timestop":"Time Stop","tinyhut":"Tiny Hut","tongues":"Tongues","transportviaplants":"Transport via Plants","treestride":"Tree Stride","truepolymorph":"True Polymorph","trueresurrection":"True Resurrection","trueseeing":"True Seeing","truestrike":"True Strike","unseenservant":"Unseen Servant","vampirictouch":"Vampiric Touch","viciousmockery":"Vicious Mockery","walloffire":"Wall of Fire","wallofforce":"Wall of Force","wallofice":"Wall of Ice","wallofstone":"Wall of Stone","wallofthorns":"Wall of Thorns","wardingbond":"Warding Bond","waterbreathing":"Water Breathing","waterwalk":"Water Walk","web":"Web","weird":"Weird","windwalk":"Wind Walk","windwall":"Wind Wall","wish":"Wish","wordofrecall":"Word of Recall","zoneoftruth":"Zone of Truth"};

// ---------- rules tables ----------
const FULL = [[2],[3],[4,2],[4,3],[4,3,2],[4,3,3],[4,3,3,1],[4,3,3,2],[4,3,3,3,1],[4,3,3,3,2],[4,3,3,3,2,1],[4,3,3,3,2,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1,1],[4,3,3,3,2,1,1,1],[4,3,3,3,2,1,1,1,1],[4,3,3,3,3,1,1,1,1],[4,3,3,3,3,2,1,1,1],[4,3,3,3,3,2,2,1,1]];
const HALF = [[],[2],[3],[3],[4,2],[4,2],[4,3],[4,3],[4,3,2],[4,3,2],[4,3,3],[4,3,3],[4,3,3,1],[4,3,3,1],[4,3,3,2],[4,3,3,2],[4,3,3,3,1],[4,3,3,3,1],[4,3,3,3,2],[4,3,3,3,2]];
const ARTIF = [[2],[2],[3],[3],[4,2],[4,2],[4,3],[4,3],[4,3,2],[4,3,2],[4,3,3],[4,3,3],[4,3,3,1],[4,3,3,1],[4,3,3,2],[4,3,3,2],[4,3,3,3,1],[4,3,3,3,1],[4,3,3,3,2],[4,3,3,3,2]];
const THIRD = [[],[],[2],[3],[3],[3],[4,2],[4,2],[4,2],[4,3],[4,3],[4,3],[4,3,2],[4,3,2],[4,3,2],[4,3,3],[4,3,3],[4,3,3],[4,3,3,1],[4,3,3,1]];
const THIRD_KNOWN = [0,0,3,4,4,4,5,6,6,7,8,8,9,10,10,11,11,11,12,13];
const steps = (lvl, base, at) => base + at.filter(a => lvl >= a).length;
const AB = ['str','dex','con','int','wis','cha'];
const ABN = {str:'Сил', dex:'Лов', con:'Тел', int:'Инт', wis:'Мдр', cha:'Хар'};
const ABFULL = {str:'Сила', dex:'Ловкость', con:'Телосложение', int:'Интеллект', wis:'Мудрость', cha:'Харизма'};
// ab = spellcasting ability; hd = hit die; saves = proficient saving throws
const CLASSES = {
  'варвар':      {hd:12, saves:['str','con'], unarmored:'con'},
  'бард':        {hd:8,  saves:['dex','cha'], ab:'cha', slots:FULL,  cantrips:l=>steps(l,2,[4,10]), known:[4,5,6,7,8,9,10,11,12,14,15,15,16,18,19,19,20,22,22,22]},
  'воин':        {hd:10, saves:['str','con']},
  'волшебник':   {hd:6,  saves:['int','wis'], ab:'int', slots:FULL,  cantrips:l=>steps(l,3,[4,10]), prep:(l,m)=>Math.max(1,m+l)},
  'друид':       {hd:8,  saves:['int','wis'], ab:'wis', slots:FULL,  cantrips:l=>steps(l,2,[4,10]), prep:(l,m)=>Math.max(1,m+l)},
  'жрец':        {hd:8,  saves:['wis','cha'], ab:'wis', slots:FULL,  cantrips:l=>steps(l,3,[4,10]), prep:(l,m)=>Math.max(1,m+l)},
  'изобретатель':{hd:8,  saves:['con','int'], ab:'int', slots:ARTIF, cantrips:l=>steps(l,2,[10,14]), prep:(l,m)=>Math.max(1,m+Math.floor(l/2))},
  'колдун':      {hd:8,  saves:['wis','cha'], ab:'cha', pact:true,   cantrips:l=>steps(l,2,[4,10]), known:[2,3,4,5,6,7,8,9,10,10,11,11,12,12,13,13,14,14,15,15]},
  'монах':       {hd:8,  saves:['str','dex'], unarmored:'wis'},
  'паладин':     {hd:10, saves:['wis','cha'], ab:'cha', slots:HALF,  cantrips:()=>0, prep:(l,m)=>l<2?0:Math.max(1,m+Math.floor(l/2))},
  'плут':        {hd:8,  saves:['dex','int']},
  'следопыт':    {hd:10, saves:['str','dex'], ab:'wis', slots:HALF,  cantrips:()=>0, known:[0,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11]},
  'чародей':     {hd:6,  saves:['con','cha'], ab:'cha', slots:FULL,  cantrips:l=>steps(l,4,[4,10]), known:[2,3,4,5,6,7,8,9,10,11,12,12,13,13,14,14,15,15,15,15], points:true},
};
// martial subclasses that cast from the wizard list
const CASTER_SUBS = {
  'воин|мистический рыцарь': {ab:'int', slots:THIRD, list:'волшебник', cantrips:l=>l<3?0:steps(l,2,[10]), known:THIRD_KNOWN},
  'плут|мистический ловкач': {ab:'int', slots:THIRD, list:'волшебник', cantrips:l=>l<3?0:steps(l,2,[10]), known:THIRD_KNOWN},
};
const EXTRA_SUBS = {'воин':['мистический рыцарь'], 'плут':['мистический ловкач']};
const COST = {1:2,2:3,3:5,4:6,5:7};
const pactSlots = l => l<2?1: l<11?2: l<17?3: 4;
const pactLevel = l => Math.min(5, Math.ceil(l/2));
const arcanum = l => [6,7,8,9].filter(c => l >= c*2 - 1);
const pb = l => Math.ceil(l/4) + 1;
const mod = v => Math.floor((v - 10) / 2);
const CIRCLE = c => c === 0 ? 'Заговоры' : c + ' круг';
const SKILLS = [['acr','Акробатика','dex'],['inv','Анализ','int'],['ath','Атлетика','str'],['prc','Внимательность','wis'],['sur','Выживание','wis'],
  ['prf','Выступление','cha'],['itm','Запугивание','cha'],['his','История','int'],['slt','Ловкость рук','dex'],['arc','Магия','int'],['med','Медицина','wis'],
  ['dec','Обман','cha'],['nat','Природа','int'],['ins','Проницательность','wis'],['rel','Религия','int'],['ste','Скрытность','dex'],['per','Убеждение','cha'],['ani','Уход за животными','wis']];
// name, damage, type, properties (f finesse, r ranged, t thrown, l light, 2 two-handed, h heavy, v versatile dice)
const WEAPONS = [
  ['Безоружный удар','1','дробящий',''],
  ['Боевой посох','1к6','дробящий','v1к8'],['Булава','1к6','дробящий',''],['Дубинка','1к4','дробящий','l'],['Кинжал','1к4','колющий','f l t'],
  ['Копьё','1к6','колющий','t v1к8'],['Лёгкий молот','1к4','дробящий','l t'],['Метательное копьё','1к6','колющий','t'],['Палица','1к8','дробящий','2'],
  ['Ручной топор','1к6','рубящий','l t'],['Серп','1к4','рубящий','l'],
  ['Дротик','1к4','колющий','f t r'],['Короткий лук','1к6','колющий','r 2'],['Лёгкий арбалет','1к8','колющий','r 2'],['Праща','1к4','дробящий','r'],
  ['Алебарда','1к10','рубящий','2 h'],['Боевая кирка','1к8','колющий',''],['Боевой молот','1к8','дробящий','v1к10'],['Боевой топор','1к8','рубящий','v1к10'],
  ['Глефа','1к10','рубящий','2 h'],['Двуручный меч','2к6','рубящий','2 h'],['Длинное копьё','1к12','колющий',''],['Длинный меч','1к8','рубящий','v1к10'],
  ['Кнут','1к4','рубящий','f'],['Короткий меч','1к6','колющий','f l'],['Моргенштерн','1к8','колющий',''],['Пика','1к10','колющий','2 h'],
  ['Рапира','1к8','колющий','f'],['Секира','1к12','рубящий','2 h'],['Скимитар','1к6','рубящий','f l'],['Трезубец','1к6','колющий','t v1к8'],['Цеп','1к8','дробящий',''],
  ['Ручной арбалет','1к6','колющий','r l'],['Длинный лук','1к8','колющий','r 2 h'],['Тяжёлый арбалет','1к10','колющий','r 2 h'],['Духовая трубка','1','колющий','r'],
];
// name, base AC, max Dex bonus (null = no cap, 0 = none)
const ARMORS = [['Стёганый',11,null],['Кожаный',11,null],['Проклёпанная кожа',12,null],['Шкурный',12,2],['Кольчужная рубаха',13,2],['Чешуйчатый',14,2],
  ['Кираса',14,2],['Полулаты',15,2],['Колечный',14,0],['Кольчуга',16,0],['Наборный',17,0],['Латы',18,0]];

// ---------- storage ----------
const K_SPELLS = 'grimoire-spells-v1', K_STATE = 'grimoire-state-v1';
const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
const store = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { toast('Не удалось сохранить: память браузера заполнена'); return false; } };
// spells, classes and races live in IndexedDB (too big for localStorage)
const idb = (() => {
  let dbp = null;
  const open = () => dbp || (dbp = new Promise((res, rej) => {
    const r = indexedDB.open('grimoire', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('kv');
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  }));
  const tx = (mode, fn) => open().then(db => new Promise((res, rej) => {
    const t = db.transaction('kv', mode), st = t.objectStore('kv'), q = fn(st);
    t.oncomplete = () => res(q && q.result); t.onerror = () => rej(t.error);
  }));
  return {get: k => tx('readonly', st => st.get(k)), set: (k, v) => tx('readwrite', st => st.put(v, k))};
})();
let SPELLS = [], CDATA = {classes: [], races: []};
let BY = {};
const indexSpells = () => { BY = Object.fromEntries(SPELLS.map(s => [s.id, s])); BYEN = {}; for (const s of SPELLS) { BYEN[letters(s.id)] = s; BYEN[letters(s.e)] = s; } };

const uid = () => Math.random().toString(36).slice(2, 9);
const newChar = () => ({id: 'c' + Date.now().toString(36), name: 'Новый персонаж', race: '', cls: 'чародей', sub: '', lvl: 1,
  abil: {str:10, dex:10, con:10, int:10, wis:10, cha:10}, saves: null, skills: {}, speed: 30,
  raceVar: '', opts: [], res: {}, hp: {max: 0, cur: 0, tmp: 0}, hpAuto: true, hdUsed: 0, spells: [], hide: [], cur: null, pact: null, arc: {}, sp: null, conc: null,
  armor: '', shield: false, acMagic: 0, acMisc: 0, mageArmor: false, items: [], feats: [], gear: ''});
let S = load(K_STATE, null) || {chars: [], active: null};
let ui = {tab: 'fight', open: new Set(), q: '', circle: 'all', scope: 'class', subOther: false, optOpen: {}};

const char = () => S.chars.find(c => c.id === S.active) || null;
const base = c => CLASSES[c.cls] || CLASSES['чародей'];
// the spellcasting profile: the class itself, or a martial caster subclass, or null
function caster(c) {
  const b = base(c);
  if (b.ab) return Object.assign({list: c.cls}, b);
  return CASTER_SUBS[c.cls + '|' + (c.sub || '').toLowerCase()] || null;
}
const am = (c, a) => mod(c.abil[a] || 10);
const spellMod = c => { const k = caster(c); return k ? am(c, k.ab) : 0; };
const slotsFor = c => { const k = caster(c); return !k || k.pact ? [] : (k.slots[c.lvl - 1] || []); };
const hasSubSpells = c => !!subKey(c) && SPELLS.some(s => fromSub(c, s));
const maxCircle = c => { const k = caster(c); if (!k) return hasSubSpells(c) ? 9 : -1; return k.pact ? Math.max(pactLevel(c.lvl), ...arcanum(c.lvl)) : slotsFor(c).length; };
const maxPoints = c => { const k = caster(c); return k && k.points && c.lvl >= 2 ? c.lvl : 0; };
// +1 HP per level: Draconic Resilience (sorcerer) and Dwarven Toughness (hill dwarf)
const hpPerLvl = c => ((c.sub || '').toLowerCase() === 'наследие драконьей крови' ? 1 : 0) + (/холмов/i.test(c.raceVar || '') ? 1 : 0);
const avgHp = c => { const d = base(c).hd, con = am(c, 'con'); return Math.max(1, d + con + (c.lvl - 1) * (d / 2 + 1 + con) + hpPerLvl(c) * c.lvl); };
const HEAVY = ['Колечный', 'Кольчуга', 'Наборный', 'Латы'];
// speed with Unarmored Movement (monk) and Fast Movement (barbarian)
function speedOf(c) {
  let v = c.speed;
  if (c.cls === 'монах' && !c.armor && !c.shield) v += parseInt(tableRow(c)['Скорость без доспехов'], 10) || 0;
  if (c.cls === 'варвар' && c.lvl >= 5 && !HEAVY.includes(c.armor)) v += 10;
  return v;
}
// initiative: Dex, plus Jack of All Trades for bards from 2nd level
const initOf = c => am(c, 'dex') + (c.cls === 'бард' && c.lvl >= 2 ? Math.floor(pb(c.lvl) / 2) : 0);
function norm(c) {
  const d = newChar();
  for (const k of Object.keys(d)) if (c[k] === undefined) c[k] = d[k];
  if (c.mod != null) { const k = caster(c); if (k) c.abil[k.ab] = 10 + 2 * c.mod; delete c.mod; }   // old file format
  if (!c.saves) c.saves = Object.fromEntries(AB.map(a => [a, base(c).saves.includes(a)]));
  c.spells.forEach(x => { delete x.b; delete x.m; });
  if (!Array.isArray(c.cur)) c.cur = slotsFor(c).slice();
  while (c.cur.length < 9) c.cur.push(0);
  if (c.pact == null) c.pact = pactSlots(c.lvl);
  if (c.sp == null) c.sp = maxPoints(c);
  if (!c.hp.max) { c.hp.max = avgHp(c); c.hp.cur = c.hp.max; }
  // max HP follows class, level and Con until the player sets it by hand
  if (c.hpAuto && c.hp.max !== avgHp(c)) { const was = c.hp.max; c.hp.max = avgHp(c); c.hp.cur = Math.max(0, Math.min(c.hp.max, c.hp.cur + c.hp.max - was)); }
}
function save() { const c = char(); if (c) c.t = Date.now(); store(K_STATE, S); }

// ---------- import / export ----------
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
      norm(c); S.chars.push(c); S.active = c.id; save(); toast('Персонаж «' + c.name + '» добавлен'); render(); return;
    }
    if (data && data.kind === 'grimoire-data') { setData(data.spells || SPELLS, {classes: data.classes || [], races: data.races || []}); return; }
    if (!Array.isArray(data)) { toast('Не узнал формат файла.'); return; }
    if (data.length && data[0].kind && data[0].html) { toast('Это сырая выгрузка классов. Нужен готовый файл данных гримуара.'); return; }
    const list = data.length && 'n' in data[0] && 'l' in data[0] ? data : parseExport(data);
    if (!list.length) { toast('В файле не нашлось заклинаний.'); return; }
    setData(list, CDATA);
  };
  rd.readAsText(file);
}
function setData(spells, cdata) {
  SPELLS = spells; CDATA = cdata; indexSpells();
  idb.set('data', {spells, classes: cdata.classes, races: cdata.races}).then(() => {
    try { localStorage.removeItem(K_SPELLS); } catch (e) {}
  }).catch(() => toast('Не удалось сохранить данные на устройстве'));
  if (!S.chars.length) { const c = newChar(); norm(c); S.chars.push(c); S.active = c.id; save(); ui.tab = 'char'; }
  toast(`Загружено: заклинаний ${spells.length}` + (cdata.classes.length ? `, классов ${cdata.classes.length}, рас ${cdata.races.length}` : ''));
  render();
}
function pickFile() {
  const inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.json,application/json';
  inp.onchange = () => inp.files[0] && importFile(inp.files[0]); inp.click();
}
function exportChar(c) {
  const blob = new Blob([JSON.stringify({kind: 'grimoire-character', v: 2, char: c}, null, 1)], {type: 'application/json'});
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
    else if (k === 'value') e.value = v;
    else if (v !== false && v != null) e.setAttribute(k, v === true ? '' : v);
  }
  for (const c of kids.flat()) if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c));
  return e;
};
function toast(t) { const el = document.getElementById('toast'); el.textContent = t; el.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => el.hidden = true, 2200); }
const ru = (a, b) => a.n.localeCompare(b.n, 'ru');
// subclass spells that are always prepared/known: added automatically once their circle is available
// (not for warlock patrons, the druid's Circle of the Land or Divine Soul — those are choices)
// subclasses whose spell list is a menu to choose from, not a set of spells granted automatically
const AUTO_OFF = ['колдун', 'друид|круг земли', 'чародей|божественная душа', 'монах|путь четырёх стихий',
  'волшебник|магия хронургии', 'волшебник|магия гравитургии', 'варвар|путь великана', 'воин|мистический лучник'];
function autoSub(c) {
  if (!subKey(c) || AUTO_OFF.includes(c.cls) || AUTO_OFF.includes(c.cls + '|' + c.sub.toLowerCase())) return [];
  const mc = Math.max(maxCircle(c), 0);
  return SPELLS.filter(s => fromSub(c, s) && s.l <= mc && !(c.hide || []).includes(s.id));
}
// ---- racial spells: read from the race traits ("[thaumaturgy]", "Начиная с 3-го уровня ...") ----
let BYEN = {};
const letters = t => String(t || '').toLowerCase().replace(/[^a-z]/g, '');
function raceMagic(c) {
  const key = c.race + '|' + c.raceVar + '|' + SPELLS.length;
  if (raceMagic.k === key) return raceMagic.v;
  const grants = [], list = new Set(), choices = [];
  for (const t of raceTraits(c)) {
    if (/иммунитет/i.test(t.x)) continue;
    const mark = /^Заклинания метки/.test(t.n);
    for (const sent of t.x.split(/(?<=[.!?])\s+/)) {
      const lv = +((sent.match(/(\d+)-(?:го|м|й)\s+уровн/) || [])[1] || 1);
      for (const m of sent.matchAll(/\[([^\]]+)\]/g)) {
        const sp = BYEN[letters(m[1])];
        if (!sp) continue;
        if (mark) list.add(sp.id); else grants.push({id: sp.id, lvl: lv});
      }
    }
    const ch = t.x.match(/знаете один заговор (?:на ваш выбор )?из списка заклинаний ([а-яё]+)/i);
    if (ch) choices.push({n: 1, label: 'раса', ok: s => s.l === 0 && s.cl.includes(ch[1].replace(/а$/, ''))});
  }
  return (raceMagic.k = key, raceMagic.v = {grants, list, choices});
}
const autoRace = c => raceMagic(c).grants.filter(g => g.lvl <= c.lvl && !(c.hide || []).includes(g.id)).map(g => BY[g.id]).filter(Boolean);
const autoAll = c => { const seen = new Set(); return [...autoSub(c), ...autoRace(c)].filter(s => !seen.has(s.id) && seen.add(s.id)); };
const picked = (c, id) => c.spells.find(x => x.id === id) || (autoAll(c).some(s => s.id === id) ? {id, auto: true} : null);
const mySpells = c => { const ids = new Set(c.spells.map(x => x.id)); return [...c.spells.map(x => BY[x.id]), ...autoAll(c).filter(s => !ids.has(s.id))].filter(Boolean); };
const shortTime = t => /^1 действие/.test(t) ? 'действие' : /^1 бонусное/.test(t) ? 'бонус' : /^1 реакция/.test(t) ? 'реакция' : t;
const cap = s => s ? s[0].toUpperCase() + s.slice(1) : s;
const sign = n => (n >= 0 ? '+' : '') + n;
const subKey = c => c.sub ? (c.sub.trim().toLowerCase() + ' (' + c.cls + ')') : '';
// exact match on the spell's subclass list ("сумрачный охотник" must not match "охотник")
const subsOf = s => s._subs || (s._subs = s.sc.toLowerCase().split(/,\s*|;\s*/).map(x => x.trim()).filter(Boolean));
const fromSub = (c, s) => !!subKey(c) && subsOf(s).includes(subKey(c));
// subclasses whose granted spells may be swapped on level-up for another spell of the same circle
// from the sorcerer, warlock or wizard list of the given schools (Tasha's Cauldron)
const SWAP_RULES = {'чародей|аберрантный разум': ['прорицание', 'очарование'], 'чародей|заводная душа': ['ограждение', 'преобразование']};
// which picked spells stand in for removed subclass spells: id -> name of the spell it replaces
function swapMap(c) {
  const rule = SWAP_RULES[c.cls + '|' + (c.sub || '').toLowerCase()], out = new Map();
  if (!rule) return out;
  const mc = Math.max(maxCircle(c), 0);
  const removed = (c.hide || []).map(id => BY[id]).filter(s => s && fromSub(c, s) && s.l <= mc);
  const cand = c.spells.map(x => ({x, s: BY[x.id]})).filter(({x, s}) => s && !fromSub(c, s)
    && rule.some(r => s.s.startsWith(r)) && s.cl.some(k => ['чародей', 'колдун', 'волшебник'].includes(k)))
    .sort((a, b) => (a.s.cl.includes(c.cls) ? 1 : 0) - (b.s.cl.includes(c.cls) ? 1 : 0));   // off-list spells first
  for (const r of removed) {
    const i = cand.findIndex(({s}) => s.l === r.l);
    if (i >= 0) { out.set(cand[i].s.id, r.n); cand.splice(i, 1); }
  }
  return out;
}
// subclass spells that still count toward the limit: warlock patron lists (not cantrips) and dunamancy, which only widen the list
const COUNTED_SUB = c => c.cls === 'колдун' || ['волшебник|магия хронургии', 'волшебник|магия гравитургии'].includes(c.cls + '|' + (c.sub || '').toLowerCase());
const hasOpt = (c, name) => c.opts.some(o => o.toLowerCase().endsWith('|' + name.toLowerCase()));
// spells that may be taken for free on top of the limit, by the rules of race, subclass and class options
function freeSlots(c) {
  const sub = (c.sub || '').toLowerCase(), L = c.lvl, out = [...raceMagic(c).choices];
  const k = caster(c), onList = s => k && s.cl.includes(k.list);
  if (c.cls === 'чародей' && sub === 'божественная душа') out.push({n: 1, label: 'родство', ok: s => fromSub(c, s)});
  if ((c.cls === 'варвар' && sub === 'путь великана') || (c.cls === 'воин' && sub === 'мистический лучник')) out.push({n: 1, label: 'подкласс', ok: s => fromSub(c, s)});
  if (c.cls === 'жрец' && sub === 'домен природы') out.push({n: 1, label: 'домен', ok: s => s.l === 0 && s.cl.includes('друид')});
  if (c.cls === 'жрец' && sub === 'домен магии') out.push({n: 2, label: 'домен', ok: s => s.l === 0 && s.cl.includes('волшебник')});
  if (c.cls === 'друид' && sub === 'круг земли' && L >= 2) out.push({n: 1, label: 'круг', ok: s => s.l === 0 && s.cl.includes('друид')});
  if (c.cls === 'бард' && sub === 'коллегия знаний' && L >= 6) out.push({n: 2, label: 'тайны', ok: s => !onList(s)});
  if (c.cls === 'колдун' && L >= 3 && hasOpt(c, 'Договор гримуара')) out.push({n: 3, label: 'гримуар', ok: s => s.l === 0 && !onList(s)});
  if (c.cls === 'колдун' && hasOpt(c, 'КНИГА ДРЕВНИХ СЕКРЕТОВ')) out.push({n: 99, label: 'ритуал', ok: s => s.r && !onList(s)});
  return out;
}
// assign picked spells to free slots and swaps: id -> label
function freeMap(c) {
  const out = new Map();
  for (const [id, n] of swapMap(c)) out.set(id, 'вместо ' + n);
  const k = caster(c);
  const cand = c.spells.map(x => BY[x.id]).filter(s => s && !out.has(s.id) && !(fromSub(c, s) && !COUNTED_SUB(c) && !limitedSub(c)))
    .sort((a, b) => (k && a.cl.includes(k.list) ? 1 : 0) - (k && b.cl.includes(k.list) ? 1 : 0));   // off-list spells first
  for (const slot of freeSlots(c)) {
    let n = slot.n;
    for (const s of cand) if (n > 0 && !out.has(s.id) && slot.ok(s)) { out.set(s.id, slot.label); n--; }
  }
  return out;
}
// subclasses whose list is a menu with only some picks free (handled by freeSlots)
const limitedSub = c => ['чародей|божественная душа', 'варвар|путь великана', 'воин|мистический лучник'].includes(c.cls + '|' + (c.sub || '').toLowerCase());
const outOfLimit = (c, x) => {
  if (x.auto) return true;
  const s = BY[x.id];
  if (!s) return false;
  if (freeMap(c).has(x.id)) return true;
  if (fromSub(c, s)) return limitedSub(c) ? false : COUNTED_SUB(c) ? (c.cls === 'колдун' && s.l === 0) : true;
  return false;
};
// spells the book offers as "class list": own list, subclass, dragonmark spells and lists opened by free slots
function onBookList(c, s) {
  const k = caster(c);
  if (fromSub(c, s)) return true;
  if (k && s.cl.includes(k.list)) return true;
  if (k && raceMagic(c).list.has(s.id)) return true;
  if (c.cls === 'чародей' && (c.sub || '').toLowerCase() === 'божественная душа' && s.cl.includes('жрец')) return true;
  return freeSlots(c).some(sl => sl.n < 99 && sl.ok(s));
}
function subclassesOf(cls) {
  const d = CDATA.classes.find(x => x.cls === cls);
  if (d && d.subclasses.length) return d.subclasses.map(x => x.n.toLowerCase());
  const out = new Set(EXTRA_SUBS[cls] || []);
  for (const s of SPELLS) for (const m of s.sc.matchAll(/([^,;]+?)\s*\(([^)]+)\)/g))
    if (m[2].trim().toLowerCase() === cls) out.add(m[1].trim().toLowerCase());
  return [...out].sort((a, b) => a.localeCompare(b, 'ru'));
}
const stepper = (label, val, fn, id) => h('div', {class: 'fld'}, h('span', {}, label), h('div', {class: 'row nowrap'},
  h('button', {class: 'step', 'aria-label': label + ' меньше', on: {click: () => fn(-1)}}, '−'),
  h('span', {class: 'num', id}, val),
  h('button', {class: 'step', 'aria-label': label + ' больше', on: {click: () => fn(1)}}, '+')));
const box = (title, ...kids) => h('div', {class: 'box'}, title ? h('h2', {}, title) : null, ...kids);

// ---------- class & race data ----------
const nm = s => s && s === s.toUpperCase() ? s[0] + s.slice(1).toLowerCase() : s;
const CD = c => CDATA.classes.find(x => x.cls === c.cls);
const SUBD = c => { const d = CD(c); return d && c.sub ? d.subclasses.find(x => x.n.toLowerCase() === c.sub.toLowerCase()) : null; };
const RD = c => CDATA.races.find(r => r.race === c.race);
function raceTraits(c) {
  const r = RD(c); if (!r) return [];
  const v = r.variants.find(x => x.n === c.raceVar) || r.variants[0];
  const has = new Set(v.tr.map(t => t.n));
  // sub-race panes list only their own traits; add the base race traits underneath
  const baseV = r.variants[0];
  const extra = v !== baseV && !has.has('Скорость') ? baseV.tr.filter(t => !has.has(t.n) && t.n !== 'Разновидности' && t.n !== 'Подрасы') : [];
  return [...v.tr, ...extra];
}
// limited class resources by the 2014 rules; ids are stable so used counts survive level-ups
function classRes(c) {
  const L = c.lvl, out = [], add = (id, name, max, rest, note) => { if (max > 0) out.push({id, name, max, rest, note}); };
  const t = tableRow(c), sub = (c.sub || '').toLowerCase();
  switch (c.cls) {
    case 'варвар': { const r = parseInt(t['Ярость'], 10) || (L >= 17 ? 6 : L >= 12 ? 5 : L >= 6 ? 4 : L >= 3 ? 3 : 2); if (L < 20) add('rage', 'Ярость', r, 'long', t['Урон ярости'] ? `(урон ${t['Урон ярости']})` : ''); break; }
    case 'монах': if (L >= 2) add('ki', 'Ци', parseInt(t['Очки ци'], 10) || L, 'short'); break;
    case 'бард': add('insp', 'Вдохновение барда', Math.max(1, am(c, 'cha')), L >= 5 ? 'short' : 'long', `(к${L >= 15 ? 12 : L >= 10 ? 10 : L >= 5 ? 8 : 6})`); break;
    case 'воин':
      add('wind', 'Второе дыхание', 1, 'short');
      if (L >= 2) add('surge', 'Всплеск действий', L >= 17 ? 2 : 1, 'short');
      if (L >= 9) add('indom', 'Упорный', L >= 17 ? 3 : L >= 13 ? 2 : 1, 'long');
      if (sub === 'мастер боевых искусств' && L >= 3) add('sup', 'Кости превосходства', L >= 15 ? 6 : L >= 7 ? 5 : 4, 'short', `(к${L >= 18 ? 12 : L >= 10 ? 10 : 8})`);
      break;
    case 'жрец': if (L >= 2) add('cd', 'Божественный канал', L >= 18 ? 3 : L >= 6 ? 2 : 1, 'short'); break;
    case 'паладин':
      add('sense', 'Божественное чувство', 1 + Math.max(0, am(c, 'cha')), 'long');
      add('hands', 'Наложение рук (хиты)', 5 * L, 'long');
      if (L >= 3) add('cd', 'Божественный канал', 1, 'short');
      break;
    case 'друид': if (L >= 2 && L < 20) add('wild', 'Дикий облик', 2, 'short'); break;
    case 'волшебник': add('arec', 'Магическое восстановление', 1, 'long', `(ячейки на ${Math.ceil(L / 2)} кр.)`); break;
    case 'изобретатель': if (L >= 7) add('flash', 'Вспышка гениальности', Math.max(1, am(c, 'int')), 'long'); break;
  }
  return out;
}
const tableRow = c => { const d = CD(c); return d ? (d.table[c.lvl] || {}) : {}; };

// ---------- derived combat numbers ----------
function armorClass(c) {
  const dex = am(c, 'dex');
  let ac;
  const a = ARMORS.find(x => x[0] === c.armor);
  if (a) ac = a[1] + (a[2] === null ? dex : Math.min(dex, a[2]));
  else if (c.mageArmor || (c.sub || '').toLowerCase() === 'наследие драконьей крови') ac = 13 + dex;
  else {
    const u = base(c).unarmored;
    ac = 10 + dex + (u === 'con' ? am(c, 'con') : u === 'wis' && !c.shield ? am(c, 'wis') : 0);
  }
  return ac + (c.shield ? 2 : 0) + (+c.acMagic || 0) + (+c.acMisc || 0);
}
function attackOf(c, it) {
  const props = it.props || '';
  let ab = it.ab;
  if (!ab || ab === 'auto') ab = /r/.test(props.replace(/v\S+/, '')) ? 'dex' : /f/.test(props) ? (am(c, 'dex') > am(c, 'str') ? 'dex' : 'str') : 'str';
  const m = ab === 'spell' ? spellMod(c) : am(c, ab);
  const magic = +it.magic || 0;
  const hit = m + (it.prof !== false ? pb(c.lvl) : 0) + magic;
  const dmgMod = m + magic;
  const vers = (props.match(/v(\S+)/) || [])[1];
  const dmg = d => `${d}${dmgMod ? (dmgMod > 0 ? '+' : '−') + Math.abs(dmgMod) : ''}`;
  return {hit, dmg: dmg(it.dmg) + (vers ? ` (двумя руками ${dmg(vers)})` : ''), ab};
}

// ---------- rendering ----------
const app = document.getElementById('app');
function render() {
  // keep horizontal scroll of chip rows across re-renders
  const keep = {}; app.querySelectorAll('[data-keep]').forEach(e => keep[e.dataset.keep] = e.scrollLeft);
  // keep the page where it was: rebuilding empties it for a moment and the browser would jump to the top
  const y = window.scrollY;
  app.style.minHeight = app.offsetHeight + 'px';
  app.replaceChildren();
  if (!SPELLS.length) renderWelcome();
  else {
    let c = char();
    if (!c) { c = newChar(); norm(c); S.chars.push(c); S.active = c.id; save(); }
    norm(c);
    app.append(renderTop(c));
    const panel = h('section', {class: 'panel'});
    app.append(panel);
    ({fight: renderFight, book: renderBook, feats: renderFeats, skills: renderSkills, gear: renderGear, char: renderChar}[ui.tab] || renderFight)(c, panel);
  }
  app.querySelectorAll('[data-keep]').forEach(e => { if (keep[e.dataset.keep]) e.scrollLeft = keep[e.dataset.keep]; });
  app.style.minHeight = '';
  window.scrollTo(0, y);
}

function renderWelcome() {
  app.append(h('div', {class: 'lock'},
    h('h1', {}, 'Гримуар партии'),
    h('p', {class: 'note'}, 'Помощник для D&D 5e: заклинания, хиты, навыки, снаряжение. Работает без интернета, всё хранится только на этом устройстве.'),
    box('Загрузите файл данных',
      h('p', {class: 'note'}, 'Выберите файл grimoire_data.json, который вам прислали в чате партии: в нём заклинания, классы и расы. Это нужно сделать один раз.'),
      h('button', {class: 'btn primary', on: {click: pickFile}}, 'Выбрать файл'))));
}

function renderTop(c) {
  const sel = h('select', {class: 'grow', 'aria-label': 'Персонаж', on: {change: e => { S.active = e.target.value; ui.open.clear(); save(); render(); }}},
    ...S.chars.map(x => h('option', {value: x.id, selected: x.id === c.id}, x.name)));
  const add = h('button', {class: 'step', 'aria-label': 'Новый персонаж', on: {click: () => { const n = newChar(); norm(n); S.chars.push(n); S.active = n.id; ui.tab = 'char'; save(); render(); }}}, '+');
  const tabs = h('div', {class: 'tabs', role: 'tablist'},
    ...[['fight', 'Бой'], ['book', 'Книга'], ['feats', 'Умения'], ['skills', 'Навыки'], ['gear', 'Вещи'], ['char', 'Лист']].map(([id, t]) =>
      h('button', {class: 'tab', role: 'tab', 'aria-selected': ui.tab === id ? 'true' : 'false', on: {click: () => { ui.tab = id; render(); window.scrollTo(0, 0); }}}, t)));
  return h('div', {class: 'top'},
    h('div', {class: 'row nowrap'}, sel, add),
    h('div', {class: 'sub'}, [c.raceVar || c.race, cap(c.cls) + (c.sub ? ' · ' + cap(c.sub) : ''), c.lvl + ' ур.'].filter(Boolean).join(' · ')),
    tabs);
}

// --- Бой ---
function renderFight(c, panel) {
  const p = pb(c.lvl);
  // rests
  panel.append(h('div', {class: 'row'},
    h('button', {class: 'btn grow', on: {click: () => shortRest(c)}}, 'Короткий отдых'),
    h('button', {class: 'btn grow', on: {click: () => longRest(c)}}, 'Длинный отдых')));
  if (ui.hdOffer && c.lvl - c.hdUsed > 0) panel.append(h('div', {class: 'concbar'},
    h('span', {}, `Кости хитов: осталось ${c.lvl - c.hdUsed}. Бросьте к${base(c).hd}${sign(am(c, 'con'))} и прибавьте ползунком.`),
    h('div', {class: 'row nowrap'},
      h('button', {class: 'btn', on: {click: () => { c.hdUsed++; save(); render(); }}}, 'Потратить'),
      h('button', {class: 'btn', on: {click: () => { ui.hdOffer = false; render(); }}}, 'Готово'))));
  // HP: two sliders, current and temporary
  const hp = c.hp;
  const num = h('span', {class: 'hpnum'});
  const show = () => { num.textContent = `${hp.cur} / ${hp.max}` + (hp.tmp ? `  +${hp.tmp}` : ''); num.classList.toggle('low', hp.cur <= hp.max / 4); };
  show();
  const slider = (id, label, max, get, set) => {
    const v = h('b', {class: 'num'}, String(get()));
    const r = h('input', {type: 'range', id, min: '0', max: String(max), step: '1', value: String(get()), 'aria-label': label,
      on: {input: e => { set(+e.target.value); v.textContent = e.target.value; show(); }, change: () => save()}});
    return h('div', {class: 'slide'}, h('div', {class: 'row nowrap'}, h('span', {class: 'sub grow'}, label), v), r);
  };
  panel.append(box(null,
    h('div', {class: 'boxh'}, h('h2', {}, 'Хиты'), num),
    slider('hpCur', 'Текущие', hp.max, () => hp.cur, v => { hp.cur = v; }),
    slider('hpTmp', 'Временные', Math.max(20, hp.max), () => hp.tmp, v => { hp.tmp = v; }),
    h('p', {class: 'note'}, `Кости хитов: ${c.lvl - c.hdUsed}/${c.lvl} (к${base(c).hd}) · трата во время короткого отдыха`)));
  // core numbers in one grid: armour, initiative, speed (+ spell DC and attack for casters)
  const k = caster(c), sm = spellMod(c);
  const tiles = [[String(armorClass(c)), 'КД'], [sign(initOf(c)), 'Инициатива'], [String(speedOf(c)), 'Скорость']];
  if (k) tiles.push([String(8 + p + sm), 'СЛ закл.'], [sign(p + sm), 'Атака закл.'], [ABN[k.ab], 'Хар-ка закл.']);
  panel.append(h('div', {class: 'stats'}, ...tiles.map(([v, l]) => h('div', {class: 'stat'}, h('b', {}, v), h('span', {}, l)))));
  if (c.conc && BY[c.conc]) panel.append(h('div', {class: 'concbar'}, h('span', {}, 'Концентрация: ', h('b', {}, BY[c.conc].n)),
    h('button', {class: 'btn', on: {click: () => { c.conc = null; save(); render(); }}}, 'Сбросить')));
  // attacks
  const weapons = c.items.filter(i => i.kind === 'weapon' && i.eq !== false);
  if (weapons.length) {
    const list = h('div', {class: 'atk'});
    for (const it of weapons) {
      const a = attackOf(c, it);
      list.append(h('div', {class: 'atkrow'}, h('b', {}, it.name + (it.magic ? ` +${it.magic}` : '')), h('span', {class: 'hit'}, sign(a.hit)), h('span', {class: 'dmg'}, `${a.dmg} ${it.type || ''}`)));
    }
    panel.append(box('Атаки', list));
  }
  // class resources (rage, ki, inspiration…) + the player's own trackers
  const res = classRes(c);
  if (res.length || c.feats.length) {
    const fl = h('div', {class: 'slots'});
    for (const r of res) {
      const left = r.max - Math.min(r.max, c.res[r.id] || 0), restTxt = r.rest === 'short' ? 'кор.' : 'длин.';
      if (r.max <= 12) fl.append(slotPips(`${r.name}${r.note ? ' ' + r.note : ''} · ${restTxt}`, left, r.max, v => { c.res[r.id] = r.max - v; }));
      else fl.append(h('div', {class: 'slot'}, h('span', {class: 'lbl'}, `${r.name} · ${restTxt}`), h('div', {class: 'row nowrap'},
        h('button', {class: 'step', 'aria-label': r.name + ' потратить', on: {click: () => { c.res[r.id] = Math.min(r.max, (c.res[r.id] || 0) + 1); save(); render(); }}}, '−'),
        h('span', {class: 'num'}, `${left}/${r.max}`),
        h('button', {class: 'step', 'aria-label': r.name + ' вернуть', on: {click: () => { c.res[r.id] = Math.max(0, (c.res[r.id] || 0) - 1); save(); render(); }}}, '+'))));
    }
    c.feats.forEach(f => fl.append(slotPips(`${f.name} · ${f.rest === 'short' ? 'кор.' : 'длин.'}`, f.left, f.max, v => { f.left = v; })));
    panel.append(box('Ресурсы', fl));
  }
  // spells: slots box for casters, then the chosen spells
  if (k) {
    const sb = h('div', {class: 'box'}, h('h2', {}, 'Ячейки'));
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
    sb.append(grid.childNodes.length ? grid : h('p', {class: 'note'}, 'На этом уровне ячеек ещё нет.'));
    if (maxPoints(c)) {
      sb.append(h('div', {class: 'row nowrap'},
        h('span', {class: 'sub grow'}, 'Единицы чародейства'),
        h('button', {class: 'step', disabled: c.sp <= 0, 'aria-label': 'Потратить единицу', on: {click: () => { c.sp--; save(); render(); }}}, '−'),
        h('span', {class: 'num'}, `${c.sp}/${maxPoints(c)}`),
        h('button', {class: 'step', 'aria-label': 'Добавить единицу', on: {click: () => { c.sp++; save(); render(); }}}, '+')));
      const top = Math.min(5, slotsFor(c).length);
      const mk = h('div', {class: 'cast'}, h('span', {class: 'sub full'}, 'Единицы → ячейка'));
      for (let lv = 1; lv <= top; lv++) mk.append(h('button', {class: 'btn', disabled: c.sp < COST[lv], on: {click: () => { c.sp -= COST[lv]; c.cur[lv - 1]++; save(); toast(`Создана ячейка ${lv} круга`); render(); }}}, `${lv} кр. за ${COST[lv]}`));
      const back = h('div', {class: 'cast'}, h('span', {class: 'sub full'}, 'Ячейка → единицы'));
      for (let lv = 1; lv <= slotsFor(c).length; lv++) back.append(h('button', {class: 'btn', disabled: !(c.cur[lv - 1] > 0), on: {click: () => { c.cur[lv - 1]--; c.sp += lv; save(); toast(`+${lv} ед.`); render(); }}}, `${lv} кр. → ${lv}`));
      sb.append(mk, back);
    }
    panel.append(sb);
  }
  const mine = mySpells(c);
  if (!mine.length) { if (k) panel.append(h('p', {class: 'empty'}, 'Заклинания не выбраны. Откройте «Книгу» и отметьте, что знает персонаж.')); return; }
  if (!k) panel.append(h('div', {class: 'lvlh'}, 'Заклинания от расы и подкласса'));
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
    pips.append(h('button', {class: 'pip' + (on ? '' : ' off') + (i >= max ? ' extra' : ''), 'aria-label': `${label}: ${i + 1} ${on ? 'есть' : 'потрачено'}`,
      on: {click: () => { set(on ? i : i + 1); save(); render(); }}}));
  }
  return h('div', {class: 'slot'}, h('span', {class: 'lbl'}, label), pips);
}
function shortRest(c) {
  c.pact = pactSlots(c.lvl);
  c.feats.forEach(f => { if (f.rest === 'short') f.left = f.max; });
  classRes(c).forEach(r => { if (r.rest === 'short') delete c.res[r.id]; });
  ui.hdOffer = true; ui.tab = 'fight';
  save(); render(); toast('Короткий отдых завершён');
}
function longRest(c) {
  c.cur = slotsFor(c).slice(); while (c.cur.length < 9) c.cur.push(0);
  c.pact = pactSlots(c.lvl); c.arc = {}; c.sp = maxPoints(c); c.conc = null;
  c.hp.cur = c.hp.max; c.hp.tmp = 0;
  c.hdUsed = Math.max(0, c.hdUsed - Math.max(1, Math.floor(c.lvl / 2)));
  c.feats.forEach(f => f.left = f.max);
  c.res = {};
  ui.hdOffer = false;
  save(); toast('Длинный отдых: хиты, ячейки и ресурсы восстановлены'); render();
}

// --- spell cards ---
function spellCard(c, s, mode) {
  const key = mode + s.id, open = ui.open.has(key), mine = picked(c, s.id);
  const tags = [];
  const st = shortTime(s.t);
  if (st === 'бонус' || st === 'реакция') tags.push(h('span', {class: 'tag a'}, st));
  if (s.k) tags.push(h('span', {class: 'tag k'}, 'К'));
  if (s.r) tags.push(h('span', {class: 'tag'}, 'Р'));
  if (fromSub(c, s)) tags.push(h('span', {class: 'tag k'}, 'подкласс'));
  const fr = freeMap(c).get(s.id) || (raceMagic(c).grants.some(g => g.id === s.id) && mine && mine.auto ? 'раса' : '');
  if (fr) tags.push(h('span', {class: 'tag k'}, fr));
  const head = h('div', {class: 'sh'});
  if (mode === 'book') head.append(h('button', {class: 'pick' + (mine ? ' on' : '') + (mine && outOfLimit(c, mine) ? ' b' : ''), 'aria-pressed': mine ? 'true' : 'false',
    'aria-label': mine ? 'Убрать из выбранных' : 'Выбрать', on: {click: () => togglePick(c, s)}}, mine ? '✓' : '+'));
  head.append(h('button', {class: 'open', 'aria-expanded': open ? 'true' : 'false', on: {click: () => { open ? ui.open.delete(key) : ui.open.add(key); render(); }}},
    h('b', {}, s.n), h('span', {}, [s.e, s.d, /^(действие|бонус|реакция)$/.test(st) ? '' : st].filter(Boolean).join(' · '))), ...tags);
  const card = h('div', {class: 'spell' + (mine && outOfLimit(c, mine) ? ' bonus' : '')}, head);
  if (!open) return card;
  const body = h('div', {class: 'sb'},
    h('div', {class: 'facts'},
      h('div', {}, h('span', {}, 'Круг и школа'), `${s.l ? s.l + ' круг' : 'Заговор'}, ${s.s}${s.r ? ', ритуал' : ''}`),
      h('div', {}, h('span', {}, 'Время'), s.t),
      h('div', {}, h('span', {}, 'Дистанция'), s.d),
      h('div', {}, h('span', {}, 'Длительность'), s.u),
      h('div', {class: 'wide'}, h('span', {}, 'Компоненты'), s.c),
      h('div', {class: 'wide'}, h('span', {}, 'Классы'), s.cl.join(', ') + (s.sc ? '; ' + s.sc : ''))),
    h('p', {class: 'text', text: s.x}));
  if (s.h) body.append(h('p', {class: 'higher', text: s.h}));
  if (mode === 'fight') body.append(castRow(c, s));
  card.append(body);
  return card;
}
function castRow(c, s) {
  const row = h('div', {class: 'cast'});
  const k = caster(c);
  if (s.l === 0) { if (s.k) row.append(h('button', {class: 'btn conc', on: {click: () => cast(c, s, 0)}}, 'Сотворить')); return row; }
  if (!k) { row.append(h('button', {class: 'btn primary', on: {click: () => cast(c, s, 0)}}, 'Использовать'), h('span', {class: 'sub'}, 'по правилам подкласса (ци и т. п.)')); return row; }
  if (k.pact && s.l >= 6) {
    const used = !!c.arc[s.l];
    row.append(h('button', {class: 'btn primary', disabled: used || !arcanum(c.lvl).includes(s.l), on: {click: () => { c.arc[s.l] = true; cast(c, s, -1); }}}, used ? 'Арканум потрачен' : 'Таинственный арканум'));
    return row;
  }
  if (k.pact) {
    const pl = pactLevel(c.lvl);
    row.append(h('button', {class: 'btn primary', disabled: c.pact <= 0 || s.l > pl, on: {click: () => { c.pact--; cast(c, s, pl); }}}, `Ячейка договора ${pl} кр. (${c.pact})`));
  } else {
    for (let lv = s.l; lv <= 9; lv++) {
      const left = c.cur[lv - 1] || 0, max = slotsFor(c)[lv - 1] || 0;
      if (!left && !max) continue;
      row.append(h('button', {class: 'btn' + (lv === s.l ? ' primary' : ''), disabled: left <= 0, on: {click: () => { c.cur[lv - 1]--; cast(c, s, lv); }}}, `${lv} кр. (${left})`));
    }
  }
  if (s.r) row.append(h('button', {class: 'btn', on: {click: () => cast(c, s, 'r')}}, 'Ритуалом'));
  return row;
}
function cast(c, s, lv) {
  let msg = s.n + (lv === 'r' ? ' — ритуал' : lv > 0 ? ` — ${lv} круг` : '');
  if (s.k) { const was = c.conc; c.conc = s.id; if (was && was !== s.id && BY[was]) msg += ` · ${BY[was].n} спадает`; }
  save(); toast(msg); render();
}
function togglePick(c, s) {
  c.hide = c.hide || [];
  const i = c.spells.findIndex(x => x.id === s.id), h = c.hide.indexOf(s.id);
  const auto = autoAll(c).some(x => x.id === s.id);
  if (i >= 0) { c.spells.splice(i, 1); if (fromSub(c, s) || raceMagic(c).grants.some(g => g.id === s.id)) c.hide.push(s.id); }
  else if (auto) c.hide.push(s.id);
  else if (h >= 0) c.hide.splice(h, 1);
  else c.spells.push({id: s.id});
  save(); render();
}

// --- Книга ---
function limits(c) {
  const k = caster(c);
  const all = mySpells(c).map(s => picked(c, s.id));
  const counted = all.filter(x => !outOfLimit(c, x));
  const nC = counted.filter(x => BY[x.id].l === 0).length, nS = counted.length - nC;
  const limC = k ? k.cantrips(c.lvl) : 0;
  const limS = !k ? 0 : k.known ? k.known[c.lvl - 1] : k.prep(c.lvl, spellMod(c));
  return {nC, nS, limC, limS, word: k && !k.known ? 'Подготовленные' : 'Известные'};
}
const countChip = (label, n, lim) => {
  const d = lim - n;
  return h('div', {class: 'count' + (d < 0 ? ' over' : d === 0 ? ' full' : '')},
    h('b', {}, `${n}/${lim}`), h('span', {}, label), h('small', {}, d < 0 ? `перебор на ${-d}` : d === 0 ? 'всё выбрано' : `можно ещё ${d}`));
};
function renderBook(c, panel) {
  const k = caster(c), mc = maxCircle(c);
  const subOnly = !k && hasSubSpells(c);
  if (subOnly) panel.append(h('p', {class: 'note'}, `Заклинания подкласса «${cap(c.sub)}»: тратятся по его правилам (например, ци), ячеек нет.`));
  else if (!k) panel.append(h('p', {class: 'note'}, 'У этого класса без подходящего подкласса нет заклинаний. Можно смотреть все заклинания для справки.'));
  else {
    const L = limits(c);
    panel.append(h('div', {class: 'counts'}, countChip('Заговоры', L.nC, L.limC), countChip(L.word, L.nS, L.limS),
      mySpells(c).some(s => outOfLimit(c, picked(c, s.id))) ? h('div', {class: 'count'}, h('b', {}, String(mySpells(c).filter(s => outOfLimit(c, picked(c, s.id))).length)), h('span', {}, 'Вне лимита'), h('small', {}, 'подкласс и др.')) : null));
  }
  if (!k && !subOnly && ui.scope === 'class') ui.scope = 'all';
  const q = h('input', {type: 'search', id: 'q', placeholder: 'Поиск: огненный, fireball, некромантия', value: ui.q, autocomplete: 'off', on: {input: e => { ui.q = e.target.value; renderList(); }}});
  panel.append(q);
  const scopeRow = h('div', {class: 'filters', 'data-keep': 'scope'});
  const circleRow = h('div', {class: 'filters', 'data-keep': 'circle'});
  panel.append(scopeRow, circleRow);
  const chips = () => {
    const keepS = scopeRow.scrollLeft, keepC = circleRow.scrollLeft;
    scopeRow.replaceChildren(...[['class', subOnly ? 'Список подкласса' : 'Список класса'], ['mine', 'Выбранные'], ['all', 'Все заклинания']].filter(x => k || subOnly || x[0] !== 'class').map(([id, t]) =>
      h('button', {class: 'f', 'aria-pressed': ui.scope === id ? 'true' : 'false', on: {click: () => { ui.scope = id; chips(); renderList(); }}}, t)));
    const lim = ui.scope === 'class' ? Math.max(mc, 0) : 9;
    if (ui.circle !== 'all' && +ui.circle > lim) ui.circle = 'all';
    circleRow.replaceChildren(
      h('button', {class: 'f', 'aria-pressed': ui.circle === 'all' ? 'true' : 'false', on: {click: () => { ui.circle = 'all'; chips(); renderList(); }}}, 'Любой круг'),
      ...Array.from({length: lim + 1}, (_, i) => h('button', {class: 'f', 'aria-pressed': ui.circle === String(i) ? 'true' : 'false',
        on: {click: () => { ui.circle = String(i); chips(); renderList(); }}}, i ? i + ' кр.' : 'Заговоры')));
    scopeRow.scrollLeft = keepS; circleRow.scrollLeft = keepC;
  };
  chips();
  const list = h('div', {class: 'panel'});
  panel.append(list);
  function renderList() {
    list.replaceChildren();
    const qq = ui.q.trim().toLowerCase();
    let arr = SPELLS;
    if (ui.scope === 'class') arr = arr.filter(s => onBookList(c, s) && (s.l <= mc || !k));
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

// --- Умения ---
function featCard(key, title, meta, text, extra) {
  const open = ui.open.has(key);
  const card = h('div', {class: 'spell'},
    h('div', {class: 'sh'}, extra || null, h('button', {class: 'open', 'aria-expanded': open ? 'true' : 'false', on: {click: () => { open ? ui.open.delete(key) : ui.open.add(key); render(); }}},
      h('b', {}, nm(title)), meta ? h('span', {}, meta) : null)));
  if (open) card.append(h('div', {class: 'sb'}, h('p', {class: 'text', text})));
  return card;
}
function renderFeats(c, panel) {
  const d = CD(c);
  if (!d) { panel.append(h('p', {class: 'empty'}, 'Нет данных о классах. Загрузите файл grimoire_data.json во вкладке «Лист».')); return; }
  const tr = Object.entries(tableRow(c)).filter(([, v]) => v && v !== '-');
  if (tr.length) panel.append(h('div', {class: 'chips'}, ...tr.map(([k, v]) => h('div', {class: 'chip'}, h('span', {}, k), h('b', {}, v)))));
  const sub = SUBD(c);
  const feats = d.features.filter(f => f.l <= c.lvl).map(f => ({...f, src: cap(c.cls)}));
  if (sub) feats.push(...sub.f.filter(f => f.l <= c.lvl).map(f => ({...f, src: sub.n})));
  feats.sort((a, b) => a.l - b.l);
  panel.append(h('div', {class: 'lvlh'}, `Умения класса · ${c.lvl} ур.`));
  feats.forEach(f => panel.append(featCard('f' + f.src + f.n, f.n, `${f.l} ур. · ${f.src}`, f.x)));
  const next = [...d.features, ...(sub ? sub.f : [])].filter(f => f.l > c.lvl).sort((a, b) => a.l - b.l);
  if (next.length) panel.append(h('p', {class: 'note'}, `Дальше: ${next.slice(0, 4).map(f => `${nm(f.n)} (${f.l})`).join(', ')}…`));
  if (!c.sub) panel.append(h('p', {class: 'note'}, 'Выберите подкласс во вкладке «Лист», чтобы увидеть его умения.'));
  // pickable options: metamagic, invocations, maneuvers, fighting styles, infusions
  for (const g of d.options) {
    const mine = g.items.filter(it => c.opts.includes(g.n + '|' + it.n));
    panel.append(h('div', {class: 'lvlh'}, nm(g.n) + (mine.length ? ` · выбрано ${mine.length}` : '')));
    mine.forEach(it => panel.append(optCard(c, g, it)));
    const open = !!ui.optOpen[g.n];
    panel.append(h('button', {class: 'btn', on: {click: () => { ui.optOpen[g.n] = !open; render(); }}}, open ? 'Скрыть список' : `Выбрать из списка (${g.items.length})`));
    if (open) g.items.filter(it => !mine.includes(it)).forEach(it => panel.append(optCard(c, g, it)));
  }
  const rt = raceTraits(c);
  if (rt.length) {
    panel.append(h('div', {class: 'lvlh'}, `Раса · ${c.raceVar || c.race}`));
    rt.forEach(t => panel.append(featCard('r' + t.n, t.n, '', t.x)));
  }
}
function optCard(c, g, it) {
  const key = g.n + '|' + it.n, on = c.opts.includes(key);
  const btn = h('button', {class: 'pick' + (on ? ' on' : ''), 'aria-pressed': on ? 'true' : 'false', 'aria-label': on ? 'Убрать' : 'Выбрать',
    on: {click: () => { on ? c.opts.splice(c.opts.indexOf(key), 1) : c.opts.push(key); save(); render(); }}}, on ? '✓' : '+');
  return featCard('o' + key, it.n, '', it.x, btn);
}

// --- Навыки ---
function renderSkills(c, panel) {
  const p = pb(c.lvl);
  const jack = c.cls === 'бард' && c.lvl >= 2;
  const sv = h('div', {class: 'list'});
  for (const a of AB) {
    const on = !!c.saves[a], v = am(c, a) + (on ? p : 0);
    sv.append(h('button', {class: 'li', 'aria-pressed': on ? 'true' : 'false', on: {click: () => { c.saves[a] = !on; save(); render(); }}},
      h('span', {class: 'dot' + (on ? ' on' : '')}), h('span', {class: 'grow'}, ABFULL[a]), h('b', {class: 'num'}, sign(v))));
  }
  panel.append(box('Спасброски', h('p', {class: 'note'}, 'Нажмите, чтобы отметить владение. По умолчанию отмечены спасброски класса.'), sv));
  panel.prepend(h('div', {class: 'stats'}, h('div', {class: 'stat'}, h('b', {}, sign(p)), h('span', {}, 'Бонус мастерства')), h('div', {class: 'stat'}, h('b', {}, String(c.lvl)), h('span', {}, 'Уровень')), h('div', {class: 'stat'}, h('b', {}, String(10 + am(c, 'wis') + ((c.skills.prc || 0) === 2 ? 2 * p : (c.skills.prc || 0) === 1 ? p : 0))), h('span', {}, 'Пасс. внимат.'))));
  const sk = h('div', {class: 'list'});
  for (const [id, name, a] of SKILLS) {
    const lvl = c.skills[id] || 0;
    const bonus = lvl === 2 ? 2 * p : lvl === 1 ? p : jack ? Math.floor(p / 2) : 0;
    sk.append(h('button', {class: 'li', on: {click: () => { c.skills[id] = (lvl + 1) % 3; save(); render(); }}},
      h('span', {class: 'dot' + (lvl ? ' on' : '') + (lvl === 2 ? ' ex' : '')}), h('span', {class: 'grow'}, name, h('small', {}, ' ' + ABN[a])), h('b', {class: 'num'}, sign(am(c, a) + bonus))));
  }
  const percep = 10 + am(c, 'wis') + ((c.skills.prc || 0) === 2 ? 2 * p : (c.skills.prc || 0) === 1 ? p : jack ? Math.floor(p / 2) : 0);
  const cs = CD(c) && CD(c).info.skills;
  panel.append(box('Навыки', cs ? h('p', {class: 'note'}, 'Класс: ' + cs) : null, h('p', {class: 'note'}, `Нажатие: владение → компетентность → снять.${jack ? ' Мастер на все руки учтён.' : ''} Пассивная внимательность: ${percep}.`), sk));
}

// --- Вещи ---
function renderGear(c, panel) {
  const armorSel = h('select', {id: 'armor', on: {change: e => { c.armor = e.target.value; save(); render(); }}},
    h('option', {value: '', selected: !c.armor}, 'Без доспеха'),
    ...ARMORS.map(([n, b, d]) => h('option', {value: n, selected: c.armor === n}, `${n} (${b}${d === null ? ' + Лов' : d ? ' + Лов, макс. 2' : ''})`)));
  const u = base(c).unarmored;
  panel.append(box(`Класс брони: ${armorClass(c)}`,
    h('label', {class: 'fld'}, h('span', {}, 'Доспех'), armorSel),
    !c.armor ? h('p', {class: 'note'}, u === 'con' ? 'Защита без доспехов варвара: 10 + Лов + Тел.' : u === 'wis' ? 'Защита без доспехов монаха: 10 + Лов + Мдр (без щита).' : 'Без доспеха: 10 + Лов.') : null,
    h('label', {class: 'row sub'}, h('input', {type: 'checkbox', checked: !!c.shield, on: {change: e => { c.shield = e.target.checked; save(); render(); }}}), 'Щит (+2)'),
    !c.armor ? h('label', {class: 'row sub'}, h('input', {type: 'checkbox', checked: !!c.mageArmor, on: {change: e => { c.mageArmor = e.target.checked; save(); render(); }}}), 'Доспехи мага (13 + Лов)') : null,
    h('div', {class: 'grid2'},
      stepper('Магический бонус', sign(+c.acMagic || 0), d => { c.acMagic = (+c.acMagic || 0) + d; save(); render(); }),
      stepper('Прочее', sign(+c.acMisc || 0), d => { c.acMisc = (+c.acMisc || 0) + d; save(); render(); }))));

  const wsel = h('select', {id: 'addWeapon', class: 'grow'}, h('option', {value: ''}, 'Добавить оружие…'),
    ...WEAPONS.map((w, i) => h('option', {value: String(i)}, `${w[0]} — ${w[1]} ${w[2]}`)), h('option', {value: 'custom'}, 'Своё оружие'));
  wsel.addEventListener('change', () => {
    const v = wsel.value; if (!v) return;
    if (v === 'custom') c.items.push({id: uid(), kind: 'weapon', name: 'Оружие', dmg: '1к6', type: 'рубящий', props: '', magic: 0, ab: 'auto', prof: true, eq: true, edit: true});
    else { const w = WEAPONS[+v]; c.items.push({id: uid(), kind: 'weapon', name: w[0], dmg: w[1], type: w[2], props: w[3], magic: 0, ab: 'auto', prof: true, eq: true}); }
    save(); render();
  });
  const wl = h('div', {class: 'panel'});
  for (const it of c.items.filter(i => i.kind === 'weapon')) {
    const a = attackOf(c, it);
    const abSel = h('select', {on: {change: e => { it.ab = e.target.value; save(); render(); }}},
      ...[['auto', 'Хар-ка: авто'], ['str', 'Сила'], ['dex', 'Ловкость'], ['spell', 'Закл. характеристика']].map(([v, t]) => h('option', {value: v, selected: (it.ab || 'auto') === v}, t)));
    const card = h('div', {class: 'item'},
      h('div', {class: 'boxh'}, h('b', {}, it.name + (it.magic ? ` +${it.magic}` : '')), h('span', {class: 'sub'}, `попадание ${sign(a.hit)} · ${a.dmg} ${it.type}`)),
      h('div', {class: 'grid2'},
        stepper('Магия', sign(+it.magic || 0), d => { it.magic = Math.max(0, (+it.magic || 0) + d); save(); render(); }),
        h('label', {class: 'fld'}, h('span', {}, 'Характеристика'), abSel)),
      h('div', {class: 'row'},
        h('label', {class: 'row sub'}, h('input', {type: 'checkbox', checked: it.prof !== false, on: {change: e => { it.prof = e.target.checked; save(); render(); }}}), 'Владение'),
        h('label', {class: 'row sub'}, h('input', {type: 'checkbox', checked: it.eq !== false, on: {change: e => { it.eq = e.target.checked; save(); render(); }}}), 'Показывать в бою'),
        h('button', {class: 'btn', on: {click: () => { it.edit = !it.edit; save(); render(); }}}, it.edit ? 'Готово' : 'Изменить'),
        h('button', {class: 'btn danger', on: {click: () => { c.items = c.items.filter(x => x !== it); save(); render(); }}}, 'Убрать')));
    if (it.edit) card.append(h('div', {class: 'grid2'},
      h('label', {class: 'fld'}, h('span', {}, 'Название'), h('input', {value: it.name, on: {change: e => { it.name = e.target.value; save(); render(); }}})),
      h('label', {class: 'fld'}, h('span', {}, 'Урон'), h('input', {value: it.dmg, on: {change: e => { it.dmg = e.target.value; save(); render(); }}})),
      h('label', {class: 'fld'}, h('span', {}, 'Вид урона'), h('input', {value: it.type, on: {change: e => { it.type = e.target.value; save(); render(); }}})),
      h('label', {class: 'fld'}, h('span', {}, 'Дальнобойное'), h('select', {on: {change: e => { it.props = e.target.value === 'r' ? (it.props + ' r') : it.props.replace(/\br\b/g, ''); save(); render(); }}},
        h('option', {value: '', selected: !/\br\b/.test(it.props)}, 'Нет'), h('option', {value: 'r', selected: /\br\b/.test(it.props)}, 'Да')))));
    wl.append(card);
  }
  panel.append(box('Оружие', wsel, wl.childNodes.length ? wl : h('p', {class: 'note'}, 'Оружия пока нет. Атаки появятся во вкладке «Бой».')));
  panel.append(box('Прочее снаряжение',
    h('textarea', {id: 'gear', rows: '6', placeholder: 'Верёвка 50 фт, 2 зелья лечения, 15 зм…', on: {change: e => { c.gear = e.target.value; save(); }}}, c.gear || '')));
}

// --- Лист ---
function renderChar(c, panel) {
  const set = (f, v) => { c[f] = v; save(); };
  const subs = subclassesOf(c.cls), curSub = (c.sub || '').toLowerCase();
  const other = ui.subOther || (curSub && !subs.includes(curSub));
  const subSel = h('select', {id: 'sub', on: {change: e => {
    if (e.target.value === '__other') { ui.subOther = true; render(); return; }
    ui.subOther = false; set('sub', e.target.value); render(); }}},
    h('option', {value: '', selected: !curSub && !other}, 'Не выбран'),
    ...subs.map(n => h('option', {value: n, selected: n === curSub}, cap(n))),
    h('option', {value: '__other', selected: !!other}, 'Другой…'));
  const subIn = other ? h('input', {id: 'subText', value: c.sub, placeholder: 'Название подкласса', on: {change: e => { set('sub', e.target.value.trim().toLowerCase()); render(); }}}) : null;
  const cls = h('select', {id: 'cls', on: {change: e => { c.cls = e.target.value; c.sub = ''; c.saves = null; c.cur = null; c.pact = null; c.sp = null; ui.subOther = false; norm(c); save(); render(); }}},
    ...Object.keys(CLASSES).map(k => h('option', {value: k, selected: k === c.cls}, cap(k))));
  panel.append(box('Персонаж',
    h('label', {class: 'fld'}, h('span', {}, 'Имя'), h('input', {id: 'name', value: c.name, on: {change: e => { set('name', e.target.value.trim() || 'Без имени'); render(); }}})),
    ...(CDATA.races.length ? (() => {
      const r = RD(c);
      const rs = h('select', {id: 'race', on: {change: e => { c.race = e.target.value; const nr = RD(c); c.raceVar = nr ? nr.variants[0].n : '';
        const sp = nr && (nr.variants[0].speed); if (sp) c.speed = sp; save(); render(); }}},
        h('option', {value: '', selected: !c.race}, 'Не выбрана'),
        ...CDATA.races.map(x => h('option', {value: x.race, selected: x.race === c.race}, x.race)));
      const vs = r && r.variants.length > 1 ? h('select', {id: 'raceVar', on: {change: e => { c.raceVar = e.target.value;
        const v = r.variants.find(x => x.n === c.raceVar); if (v && v.speed) c.speed = v.speed; save(); render(); }}},
        ...r.variants.map(v => h('option', {value: v.n, selected: v.n === c.raceVar}, v.n))) : null;
      return [h('div', {class: 'grid2'}, h('label', {class: 'fld'}, h('span', {}, 'Раса'), rs), vs ? h('label', {class: 'fld'}, h('span', {}, 'Разновидность'), vs) : h('div'))];
    })() : [h('label', {class: 'fld'}, h('span', {}, 'Раса'), h('input', {id: 'race', value: c.race || '', placeholder: 'например, человек', on: {change: e => { set('race', e.target.value.trim()); render(); }}}))]),
    h('div', {class: 'grid2'}, h('label', {class: 'fld'}, h('span', {}, 'Класс'), cls), h('label', {class: 'fld'}, h('span', {}, 'Подкласс'), subSel)),
    subIn,
    h('div', {class: 'grid2'},
      stepper('Уровень', String(c.lvl), d => { const n = Math.min(20, Math.max(1, c.lvl + d)); if (n !== c.lvl) { c.lvl = n; c.cur = slotsFor(c).slice(); c.pact = pactSlots(n); c.sp = maxPoints(c); c.arc = {}; c.hdUsed = Math.min(c.hdUsed, n); norm(c); save(); render(); } }),
      stepper('Скорость, фт', String(c.speed), d => { c.speed = Math.max(0, c.speed + 5 * d); save(); render(); })),
    h('p', {class: 'note'}, `Бонус мастерства ${sign(pb(c.lvl))}. Кость хитов к${base(c).hd}.`)));
  const ab = h('div', {class: 'abil'});
  for (const a of AB) ab.append(h('div', {class: 'ab'},
    h('span', {class: 'abn'}, ABFULL[a]), h('b', {}, sign(am(c, a))),
    h('div', {class: 'row nowrap'},
      h('button', {class: 'step', 'aria-label': ABFULL[a] + ' меньше', on: {click: () => { c.abil[a] = Math.max(1, c.abil[a] - 1); save(); render(); }}}, '−'),
      h('span', {class: 'num'}, String(c.abil[a])),
      h('button', {class: 'step', 'aria-label': ABFULL[a] + ' больше', on: {click: () => { c.abil[a] = Math.min(30, c.abil[a] + 1); save(); render(); }}}, '+'))));
  panel.append(box('Характеристики', ab, caster(c) ? h('p', {class: 'note'}, `Заклинательная характеристика: ${ABFULL[caster(c).ab]}.`) : null));
  // max HP: typed by the player
  panel.append(box('Хиты',
    h('label', {class: 'fld'}, h('span', {}, 'Максимум хитов'),
      h('input', {id: 'hpMax', type: 'number', inputmode: 'numeric', min: '1', value: String(c.hp.max),
        on: {change: e => { const v = Math.max(1, parseInt(e.target.value, 10) || 1); c.hpAuto = false; const was = c.hp.max; c.hp.max = v;
          c.hp.cur = Math.max(0, Math.min(v, c.hp.cur + v - was)); save(); render(); }}}))));
  panel.append(box('Файлы',
    h('p', {class: 'note'}, 'Сохраните персонажа в файл, чтобы перенести на другое устройство или не потерять при смене телефона. Импорт принимает и файл персонажа, и новый файл заклинаний.'),
    h('div', {class: 'row'},
      h('button', {class: 'btn primary', on: {click: () => exportChar(c)}}, 'Сохранить персонажа в файл'),
      h('button', {class: 'btn', on: {click: pickFile}}, 'Импорт файла'))));
  const confirmRow = h('div', {class: 'row', hidden: true},
    h('span', {class: 'sub grow'}, `Удалить «${c.name}» насовсем?`),
    h('button', {class: 'btn danger', on: {click: () => { S.chars = S.chars.filter(x => x.id !== c.id); S.active = S.chars[0] ? S.chars[0].id : null; save(); ui.tab = 'fight'; render(); }}}, 'Да, удалить'),
    h('button', {class: 'btn', on: {click: () => { confirmRow.hidden = true; ask.hidden = false; }}}, 'Отмена'));
  const ask = h('button', {class: 'btn danger', on: {click: () => { ask.hidden = true; confirmRow.hidden = false; }}}, 'Удалить персонажа');
  panel.append(box('Удаление', ask, confirmRow));
  panel.append(h('p', {class: 'note'}, `Загружено заклинаний: ${SPELLS.length}. Всё хранится только на этом устройстве.`));
}

// ---------- start ----------
S.chars.forEach(norm);
idb.get('data').then(d => {
  if (d) { SPELLS = d.spells || []; CDATA = {classes: d.classes || [], races: d.races || []}; }
  else { SPELLS = load(K_SPELLS, []); if (SPELLS.length) idb.set('data', {spells: SPELLS, classes: [], races: []}).catch(() => {}); }
}).catch(() => { SPELLS = load(K_SPELLS, []); }).then(() => { indexSpells(); render(); });
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  const hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.register('sw.js').catch(() => {});
  let reloaded = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (hadController && !reloaded) { reloaded = true; location.reload(); } });
}
