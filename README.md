# QuickNotes

A responsive, client-side note-taking web application built with vanilla HTML5, CSS3, and modern JavaScript. QuickNotes allows users to quickly jot down thoughts, categorize them by context (Personal, Work, Study), search through their notes in real time, and keep their data preserved across browser reloads using local storage.

## Features

- **Categorized Notes**: Assign each note to Personal, Work, or Study categories, each styled with unique visual color accents.
- **Client-Side Validation**: Ensures notes cannot be empty or exceed 200 characters, offering immediate inline feedback.
- **Real-Time Search**: Filter notes instantly as you type with non-case-sensitive matching.
- **Data Persistence**: Automatically stores all notes in browser `localStorage`, ensuring data persists across page refreshes.
- **Dynamic Counters**: Displays accurate grammatically correct counts (`no notes yet`, `1 note`, `N notes`).
- **Responsive Layout**: Designed with Flexbox and media queries to provide a seamless mobile and desktop experience.
- **Clear All (Bonus)**: Easily clear all stored notes with a confirmation dialog.

## How to Run Locally

Because QuickNotes is built with vanilla web technologies, no build step or package installations are required:

1. Clone or download this repository to your local computer:
   ```bash
   git clone https://github.com/<your-username>/quicknotes-app.git
