# Personal Notes Manager

A Node.js server using,
* Expressjs
* REST and GraphQL
* AWS Services: RDS, S3
* MySQL with Docker

* Winston Logger
* Swagger Documentation


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

### To use AWS services

3. Configure Terraform

Set `config.aws_services` variable in `config.js` to `true`

Create `secret.tfvars` file in the root directory and add the following AWS credentials,

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
terraform apply -var-file="secret.tfvars" -lock=false --auto-approve
```

```sh
Copy `aws_db_instance_address` shown in CLI to `ENDPOINT` variable in `.env` file.
```

### When using local intergration

3. Configure local database

Set `config.aws_services` variable in `config.js` to `false`

Run docker mysql

```sh
docker-compose up
```

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

#### REST APIs

The endpoint should be called by adding the prefix `http://<host>:<port>/api/` to the below endpoints.

Currently configured to `http://localhost:3000/api/`

- `GET /notes` - Get all notes
- `GET /notes/:user_id` - Get notes by user_id
- `GET /note/:note_id` - Get note by note_id
- `POST /notes` - Add a new note
- `PUT /notes` - Update a previously saved note
- `DELETE /notes/:note_id` - Delete a note

- `POST /upload` - Upload an image

#### GraphQL 

- GraphQL endpoints to be updated


### Swagger documentation

Swagger API documentation is available with more information.

```sh
http://localhost:3000/api-docs
```

## Features Implemented

- CRUD functionalities for notes
- Upload an image 
- CRUD functionalities for users

## Folder Structure

```bash
app
├── config.js
├── connection.js
├── graphql
│   ├── mutation.js
│   ├── query.js
│   ├── schema.js
│   └── types
│       └── user.js
├── index.js
├── logger
│   └── logger.js
├── notes
│   ├── note.js
│   └── note.test.js
├── server.js
└── uploads
    └── upload.js
```

## Highlevel Architecture

![alt text](https://github.com/mihirukongahage/nodejs-server/blob/main/architecture.png?raw=true)

