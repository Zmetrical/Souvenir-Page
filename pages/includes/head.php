<?php
/**
 * includes/head.php
 *
 * Usage in any page:
 *   <?php
 *     $pageTitle       = 'ArtsyCrate — Custom Prints & Creative Fun';  // required
 *     $pageDescription = 'Optional meta description';                   // optional
 *     include 'includes/head.php';
 *   ?>
 *
 * Variables read:
 *   $pageTitle        string   <title> content
 *   $pageDescription  string   <meta description> content (optional)
 *   $canonicalUrl     string   <link rel="canonical"> (optional)
 */

$pageTitle       = $pageTitle       ?? 'ArtsyCrate — Prints, Customs & Creative Fun';
$pageDescription = $pageDescription ?? 'Your one-stop creative shop for personalized gifts, custom prints, bag charms, keychains, and 3D printed wonders. Walk in. Create. Smile.';
$canonicalUrl    = $canonicalUrl    ?? '';
?>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta name="description" content="<?= htmlspecialchars($pageDescription) ?>"/>
<?php if ($canonicalUrl): ?>
<link rel="canonical" href="<?= htmlspecialchars($canonicalUrl) ?>"/>
<?php endif; ?>
<title><?= htmlspecialchars($pageTitle) ?></title>

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>

<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>

<!-- Lucide Icons (UMD) -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>

<!-- Site styles -->
<link rel="stylesheet" href="<?= $stylesPath ?? 'styles.css' ?>"/>