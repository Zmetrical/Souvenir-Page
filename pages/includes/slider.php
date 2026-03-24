<?php
/**
 * includes/slider.php
 *
 * Self-contained hero slider. No variables required.
 * Slider JS is inlined at the bottom of this file so the component
 * is portable — drop it on any page that includes footer.php last.
 *
 * Slide data can be edited in the $slides array below.
 */

$slides = [
  /* 0 — Custom Prints · TEAL */
  [
    'cls'     => 's0',
    'tagIcon' => 'printer',
    'tag'     => 'Custom Prints',
    'headline'=> 'Stickers, Posters,<br/>Labels &amp; More!',
    'body'    => 'Print anything you can imagine — from cute stickers to full-size posters. Perfect for gifts, events, branding, or just because.',
    'btnA'    => ['icon' => 'shopping-bag', 'label' => 'Shop Prints',   'href' => '#'],
    'btnB'    => ['icon' => 'arrow-right',  'label' => 'See Catalog',   'href' => '#'],
    'visIcon' => 'image',
    'visName' => 'Custom Prints',
    'chips'   => ['Stickers', 'Posters', 'Labels', 'Tarpaulin'],
    'layout'  => 'left',   // text-left, visual-right
    'doodles' => [
      ['icon' => 'printer',  'size' => 64, 'top' => '8%',  'left'  => '5%',  'rot' => -15],
      ['icon' => 'image',    'size' => 80, 'top' => '15%', 'right' => '8%',  'rot' => 20],
      ['icon' => 'star',     'size' => 48, 'bot' => '12%', 'left'  => '12%', 'rot' => 10],
      ['icon' => 'layers',   'size' => 60, 'top' => '55%', 'right' => '3%',  'rot' => -8],
      ['icon' => 'sparkles', 'size' => 40, 'bot' => '20%', 'right' => '22%', 'rot' => 30],
      ['icon' => 'tag',      'size' => 50, 'top' => '30%', 'left'  => '2%',  'rot' => 5],
      ['icon' => 'scissors', 'size' => 56, 'bot' => '5%',  'right' => '8%',  'rot' => -20],
    ],
  ],

  /* 1 — Gifts & Pasalubong · PINK */
  [
    'cls'     => 's1',
    'tagIcon' => 'gift',
    'tag'     => 'Gifts &amp; Souvenirs',
    'headline'=> 'Gifts They Will<br/>Never Forget 🎀',
    'body'    => 'Personalized tokens, pasalubong sets, and souvenirs for every occasion — birthdays, graduation, despedida, or just to make someone smile.',
    'btnA'    => ['icon' => 'gift',     'label' => 'Browse Gifts', 'href' => '#'],
    'btnB'    => ['icon' => 'sparkles', 'label' => 'Customize',    'href' => '#'],
    'visIcon' => 'gift',
    'visName' => 'Gift Sets',
    'chips'   => ['Birthday', 'Pasalubong', 'Graduation', 'Events'],
    'layout'  => 'right',  // text-right, visual-left
    'doodles' => [
      ['icon' => 'gift',     'size' => 72, 'top' => '6%',  'left'  => '8%',  'rot' => 12],
      ['icon' => 'heart',    'size' => 90, 'top' => '20%', 'right' => '5%',  'rot' => -18],
      ['icon' => 'sparkles', 'size' => 54, 'bot' => '10%', 'left'  => '4%',  'rot' => -8],
      ['icon' => 'package',  'size' => 64, 'top' => '50%', 'right' => '2%',  'rot' => 15],
      ['icon' => 'star',     'size' => 44, 'bot' => '18%', 'right' => '18%', 'rot' => -25],
      ['icon' => 'ribbon',   'size' => 56, 'top' => '70%', 'left'  => '3%',  'rot' => 0],
      ['icon' => 'smile',    'size' => 48, 'top' => '35%', 'left'  => '1%',  'rot' => 8],
    ],
  ],

  /* 2 — DIY Charms · LIME */
  [
    'cls'     => 's2',
    'tagIcon' => 'scissors',
    'tag'     => 'DIY In-Store',
    'headline'=> 'Make Your Own<br/>Charm In-Store!',
    'body'    => 'Walk in, pick your materials, shapes, and colors. Our in-store workshop is open for everyone — no experience needed!',
    'btnA'    => ['icon' => 'map-pin',    'label' => 'Visit the Store', 'href' => '#'],
    'btnB'    => ['icon' => 'play-circle','label' => 'Watch a Demo',    'href' => '#'],
    'visIcon' => 'scissors',
    'visName' => 'DIY Workshop',
    'chips'   => ['Bag Charms', 'Keychains', 'Resin Craft', 'Pins'],
    'layout'  => 'center',
    'doodles' => [
      ['icon' => 'scissors', 'size' => 68, 'top' => '5%',  'left'  => '3%',  'rot' => -10],
      ['icon' => 'key',      'size' => 80, 'top' => '12%', 'right' => '6%',  'rot' => 22],
      ['icon' => 'palette',  'size' => 58, 'bot' => '8%',  'left'  => '8%',  'rot' => 8],
      ['icon' => 'heart',    'size' => 54, 'top' => '60%', 'right' => '4%',  'rot' => -15],
      ['icon' => 'star',     'size' => 46, 'bot' => '22%', 'right' => '14%', 'rot' => 28],
      ['icon' => 'wand',     'size' => 52, 'top' => '40%', 'left'  => '1%',  'rot' => 5],
      ['icon' => 'gem',      'size' => 60, 'bot' => '6%',  'right' => '5%',  'rot' => 0],
    ],
  ],

  /* 3 — Business · DARK PURPLE */
  [
    'cls'     => 's3',
    'tagIcon' => 'briefcase',
    'tag'     => 'For Business',
    'headline'=> 'Level Up<br/>Your <span class="ac">Brand</span> 💼',
    'body'    => 'Custom merch, branded prints, and promo items. Bulk orders, corporate gifts, event giveaways — we\'ve got everything your business needs.',
    'btnA'    => ['icon' => 'send',   'label' => 'Get a Quote',    'href' => '#'],
    'btnB'    => ['icon' => 'layers', 'label' => 'Our Portfolio',  'href' => '#'],
    'layout'  => 'biz',   // special layout — stat cards
    'doodles' => [
      ['icon' => 'briefcase',   'size' => 70, 'top' => '8%',  'left'  => '4%',  'rot' => -12],
      ['icon' => 'layers',      'size' => 84, 'top' => '14%', 'right' => '6%',  'rot' => 18],
      ['icon' => 'send',        'size' => 56, 'bot' => '10%', 'left'  => '6%',  'rot' => 6],
      ['icon' => 'award',       'size' => 62, 'top' => '55%', 'right' => '3%',  'rot' => -10],
      ['icon' => 'trending-up', 'size' => 48, 'bot' => '20%', 'right' => '16%', 'rot' => 24],
      ['icon' => 'star',        'size' => 52, 'top' => '38%', 'left'  => '2%',  'rot' => 4],
      ['icon' => 'zap',         'size' => 58, 'bot' => '5%',  'right' => '6%',  'rot' => 0],
    ],
  ],
];

