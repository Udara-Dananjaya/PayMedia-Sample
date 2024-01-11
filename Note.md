# Install Laravel installer globally
composer global require --with-all-dependencies laravel/installer:^8.x

# Create a new Laravel project
laravel new myproject

# Change directory to the project
cd myproject

# Install JWT-Auth package
composer require tymon/jwt-auth

# Publish JWT-Auth configuration
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"

# Generate AuthController
php artisan make:controller AuthController

# Generate UserController
php artisan make:controller UserController

# Generate JWT secret key
php artisan jwt:secret

# Run pending migrations
php artisan migrate

# Clear route cache
php artisan route:clear

# List registered routes
php artisan route:list

# Open Laravel Tinker
php artisan tinker

# Create a sample user using Tinker
User::create(['name'=>'sample','email'=>'admin@gmail.com','password'=>Hash::make('1234')])
