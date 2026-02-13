# NotivaApp Client

The frontend application for **NotivaApp**, a modern, feature-rich note-taking application designed to help you organize your thoughts, tasks, and ideas efficiently.

## 🚀 Features

- **User Authentication**: Secure logic with Email/Password, Google, and GitHub (via backend).
- **Note Management**: Create, Read, Update, and Delete (CRUD) notes.
- **Note Types**: Support for standard text notes and checklist/todo notes.
- **Organization**:
  - **Pinning**: Keep important notes at the top.
  - **Archiving**: Hide notes without deleting them.
  - **Search**: Real-time filtering of notes.
- **Responsive Design**: Built with Tailwind CSS for a seamless experience across devices.
- **State Management**: Robust state handling with Redux Toolkit.
- **User Profile**: Manage profile details and account settings.

## 🛠️ Technologies Used

- **Framework**: [React](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & React-Redux
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/)
- **HTTP Client**: Native `fetch` API

## 🏁 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd "NotivaApp Client"
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory and add the following variables:

    ```env
    VITE_API_URL=http://localhost:5000  # URL of your backend server
    VITE_GOOGLE_CLIENT_ID=your_google_client_id
    ```

### Running the Application

1.  **Start the development server:**

    ```bash
    npm run dev
    ```

2.  **Open your browser:**
    Navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📂 Project Structure

```
src/
├── components/     # Reusable UI components (Navbar, Notes, CreateNote, etc.)
├── pages/          # Application pages (Home, Login, Register, AllNotes, etc.)
├── redux/          # Redux setup (store, slices for auth and notes)
├── utils/          # Utility functions and configuration (apiConfig)
├── App.jsx         # Main application component with Routing
└── main.jsx        # Entry point
```

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Locally preview the production build.
