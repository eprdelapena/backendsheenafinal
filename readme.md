test test test

1. Open Docker App

2. On your souce code go to docker-compose.yml

- if first time setting up local database uncomment the second paragraph and comment the first paragraph in docker-compose.yml

-if second time setting up local database comment the second paragraph and uncomment the first paragraph

2.  On your terminal run: docker-compose up -d
    go to localhost:5050 then sign in with these credentials

username: admin@admin.com
password: 12345

click the server

POSTGRES_USER: admin
POSTGRES_PASSWORD: password
POSTGRES_DB: dbchicberry

then click ok

after you are finish run docker-compose down

3. On your terminal run: npm run esbuilder
4. Test routes on your postman

To generate table schema: npm run generate
To deploy the table schema to the database: npm run connectsqlquery

current agenda:

add product - routes
edit product - routes
