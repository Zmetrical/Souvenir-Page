<?php
/**
 * includes/section-personalized.php
 *
 * "Get Personalized" section — section intro headline + 3 alternating product rows.
 *
 * Usage:
 *   <?php include 'includes/section-personalized.php'; ?>
 *
 * To add/remove/reorder rows, edit the $rows array below.
 * Each row supports:
 *   'num'     string  Two-digit display number
 *   'theme'   string  'teal' | 'lime' | 'purple'  — controls color tokens
 *   'icon'    string  Lucide icon name (used in label + background circle)
 *   'label'   string  Small pill label text
 *   'heading' string  Main heading (HTML allowed for line breaks)
 *   'body'    string  Body paragraph
 *   'chips'   array   Array of chip label strings
 *   'btnLabel'string  CTA button label
 *   'btnHref' string  CTA button href
 *   'mcards'  array   Floating mini-cards: [['icon','label','miClass'], ...]
 *                     miClass: 'mi-t' | 'mi-l' | 'mi-p' | 'mi-k'
 *   'alt'     bool    If true, row has reversed layout + offwhite bg
 */

$rows = [
  [
    'num'     => '01',
    'theme'   => 'teal',
    'icon'    => 'coffee',
    'label'   => 'Drinkware',
    'heading' => 'Tumblers &amp;<br/>Custom Mugs',
    'body'    => 'Your favorite drink deserves a vessel as unique as you are. We personalize tumblers, mugs, and bottles with names, photos, or any design you want.',
    'chips'   => ['Name Prints', 'Photo Wrap', 'Sublimation', 'Glitter Finish'],
    'btnLabel'=> 'Customize Now',
    'btnHref' => '#',
    'mcards'  => [
      ['icon' => 'droplets', 'label' => 'Sublimation Print', 'mi' => 'mi-t', 'pos' => 'top:-14px;right:-20px;'],
      ['icon' => 'sparkles', 'label' => 'Glitter Finish',    'mi' => 'mi-k', 'pos' => 'bottom:8px;left:-36px;'],
      ['icon' => 'type',     'label' => 'Name Engraving',    'mi' => 'mi-t', 'pos' => 'top:80px;right:-56px;font-size:.7rem;'],
    ],
    'alt' => false,
  ],
  [
    'num'     => '02',
    'theme'   => 'lime',
    'icon'    => 'scissors',
    'label'   => 'DIY In-Store',
    'heading' => 'Bag Charms &amp;<br/>Keychains',
    'body'    => 'Walk in and create something just for you. Pick your shapes, colors, and materials — our in-store workshop has everything you need to get crafty.',
    'chips'   => ['Bag Charms', 'Acrylic Keychains', 'Resin Craft', 'Pins & Badges'],
    'btnLabel'=> 'Start Making',
    'btnHref' => 'builder/keychain.php',
    'mcards'  => [
      ['icon' => 'scissors', 'label' => 'DIY Workshop',  'mi' => 'mi-l', 'pos' => 'top:-14px;left:-20px;'],
      ['icon' => 'palette',  'label' => 'Custom Colors', 'mi' => 'mi-l', 'pos' => 'bottom:8px;right:-36px;'],
      ['icon' => 'heart',    'label' => 'All skill levels','mi' => 'mi-k','pos' => 'top:80px;left:-56px;font-size:.7rem;'],
    ],
    'alt' => true,
  ],
  [
    'num'     => '03',
    'theme'   => 'purple',
    'icon'    => 'box',
    'label'   => '3D Printing',
    'heading' => '3D Printed<br/>Customs',
    'body'    => 'Bring any idea into the real world. Figurines, logo objects, custom name stands, miniature models — if you can imagine it, we can print it in any color.',
    'chips'   => ['Figurines', 'Logo Objects', 'Name Stands', 'Mini Models'],
    'btnLabel'=> 'Request a Print',
    'btnHref' => '#',
    'mcards'  => [
      ['icon' => 'layers', 'label' => 'Any Color',       'mi' => 'mi-p', 'pos' => 'top:-14px;right:-20px;'],
      ['icon' => 'cpu',    'label' => 'FDM Printing',    'mi' => 'mi-p', 'pos' => 'bottom:8px;left:-36px;'],
      ['icon' => 'zap',    'label' => 'Quick Turnaround','mi' => 'mi-t', 'pos' => 'top:80px;right:-56px;font-size:.7rem;'],
    ],
    'alt' => false,
  ],
];

