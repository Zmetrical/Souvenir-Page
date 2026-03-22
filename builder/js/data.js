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

// ─── FIGURES (cube beads — categorized) ─────────────────────────────────────
export const FIGURES = [
  // ── Plain Cubes ──────────────────────────────────────────────────────────
  {id:'cb1',  name:'Cube Blush',    shape:'cube', color:'#F9B8CF', price:10, stock:'in',  category:'figures', group:'Plain Cubes'},
  {id:'cb2',  name:'Cube Mint',     shape:'cube', color:'#90DDD9', price:10, stock:'in',  category:'figures', group:'Plain Cubes'},
  {id:'cb3',  name:'Cube Lavender', shape:'cube', color:'#C9A9F0', price:10, stock:'in',  category:'figures', group:'Plain Cubes'},
  {id:'cb4',  name:'Cube Butter',   shape:'cube', color:'#FFE07A', price:10, stock:'in',  category:'figures', group:'Plain Cubes'},
  {id:'cb5',  name:'Cube Sky',      shape:'cube', color:'#9DD4F7', price:10, stock:'in',  category:'figures', group:'Plain Cubes'},
  {id:'cb6',  name:'Cube Peach',    shape:'cube', color:'#FFBEA0', price:10, stock:'in',  category:'figures', group:'Plain Cubes'},
  {id:'cb7',  name:'Cube Lime',     shape:'cube', color:'#BFED82', price:10, stock:'in',  category:'figures', group:'Plain Cubes'},
  {id:'cb8',  name:'Cube White',    shape:'cube', color:'#F5F5FF', price:9,  stock:'in',  category:'figures', group:'Plain Cubes'},
  {id:'cb9',  name:'Cube Ink',      shape:'cube', color:'#3D3D52', price:9,  stock:'in',  category:'figures', group:'Plain Cubes'},
  {id:'cb10', name:'Cube Red',      shape:'cube', color:'#FF8FAD', price:10, stock:'in',  category:'figures', group:'Plain Cubes'},
  {id:'cb11', name:'Cube Purple',   shape:'cube', color:'#A855F7', price:10, stock:'low', category:'figures', group:'Plain Cubes'},
  {id:'cb12', name:'Cube Coral',    shape:'cube', color:'#FF6B6B', price:10, stock:'in',  category:'figures', group:'Plain Cubes'},

  // ── Dice Cubes ───────────────────────────────────────────────────────────
  {id:'dc1', name:'Dice 1 Pink',    shape:'cube-dice1', color:'#F9B8CF', detail:'#C0136A', price:12, stock:'in',  category:'figures', group:'Dice Cubes'},
  {id:'dc2', name:'Dice 2 Mint',    shape:'cube-dice2', color:'#90DDD9', detail:'#0A9690', price:12, stock:'in',  category:'figures', group:'Dice Cubes'},
  {id:'dc3', name:'Dice 3 Lavender',shape:'cube-dice3', color:'#C9A9F0', detail:'#5E35C8', price:12, stock:'in',  category:'figures', group:'Dice Cubes'},
  {id:'dc4', name:'Dice 4 Butter',  shape:'cube-dice4', color:'#FFE07A', detail:'#A07200', price:12, stock:'in',  category:'figures', group:'Dice Cubes'},
  {id:'dc5', name:'Dice 5 Sky',     shape:'cube-dice5', color:'#9DD4F7', detail:'#2563EB', price:12, stock:'in',  category:'figures', group:'Dice Cubes'},
  {id:'dc6', name:'Dice 6 Peach',   shape:'cube-dice6', color:'#FFBEA0', detail:'#C05020', price:12, stock:'in',  category:'figures', group:'Dice Cubes'},
  {id:'dc7', name:'Dice 1 White',   shape:'cube-dice1', color:'#F5F5FF', detail:'#3D3D52', price:12, stock:'in',  category:'figures', group:'Dice Cubes'},
  {id:'dc8', name:'Dice 6 Black',   shape:'cube-dice6', color:'#3D3D52', detail:'#F5F5FF', price:12, stock:'in',  category:'figures', group:'Dice Cubes'},

  // ── Heart Print Cubes ─────────────────────────────────────────────────────
  {id:'hc1', name:'Heart Cube Blush',    shape:'cube-heart', color:'#F9B8CF', detail:'#C0136A', price:13, stock:'in',  category:'figures', group:'Heart Cubes'},
  {id:'hc2', name:'Heart Cube Mint',     shape:'cube-heart', color:'#90DDD9', detail:'#FF5FA0', price:13, stock:'in',  category:'figures', group:'Heart Cubes'},
  {id:'hc3', name:'Heart Cube Lavender', shape:'cube-heart', color:'#C9A9F0', detail:'#FFE07A', price:13, stock:'in',  category:'figures', group:'Heart Cubes'},
  {id:'hc4', name:'Heart Cube White',    shape:'cube-heart', color:'#F5F5FF', detail:'#FF8FAD', price:13, stock:'in',  category:'figures', group:'Heart Cubes'},
  {id:'hc5', name:'Heart Cube Black',    shape:'cube-heart', color:'#3D3D52', detail:'#F9B8CF', price:13, stock:'low', category:'figures', group:'Heart Cubes'},

  // ── Star Print Cubes ──────────────────────────────────────────────────────
  {id:'sc1', name:'Star Cube Gold',     shape:'cube-star', color:'#FFE07A', detail:'#C0136A', price:13, stock:'in',  category:'figures', group:'Star Cubes'},
  {id:'sc2', name:'Star Cube Pink',     shape:'cube-star', color:'#F9B8CF', detail:'#FFD700', price:13, stock:'in',  category:'figures', group:'Star Cubes'},
  {id:'sc3', name:'Star Cube Mint',     shape:'cube-star', color:'#90DDD9', detail:'#FFFFFF', price:13, stock:'in',  category:'figures', group:'Star Cubes'},
  {id:'sc4', name:'Star Cube Lavender', shape:'cube-star', color:'#C9A9F0', detail:'#FFE07A', price:13, stock:'in',  category:'figures', group:'Star Cubes'},
  {id:'sc5', name:'Star Cube Black',    shape:'cube-star', color:'#3D3D52', detail:'#FFD700', price:13, stock:'in',  category:'figures', group:'Star Cubes'},

  // ── Checkered Cubes ───────────────────────────────────────────────────────
  {id:'cc1', name:'Checker Black',   shape:'cube-checker', color:'#F5F5FF', detail:'#3D3D52', price:14, stock:'in',  category:'figures', group:'Checker Cubes'},
  {id:'cc2', name:'Checker Pink',    shape:'cube-checker', color:'#F9B8CF', detail:'#C0136A', price:14, stock:'in',  category:'figures', group:'Checker Cubes'},
  {id:'cc3', name:'Checker Mint',    shape:'cube-checker', color:'#90DDD9', detail:'#0A9690', price:14, stock:'in',  category:'figures', group:'Checker Cubes'},
  {id:'cc4', name:'Checker Lavender',shape:'cube-checker', color:'#C9A9F0', detail:'#5E35C8', price:14, stock:'low', category:'figures', group:'Checker Cubes'},

  // ── Smiley Cubes ─────────────────────────────────────────────────────────
  {id:'sm1', name:'Smiley Blush',    shape:'cube-smile', color:'#F9B8CF', detail:'#3D3D52', price:13, stock:'in',  category:'figures', group:'Smiley Cubes'},
  {id:'sm2', name:'Smiley Mint',     shape:'cube-smile', color:'#90DDD9', detail:'#3D3D52', price:13, stock:'in',  category:'figures', group:'Smiley Cubes'},
  {id:'sm3', name:'Smiley Butter',   shape:'cube-smile', color:'#FFE07A', detail:'#3D3D52', price:13, stock:'in',  category:'figures', group:'Smiley Cubes'},
  {id:'sm4', name:'Smiley Lavender', shape:'cube-smile', color:'#C9A9F0', detail:'#3D3D52', price:13, stock:'low', category:'figures', group:'Smiley Cubes'},
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