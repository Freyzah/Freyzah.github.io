# Project Detail Modals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add clickable detail modals to the Kiosk and Kiosk Tune project cards for a BTS oral presentation.

**Architecture:** Two static HTML modals triggered by clicking the enterprise project cards. CSS handles styling/animations, JS handles open/close logic. No framework, no build step — vanilla HTML/CSS/JS matching the existing codebase.

**Tech Stack:** HTML, CSS, JavaScript (vanilla)

---

### Task 1: Add modal CSS styles

**Files:**
- Modify: `style.css` (append after the PROJECTS section, around line 640)

- [ ] **Step 1: Add overlay and modal base styles**

Append the following CSS after the `.project-card__link:hover` rule (line 640) in `style.css`:

```css
/* ============================================
   PROJECT MODAL
   ============================================ */

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.modal-overlay.active {
  opacity: 1;
  pointer-events: auto;
}

.modal {
  position: relative;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  max-width: 700px;
  width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  padding: 40px;
  transform: scale(0.95);
  opacity: 0;
  transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s;
}

.modal-overlay.active .modal {
  transform: scale(1);
  opacity: 1;
}

.modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  transition: color 0.3s;
  z-index: 1;
}

.modal__close:hover {
  color: var(--text);
}
```

- [ ] **Step 2: Add modal content section styles**

Append directly after the previous block:

```css
.modal__badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--accent-secondary);
  background: rgba(167, 139, 250, 0.1);
  border: 1px solid rgba(167, 139, 250, 0.15);
  padding: 4px 10px;
  border-radius: 100px;
  margin-bottom: 16px;
}

.modal__title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 24px;
}

.modal__section {
  margin-bottom: 24px;
}

.modal__section-title {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--accent);
  margin-bottom: 8px;
}

.modal__text {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.7;
}

.modal__list {
  list-style: none;
  padding: 0;
}

.modal__list li {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.8;
  padding-left: 16px;
  position: relative;
}

.modal__list li::before {
  content: '▹';
  position: absolute;
  left: 0;
  color: var(--accent);
}

.modal__focus {
  background: var(--accent-dim);
  border-left: 3px solid var(--accent);
  border-radius: var(--radius-sm);
  padding: 20px;
  margin-bottom: 24px;
}

.modal__focus-title {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 12px;
}

.modal__focus-subtitle {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text);
  margin-top: 12px;
  margin-bottom: 4px;
}

.modal__focus .modal__text {
  font-size: 0.85rem;
}

.modal__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.modal__tags span {
  padding: 6px 14px;
  font-size: 0.8rem;
  font-weight: 500;
  background: var(--accent-dim);
  color: var(--accent);
  border-radius: 100px;
  border: 1px solid rgba(100, 255, 218, 0.08);
}

.project-card[data-modal] {
  cursor: pointer;
}
```

- [ ] **Step 3: Add responsive and scrollbar styles for modal**

Append directly after the previous block:

```css
@media (max-width: 768px) {
  .modal {
    padding: 24px;
    max-height: 90vh;
  }
}

.modal::-webkit-scrollbar {
  width: 4px;
}

.modal::-webkit-scrollbar-track {
  background: transparent;
}

.modal::-webkit-scrollbar-thumb {
  background: var(--text-dim);
  border-radius: 2px;
}
```

- [ ] **Step 4: Commit**

```bash
git add style.css
git commit -m "Add modal overlay and content styles for project details"
```

---

### Task 2: Add modal HTML markup

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add `data-modal` attribute to Kiosk and Kiosk Tune cards**

On the Kiosk card (line 205), add `data-modal="modal-kiosk"`:

Change:
```html
<article class="project-card reveal" data-delay="2" data-tilt>
```
To:
```html
<article class="project-card reveal" data-delay="2" data-tilt data-modal="modal-kiosk">
```

On the Kiosk Tune card (line 225), add `data-modal="modal-kiosktune"`:

Change:
```html
<article class="project-card reveal" data-delay="3" data-tilt>
```
To:
```html
<article class="project-card reveal" data-delay="3" data-tilt data-modal="modal-kiosktune">
```

- [ ] **Step 2: Add Kiosk modal HTML**

Insert the following just before the closing `</body>` tag (before `<script src="script.js">`):

