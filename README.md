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
- `POST /upload` - Upload an image


### Swagger documentation

Swagger API documentation is available with more information.

```sh
http://localhost:3000/api-docs
```

## Features Implemented

- Add, Update, Delete notes
- Upload an image 
