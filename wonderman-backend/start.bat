php -r "copy('.env.example', '.env');"
call composer install
call php artisan key:generate
cd public
rmdir storage
cd ..
call php artisan storage:link
call php artisan migrate:refresh --seed
php artisan serve