# Personal Notes Manager

https://geshan.com.np/blog/2020/11/nodejs-mysql-tutorial/


## Run the application

1. Clone the Github Project

```sh
git clone <github link>
```

2. Install the dependencies and devDependencies

```sh
cd /personal-notes-manager
npm install
```

3. Configure Terraform

Add AWS credentials `secret.tfvars` file to the root directory and add following lines,

```sh
# AWS CONFIGS
AWS_REGION="<region>"
AWS_ACCESS_KEY="<access_key>"
AWS_SECRET_KEY="<secret_key>"

# DATABASE CONFIGS
username="<username>"
password="<password>"
```

Initialize AWS resources

```sh
terraform init
terraform apply -var-file="secret.tfvars" -lock=false
```

Copy `resources.instances[0].attributes.address` varible in `terraform.tfstate` to `ENDPOINT` variable in `.env` file.

4. Start the Server

```sh
npm start
```

5. Create the database tables manually.

## How to use the APIs

The frontend application should call the implemented backend endpoints.
In the development phase, the server is run on `localhost` in the port `3000`
Both database and server configurations can be found in the `app/config.js` file.

### The available endpoints

The endpoint should be called by adding the prefix `http://<host>:<port>/api/` to the below endpoints.

Currently configured to `http://localhost:3000/api/`

- `POST /add-note` - Add a new note
- `PATCH /update-note` - Update a previously saved note
- `DELETE /delete-note` - Delete a saved note
- `PATCH /archive-note` - Archive a note
- `PATCH /unarchive-note` - Unarchive a previously archived note
- `GET /list-unarchived-note` - List saved notes that aren't archived
- `GET /list-archived-note` - List notes that are archived

### Swagger documentation

Swagger API documentation is available with more information.

```sh
http://localhost:3000/api-docs
```

## Choice of the technologies

**Choice of Node.js** - 
Since this application deals with a large number of users and their data, this application is a data-intensive application (not CPU intensive). Node.js allows non-blocking I/O (using event loop) **which makes data-intensive applications faster.

**Choice of ExpressJS framework** - 
Express is a minimalistic framework used to build servers faster and easier. Due to the time constraints, Express is the most suitable (rather than going to Nest.js, Next.js) for faster development. 

**Choice of MySQL as the database** - 
This application should work in a multi-user environment, where a large number of users access the database at the same time.
Therefore many users may concurrently access the database simultaneously. In that case, the MySQL database is the most suitable.
Because MySQL allows ACID transactions (Eg: MySQL locks the row during an UPDATE query) no two users will access the same data simultaneously.

**Choice of Swagger for API documentation** - 
Swagger allows automated RESTful API documentation with JSON. Swagger is flexible and rich in documentation which allows faster documentation

**Choice of Jest for testing** - 
Jest is a faster and simple testing framework for JavaScript. Jest is the most suitable to write better test cases despite the time constraints
Frameworks like Mocha and Jasmine are difficult to configure and require other libraries. 


## Further implementation

**User Authentication**
Since this server works in a multi-user environment user authentication is another important feature that should be implemented.

**Secure API endpoints** 
More secure APIs can be implemented using JWT.

**More E2E testing** 
More E2E testing should be done.