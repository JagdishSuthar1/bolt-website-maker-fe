# ⚡ BOLT Frontend (AI Website Builder)

This is the frontend of the AI Website Builder (BOLT) project — a platform that allows users to generate, edit, and preview complete web applications using AI-powered code generation. It connects with the backend service to process user prompts, communicate with Gemini LLM, and display live, runnable previews directly in the browser.

# Architecture
![img](https://drive.google.com/uc?export=view&id=1w_97NGI7NySFG5IVp22CFC8IwSCeXd6E)

## 🧠 Features

* 🧩 **Prompt-Based Code Generation** – Users can describe an app (e.g., "Build a to-do app"), and the system generates it automatically.
* 💬 **Interactive Chat UI** – Send follow-up prompts like "Add dark mode," and see real-time updates.
* ⚙️ **Backend Integration** – Connects with the BOLT backend API for AI processing and context retrieval.
* 💾 **Database Support** – Uses MongoDB for user sessions, projects, and authentication data.
* 🧑‍💻 **Google Authentication** – Integrated with NextAuth.js for secure login via Google.
* 🧱 **Live Code Preview** – Displays real-time code and execution in the browser using WebContainer.
* 🎨 **Modern UI** – Built with Next.js, TypeScript, Tailwind CSS, and Shadcn UI for a smooth developer experience.

## 🧩 Tech Stack

* Next.js 14
* TypeScript
* Tailwind CSS
* NextAuth.js
* WebContainer
* Axios (for backend API calls)
* MongoDB
* Shadcn UI

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/bolt-frontend.git
cd bolt-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add environment variables

Create a `.env` file in the root folder and add the following:
```env
DATABASE_URL="mongodb://localhost:27017/bolt-project?replicaSet=rs0"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
NEXTAUTH_URL="http://localhost:3000/"
NEXTAUTH_SECRET="your_nextauth_secret"
BACKEND_URL="https://bolt-website-maker-be-production.up.railway.app"
```

### 4. Run the development server
```bash
npm run dev
```

Visit your app at: 👉 [http://localhost:3000](http://localhost:3000)

## 🔄 How It Works

1. The user logs in using Google Authentication.
2. They enter a prompt (like "Create a blog app") into the frontend interface.
3. The frontend sends this prompt to the backend (`BACKEND_URL`) for processing.
4. The backend interacts with Gemini LLM to generate project code and sends it back.
5. The generated code is displayed in the browser via a file explorer and a live WebContainer preview.
6. When users send follow-up prompts, the frontend communicates with the backend again to fetch modified code using contextual data from Pinecone.

## 🧠 Key Learning

This project demonstrates how Next.js, LangChain, and Gemini can work together to build a fully AI-driven, interactive web application builder — from prompt to deployment — all in the browser.

## 📜 License

This project is open-source under the MIT License.