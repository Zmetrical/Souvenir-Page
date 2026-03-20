export const BEADS = [
  {id:'b1',name:'Round Gold',shape:'round',color:'#FFD700',detail:'#CFA800',price:8,stock:'in',category:'beads'},
  {id:'b2',name:'Round Pink',shape:'round',color:'#FF5FA0',detail:'#D93D80',price:8,stock:'in',category:'beads'},
  {id:'b3',name:'Round Teal',shape:'round',color:'#1AC8C4',detail:'#0FA8A4',price:8,stock:'in',category:'beads'},
  {id:'b4',name:'Round White',shape:'round',color:'#FFFFFF',detail:'#E0E0E0',price:7,stock:'in',category:'beads'},
  {id:'b5',name:'Round Ink',shape:'round',color:'#2A2A35',detail:'#111118',price:7,stock:'in',category:'beads'},
  {id:'b6',name:'Round Lilac',shape:'round',color:'#A855F7',detail:'#8B3DCE',price:8,stock:'in',category:'beads'},
  {id:'b7',name:'Round Lime',shape:'round',color:'#C8E833',detail:'#A5C415',price:8,stock:'low',category:'beads'},
  {id:'f1',name:'Faceted Blue',shape:'faceted',color:'#3B82F6',detail:'#2563EB',price:10,stock:'in',category:'beads'},
  {id:'f2',name:'Faceted Rose',shape:'faceted',color:'#F43F5E',detail:'#BE123C',price:10,stock:'low',category:'beads'},
  {id:'f3',name:'Faceted Amber',shape:'faceted',color:'#F59E0B',detail:'#B45309',price:10,stock:'in',category:'beads'},
  {id:'p1',name:'Pearl White',shape:'pearl',color:'#FFF8F0',detail:'#FFFFFF',price:12,stock:'in',category:'beads'},
  {id:'p2',name:'Pearl Pink',shape:'pearl',color:'#FFE4E6',detail:'#FFFFFF',price:12,stock:'in',category:'beads'},
  {id:'sd1',name:'Seed Gold',shape:'round',color:'#FFD700',detail:'#CFA800',price:4,stock:'in',category:'beads',small:true},
  {id:'sd2',name:'Seed Teal',shape:'round',color:'#1AC8C4',detail:'#0FA8A4',price:4,stock:'in',category:'beads',small:true},
  {id:'sd3',name:'Seed Pink',shape:'round',color:'#FF5FA0',detail:'#D93D80',price:4,stock:'in',category:'beads',small:true},
];

export const CHARMS = [
  {id:'c1',name:'Heart Pink',shape:'heart',color:'#FF5FA0',price:15,stock:'in',category:'charms'},
  {id:'c2',name:'Heart Red',shape:'heart',color:'#EF4444',price:15,stock:'in',category:'charms'},
  {id:'c4',name:'Star Gold',shape:'star',color:'#FFD700',price:15,stock:'in',category:'charms'},
  {id:'c5',name:'Star Lime',shape:'star',color:'#C8E833',price:15,stock:'in',category:'charms'},
  {id:'c6',name:'Moon Gold',shape:'moon',color:'#FFD700',price:15,stock:'in',category:'charms'},
  {id:'c8',name:'Flower Lilac',shape:'flower',color:'#A855F7',detail:'#FFD700',price:18,stock:'in',category:'charms'},
  {id:'c9',name:'Flower Pink',shape:'flower',color:'#FF5FA0',detail:'#FFD700',price:18,stock:'in',category:'charms'},
  {id:'c10',name:'Rainbow',shape:'rainbow',color:'#FF5FA0',detail:'#1AC8C4',price:20,stock:'in',category:'charms'},
];

export const FIGURES = [
  {id:'fg1',name:'Bunny Teal',shape:'bunny',color:'#1AC8C4',price:30,stock:'in',category:'figures',large:true},
  {id:'fg2',name:'Bunny Pink',shape:'bunny',color:'#FF5FA0',price:30,stock:'in',category:'figures',large:true},
  {id:'fg5',name:'Bear Honey',shape:'bear',color:'#F59E0B',price:30,stock:'in',category:'figures',large:true},
  {id:'fg6',name:'Bear White',shape:'bear',color:'#FFFFFF',price:30,stock:'in',category:'figures',large:true},
  {id:'fg8',name:'Cat Ink',shape:'cat',color:'#2A2A35',price:30,stock:'in',category:'figures',large:true},
  {id:'s2',name:'Mushroom',shape:'mushroom',color:'#EF4444',detail:'#FFFFFF',price:28,stock:'in',category:'figures',large:true},
  {id:'s4',name:'Strawberry',shape:'strawberry',color:'#F43F5E',detail:'#C8E833',price:28,stock:'in',category:'figures',large:true},
];

export const ELEM_MAP = {};
[...BEADS, ...CHARMS, ...FIGURES].forEach(e => { ELEM_MAP[e.id] = e; });