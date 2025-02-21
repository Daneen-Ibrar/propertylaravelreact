# Use official PHP image with FPM
FROM php:8.1-fpm

# Set working directory
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
    ca-certificates \
    && docker-php-ext-install \
    pdo_mysql \
    mbstring \
    zip \
    exif \
    pcntl \
    gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Fix SSL certificate issue in Composer
RUN composer config --global http-basic.github.com "" ""

# Copy Laravel files
COPY . .

# Set permissions
RUN chmod -R 775 /var/www/html && chown -R www-data:www-data /var/www/html

# Install Laravel dependencies
RUN composer install --no-dev --optimize-autoloader

# Expose port for Laravel
EXPOSE 8000

# Start Laravel server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
