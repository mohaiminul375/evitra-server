# Evitra server

- [Live Server](https://evitra-server.vercel.app)

This is the backend API server for the Evitra Event Management Web Application. It provides secure user authentication and dynamic event management functionalities via RESTful APIs.

## Features

- Custom JWT-based authentication
- Password hashed with bcrypt before user data save

- User login and registration

- Event CRUD operations (Create, Read, Update, Delete)
- Join & Participate CRUD operations (Create, Read, Update, Delete)

<!-- - Task summary API for dashboard -->

- Real-time data update

---

## Technologies (Packages) Used

- `Yarn`
- `Node.js`
- `Express.js`
- `Mongoose`
- `cors`
- `dotenv`
- `bcrypt`
- `jsonwebtoken`

## Run the Server Locally

### Prerequisites

- Node.js (v20+)
- `pnpm` package manager
- if you prefer `npm` or `yarn`, delete `pnpm-lock.yaml` file and follow the following steps

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mohaiminul375/evitra-server
   cd evitra-server
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

   for `npm`:

   ```bash
   npm install
   ```

   for `yarn`:

   ```bash
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following fields:

   ```env
   PORT=8800
   MONGO_CONNECTION_STRING=your_mongo_db_uri
   ```

4. Start the server:

   ```bash
   pnpm start
   ```

   for `npm`:

   ```bash
   npm start
   ```

   for `yarn`:

   ```bash
   yarn start
   ```

5. Access the API at:

   ```bash
   http://localhost:8800
   ```

### Base URL

`http://localhost:8800`




# 🖥️ Client Side

- [Evitra Client Repository](https://github.com/mohaiminul375/evitra)
