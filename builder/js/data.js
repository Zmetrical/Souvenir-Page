// ─── BEADS ──────────────────────────────────────────────────────────────────
export const BEADS = [
  // Round
  {id:'b1', name:'Round Blush',    shape:'round',   color:'#F9B8CF', price:8,  stock:'in',  category:'beads', group:'Round'},
  {id:'b2', name:'Round Mint',     shape:'round',   color:'#90DDD9', price:8,  stock:'in',  category:'beads', group:'Round'},
  {id:'b3', name:'Round Lavender', shape:'round',   color:'#C9A9F0', price:8,  stock:'in',  category:'beads', group:'Round'},
  {id:'b4', name:'Round Butter',   shape:'round',   color:'#FFE07A', price:8,  stock:'in',  category:'beads', group:'Round'},
  {id:'b5', name:'Round Sky',      shape:'round',   color:'#9DD4F7', price:8,  stock:'in',  category:'beads', group:'Round'},
  {id:'b6', name:'Round Peach',    shape:'round',   color:'#FFBEA0', price:8,  stock:'in',  category:'beads', group:'Round'},
  {id:'b7', name:'Round Lime',     shape:'round',   color:'#BFED82', price:8,  stock:'low', category:'beads', group:'Round'},
  {id:'b8', name:'Round White',    shape:'round',   color:'#F5F5FF', price:7,  stock:'in',  category:'beads', group:'Round'},
  {id:'b9', name:'Round Ink',      shape:'round',   color:'#3D3D52', price:7,  stock:'in',  category:'beads', group:'Round'},

  // Oval / Ellipse
  {id:'e1', name:'Oval Blush',    shape:'ellipse', color:'#F9B8CF', price:9,  stock:'in',  category:'beads', group:'Oval'},
  {id:'e2', name:'Oval Mint',     shape:'ellipse', color:'#90DDD9', price:9,  stock:'in',  category:'beads', group:'Oval'},
  {id:'e3', name:'Oval Lavender', shape:'ellipse', color:'#C9A9F0', price:9,  stock:'in',  category:'beads', group:'Oval'},
  {id:'e4', name:'Oval Butter',   shape:'ellipse', color:'#FFE07A', price:9,  stock:'in',  category:'beads', group:'Oval'},
  {id:'e5', name:'Oval Sky',      shape:'ellipse', color:'#9DD4F7', price:9,  stock:'in',  category:'beads', group:'Oval'},
  {id:'e6', name:'Oval Peach',    shape:'ellipse', color:'#FFBEA0', price:9,  stock:'in',  category:'beads', group:'Oval'},
  {id:'e7', name:'Oval Lime',     shape:'ellipse', color:'#BFED82', price:9,  stock:'low', category:'beads', group:'Oval'},
  {id:'e8', name:'Oval White',    shape:'ellipse', color:'#F5F5FF', price:8,  stock:'in',  category:'beads', group:'Oval'},

  // Tube
  {id:'t1', name:'Tube Blush',    shape:'tube',    color:'#F9B8CF', price:8,  stock:'in',  category:'beads', group:'Tube'},
  {id:'t2', name:'Tube Mint',     shape:'tube',    color:'#90DDD9', price:8,  stock:'in',  category:'beads', group:'Tube'},
  {id:'t3', name:'Tube Lavender', shape:'tube',    color:'#C9A9F0', price:8,  stock:'in',  category:'beads', group:'Tube'},
  {id:'t4', name:'Tube Butter',   shape:'tube',    color:'#FFE07A', price:8,  stock:'in',  category:'beads', group:'Tube'},
  {id:'t5', name:'Tube Peach',    shape:'tube',    color:'#FFBEA0', price:8,  stock:'in',  category:'beads', group:'Tube'},

  // Pearl
  {id:'p1', name:'Pearl White',    shape:'pearl',   color:'#FDF8F0', price:12, stock:'in',  category:'beads', group:'Pearl'},
  {id:'p2', name:'Pearl Blush',    shape:'pearl',   color:'#FFE4EE', price:12, stock:'in',  category:'beads', group:'Pearl'},
  {id:'p3', name:'Pearl Lavender', shape:'pearl',   color:'#EDE4FF', price:12, stock:'in',  category:'beads', group:'Pearl'},
  {id:'p4', name:'Pearl Mint',     shape:'pearl',   color:'#DAFAF8', price:12, stock:'in',  category:'beads', group:'Pearl'},

  // Gem (Faceted)
  {id:'f1', name:'Gem Blue',  shape:'faceted', color:'#8EC5FC', detail:'#6EB0FF', price:10, stock:'in',  category:'beads', group:'Gem'},
  {id:'f2', name:'Gem Rose',  shape:'faceted', color:'#FFB3C6', detail:'#FF8FAD', price:10, stock:'low', category:'beads', group:'Gem'},
  {id:'f3', name:'Gem Amber', shape:'faceted', color:'#FFD780', detail:'#FFC040', price:10, stock:'in',  category:'beads', group:'Gem'},
  {id:'f4', name:'Gem Mint',  shape:'faceted', color:'#90DDD9', detail:'#60C8C4', price:10, stock:'in',  category:'beads', group:'Gem'},
  {id:'f5', name:'Gem Lilac', shape:'faceted', color:'#C9A9F0', detail:'#A07EE0', price:10, stock:'in',  category:'beads', group:'Gem'},

  // Seed (small)
  {id:'sd1', name:'Seed Blush',    shape:'round', color:'#F9B8CF', price:4, stock:'in',  category:'beads', group:'Seed', small:true},
  {id:'sd2', name:'Seed Mint',     shape:'round', color:'#90DDD9', price:4, stock:'in',  category:'beads', group:'Seed', small:true},
  {id:'sd3', name:'Seed Lavender', shape:'round', color:'#C9A9F0', price:4, stock:'in',  category:'beads', group:'Seed', small:true},
  {id:'sd4', name:'Seed Butter',   shape:'round', color:'#FFE07A', price:4, stock:'in',  category:'beads', group:'Seed', small:true},
  {id:'sd5', name:'Seed Peach',    shape:'round', color:'#FFBEA0', price:4, stock:'in',  category:'beads', group:'Seed', small:true},
  {id:'sd6', name:'Seed White',    shape:'round', color:'#F5F5FF', price:4, stock:'in',  category:'beads', group:'Seed', small:true},
  {id:'sd7', name:'Seed Sky',      shape:'round', color:'#9DD4F7', price:4, stock:'in',  category:'beads', group:'Seed', small:true},
];