```html
  <!-- Project Modals -->
  <div class="modal-overlay" id="modal-kiosk">
    <div class="modal">
      <button class="modal__close" aria-label="Fermer">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
      <div class="modal__badge">Alternance — CashMag</div>
      <h3 class="modal__title">Kiosk</h3>

      <div class="modal__section">
        <h4 class="modal__section-title">Contexte</h4>
        <p class="modal__text">
          Kiosk est une application de borne de commande en libre-service destinée au secteur de la restauration. Développée chez CashMag, elle permet aux clients de passer commande de manière autonome sur des bornes tactiles (terminaux Sunmi et iMin). L'application gère l'ensemble du parcours : consultation du catalogue, composition de menus, paiement multi-moyens et impression du ticket.
        </p>
      </div>

      <div class="modal__section">
        <h4 class="modal__section-title">Mon rôle</h4>
        <p class="modal__text">
          Développeur Flutter en alternance, j'ai travaillé sur l'ensemble de l'application : ajout de nouvelles fonctionnalités, intégration de moyens de paiement (Twint), gestion du matériel (LED d'état, imprimantes thermiques) et amélioration de l'expérience utilisateur (produits favoris, badges, nouveaux types de cartes produit).
        </p>
      </div>

      <div class="modal__section">
        <h4 class="modal__section-title">Fonctionnalités clés</h4>
        <ul class="modal__list">
          <li>Intégration du paiement Twint via EPTPayBridge</li>
          <li>Système de Top Sales (famille virtuelle, badge, configuration)</li>
          <li>Produits favoris et badge "Nouveau"</li>
          <li>Nouveau type de carte produit (Large avec description)</li>
          <li>Créneaux de désactivation de la borne avec scheduler</li>
          <li>Écran de veille vidéo avec créneaux horaires d'images</li>
          <li>Gestion des réductions par groupe client et famille</li>
          <li>Gestion des contremarques et commandes gratuites</li>
          <li>LED d'état réagissant au cycle de vie de l'application</li>
        </ul>
      </div>

      <div class="modal__focus">
        <h4 class="modal__focus-title">Focus — Système de bannières publicitaires</h4>
        <p class="modal__focus-subtitle">Problème</p>
        <p class="modal__text">
          Les restaurateurs souhaitaient mettre en avant certains produits ou rubriques via des bannières visuelles sur l'écran de commande, pour augmenter les ventes de produits spécifiques ou promouvoir des offres.
        </p>
        <p class="modal__focus-subtitle">Solution</p>
        <p class="modal__text">
          J'ai développé un système complet de bannières publicitaires intégré à l'écran de commande. Un composant de rotation d'images affiche les bannières en boucle. Chaque bannière peut être liée à un produit spécifique ou à une rubrique entière : au clic, le client est redirigé vers le produit ou la catégorie correspondante. J'ai également ajouté un suivi de la source des commandes pour identifier les ventes générées par les bannières.
        </p>
        <p class="modal__focus-subtitle">Intérêt technique</p>
        <p class="modal__text">
          Cette feature combine affichage dynamique d'images, navigation conditionnelle (produit vs rubrique), gestion d'état avec un style dialog dédié, et traçabilité métier des ventes. Le widget principal (~300 lignes) gère le cycle de vie des images, les interactions utilisateur et la communication avec le reste de l'application.
        </p>
      </div>

      <div class="modal__section">
        <h4 class="modal__section-title">Stack technique</h4>
        <div class="modal__tags">
          <span>Flutter</span>
          <span>Dart</span>
          <span>REST API</span>
          <span>Sunmi / iMin SDK</span>
        </div>
      </div>
    </div>
  </div>
```

- [ ] **Step 3: Add Kiosk Tune modal HTML**

Insert directly after the Kiosk modal:

```html
  <div class="modal-overlay" id="modal-kiosktune">
    <div class="modal">
      <button class="modal__close" aria-label="Fermer">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
      <div class="modal__badge">Alternance — CashMag</div>
      <h3 class="modal__title">Kiosk Tune</h3>

      <div class="modal__section">
        <h4 class="modal__section-title">Contexte</h4>
        <p class="modal__text">
          Kiosk Tune est l'application compagnon de Kiosk, conçue pour configurer les bornes à distance. Elle permet aux gérants de personnaliser l'apparence, les moyens de paiement, les publicités et le comportement de leurs bornes sans intervention physique, via une découverte réseau automatique (mDNS).
        </p>
      </div>

      <div class="modal__section">
        <h4 class="modal__section-title">Mon rôle</h4>
        <p class="modal__text">
          Développeur Flutter en alternance, j'ai conçu et implémenté plusieurs fonctionnalités structurantes : le système de backup/restauration, la personnalisation visuelle (thèmes, couleurs, boutons de paiement), la gestion des bannières publicitaires côté configuration, et la planification de créneaux horaires pour les images et la désactivation des bornes.
        </p>
      </div>

      <div class="modal__section">
        <h4 class="modal__section-title">Fonctionnalités clés</h4>
        <ul class="modal__list">
          <li>Personnalisation complète du thème (couleurs, boutons de paiement)</li>
          <li>Configuration des bannières publicitaires avec lien produit/rubrique</li>
          <li>Planification d'images d'accueil par créneaux horaires</li>
          <li>Créneaux de désactivation des bornes</li>
          <li>Configuration du Top Sales et des politiques de suggestion</li>
          <li>Lecteur vidéo pour l'écran de veille</li>
        </ul>
      </div>

      <div class="modal__focus">
        <h4 class="modal__focus-title">Focus — Système de backup et restauration</h4>
        <p class="modal__focus-subtitle">Problème</p>
        <p class="modal__text">
          Les bornes Kiosk nécessitent une configuration complexe (thème, moyens de paiement, publicités, créneaux horaires). En cas de panne ou de remplacement de matériel, reconfigurer une borne manuellement était long et source d'erreurs. Il fallait un moyen de sauvegarder et restaurer l'intégralité de la configuration.
        </p>
        <p class="modal__focus-subtitle">Solution</p>
        <p class="modal__text">
          J'ai développé un service de backup complet qui archive toute la configuration et les fichiers associés, les envoie sur le serveur via l'API, et permet de les télécharger et restaurer sur n'importe quelle borne. J'ai aussi ajouté un backup automatique à chaque envoi de configuration, et une interface dédiée pour gérer les sauvegardes manuellement.
        </p>
        <p class="modal__focus-subtitle">Intérêt technique</p>
        <p class="modal__text">
          Cette feature touche à plusieurs couches : sérialisation de données complexes, gestion de fichiers (archivage, transfert), communication serveur (upload/download via API), persistance locale des préférences, et interface utilisateur avec feedback en temps réel. Le code a été refactoré une fois en production pour améliorer la fiabilité et la gestion d'erreurs — un bon exemple de cycle de développement itératif.
        </p>
      </div>

      <div class="modal__section">
        <h4 class="modal__section-title">Stack technique</h4>
        <div class="modal__tags">
          <span>Flutter</span>
          <span>Dart</span>
          <span>mDNS</span>
          <span>REST API</span>
          <span>SharedPreferences</span>
        </div>
      </div>
    </div>
  </div>
```

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Add modal markup for Kiosk and Kiosk Tune project details"
```

---

### Task 3: Add modal open/close JavaScript logic

**Files:**
- Modify: `script.js` (append at end)

- [ ] **Step 1: Add modal open/close logic**

Append the following at the end of `script.js`:

```javascript
// ============================================
// PROJECT MODALS
// ============================================

document.querySelectorAll('[data-modal]').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    const modal = document.getElementById(card.dataset.modal);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

document.querySelectorAll('.modal__close').forEach(btn => {
  btn.addEventListener('click', () => {
    const overlay = btn.closest('.modal-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const active = document.querySelector('.modal-overlay.active');
    if (active) {
      active.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});
```

- [ ] **Step 2: Commit**

```bash
git add script.js
git commit -m "Add modal open/close logic with overlay click and Escape support"
```

---

### Task 4: Manual verification

- [ ] **Step 1: Open the site locally and verify**

Run: `start index.html` (or open in browser)

Check the following:
1. Kiosk card shows cursor pointer on hover
2. Clicking Kiosk card opens the modal with correct content
3. Clicking × closes the modal
4. Clicking outside the modal (overlay) closes it
5. Pressing Escape closes the modal
6. Scrolling the page is locked while modal is open
7. Modal content scrolls if taller than viewport
8. Repeat checks 2-6 for Kiosk Tune card
9. GoT UHC and TrelloLink cards do NOT open any modal
10. On mobile viewport (resize browser to ~375px), modal takes 90% width with smaller padding

- [ ] **Step 2: Fix any issues found, then final commit if needed**