/* ── Theme token maps ── */
$themeTokens = [
  'teal'   => ['lbl' => 'rl-t', 'chip' => 'rc-t', 'btn' => 'br-t', 'vbc' => 'vbc-t'],
  'lime'   => ['lbl' => 'rl-l', 'chip' => 'rc-l', 'btn' => 'br-l', 'vbc' => 'vbc-l'],
  'purple' => ['lbl' => 'rl-p', 'chip' => 'rc-p', 'btn' => 'br-p', 'vbc' => 'vbc-p'],
];
?>

<!-- ═══════════════════════════════════════════════════
     GET PERSONALIZED
═══════════════════════════════════════════════════ -->
<div id="customize">

  <!-- Section intro -->
  <div class="pers-intro">
    <div class="container">
      <div class="row justify-content-center text-center">
        <div class="col-lg-6 fade-up">
          <div class="eye-row justify-content-center">
            <span class="eye-bar"></span> Get Personalized <span class="eye-bar"></span>
          </div>
          <h2 class="sec-h">
            Make It <span class="tc">Yours</span>,<br/>
            Make It <span class="pc">Special</span>
          </h2>
          <p class="sec-p mx-auto text-center" style="max-width:400px;">
            Choose your medium, pick your style. Everything at ArtsyCrate can be
            customized — for yourself or for someone you love.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Product rows -->
  <?php foreach ($rows as $row):
    $tk = $themeTokens[$row['theme']];
    $fadeText = $row['alt'] ? 'fade-right' : 'fade-left';
    $fadeVis  = $row['alt'] ? 'fade-left'  : 'fade-right';
  ?>
  <div class="pers-row<?= $row['alt'] ? ' alt' : '' ?>">
    <div class="container">
      <div class="row align-items-center g-5<?= $row['alt'] ? ' flex-lg-row-reverse' : '' ?>">

        <!-- Text -->
        <div class="col-lg-6 <?= $fadeText ?>">
          <div class="row-num"><?= $row['num'] ?></div>
          <div class="row-lbl <?= $tk['lbl'] ?>">
            <i data-lucide="<?= $row['icon'] ?>" style="width:12px;height:12px;"></i>
            <?= $row['label'] ?>
          </div>
          <h3 class="row-h"><?= $row['heading'] ?></h3>
          <p class="row-p"><?= $row['body'] ?></p>
          <div class="row-chips">
            <?php foreach ($row['chips'] as $chip): ?>
            <span class="rchip <?= $tk['chip'] ?>"><?= $chip ?></span>
            <?php endforeach; ?>
          </div>
          <a href="<?= htmlspecialchars($row['btnHref']) ?>"
             class="btn-r <?= $tk['btn'] ?>">
            <i data-lucide="arrow-right" style="width:15px;height:15px;"></i>
            <?= $row['btnLabel'] ?>
          </a>
        </div>

        <!-- Visual -->
        <div class="col-lg-6 <?= $fadeVis ?>">
          <div class="row-vis">
            <div class="vis-bg-circle <?= $tk['vbc'] ?>">
              <i data-lucide="<?= $row['icon'] ?>" class="bg-icon"></i>
            </div>
            <?php foreach ($row['mcards'] as $mc): ?>
            <div class="mc" style="<?= $mc['pos'] ?>">
              <div class="mc-i <?= $mc['mi'] ?>">
                <i data-lucide="<?= $mc['icon'] ?>"></i>
              </div>
              <?= $mc['label'] ?>
            </div>
            <?php endforeach; ?>
          </div>
        </div>

      </div>
    </div>
  </div>
  <?php endforeach; ?>

</div>