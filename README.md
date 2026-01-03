# 🛒 Trust Factory E-Commerce Platform

A modern e-commerce platform built with **Laravel**, **Inertia.js**, and **React** featuring persistent shopping cart, inventory management, and automated sales reports.

---

## 📋 Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Jobs & Scheduling](#jobs--scheduling)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

### 🛍️ Core Features
- ✅ User authentication with Laravel Fortify + Two-Factor Auth
- ✅ Product display with images and descriptions
- ✅ Persistent shopping cart stored in database (per authenticated user)
- ✅ Add/Remove/Update cart item quantities
- ✅ Checkout with automatic stock decrement
- ✅ User management and profile

### 📊 Admin Features
- ✅ **Low Stock Notifications** - Email alert when stock ≤ 10 units
- ✅ **Daily Sales Reports** - Automated report every day at 6 PM
- ✅ Validation with Form Requests
- ✅ Observer pattern for automatic events

### 💻 Frontend
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modular React components
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Inertia.js for server-side rendering

---

## 🏗️ Architecture

### Technology Stack

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

### Data Flow

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
Response → Inertia Share (Global Cache)
```

---

## 🚀 Installation

### Prerequisites
- PHP 8.1+
- Composer
- Node.js 16+
- MySQL 8.0+
- Git

### Installation Steps

#### 1. Clone the project
```bash
git clone <repository-url>
cd trust_factory_interview
```

#### 2. Install PHP dependencies
```bash
composer install
```

#### 3. Install JavaScript dependencies
```bash
npm install
# or
yarn install
```

#### 4. Configure environment
```bash
cp .env.example .env
php artisan key:generate
```

#### 5. Configure database
```bash
# In .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=trust_factory
DB_USERNAME=root
DB_PASSWORD=
```

#### 6. Run database migrations
```bash
php artisan migrate
```

#### 7. Seed the database with test data
```bash
php artisan db:seed
# Or specific seeder
php artisan db:seed --class=ProductSeeder
```

#### 8. Start development servers

Terminal 1 - Laravel server:
```bash
php artisan serve
```

Terminal 2 - Vite (frontend build):
```bash
npm run dev
```

Access: http://localhost:8000

---

## 📁 Project Structure

```
trust_factory_interview/
├── app/
│   ├── Console/
│   │   └── Kernel.php                 # Job scheduling
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── DashboardController.php
│   │   │   └── UserCartController.php
│   │   └── Requests/
│   │       ├── AddToCartRequest.php
│   │       └── UpdateCartRequest.php
│   ├── Jobs/
│   │   ├── NotifyLowStock.php        # Low stock alert
│   │   └── SendDailySalesReport.php  # Daily report
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
│   │   └── ProductObserver.php        # Listen to stock changes
│   ├── Services/
│   │   └── CartService.php            # Cart logic
│   └── Providers/
│       └── AppServiceProvider.php     # Global configuration
│
├── resources/
│   ├── js/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── UserProfile.tsx
│   │   │   └── ...
│   │   ├── hooks/
│   │   │   └── use-user-cart.ts      # Cart hook
│   │   ├── layouts/
│   │   │   └── ecommerce-layout.tsx  # Main layout
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
│   ├── web.php                        # Web routes
│   ├── cart.php                       # Cart API routes
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

### Environment Variables (.env)

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
- **Admin Email** (reports & alerts): `admin@example.com`
- For testing emails in development: `MAIL_DRIVER=log` (logs in `storage/logs/laravel.log`)

### Queue
- **Driver**: `sync` (synchronous in dev), `database` in production
- To test Jobs: `php artisan queue:work`

---

## 🎯 Usage

### For Users

#### 1. Sign up / Log in
- Go to `/login` or `/register`
- Create an account with email and password
- Enable Two-Factor Auth (optional)

#### 2. Purchase products
- View all products on the dashboard
- Click "Add to Cart" to add products
- View cart in sidebar (desktop) or toggle (mobile)
- Modify quantities or remove items
- Click "Proceed to Checkout" to purchase

#### 3. Profile & Settings
- Click on avatar in top right
- "My Profile" - View your info
- "Settings" - Manage settings
- "Logout" - Sign out

### For Admins

#### 1. Receive low stock alerts
- Each product with stock ≤ 10 generates an email
- Detailed email with link to dashboard
- Automatic via Observer

#### 2. Daily sales report
- Every day at **6:00 PM** a report is sent
- Contains all products sold that day
- Statistics: units, revenue, transactions
- Email to `admin@example.com`

---

## 🔌 API Endpoints

### Cart Routes

```http
# Add to cart
POST /api/cart/add
Body: { product_id: 1, quantity: 1 }

# Update quantity
PUT /api/cart/update/{productId}
Body: { quantity: 2 }

# Remove from cart
DELETE /api/cart/remove/{productId}

# Checkout (purchase)
POST /api/cart/checkout

# Clear cart
POST /api/cart/clear
```

### Web Routes

```http
GET  /              → Redirect to /login
GET  /login         → Login page
GET  /register      → Register page
GET  /dashboard     → Dashboard page (auth required)
GET  /settings      → Settings page (auth required)
POST /logout        → Sign out (auth required)
```