// ─── FIGURES (shaped decorative charms) ─────────────────────────────────────
export const FIGURES = [
  {id:'c1',  name:'Heart Blush',      shape:'heart',     color:'#F9B8CF',                   price:15, stock:'in',  category:'figures'},
  {id:'c2',  name:'Heart Red',        shape:'heart',     color:'#FF8FAD',                   price:15, stock:'in',  category:'figures'},
  {id:'c3',  name:'Heart Lavender',   shape:'heart',     color:'#C9A9F0',                   price:15, stock:'in',  category:'figures'},
  {id:'c4',  name:'Star Gold',        shape:'star',      color:'#FFD780',                   price:15, stock:'in',  category:'figures'},
  {id:'c5',  name:'Star Pink',        shape:'star',      color:'#F9B8CF',                   price:15, stock:'in',  category:'figures'},
  {id:'c6',  name:'Star Mint',        shape:'star',      color:'#90DDD9',                   price:15, stock:'in',  category:'figures'},
  {id:'c7',  name:'Moon Butter',      shape:'moon',      color:'#FFE07A',                   price:15, stock:'in',  category:'figures'},
  {id:'c8',  name:'Moon Lavender',    shape:'moon',      color:'#C9A9F0',                   price:15, stock:'in',  category:'figures'},
  {id:'c9',  name:'Flower Pink',      shape:'flower',    color:'#F9B8CF', detail:'#FFE07A', price:18, stock:'in',  category:'figures'},
  {id:'c10', name:'Flower Mint',      shape:'flower',    color:'#90DDD9', detail:'#F9B8CF', price:18, stock:'in',  category:'figures'},
  {id:'c11', name:'Flower Lilac',     shape:'flower',    color:'#C9A9F0', detail:'#FFD780', price:18, stock:'in',  category:'figures'},
  {id:'c12', name:'Rainbow',          shape:'rainbow',   color:'#FF8FAD',                   price:20, stock:'in',  category:'figures'},
  {id:'c13', name:'Bow Blush',        shape:'bow',       color:'#F9B8CF', detail:'#FFFFFF', price:18, stock:'in',  category:'figures'},
  {id:'c14', name:'Bow Lavender',     shape:'bow',       color:'#C9A9F0', detail:'#FFFFFF', price:18, stock:'in',  category:'figures'},
  {id:'c15', name:'Bow Red',          shape:'bow',       color:'#FF8FAD', detail:'#FFE4EE', price:18, stock:'low', category:'figures'},
  {id:'c16', name:'Butterfly Pink',   shape:'butterfly', color:'#F9B8CF', detail:'#3D3D52', price:20, stock:'in',  category:'figures'},
  {id:'c17', name:'Butterfly Blue',   shape:'butterfly', color:'#9DD4F7', detail:'#3D3D52', price:20, stock:'in',  category:'figures'},
  {id:'c18', name:'Butterfly Purple', shape:'butterfly', color:'#C9A9F0', detail:'#3D3D52', price:20, stock:'low', category:'figures'},
];

