# Infite scroll Github users

You can clone this project and follow the directions below

![Vue infite scroll Github users](https://ibb.co/WfH6wWV)

## Project setup

First, clone this repo and switch into the repo folder:

```bash
git clone git@github.com:Mizou9999/Github_usrs.git
cd fetchUsers
```

Now you need to install the dependencies for the client and server code.

### Set up the Express server

```bash
cd server
npm install
```

### Set up the Vue client

In a new terminal tab:

```bash
cd ../client
npm install
```

## authentication

We use Auth0 to add authentication to the app.

### Run

Now that everything is set up, you can test the app.

**Run the server**

Make sure you're in the `server` directory in your terminal and start the server with:

```bash
npm start
```

Server is running at [http://localhost:8000](http://localhost:8000).

**Run the client**

In your other tab, make sure you're in `client` and run:

```bash
npm run serve
```

You can view the Vue app in the browser at [http://localhost:8080](http://localhost:8080).
