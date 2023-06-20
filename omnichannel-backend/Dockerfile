# Use uma imagem base do PHP com Apache
FROM php:7.4-apache

WORKDIR /var/www/html

RUN sudo chown -R www-data:www-data /var/www/html/public
RUN sudo find /var/www/html/public -type f -exec chmod 644 {} \;
RUN sudo find /var/www/html/public -type d -exec chmod 755 {} \;
RUN sudo chgrp -R www-data /var/www/html/storage/

COPY . .

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

#Install PHP extensions
RUN docker-php-ext-install pdo_mysql 

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

#Copiar o arquivo de configuração do Apache
COPY apache-config.conf /etc/apache2/sites-available/000-default.conf

#Habilitar o mod_rewrite do Apache
RUN a2enmod rewrite

RUN composer global require laravel/installer

RUN php artisan key:generate

# Expor a porta do servidor web do Apache
EXPOSE 80


CMD ["apache2-foreground"]

RUN php artisan serve