// ─── CHARMS (image-based character series) ───────────────────────────────────
export const CHARMS = [
  // Hello Kitty
  {id:'fg1', name:'Hello Kitty 1', useImg:true, imgSrc:'./img/hello kitty/01.png', price:35, stock:'in',  category:'charms', large:true, series:'Hello Kitty'},
  {id:'fg2', name:'Hello Kitty 2', useImg:true, imgSrc:'./img/hello kitty/02.png', price:35, stock:'in',  category:'charms', large:true, series:'Hello Kitty'},
  {id:'fg3', name:'Hello Kitty 3', useImg:true, imgSrc:'./img/hello kitty/03.png', price:35, stock:'in',  category:'charms', large:true, series:'Hello Kitty'},
  {id:'fg4', name:'Hello Kitty 4', useImg:true, imgSrc:'./img/hello kitty/04.png', price:35, stock:'low', category:'charms', large:true, series:'Hello Kitty'},
  {id:'fg5', name:'Hello Kitty 5', useImg:true, imgSrc:'./img/hello kitty/05.png', price:35, stock:'in',  category:'charms', large:true, series:'Hello Kitty'},
  // BTS
  {id:'bts1', name:'BTS RM',       useImg:true, imgSrc:'./img/bts/1.png', price:40, stock:'in', category:'charms', large:true, series:'BTS'},
  {id:'bts2', name:'BTS Jin',      useImg:true, imgSrc:'./img/bts/2.png', price:40, stock:'in', category:'charms', large:true, series:'BTS'},
  {id:'bts3', name:'BTS Suga',     useImg:true, imgSrc:'./img/bts/3.png', price:40, stock:'in', category:'charms', large:true, series:'BTS'},
  {id:'bts4', name:'BTS J-Hope',   useImg:true, imgSrc:'./img/bts/4.png', price:40, stock:'in', category:'charms', large:true, series:'BTS'},
  {id:'bts5', name:'BTS Jimin',    useImg:true, imgSrc:'./img/bts/5.png', price:40, stock:'in', category:'charms', large:true, series:'BTS'},
  {id:'bts6', name:'BTS V',        useImg:true, imgSrc:'./img/bts/6.png', price:40, stock:'in', category:'charms', large:true, series:'BTS'},
  {id:'bts7', name:'BTS Jungkook', useImg:true, imgSrc:'./img/bts/7.png', price:40, stock:'in', category:'charms', large:true, series:'BTS'},
];

export const ELEM_MAP = {};
[...BEADS, ...FIGURES, ...CHARMS].forEach(e => { ELEM_MAP[e.id] = e; });