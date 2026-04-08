# Design — Modals de détail projet (Kiosk & Kiosk Tune)

## Objectif

Ajouter des modals de détail au clic sur les cartes **Kiosk** et **Kiosk Tune** du portfolio, en préparation d'un oral BTS de 10 minutes. Les 2 projets perso (GoT UHC, TrelloLink) restent inchangés.

## Comportement

- **Déclencheur** : clic sur la carte projet (cursor: pointer, léger indicateur visuel)
- **Ouverture** : overlay sombre (fond assombri) + modal centrée avec fade-in et léger scale-up
- **Fermeture** : bouton ×, clic sur l'overlay, touche Escape
- **Scroll** : le body est verrouillé (overflow: hidden) quand la modal est ouverte ; le contenu de la modal scrolle si nécessaire
- **Projets concernés** : Kiosk et Kiosk Tune uniquement

## Layout de la modal

Colonne unique scrollable. Sections dans l'ordre :

1. **Badge** — "Alternance — CashMag" (réutilise le style existant `.project-card__badge`)
2. **Titre** — nom du projet
3. **Contexte** — description du projet et du besoin métier
4. **Mon rôle** — ce que j'ai fait concrètement
5. **Fonctionnalités clés** — liste rapide des contributions principales
6. **Focus : feature en avant** — section mise en évidence avec bordure accent, expliquant le problème, la solution et l'intérêt technique
7. **Stack technique** — tags technos (même style que les cartes existantes)

## Style

- Cohérent avec le thème existant du portfolio (variables CSS : `--bg-surface`, `--border`, `--accent`, etc.)
- Overlay : `rgba(0, 0, 0, 0.7)` avec `backdrop-filter: blur(4px)`
- Modal : `--bg-surface` background, `--border` border, `--radius` border-radius, max-width ~700px, padding 40px
- Bouton fermeture × en haut à droite, couleur `--text-muted`, hover `--text`
- Section "Focus" : background `--accent-dim`, bordure gauche `--accent`, border-radius `--radius-sm`
- Animation ouverture : overlay fade-in 0.3s, modal opacity 0→1 + scale 0.95→1 en 0.3s
- Animation fermeture : inverse, 0.2s
- Responsive : modal à 90% de largeur sur mobile, padding réduit à 24px

## Contenu — Kiosk

### Contexte

Kiosk est une application de borne de commande en libre-service destinée au secteur de la restauration. Développée chez CashMag, elle permet aux clients de passer commande de manière autonome sur des bornes tactiles (terminaux Sunmi et iMin). L'application gère l'ensemble du parcours : consultation du catalogue, composition de menus, paiement multi-moyens et impression du ticket.

### Mon rôle

Développeur Flutter en alternance, j'ai travaillé sur l'ensemble de l'application : ajout de nouvelles fonctionnalités, intégration de moyens de paiement (Twint), gestion du matériel (LED d'état, imprimantes thermiques) et amélioration de l'expérience utilisateur (produits favoris, badges, nouveaux types de cartes produit).

### Fonctionnalités clés

- Intégration du paiement Twint via EPTPayBridge
- Système de Top Sales (famille virtuelle, badge, configuration)
- Produits favoris et badge "Nouveau"
- Nouveau type de carte produit (Large avec description)
- Créneaux de désactivation de la borne avec scheduler
- Écran de veille vidéo avec créneaux horaires d'images
- Gestion des réductions par groupe client et famille
- Gestion des contremarques et commandes gratuites
- LED d'état réagissant au cycle de vie de l'application

### Focus — Système de bannières publicitaires

**Problème** : Les restaurateurs souhaitaient mettre en avant certains produits ou rubriques via des bannières visuelles sur l'écran de commande, pour augmenter les ventes de produits spécifiques ou promouvoir des offres.

**Solution** : J'ai développé un système complet de bannières publicitaires intégré à l'écran de commande. Un composant de rotation d'images affiche les bannières en boucle. Chaque bannière peut être liée à un produit spécifique ou à une rubrique entière : au clic, le client est redirigé vers le produit ou la catégorie correspondante. J'ai également ajouté un suivi de la source des commandes (enum `ItemOrderLineSource`) pour identifier les ventes générées par les bannières.

**Intérêt technique** : Cette feature combine affichage dynamique d'images, navigation conditionnelle (produit vs rubrique), gestion d'état avec un style dialog dédié (`BannerDialogStyleState`), et traçabilité métier des ventes. Le widget principal (`AdsBannerWidget`, ~300 lignes) gère le cycle de vie des images, les interactions utilisateur et la communication avec le reste de l'application.

### Stack

Flutter, Dart, REST API, Sunmi/iMin SDK

## Contenu — Kiosk Tune

### Contexte

Kiosk Tune est l'application compagnon de Kiosk, conçue pour configurer les bornes à distance. Elle permet aux gérants de personnaliser l'apparence, les moyens de paiement, les publicités et le comportement de leurs bornes sans intervention physique, via une découverte réseau automatique (mDNS).

### Mon rôle

Développeur Flutter en alternance, j'ai conçu et implémenté plusieurs fonctionnalités structurantes : le système de backup/restauration, la personnalisation visuelle (thèmes, couleurs, boutons de paiement), la gestion des bannières publicitaires côté configuration, et la planification de créneaux horaires pour les images et la désactivation des bornes.

### Fonctionnalités clés

- Personnalisation complète du thème (couleurs, boutons de paiement)
- Configuration des bannières publicitaires avec lien produit/rubrique
- Planification d'images d'accueil par créneaux horaires
- Créneaux de désactivation des bornes
- Configuration du Top Sales et des politiques de suggestion
- Lecteur vidéo pour l'écran de veille

### Focus — Système de backup et restauration

**Problème** : Les bornes Kiosk nécessitent une configuration complexe (thème, moyens de paiement, publicités, créneaux horaires). En cas de panne ou de remplacement de matériel, reconfigurer une borne manuellement était long et source d'erreurs. Il fallait un moyen de sauvegarder et restaurer l'intégralité de la configuration.

**Solution** : J'ai développé un service de backup complet (`BackupService`) qui archive toute la configuration et les fichiers associés, les envoie sur le serveur via l'API, et permet de les télécharger et restaurer sur n'importe quelle borne. J'ai aussi ajouté un backup automatique à chaque envoi de configuration (avec préférence persistée via `SharedPreferences`), et une interface dédiée (`BackupMenuDialog`) pour gérer les sauvegardes manuellement.

**Intérêt technique** : Cette feature touche à plusieurs couches : sérialisation de données complexes, gestion de fichiers (archivage, transfert), communication serveur (upload/download via API), persistance locale des préférences, et interface utilisateur avec feedback en temps réel. Le code a été refactoré une fois en production pour améliorer la fiabilité et la gestion d'erreurs — un bon exemple de cycle de développement itératif.

### Stack

Flutter, Dart, mDNS, REST API, SharedPreferences

## Implémentation technique

### Fichiers à modifier

- `index.html` — ajouter le markup des modals (2 modals, une par projet) avec attribut `data-modal` sur les cartes Kiosk/Kiosk Tune
- `style.css` — ajouter les styles de la modal (overlay, modal, sections, responsive, animations)
- `script.js` — ajouter la logique d'ouverture/fermeture (clic carte, clic overlay, bouton ×, Escape, verrouillage scroll)

### Données

Le contenu des modals est directement en HTML dans `index.html` (pas de JS dynamique nécessaire pour 2 modals statiques).