---

## ⏰ Jobs & Scheduling

### NotifyLowStock Job
**Triggered**: When product stock ≤ 10
**Action**: Sends email to admin
**View**: `email/low-stock-notification.blade.php`

### SendDailySalesReport Job
**Triggered**: Every day at 6:00 PM
**Action**: Sends report of sales for that day
**View**: `email/daily-sales-report.blade.php`

#### Testing Jobs
```bash
# Dispatch manually
php artisan tinker
> dispatch(new App\Jobs\SendDailySalesReport())

# Check queue
php artisan queue:failed

# Retry failed jobs
php artisan queue:retry all
```

---

## 🔍 Important Services

### CartService (`app/Services/CartService.php`)

All cart operations go through this service:

```php
// Get cart items
$items = $cartService->getUserCartItems($user);

// Get total
$total = $cartService->getUserCartTotal($user);

// Add item
$cartService->addUserCartItem($user, $product, $quantity);

// Update quantity
$cartService->updateUserCartItemQuantity($user, $productId, $quantity);

// Remove item
$cartService->removeUserCartItem($user, $productId);

// Clear cart
$cartService->clearUserCart($user);

// Checkout
$result = $cartService->checkout($user);

// Decrement stock
$cartService->decrementProductStock($productId, $quantity);
```

### ProductObserver (`app/Observers/ProductObserver.php`)

Listens to stock changes:

```php
// Automatically triggered when:
// - A product is created with stock ≤ 10
// - A product is updated and stock becomes ≤ 10

// Sends email to admin
```

---

## 🪝 React Hooks

### useUserCart (`resources/js/hooks/use-user-cart.ts`)

Hook for cart operations on React side:

```tsx
const { addToCart, removeFromCart, updateQuantity } = useUserCart();

// Add to cart
addToCart(productId, quantity);

// Remove from cart
removeFromCart(productId);

// Update quantity
updateQuantity(productId, newQuantity);
```

---

## 🎨 React Components

### Header
- Logo + Title
- Cart count badge
- Mobile menu toggle

### UserProfile
- Avatar with first letter of name
- Dropdown menu
- Links: Profile, Settings, Logout

### ProductGrid
- Displays products in grid
- Images, prices, ratings
- "Add to Cart" button
- Low stock/out of stock indicators

### Cart
- List of items
- Quantity controls (+--)
- Delete button
- Summary (subtotal, shipping, tax, total)
- "Proceed to Checkout" button

---

## 🐛 Troubleshooting

### Cart is empty after page refresh
**Cause**: Not logged in or session expired
**Solution**: Sign in again

### Email not sending
**Cause**: `MAIL_DRIVER` misconfigured
**Solution**:
```env
# Dev: View logs
MAIL_DRIVER=log

# Production: Configure SMTP
MAIL_DRIVER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=465
```

### Stock didn't decrease after checkout
**Cause**: Job didn't execute
**Solution**:
```bash
# Check queue
php artisan queue:work

# Or check logs
tail -f storage/logs/laravel.log
```

### Frontend not updating after action
**Cause**: Page not refreshed
**Solution**: Inertia refreshes automatically. If no update:
```bash
# Check browser console (F12)
# View API errors
```

### Migration fails
**Cause**: Database or migration conflicts
**Solution**:
```bash
# Total reset (WARNING: Loses data)
php artisan migrate:refresh --seed

# Or just rebuild
php artisan migrate:reset
php artisan migrate
php artisan db:seed
```

---

## 📚 Useful Resources

- [Laravel Docs](https://laravel.com/docs)
- [Inertia.js Docs](https://inertiajs.com)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Laravel Fortify](https://laravel.com/docs/fortify)

---

## 📝 Development Notes

### Code Conventions
- ✅ Use TypeScript for all React code
- ✅ Services for business logic
- ✅ Form Requests for validation
- ✅ Observers for automatic events
- ✅ Jobs for asynchronous tasks

### Best Practices
- ✅ Always use `Auth::check()` before accessing user
- ✅ Validate with FormRequest, not `$request->validate()`
- ✅ Use Inertia's `router.post()`, not `fetch()`
- ✅ Dispatch Jobs for long-running tasks
- ✅ Use Observers for automatic logic

---

## 🚢 Deployment

### On a production server

1. **Prepare server**
   ```bash
   # Install PHP 8.1+, MySQL, Composer, Node.js
   ```

2. **Clone and configure**
   ```bash
   git clone <repo>
   composer install --optimize-autoloader --no-dev
   npm install && npm run build
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   # Edit .env with real credentials
   ```

4. **Migrate database**
   ```bash
   php artisan migrate --force
   php artisan db:seed --force
   ```

5. **Setup Queue Worker**
   ```bash
   # Use Supervisor to keep queue-work active
   ```

6. **Setup Cron**
   ```bash
   # Add to crontab
   * * * * * cd /path && php artisan schedule:run >> /dev/null 2>&1
   ```

---

## 📧 Support & Contact

For questions or issues, check the logs:
```bash
tail -f storage/logs/laravel.log
```

---

**Last Updated**: January 3, 2026  
**Version**: 1.0.0
