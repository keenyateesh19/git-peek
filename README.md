# Git Peek

Git Peek is a clean GitHub user search app built with **React + TypeScript + Vite**, created to practice **TanStack Query (React Query)** in a real UI flow.

Search users, get instant suggestions, view profile details, and quickly jump through recent searches.

## 📸 Screenshot

![Git Peek Home Screen](/public/git-peek-home.png)

## ✨ Features

- 🔎 Search GitHub users by username
- ⚡ Debounced live suggestions while typing
- 👤 Profile card with avatar, name, bio, and GitHub profile link
- 🕘 Recent searches persisted in `localStorage` (up to 5 users)
- 🚀 Hover prefetch for recent users to speed up profile loads
- 📦 Built with React Query Devtools for easier query debugging

## 🧠 What this project practices (React Query)

- Query key design (`["users", username]`, `["github-user-suggestions", query]`)
- Conditional queries with `enabled`
- Manual refetch behavior for repeated selections
- Prefetching with `queryClient.prefetchQuery`
- Managing async states (`isLoading`, `isError`, `data`)

## 🛠️ Tech Stack

- React 19
- TypeScript
- Vite
- TanStack Query
- React Icons
- use-debounce

## 🚀 Getting Started

### 1) Install dependencies

```bash
pnpm install
```

### 2) Configure environment variables

Create a `.env` file in the project root:

```env
VITE_GITHUB_API_URL=https://api.github.com
```

### 3) Start development server

```bash
pnpm dev
```

Then open the URL shown in your terminal (usually `http://localhost:5173`).

## 📜 Available Scripts

- `pnpm dev` — Run app in development mode
- `pnpm build` — Type-check and build for production
- `pnpm preview` — Preview the production build
- `pnpm lint` — Run ESLint

## 📁 Project Structure

```text
src/
  api/
    github.ts
  components/
    ProfileCard.tsx
    RecentSearch.tsx
    SuggestionDropdown.tsx
    UserSearch.tsx
  App.tsx
  main.tsx
  types.ts
```

## 🎯 Why Git Peek?

This project is intentionally focused and small, so it’s easy to experiment with React Query patterns (query keys, caching behavior, prefetching, and async UI states) without extra app complexity.