/* ── Helper: doodle position style ── */
function doodleStyle(array $d): string {
  $parts = [];
  if (isset($d['top']))  $parts[] = "top:{$d['top']}";
  if (isset($d['bot']))  $parts[] = "bottom:{$d['bot']}";
  if (isset($d['left'])) $parts[] = "left:{$d['left']}";
  if (isset($d['right']))$parts[] = "right:{$d['right']}";
  if (isset($d['rot']))  $parts[] = "transform:rotate({$d['rot']}deg)";
  return implode(';', $parts);
}
?>

<!-- ═══════════════════════════════════════════════════
     HERO SLIDER
═══════════════════════════════════════════════════ -->
<div class="ac-slider" id="acSlider">

  <?php foreach ($slides as $i => $s): ?>
  <div class="ac-slide <?= $s['cls'] ?><?= $i === 0 ? ' is-active' : '' ?>" data-slide="<?= $i ?>">

    <!-- Background layer (parallax target) -->
    <div class="sl-bg" data-depth="bg">
      <div class="sl-bg-color"></div>
      <div class="doodle-layer">
        <?php foreach ($s['doodles'] as $d): ?>
        <div class="dk" style="<?= doodleStyle($d) ?>">
          <i data-lucide="<?= $d['icon'] ?>" style="width:<?= $d['size'] ?>px;height:<?= $d['size'] ?>px;"></i>
        </div>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- Foreground content -->
    <div class="sl-fg">
      <div class="container">

        <?php if ($s['layout'] === 'center'): ?>
        <!-- ── Center layout (slide 2) ── -->
        <div class="row justify-content-center text-center">
          <div class="col-lg-7">
            <div data-enter="scale" data-delay="0" class="sl-tag" style="margin-inline:auto;display:inline-flex;">
              <i data-lucide="<?= $s['tagIcon'] ?>" style="width:12px;height:12px;"></i> <?= $s['tag'] ?>
            </div>
            <h1 class="sl-headline" data-enter="up" data-delay="60"
                style="font-size:clamp(2.6rem,7vw,5.5rem);">
              <?= $s['headline'] ?>
            </h1>
            <p class="sl-body" data-enter="up" data-delay="160"
               style="margin-inline:auto;text-align:center;">
              <?= $s['body'] ?>
            </p>
            <div data-enter="up" data-delay="250"
                 style="display:flex;justify-content:center;flex-wrap:wrap;gap:10px;margin-bottom:18px;">
              <?php foreach ($s['chips'] as $chip): ?>
              <span style="background:rgba(0,0,0,.1);color:var(--ink);font-weight:800;font-size:.78rem;padding:5px 16px;border-radius:var(--pill);">
                <?= $chip ?>
              </span>
              <?php endforeach; ?>
            </div>
            <div data-enter="up" data-delay="330">
              <a href="<?= $s['btnA']['href'] ?>" class="btn-sl-a">
                <i data-lucide="<?= $s['btnA']['icon'] ?>" style="width:15px;height:15px;"></i>
                <?= $s['btnA']['label'] ?>
              </a>
              <a href="<?= $s['btnB']['href'] ?>" class="btn-sl-b">
                <i data-lucide="<?= $s['btnB']['icon'] ?>" style="width:15px;height:15px;"></i>
                <?= $s['btnB']['label'] ?>
              </a>
            </div>
          </div>
        </div>

        <?php elseif ($s['layout'] === 'biz'): ?>
        <!-- ── Business stat-card layout (slide 3) ── -->
        <div class="row align-items-center g-4 g-lg-5">
          <div class="col-lg-5">
            <div data-enter="down" data-delay="0" class="sl-tag">
              <i data-lucide="<?= $s['tagIcon'] ?>" style="width:12px;height:12px;"></i> <?= $s['tag'] ?>
            </div>
            <h1 class="sl-headline" data-enter="left" data-delay="70">
              <?= $s['headline'] ?>
            </h1>
            <p class="sl-body" data-enter="up" data-delay="170"><?= $s['body'] ?></p>
            <div data-enter="up" data-delay="260">
              <a href="<?= $s['btnA']['href'] ?>" class="btn-sl-a" style="color:var(--purple-dk);">
                <i data-lucide="<?= $s['btnA']['icon'] ?>" style="width:15px;height:15px;"></i>
                <?= $s['btnA']['label'] ?>
              </a>
              <a href="<?= $s['btnB']['href'] ?>" class="btn-sl-b">
                <i data-lucide="<?= $s['btnB']['icon'] ?>" style="width:15px;height:15px;"></i>
                <?= $s['btnB']['label'] ?>
              </a>
            </div>
          </div>
          <div class="col-lg-7">
            <div class="sl-visual">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;position:relative;z-index:2;"
                   data-enter="right" data-delay="120">
                <div style="background:rgba(255,255,255,.1);backdrop-filter:blur(12px);border:1.5px solid rgba(255,255,255,.18);border-radius:20px;padding:22px 20px;grid-column:span 2;animation:acFloat 4.5s ease-in-out infinite;">
                  <div style="font-family:var(--fh);font-size:2.2rem;color:var(--yellow);margin-bottom:4px;">500+</div>
                  <div style="font-weight:800;font-size:.85rem;color:rgba(255,255,255,.8);">Happy Business Clients</div>
                </div>
                <div style="background:rgba(255,255,255,.1);backdrop-filter:blur(12px);border:1.5px solid rgba(255,255,255,.18);border-radius:20px;padding:20px;animation:acFloat 4s ease-in-out infinite;animation-delay:-1.5s;">
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
                    <div style="width:36px;height:36px;background:rgba(255,211,61,.2);border-radius:10px;display:flex;align-items:center;justify-content:center;">
                      <i data-lucide="package" style="width:18px;height:18px;color:var(--yellow);"></i>
                    </div>
                  </div>
                  <div style="font-weight:900;font-size:.82rem;color:#fff;">Bulk Orders</div>
                  <div style="font-size:.74rem;color:rgba(255,255,255,.55);margin-top:3px;">Min. 10 pcs</div>
                </div>
                <div style="background:rgba(255,255,255,.1);backdrop-filter:blur(12px);border:1.5px solid rgba(255,255,255,.18);border-radius:20px;padding:20px;animation:acFloat 4.2s ease-in-out infinite;animation-delay:-2.8s;">
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
                    <div style="width:36px;height:36px;background:rgba(26,200,196,.25);border-radius:10px;display:flex;align-items:center;justify-content:center;">
                      <i data-lucide="zap" style="width:18px;height:18px;color:var(--teal);"></i>
                    </div>
                  </div>
                  <div style="font-weight:900;font-size:.82rem;color:#fff;">Fast Turnaround</div>
                  <div style="font-size:.74rem;color:rgba(255,255,255,.55);margin-top:3px;">3–5 business days</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <?php else: ?>
        <!-- ── Standard left/right layout (slides 0 & 1) ── -->
        <div class="row align-items-center g-4 g-lg-5<?= $s['layout'] === 'right' ? ' flex-lg-row-reverse' : '' ?>">

          <!-- Text column -->
          <div class="col-lg-6">
            <div data-enter="<?= $s['layout'] === 'right' ? 'right' : 'left' ?>"
                 data-delay="0" class="sl-tag">
              <i data-lucide="<?= $s['tagIcon'] ?>" style="width:12px;height:12px;"></i>
              <?= $s['tag'] ?>
            </div>
            <h1 class="sl-headline"
                data-enter="<?= $s['layout'] === 'right' ? 'right' : 'left' ?>"
                data-delay="80">
              <?= $s['headline'] ?>
            </h1>
            <p class="sl-body" data-enter="up" data-delay="180"><?= $s['body'] ?></p>
            <div data-enter="up" data-delay="280">
              <a href="<?= $s['btnA']['href'] ?>" class="btn-sl-a">
                <i data-lucide="<?= $s['btnA']['icon'] ?>" style="width:15px;height:15px;"></i>
                <?= $s['btnA']['label'] ?>
              </a>
              <a href="<?= $s['btnB']['href'] ?>" class="btn-sl-b">
                <i data-lucide="<?= $s['btnB']['icon'] ?>" style="width:15px;height:15px;"></i>
                <?= $s['btnB']['label'] ?>
              </a>
            </div>
          </div>

          <!-- Visual column -->
          <div class="col-lg-6">
            <div class="sl-visual">
              <div class="vis-shape"
                   style="width:220px;height:220px;background:rgba(255,255,255,.1);top:10px;right:30px;animation:acFloat 6s ease-in-out infinite;"
                   data-enter="scale" data-delay="100"></div>
              <div class="vis-float"
                   data-enter="<?= $s['layout'] === 'right' ? 'left' : 'right' ?>"
                   data-delay="160">
                <div class="vf-icon">
                  <i data-lucide="<?= $s['visIcon'] ?>"></i>
                </div>
                <div class="vf-name"><?= $s['visName'] ?></div>
                <div class="vf-chips">
                  <?php foreach ($s['chips'] as $chip): ?>
                  <span class="vfc"><?= $chip ?></span>
                  <?php endforeach; ?>
                </div>
              </div>
            </div>
          </div>

        </div>
        <?php endif; ?>

      </div>
    </div>
  </div><!-- /.ac-slide -->
  <?php endforeach; ?>

  <!-- Arrow controls -->
  <button class="sl-arrow sl-arrow-prev" id="slPrev" aria-label="Previous">
    <i data-lucide="chevron-left" style="width:20px;height:20px;"></i>
  </button>
  <button class="sl-arrow sl-arrow-next" id="slNext" aria-label="Next">
    <i data-lucide="chevron-right" style="width:20px;height:20px;"></i>
  </button>

  <!-- Dot indicators -->
  <div class="sl-dots" id="slDots">
    <?php foreach ($slides as $i => $s): ?>
    <button class="sl-dot<?= $i === 0 ? ' active' : '' ?>"
            data-idx="<?= $i ?>" aria-label="Slide <?= $i + 1 ?>"></button>
    <?php endforeach; ?>
  </div>

  <!-- Slide counter -->
  <div class="sl-counter" id="slCounter">
    <span class="cur" id="slCur">01</span> / <?= str_pad(count($slides), 2, '0', STR_PAD_LEFT) ?>
  </div>

