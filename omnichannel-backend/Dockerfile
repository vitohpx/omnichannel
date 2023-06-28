# Define a imagem base
FROM php:7.4

# Atualiza a lista de pacotes e instala dependências adicionais
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    && rm -r /var/lib/apt/lists/*

# Habilita as extensões PHP necessárias
RUN docker-php-ext-install pdo_mysql zip

# # Copia os arquivos do aplicativo para o diretório de trabalho no contêiner
COPY . /var/www/html

RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html/storage

# # Define o diretório de trabalho
WORKDIR /var/www/html

# Instala as dependências do Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Executa o comando Composer para instalar as dependências do aplicativo
RUN composer install --no-scripts --no-autoloader

# Gera o arquivo .env com as configurações necessárias
RUN php artisan key:generate

# Gera as classes de autoload do Composer
RUN composer dump-autoload

# Expõe a porta em que o servidor Laravel estará ouvindo
EXPOSE 8000

# Define o comando padrão a ser executado quando o contêiner for iniciado
CMD php artisan serve --host=0.0.0.0 --env=.env

# php artisan config:clear;
# php artisan migrate