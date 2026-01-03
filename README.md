# 🛒 Trust Factory E-Commerce Platform

Une plateforme e-commerce moderne construite avec **Laravel**, **Inertia.js**, et **React** avec un système de panier persistant, gestion du stock, et rapports de ventes automatisés.

---

## 📋 Table des Matières

- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Structure du Projet](#structure-du-projet)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [API Endpoints](#api-endpoints)
- [Jobs & Scheduling](#jobs--scheduling)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

### 🛍️ Core Features
- ✅ Authentification utilisateur avec Laravel Fortify + Two-Factor Auth
- ✅ Affichage des produits avec images et descriptions
- ✅ Panier persistant en base de données (par utilisateur authentifié)
- ✅ Ajout/Suppression/Mise à jour des quantités du panier
- ✅ Checkout avec décrément automatique du stock
- ✅ Gestion des utilisateurs et profil

### 📊 Admin Features
- ✅ **Low Stock Notifications** - Email quand stock ≤ 10 unités
- ✅ **Daily Sales Reports** - Rapport automatique chaque jour à 18h
- ✅ Validation avec Form Requests
- ✅ Observer pattern pour événements automatiques

### 💻 Frontend
- ✅ Design responsive (mobile, tablet, desktop)
- ✅ Composants React modulaires
- ✅ TypeScript pour la sécurité des types
- ✅ Tailwind CSS pour le styling
- ✅ Inertia.js pour le rendu côté serveur

---

## 🏗️ Architecture

### Stack Technologique

```
Frontend Layer
├── React 18+ (TypeScript/TSX)
├── Inertia.js (Server-Side Rendering)
├── Tailwind CSS (Styling)
└── Lucide Icons (UI Icons)

Backend Layer
├── Laravel 11
├── Laravel Fortify (Auth)
├── Laravel Queue (Jobs)
└── MySQL Database

DevOps
├── Vite (Build tool)
├── Composer (PHP Dependencies)
└── npm/yarn (JS Dependencies)
```

### Flux de Données

```
User (Frontend)
    ↓
React Component
    ↓
Inertia Router (Auto CSRF)
    ↓
Laravel Controller
    ↓
Service Layer (CartService)
    ↓
Models + Database
    ↓
Response → Inertia Share (Cache globale)
```

---

## 🚀 Installation

### Prérequis
- PHP 8.1+
- Composer
- Node.js 16+
- MySQL 8.0+
- Git

### Étapes d'Installation

#### 1. Cloner le projet
```bash
git clone <repository-url>
cd trust_factory_interview
```

#### 2. Installer les dépendances PHP
```bash
composer install
```

#### 3. Installer les dépendances JavaScript
```bash
npm install
# ou
yarn install
```

#### 4. Configurer l'environnement
```bash
cp .env.example .env
php artisan key:generate
```

#### 5. Configurer la base de données
```bash
# Dans .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=trust_factory
DB_USERNAME=root
DB_PASSWORD=
```

#### 6. Migrer la base de données
```bash
php artisan migrate
```

#### 7. Créer les données de test (seeding)
```bash
php artisan db:seed
# Ou seeder spécifique
php artisan db:seed --class=ProductSeeder
```

#### 8. Lancer les serveurs de développement

Terminal 1 - Serveur Laravel :
```bash
php artisan serve
```

Terminal 2 - Vite (frontend build) :
```bash
npm run dev
```

Accès : http://localhost:8000

---

## 📁 Structure du Projet

```
trust_factory_interview/
├── app/
│   ├── Console/
│   │   └── Kernel.php                 # Scheduling des jobs
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── DashboardController.php
│   │   │   └── UserCartController.php
│   │   └── Requests/
│   │       ├── AddToCartRequest.php
│   │       └── UpdateCartRequest.php
│   ├── Jobs/
│   │   ├── NotifyLowStock.php        # Alert stock faible
│   │   └── SendDailySalesReport.php  # Rapport quotidien
│   ├── Mail/
│   │   ├── LowStockNotification.php
│   │   └── DailySalesReport.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── Product.php
│   │   ├── Cart.php
│   │   ├── CartItem.php
│   │   └── ...
│   ├── Observers/
│   │   └── ProductObserver.php        # Écoute changements stock
│   ├── Services/
│   │   └── CartService.php            # Logique panier
│   └── Providers/
│       └── AppServiceProvider.php     # Configuration globale
│
├── resources/
│   ├── js/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── UserProfile.tsx
│   │   │   └── ...
│   │   ├── hooks/
│   │   │   └── use-user-cart.ts      # Hook pour panier
│   │   ├── layouts/
│   │   │   └── ecommerce-layout.tsx  # Layout principal
│   │   ├── pages/
│   │   │   ├── dashboard.tsx
│   │   │   └── ...
│   │   └── app.tsx                    # Root app
│   ├── views/
│   │   ├── app.blade.php             # HTML template
│   │   └── email/
│   │       ├── low-stock-notification.blade.php
│   │       └── daily-sales-report.blade.php
│   └── css/
│       └── app.css
│
├── routes/
│   ├── web.php                        # Routes web
│   ├── cart.php                       # Routes API panier
│   ├── settings.php
│   └── console.php
│
├── database/
│   ├── migrations/
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── 2025_01_01_create_products_table.php
│   │   ├── 2025_01_01_create_carts_table.php
│   │   └── ...
│   ├── factories/
│   │   ├── UserFactory.php
│   │   └── ProductFactory.php
│   └── seeders/
│       ├── DatabaseSeeder.php
│       ├── UserSeeder.php
│       └── ProductSeeder.php
│
├── config/
│   ├── app.php
│   ├── auth.php
│   ├── database.php
│   ├── fortify.php
│   ├── mail.php
│   └── ...
│
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── composer.json
├── package.json
└── README.md
```

---

## ⚙️ Configuration

### Variables d'Environnement (.env)

```env
APP_NAME="Trust Factory"
APP_ENV=local
APP_KEY=base64:xxxxx
APP_DEBUG=true

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=trust_factory
DB_USERNAME=root
DB_PASSWORD=

MAIL_DRIVER=log
MAIL_HOST=127.0.0.1
MAIL_PORT=2525

QUEUE_CONNECTION=sync
```

### Emails
- **Admin Email** (rapports & alertes) : `admin@example.com`
- Pour tester les emails en dev : `MAIL_DRIVER=log` (logs dans `storage/logs/laravel.log`)

### Queue
- **Driver** : `sync` (synchrone en dev), `database` en production
- Pour tester les Jobs : `php artisan queue:work`

---

## 🎯 Utilisation

### Pour les Utilisateurs

#### 1. S'inscrire / Se connecter
- Aller sur `/login` ou `/register`
- Créer un compte avec email et mot de passe
- Activer Two-Factor Auth (optionnel)

#### 2. Acheter des produits
- Voir tous les produits sur le dashboard
- Cliquer "Add to Cart" pour ajouter au panier
- Voir le panier en sidebar (desktop) ou toggle (mobile)
- Modifier quantités ou supprimer items
- Cliquer "Proceed to Checkout" pour acheter

#### 3. Profil & Paramètres
- Cliquer sur l'avatar en haut à droite
- "My Profile" - Voir ses infos
- "Settings" - Gérer les paramètres
- "Logout" - Se déconnecter

### Pour les Admin

#### 1. Recevoir les alertes stock faible
- Chaque produit avec stock ≤ 10 génère un email
- Email détaillé avec lien au dashboard
- Automatique via Observer

#### 2. Rapport de ventes quotidien
- Chaque jour à **18:00** un rapport s'envoie
- Contient tous les produits vendus ce jour
- Statistiques : unités, revenus, transactions
- Email à `admin@example.com`

---

## 🔌 API Endpoints

### Routes de Panier

```http
# Ajouter au panier
POST /api/cart/add
Body: { product_id: 1, quantity: 1 }

# Mettre à jour quantité
PUT /api/cart/update/{productId}
Body: { quantity: 2 }

# Supprimer du panier
DELETE /api/cart/remove/{productId}

# Checkout (acheter)
POST /api/cart/checkout

# Vider le panier
POST /api/cart/clear
```

### Routes Web

```http
GET  /              → Redirect to /login
GET  /login         → Page login
GET  /register      → Page register
GET  /dashboard     → Page dashboard (auth required)
GET  /settings      → Page settings (auth required)
POST /logout        → Déconnexion (auth required)
```

---

## ⏰ Jobs & Scheduling

### NotifyLowStock Job
**Déclenché** : Quand un produit a stock ≤ 10
**Action** : Envoie un email à l'admin
**Vue** : `email/low-stock-notification.blade.php`

### SendDailySalesReport Job
**Déclenché** : Chaque jour à 18:00
**Action** : Envoie rapport des ventes du jour
**Vue** : `email/daily-sales-report.blade.php`

#### Tester les Jobs
```bash
# Dispatcher manuellement
php artisan tinker
> dispatch(new App\Jobs\SendDailySalesReport())

# Voir la queue
php artisan queue:failed

# Retenter les failed jobs
php artisan queue:retry all
```

---

## 🔍 Services Importants

### CartService (`app/Services/CartService.php`)

Tous les opérations du panier passent par ce service :

```php
// Récupérer les items du panier
$items = $cartService->getUserCartItems($user);

// Obtenir le total
$total = $cartService->getUserCartTotal($user);

// Ajouter un item
$cartService->addUserCartItem($user, $product, $quantity);

// Mettre à jour la quantité
$cartService->updateUserCartItemQuantity($user, $productId, $quantity);

// Supprimer un item
$cartService->removeUserCartItem($user, $productId);

// Vider le panier
$cartService->clearUserCart($user);

// Checkout
$result = $cartService->checkout($user);

// Diminuer le stock
$cartService->decrementProductStock($productId, $quantity);
```

### ProductObserver (`app/Observers/ProductObserver.php`)

Écoute les changements de stock :

```php
// Automatiquement déclenché quand :
// - Un produit est créé avec stock ≤ 10
// - Un produit est modifié et stock devient ≤ 10

// Envoie un email à l'admin
```

---

## 🪝 React Hooks

### useUserCart (`resources/js/hooks/use-user-cart.ts`)

Hook pour les opérations panier côté React :

```tsx
const { addToCart, removeFromCart, updateQuantity } = useUserCart();

// Ajouter au panier
addToCart(productId, quantity);

// Supprimer du panier
removeFromCart(productId);

// Mettre à jour quantité
updateQuantity(productId, newQuantity);
```

---

## 🎨 Composants React

### Header
- Logo + Title
- Cart count badge
- Mobile menu toggle

### UserProfile
- Avatar avec première lettre du nom
- Dropdown menu
- Links : Profile, Settings, Logout

### ProductGrid
- Affiche les produits en grid
- Images, prix, ratings
- Bouton "Add to Cart"
- Indicateurs de stock faible/rupture

### Cart
- Liste des items
- Contrôles quantité (+--)
- Bouton supprimer
- Résumé (subtotal, shipping, tax, total)
- Bouton "Proceed to Checkout"

---

## 🐛 Troubleshooting

### Le panier est vide après refresh
**Cause** : Pas connecté ou session expirée
**Solution** : Se reconnecter

### Email ne s'envoie pas
**Cause** : `MAIL_DRIVER` mal configuré
**Solution** : 
```env
# Dev : Voir les logs
MAIL_DRIVER=log

# Production : Configurer SMTP
MAIL_DRIVER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=465
```

### Stock n'a pas diminué après checkout
**Cause** : Le Job n'a pas s'exécuté
**Solution** :
```bash
# Vérifier la queue
php artisan queue:work

# Ou checker les logs
tail -f storage/logs/laravel.log
```

### Frontend ne met pas à jour après action
**Cause** : Page pas refresh
**Solution** : Inertia rafraîchit automatiquement. Si pas de mise à jour : 
```bash
# Vérifier la console browser (F12)
# Voir les erreurs d'API
```

### Migration échoue
**Cause** : Base de données ou migrations en conflit
**Solution** :
```bash
# Reset total (WARNING: Perd les données)
php artisan migrate:refresh --seed

# Ou juste rebuild
php artisan migrate:reset
php artisan migrate
php artisan db:seed
```

---

## 📚 Ressources Utiles

- [Laravel Docs](https://laravel.com/docs)
- [Inertia.js Docs](https://inertiajs.com)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Laravel Fortify](https://laravel.com/docs/fortify)

---

## 📝 Notes de Développement

### Conventions de Code
- ✅ Utiliser TypeScript pour tout du React
- ✅ Services pour logique métier
- ✅ Form Requests pour validation
- ✅ Observers pour événements automatiques
- ✅ Jobs pour tâches asynchrones

### Bonnes Pratiques
- ✅ Toujours utiliser `Auth::check()` avant d'accéder au user
- ✅ Valider avec FormRequest, pas `$request->validate()`
- ✅ Utiliser `router.post()` d'Inertia, pas `fetch()`
- ✅ Dispatcher des Jobs pour les tâches longues
- ✅ Utiliser les Observers pour logique automatique

---

## 🚢 Déploiement

### Sur un serveur de production

1. **Préparer le serveur**
   ```bash
   # Installer PHP 8.1+, MySQL, Composer, Node.js
   ```

2. **Cloner et configurer**
   ```bash
   git clone <repo>
   composer install --optimize-autoloader --no-dev
   npm install && npm run build
   ```

3. **Configurer l'environnement**
   ```bash
   cp .env.example .env
   php artisan key:generate
   # Éditer .env avec vrais credentials
   ```

4. **Migrer la BD**
   ```bash
   php artisan migrate --force
   php artisan db:seed --force
   ```

5. **Setup Queue Worker**
   ```bash
   # Supervisor pour garder queue-work actif
   ```

6. **Setup Cron**
   ```bash
   # Add to crontab
   * * * * * cd /path && php artisan schedule:run >> /dev/null 2>&1
   ```

---

## 📧 Support & Contact

Pour des questions ou problèmes, consulte les logs :
```bash
tail -f storage/logs/laravel.log
```

---

**Last Updated** : January 3, 2026  
**Version** : 1.0.0
