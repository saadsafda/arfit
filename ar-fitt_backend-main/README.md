# ARFitt_Backend
This repository contains implementation for the Backend server of ARFitt.

# Backed Setup

To set up the backend server locally, the following components are needed.

# Setting up Postgres database

1. Postgres Database
*The database setup according to the OS can be found at this link: https://www.postgresql.org/download/*

2. Email service
*I have used `Send Grid` to send emails*

After the Postgres server is installed and running, you can choose any of the default databases and run the SQL statements
found on the path: `/database_setup/schema_statements/arFitt_schema.sql`

Once the database setup is completed, we'll perform pre-requisites before running the backend server.

# Setting up Environment variables
Create a .env file at the root of the server directory and add the following variables.
1. `EXPRESS_APP_PORT` With any port, 3000 is a default port for these sorts of servers
2. `DATABASE_URL` in this format: 
`database_service_name://database_user_name:database_user_password@database_host_url:database_host_port/database_name?schema=schema_name`
I have used this configuration: `postgresql://postgres:postgres@localhost:5432/postgres?schema=public`
3. `EMAIL_SERVICE_API_KEY_NAME` which always has a value `apikey`
4. `EMAIL_SERVICE_API_KEY_VALUE` which contains the API key generated for your email service
5. `FORGET_PASSWORD_EMAIL_SENDER` which is the registered sender in your email service to send forgotten password emails
6. `FORGET_PASSWORD_URL` which is the redirect URL where the user will be redirected to reset the password. Format of URL: `{WEB_URL}/%s`. `%s` is needed at the end.
7. `ALLOWED_ORIGIN_URL` which is the URL and port of the front-end. The backend will only accept calls from this URL and PORT
8. `SERVER_HOST_URL` which is the URL where the server is hosted
9. `PAYMENT_SERVICE_API_KEY` which is the API key of the payment service
10. `PAYMENT_SERVICE_SUCCESS_URL` which is the success URL to which the user is redirected upon successfull payment and subscription. Format of the URL: `{WEB_URL}?session_id={CHECKOUT_SESSION_ID}`. `session_id={CHECKOUT_SESSION_ID}` is needed in the URL
11. `PAYMENT_SERVICE_CANCEL_URL` which the cancel URL to which the user is redirected upon unsuccessful payment and subscription
12. `PAYMENT_SERVICE_WEBHOOK_API_KEY` which is the API key to handle webhook events sent from payment service

# Setting up Payment Service Webhook for local deployment
In order to process webhook events in a local environment, install Stripe Cli. You can find installation guiden through this link *https://docs.stripe.com/stripe-cli*.

Once its installed, login through cli by executing command `stripe login`. It'll generate a link to authorize cli login through web browser.

After login is successful, execute this command to listen to webhook events of Stripe `stripe listen --forward-to {URL}`. URL must include the base URL (hosted URL) and API path defined to listen to the events.

I have used this URL `localhost:3000/payment/webhook`. 

After executing this command, it'll generate and display a Webhook API key which must be added to the environment variables corresponding to the key `PAYMENT_SERVICE_WEBHOOK_API_KEY` as enlisted in the section above.

# Running backend server
Finally, just before running the backend server, you need to install all required libraries and initialize the ORM used to access the database
1. Execute `npm i` to install all the required libraries used in the backend server
2. Execute `npx prisma generate` at the root of the directory to initialize ORM

All steps are completed for setting up the backend server.

To run the server, execute the command `node server.js` at the root of the directory and the server will start listening to requests.
