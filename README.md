# Wonderman Online Store

The Wonderman online store is a web application built on a REST API architecture. Its backend is developed in Laravel, while the frontend is created using React. This application is an online store that allows us to make safe payments for products through the Przelewy24 portal using the Stripe library.

The backend handles all operations related to the database and authenticates users using the Sanctum library. Every newly created user can generate an avatar, which consists of the initial letters of their first name and last name. The Avatar library provides these functionalities.

The application's frontend was built using the React framework with a TypeScript template. The visual design of the application was created using SCSS. The frontend communicates with the backend using the Axios library and stores essential information in local storage, which is managed using Redux. The carousel on the homepage was created using the Swiper library.



## Used Tools

### Backend
- PHP 8.2.4
- Laravel 10.24.0
- Sanctum 3.3.1
- Avatar 5.0.0
- IDE Helper 2.13.0

### Frontend
- HTML 5
- SCSS 1.63.6
- TypeScript 4.9.5
- React 18.2.0
- Redux 8.1.3
- Axios 1.5.1
- Swiper 10.3.1
- Font Awesome 6.4.2

## Requirements

For running the application you need:

- [MySQL](https://www.mysql.com)
- [PHP](https://www.php.net/manual/en/install.windows.php)
- [composer](https://getcomposer.org)
- [Node.JS](https://nodejs.org/en)

## How to run

1. Execute command `git clone https://github.com/Ilvondir/wonderman-online-store`.
2. Create `wonderman_store` database.
3. Open `wonderman-backend/start.bat` file.
4. Open `wonderman-frontend/start.bat` file.
5. If you want payment simulations to work, you need to add the STRIPE_SECRET key with the value of your secret payment key obtained from the Stripe portal to the `wonderman-backend/.env.example` file and run `start.bat` file.
6. Log in to the selected account to discover various functionalities.

| Account       	| Login	      |   Password 	|
|:---------------:|:-----------:|:-----------:|
| Administrator   | admin      	|  admin   	  | 
| User          	| user      	|  user       |


## First Look

![firstlook](img/firstlook.png?raw=true)
