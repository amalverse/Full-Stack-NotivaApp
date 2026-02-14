# NotivaApp Server

https://notivaapp-server.onrender.com/

The backend API for **NotivaApp**, responsible for user authentication, data persistence, and business logic for the note-taking platform.

## 🚀 Features

- **Authentication**:
  - JWT-based stateless authentication.
  - Email & Password registration/login.
  - OAuth integration (Google & GitHub).
  - Email Verification (OTP & Link).
  - Password Reset (OTP & Link).
- **Note Operations**:
  - Full CRUD for Notes.
  - Specific handling for Text vs. Checklist notes.
  - Pinning and Archiving logic.
- **Security**:
  - Password hashing with `crypto` / `bcrypt`.
  - Protected API routes via middleware.
- **Email Services**: Automated emails for verification and welcome messages using Nodemailer.

## 🛠️ Technologies Used

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [JSON Web Token (JWT)](https://jwt.io/)
- **Email**: [Nodemailer](https://nodemailer.com/)
- **OAuth**: Google Auth Library, Axios (for GitHub)

## 🏁 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local or Atlas)

### Installation

1.  **Navigate to the server directory:**

    ```bash
    cd "NotivaApp Server"
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory and configure the following:

    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/notiva_app
    JWT_SECRET=your_jwt_strong_secret

    # Email Configuration (Nodemailer)
    EMAIL_SERVICE=gmail
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_email_app_password
    EMAIL_FROM=noreply@notivaapp.com

    # Client URL (for CORS and Email Links)
    CLIENT_URL=http://localhost:5173

    # OAuth Credentials
    GITHUB_CLIENT_ID=your_github_client_id
    GITHUB_CLIENT_SECRET=your_github_client_secret
    ```

### Running the Server

1.  **Start the development server (using nodemon):**

    ```bash
    npm run dev
    ```

2.  **Start the production server:**
    ```bash
    npm start
    ```

The server will typically run on `http://localhost:5000`.

## 📂 Project Structure

```
src/
├── config/         # Configuration files (DB connection)
├── controllers/    # Request handlers (authController, noteController)
├── middleware/     # Custom middleware (authMiddleware)
├── models/         # Mongoose models (User, Note)
├── routes/         # API Route definitions
├── utils/          # Helpers (emailTemplates, sendEmail, tokenUtils)
├── app.js          # Express app setup
└── index.js        # Entry point

```

## 📚 API Documentation

This project uses [Swagger](https://swagger.io/) for API documentation.

- **Swagger UI**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
- **OpenAPI Spec**: [http://localhost:5000/api-docs.json](http://localhost:5000/api-docs.json)

Access the Swagger UI to see all available endpoints, test requests, and view schemas.

## 📡 API Endpoints

### Auth

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-email` - Verify email with OTP
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/github` - GitHub OAuth login

### Notes

- `GET /api/notes` - Get all notes for user
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note
- `PUT /api/notes/:id/archive` - Archive a note
- `PUT /api/notes/:id/unarchive` - Unarchive a note
