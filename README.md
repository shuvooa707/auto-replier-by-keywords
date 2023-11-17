# Installing Guide
1. clone git repository
2. `cd` to the directory
3. run `composer install`
4. run `npm run build`
5. set database credentials in the **.env** file
6. run php artisan migrate:fresh --seed
7. finally run `php artisan serve`