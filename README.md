# 🧑‍💻 Jaber Masud - Developer Portfolio

Welcome to my **personal developer portfolio**, built to showcase my skills, projects, and experience as a Software Engineer specializing in Full-stack Web Development with a focus on Laravel.

---

## 🛠️ Technologies Used

- **React 18** + **TypeScript**
- **Vite** for development and builds
- **Tailwind CSS** + **shadcn/ui** (Radix UI)
- **Framer Motion** for animations
- **Supabase Edge Functions** for the AI chatbot backend

---

## 🎯 Features

- 🚀 Hero section with a clear introduction and call to action
- 👨‍💼 About, Services and Skills sections
- 📊 Statistics and Experience timeline
- 🧑‍💻 Projects showcase section with descriptions
- 🤖 AI-powered portfolio chatbot that answers questions about my work
- 📫 Contact section with a message form and social links
- 📱 Fully responsive design across all devices
- 💡 Smooth animations and transitions

---

## 📁 Project Structure

```
src/
├── components/      # Page sections (Hero, About, Projects, Chatbot, ...)
│   └── ui/          # shadcn/ui components
├── pages/           # Index and NotFound pages
├── integrations/    # Supabase client
├── hooks/           # Custom React hooks
└── lib/             # Utilities
supabase/
└── functions/
    └── portfolio-chat/   # Edge Function for the chatbot
```

---

## 🚀 Getting Started

Requirements: **Node.js 18+** and **npm**.

```bash
# 1. Clone the repository
git clone https://github.com/njbm/profile.git

# 2. Navigate into the project folder
cd profile

# 3. Install dependencies
npm install

# 4. Start the development server (http://localhost:8080)
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
VITE_SUPABASE_URL=https://your_project_id.supabase.co
```

---

## 📜 Available Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start the development server        |
| `npm run build`   | Build for production into `dist/`   |
| `npm run preview` | Preview the production build        |
| `npm run lint`    | Run ESLint                          |

---

## 📫 Contact

- 🌐 **GitHub**: [github.com/njbm](https://github.com/njbm)
- 📧 **Email**: [jabermasud.dev@gmail.com](mailto:jabermasud.dev@gmail.com)
