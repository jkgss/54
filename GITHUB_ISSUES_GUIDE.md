# GitHub Issues & Project Tracking Guide

This guide ensures that AI Dev Agents and human contributors maintain discipline and transparency in project tracking for the **jkgss/54** project. **Read this guide at the start of every session.**

## 🎯 Core Objectives
1. **Single Source of Truth:** GitHub Issues must reflect the current status of all tasks.
2. **Accountability:** Every code change must be traceable to a specific requirement or bug.
3. **Visibility:** Milestones must accurately represent progress toward major project goals.

---

## 🛠 Workflow for AI Agents

### 1. Task Initialization
Before writing any code for a new task:
- **Search for existing issues** to avoid duplication.
- **Create a new issue** if one does not exist.
  - **Title:** Action-oriented (e.g., `feat: implement user authentication`).
  - **Body:** Use a checklist for sub-tasks and define "Definition of Done".
  - **Labels:** Categorize (e.g., `enhancement`, `bug`, `ui/ux`).
  - **Milestone:** Assign to the current active milestone.

### 2. Implementation Tracking
- **Reference Issue IDs:** Use `#<issue_number>` in all commit messages and PR descriptions.
- **Progress Updates:** If a task takes multiple turns or spans multiple sessions, add a comment to the issue summarizing current progress and blockers.

### 3. Graduation & Closing
- **Closing Pattern:** Use keywords like `Closes #123` or `Fixes #456` in your PR or final commit to automate issue closure.
- **Verification:** Only close an issue once tests pass and the UI/UX meets requirements.

---

## 🏷 Labeling Strategy
Use these standard labels to keep the board clean:
- `feat`: New features or significant enhancements.
- `bug`: Something is broken or behaving unexpectedly.
- `docs`: Documentation updates.
- `refactor`: Code changes that neither fix a bug nor add a feature.
- `ui/ux`: Styling, animations, and frontend polish.
- `urgent`: High priority tasks.

---

## 🏛 Milestone Management
Milestones represent project phases. Ensure every issue is attached to a milestone:
- **Check Milestone Status:** Frequently review the current milestone's percentage completion.
- **Proactive Updates:** If a task is completed that contributes to a milestone, ensure the issues are closed to update the progress bar.

---

## 📝 Example Issue Template
```markdown
## Overview
[Brief description of the task]

## Tasks
- [ ] Sub-task 1
- [ ] Sub-task 2

## Technical Notes
- [List any specific technology or architectural decisions]

## Definition of Done
- [ ] Code implemented
- [ ] Responsive UI verified
- [ ] Tests passing
```

> [!IMPORTANT]
> **Discipline is non-negotiable.** Never start coding without an issue to track the effort.
