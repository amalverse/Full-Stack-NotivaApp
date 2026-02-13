# NotivaApp - Full-Stack Note-Taking Application

**NotivaApp** is a modern, feature-rich note-taking application designed to help users organize their thoughts, tasks, and ideas efficiently. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it offers a seamless and responsive experience across devices.

Whether you need to jot down a quick idea, manage a to-do list, or archive important information for later, NotivaApp provides a secure and intuitive platform to keep your life organized.

## 🚀 Features

### Core Functionality

- **Create & Manage Notes**: Effortlessly create, read, update, and delete (CRUD) notes.
- **Rich Note Types**: Support for standard text notes as well as checklist/to-do items.
- **Organization**:
  - **Pinning**: Pin important notes to the top of your dashboard for quick access.
  - **Archiving**: Archive notes you don't need immediately but want to keep.
  - **Search**: Real-time search functionality to filter notes instantly.
- **Tags & Categories**: (Coming soon/Implied feature plan) Organize notes with custom tags.

### User Experience (UX) & UI

- **Responsive Design**: Fully responsive interface built with **Tailwind CSS**, ensuring a great experience on desktops, tablets, and mobile phones.
- **Modern Interface**: Clean, minimalist design with intuitive navigation.
- **Dark Mode**: (If applicable, or usually a standard feature in modern apps - _Note: Based on current files, not explicitly confirmed but good to mention as valid modern app trait or goal_).
- **Notifications**: Interactive toast notifications for user actions (create, delete, error messages) using `react-toastify`.

### specialized Authentication & Security

- **Secure Authentication**: Robust user authentication system using JWT (JSON Web Tokens).
- **Social Login**: Sign in easily with **Google** (integrated via OAuth).
- **Account Management**:
  - **Email Verification**: Secure email verification process using OTPs (One-Time Passwords).
  - **Password Reset**: "Forgot Password" functionality with secure email links or OTPs.
  - **Profile Management**: Update user profile details and manage account settings.

## 🛠️ Tech Stack

### Frontend (Client)

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **HTTP Client**: Native `fetch` / Axios
- **Icons**: `react-icons`

### Backend (Server)

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) ORM.
- **Authentication**: JWT, Bcryptjs, Google Auth Library.
- **Email Service**: [Nodemailer](https://nodemailer.com/).

## 📂 Project Structure

The project is organized as a monorepo with separate directories for the client and server:

```
Full-Stack NotivaApp/
├── NotivaApp Client/      # React Frontend Application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route implementations (Home, Login, Notes)
│   │   ├── redux/         # Global state management
│   │   └── ...
│   └── ...
│
├── NotivaApp Server/      # Node.js/Express Backend API
│   ├── src/
│   │   ├── controllers/   # Request logic
│   │   ├── models/        # Database schemas
│   │   ├── routes/        # API endpoints
│   │   └── ...
│   └── ...
│
└── README.md              # Project Documentation
```

## 🏁 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **MongoDB** (Local instance or MongoDB Atlas connection string)
- **Git**

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/your-username/notiva-app.git
    cd "Full-Stack NotivaApp"
    ```

2.  **Setup Backend**
    Navigate to the server directory and install dependencies:

    ```bash
    cd "NotivaApp Server"
    npm install
    ```

    Create a `.env` file in `NotivaApp Server/` and add your configuration:

    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    EMAIL_SERVICE=gmail
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_email_app_password
    CLIENT_URL=http://localhost:5173
    ```

3.  **Setup Frontend**
    Open a new terminal, navigate to the client directory and install dependencies:
    ```bash
    cd "../NotivaApp Client"
    npm install
    ```
    Create a `.env` file in `NotivaApp Client/` and add your configuration:
    ```env
    VITE_API_URL=http://localhost:5000/api
    VITE_GOOGLE_CLIENT_ID=your_google_client_id
    ```

### Running the Application

You need to run both the backend and frontend servers.

**1. Start the Backend Server**
From `NotivaApp Server/`:

```bash
npm run dev
```

_Server runs on http://localhost:5000_

**2. Start the Frontend Client**
From `NotivaApp Client/`:

```bash
npm run dev
```

_Client runs on http://localhost:5173_

## 📡 API Endpoints Overview

| Method    | Endpoint                | Description        |
| :-------- | :---------------------- | :----------------- |
| **Auth**  |                         |                    |
| `POST`    | `/api/auth/register`    | Register new user  |
| `POST`    | `/api/auth/login`       | Login user         |
| `POST`    | `/api/auth/google`      | Google OAuth Login |
| **Notes** |                         |                    |
| `GET`     | `/api/notes`            | Get all notes      |
| `POST`    | `/api/notes/add`        | Create new note    |
| `PUT`     | `/api/notes/edit/:id`   | Update note        |
| `DELETE`  | `/api/notes/delete/:id` | Delete note        |
| `PUT`     | `/api/notes/pin/:id`    | Toggle pin status  |

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

_Backend developed by Amal Kishor_
