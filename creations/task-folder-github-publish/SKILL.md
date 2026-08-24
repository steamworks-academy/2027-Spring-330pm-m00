---
name: task-folder-github-publish
description: Create new work in a task-named folder and publish the completed folder and subsequent updates to the workspace GitHub repository; for sites, add the exact live URL to the repository README.
---

# Task Folder GitHub Publish

Use this skill for implementation tasks in a GitHub-backed workspace when the
user wants the completed work organized, documented, and pushed. A direct user
instruction to keep work local or use a different repository takes precedence.

## 1. Establish the task folder

- Inspect the repository root, current branch, configured remote, and working
  tree before making changes.
- Derive a short lowercase hyphenated slug from the new task or thread title.
- Create the work in `creations/<task-slug>/` before implementation begins.
  If the user names a folder or the repository has an established project
  layout, honor that explicit location while keeping the work isolated.
- Resolve folder collisions before writing. Do not overwrite an existing task
  folder or unrelated user changes.
- Keep generated source, project configuration, and task-specific assets inside
  the task folder unless the framework or user explicitly requires a root-level
  file.

## 2. Build and validate

- Use the relevant domain skill for the task (for example, Sites, documents,
  spreadsheets, or presentations) and preserve the repository's package
  manager, lockfile, and conventions.
- Validate the completed task in proportion to its risk before publishing.
- For a site, complete the normal build and hosting workflow. Do not add a
  live URL until deployment succeeds and returns the exact production URL.

## 3. Document deployed sites

- For site work only, create or update the repository-root `README.md`.
- Add one concise `Live hosted version` entry with the exact deployed URL and a
  link to the task folder. Update an existing entry instead of duplicating it.
- Never invent, shorten, or substitute a URL. Non-site tasks do not need a live
  hosted link.

## 4. Commit and push the completed work

- Recheck `git status` and the diff. Preserve unrelated changes and stage only
  the task folder plus any directly related README or root-level files.
- Commit with a descriptive message, then push the current branch to the
  configured GitHub remote after the task is complete.
- If the project has a separate deployment/source remote, keep it distinct from
  the workspace GitHub remote; never replace a remote or put credentials in a
  remote URL or Git configuration.
- Do not force-push, reset, or discard user changes. If the push is rejected by
  remote history or authentication, inspect the cause and report the blocker
  before taking a recovery action.
- Hand off the GitHub repository link, the task-folder link, and the README
  live-site link when applicable.

## 5. Push later updates

When the user asks for more work on the same task, continue in the same folder.
After each completed update, repeat validation, update the site link or README
only if needed, commit the scoped changes, and push them to the same GitHub
branch. Keep the original task folder and its history intact.
