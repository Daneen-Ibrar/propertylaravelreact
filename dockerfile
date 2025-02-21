# Use the official PHP image with required extensions
FROM php:8.1-fpm

# Set the working directory inside the container
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    zip \
    unzip \
    git \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    nodejs \
    npm \
    && docker-php-ext-install \
    pdo_mysql \
    mbstring \
    zip \
    exif \
    pcntl \
    gd

# Install Composer (PHP dependency manager)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy the Laravel project into the container
COPY . .

# Set proper permissions for the Laravel project
RUN chmod -R 775 /var/www/html && chown -R www-data:www-data /var/www/html

# Install Laravel dependencies
RUN composer install --no-dev --optimize-autoloader

# Build React frontend
WORKDIR /var/www/html/frontend
RUN npm install && npm run build

# Move React build to Laravel public folder
RUN cp -r dist/* /var/www/html/public/

# Set working directory back to Laravel
WORKDIR /var/www/html

# Expose port 8000 for Laravel
EXPOSE 8000

# Start Laravel's development server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