</div><!-- /.ac-slider -->

<!-- ── Slider JS (scoped to this component) ───────────────────────── -->
<script>
(function(){
  const slides  = Array.from(document.querySelectorAll('.ac-slide'));
  const dots    = Array.from(document.querySelectorAll('.sl-dot'));
  const curEl   = document.getElementById('slCur');
  const TOTAL   = slides.length;
  const AUTO_MS = 5000;
  let current   = 0;
  let autoTimer = null;

  function pad(n){ return String(n).padStart(2,'0'); }

  function playEntrances(slide){
    slide.querySelectorAll('[data-enter]').forEach(el => {
      el.classList.remove('entered');
      void el.offsetWidth;
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => el.classList.add('entered'), delay);
    });
  }

  function resetEntrances(slide){
    slide.querySelectorAll('[data-enter]').forEach(el => el.classList.remove('entered'));
  }

  function goTo(idx){
    if(idx === current) return;
    const out = slides[current], inn = slides[idx];
    out.classList.remove('is-active');
    out.classList.add('is-exiting','is-prev');
    resetEntrances(out);
    setTimeout(() => out.classList.remove('is-exiting','is-prev'), 560);
    inn.classList.add('is-active');
    playEntrances(inn);
    dots[current].classList.remove('active');
    dots[idx].classList.add('active');
    curEl.textContent = pad(idx + 1);
    current = idx;
  }

  playEntrances(slides[0]);

  function startAuto(){ autoTimer = setInterval(() => goTo((current+1)%TOTAL), AUTO_MS); }
  function resetAuto(){ clearInterval(autoTimer); startAuto(); }
  startAuto();

  document.getElementById('slPrev').addEventListener('click', () => { goTo((current-1+TOTAL)%TOTAL); resetAuto(); });
  document.getElementById('slNext').addEventListener('click', () => { goTo((current+1)%TOTAL); resetAuto(); });
  dots.forEach(dot => dot.addEventListener('click', () => { goTo(parseInt(dot.dataset.idx)); resetAuto(); }));

  /* Touch / swipe */
  let tx = 0;
  const sl = document.getElementById('acSlider');
  sl.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  sl.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - tx;
    if(Math.abs(dx) > 50){ goTo(dx < 0 ? (current+1)%TOTAL : (current-1+TOTAL)%TOTAL); resetAuto(); }
  });

  /* Mouse parallax on BG */
  const STRENGTH = 12;
  let mx = 0, my = 0, raf = null;
  sl.addEventListener('mousemove', e => {
    const r = sl.getBoundingClientRect();
    mx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
    my = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    if(!raf) raf = requestAnimationFrame(() => {
      raf = null;
      slides.forEach(s => {
        const bg = s.querySelector('.sl-bg');
        if(bg) bg.style.transform = `translate(${-mx*STRENGTH}px,${-my*STRENGTH*.6}px)`;
      });
    });
  });
  sl.addEventListener('mouseleave', () => { mx = 0; my = 0; });
})();
</script>