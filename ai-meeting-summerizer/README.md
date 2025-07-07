# Conclude AI – Smart Meeting Summarizer & Action Item Generator

Conclude AI is a smart, end-to-end meeting summarization tool that allows users to upload or record audio from meetings and automatically get concise summaries along with clear, actionable task items. Designed for teams, clubs, and individuals who want to streamline follow-ups without manual note-taking.

---

## 🚀 Features

* 🎧 Upload or record meeting audio
* ✨ Automatic transcription via AssemblyAI
* 🦾 LLM-powered meeting summaries and action item extraction using Google Gemini
* 🗂️ Authenticated user dashboard with history of all previous meetings
* 🖼️ Clean, responsive UI built with Tailwind CSS and shadcn/ui
* 🔐 Secure login system using Firebase Authentication
* ☁️ Data storage and retrieval with Firestore (meeting metadata, summaries, and tasks)
* 📦 Planned: Folder support, export to PDF/Markdown, Slack/Teams integration

---

## 🛠️ Tech Stack

| Layer          | Technology                                           |
| -------------- | ---------------------------------------------------- |
| Frontend       | Next.js (App Router), React, Tailwind CSS, shadcn/ui |
| Backend        | Next.js API routes                                   |
| Authentication | Firebase Auth                                        |
| Database       | Firestore                                            |
| Speech-to-Text | AssemblyAI (free tier)                               |
| Summarization  | Google Gemini (chat API)                             |
| Deployment     | Vercel / Firebase Hosting (optional)                 |

---

## 🧹 Project Architecture

```
Frontend (Next.js + Tailwind)
│
├── Auth (Firebase)
├── Audio Upload / Recording
├── API Routes
│   ├── /transcribe (AssemblyAI)
│   └── /summarize (Gemini)
├── Firestore (users, transcripts, summaries, tasks)
└── UI Dashboard (Meeting Cards, Summary View, Actions List)
```


## 📁 Folder Structure

```
/app
  ├─ /api               → API routes (transcription, summarization)
  ├─ /dashboard         → Authenticated home page
  ├─ /upload            → Upload + process audio
  ├─ /meeting/[id]      → View specific meeting's summary/actions
  └─ /components        → Reusable UI components

/lib                    → Firebase and utility configs
/context                → React Context for auth and meeting state
/styles                 → Global Tailwind config
```

---

## 🤖 Prompt Engineering (Gemini API)

We use structured prompting for consistent results:

![image](https://github.com/user-attachments/assets/795e3d83-9e62-4f2f-86f2-9184a8a113dc)

---

## 📌 Upcoming Features

* 🔖 Folder creation & filtering (e.g., per club/team)
* 📄 Export to PDF/Markdown
* 🔁 Slack / Teams integration (auto-post summaries)
* 📊 Meeting analytics (avg. duration, task count per user)

---

## 👨‍💼 Author

**Chaitanya Vaidya**
🔗 [LinkedIn](https://www.linkedin.com/in/chaitanyavaidya10/)

