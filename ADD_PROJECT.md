# How to Add Your Project

> **Step-by-step guide to submit your project to the VCET FOSS Directory**

## Tutorial Overview

### Step 1: Follow the VCET FOSS Organization

[video1.webm](https://github.com/user-attachments/assets/8b2664d0-81cd-4d9a-ae23-e93e65e06c7a)

#### Instructions:

1. Go to the [VCET FOSS Organization page](https://github.com/vcet-foss)
2. If you aren't already following, click the **"Follow"** button under the organization name.

✅ **Checkpoint:** You'll stay updated with all FOSS activities at VCET!

---

### Step 2: Star the Repository

[video2.webm](https://github.com/user-attachments/assets/c06cfe93-45e6-49ae-a87c-088c31fb3252)
#### Instructions:

1. Go to the [awesome-foss repository](https://github.com/vcet-foss/awesome-foss)
2. If you haven't already, click the **"Star"** button at the top-right of the page.

✅ **Checkpoint:** This helps more people discover the directory!

---

### Step 3: Fork the Repository

[video3.webm](https://github.com/user-attachments/assets/6c099dcc-04b4-4a24-b718-290730ba9a8f)

#### Instructions:

1. Go to https://github.com/vcet-foss/awesome-foss
2. Click the **"Fork"** button in the top-right corner
3. Wait for GitHub to create your copy

✅ **Checkpoint:** You should now see `YOUR-USERNAME/awesome-foss` in your repositories.

---

### Step 4: Access Your Fork

#### Instructions:

1. Go to your GitHub profile.
2. Open the **awesome-foss** repository you just forked (it will be `YOUR-USERNAME/awesome-foss`).

✅ **Checkpoint:** You are now on your own copy of the project where you can make changes.

---

### Step 5: Choose Your Project Slug

Your **slug** is your project's unique identifier.

### Rules:

- ✅ Lowercase only
- ✅ Use hyphens (not spaces or underscores)
- ✅ Descriptive and short

### Examples:

| Valid ✅         | Invalid ❌      |
| ---------------- | --------------- |
| `my-cool-app`    | `mycoolapp`     |
| `ai-chatbot`     | `AI-CHATBOT`    |
| `student-portal` | `StudentPortal` |

💡 **Write down your slug — you'll need it in the next step!**

---

### Step 6: Create Your Project Folder & Files

[video4.webm](https://github.com/user-attachments/assets/afe8be8a-0335-4d66-ace4-5aa2131db356)

#### Instructions:

1. Inside your fork, navigate to the `projects/` folder.
2. Click the **"Add file"** button and select **"Create new file"**.
3. In the filename box, type: `your-project-slug/project.json` (replace `your-project-slug` with your actual slug).
   - _Note: Typing the `/` after the slug automatically creates the folder!_

---

### Step 7: Fill in project.json

[video5.webm](https://github.com/user-attachments/assets/20a2cfc2-0912-4bcc-81fe-a9c96ea6cd7c)

#### Instructions:

Paste the following template into the new file you just created:

```json
{
  "slug": "your-project-slug",
  "name": "Your Project Name",
  "tagline": "One line about what it does",
  "description": "A longer description (10-500 characters).",
  "status": "status here (active, dormant, idea)",
  "difficulty": "difficulty here (beginner, intermediate, advanced)",
  "tech_stack": ["React", "Python"],
  "github_repo": "https://github.com/your-project-repo",
  "maintainers": [
    {
      "name": "Your Name",
      "contact": "your@email.com"
    }
  ],
  "looking_for_contributors": true,
  "domain": ["Web", "AI/ML", "GenAI", "Blockchain", "IoT/Embedded"]
}
```

1. **Customize** the fields to match your project.
2. Scroll down to **"Commit changes..."**.
3. Enter a commit message like `Add project.json` and click **"Commit changes"**.

✅ **Checkpoint:** You have successfully created your project folder and metadata file.

---

### Step 8: Add README.md

[video6.webm](https://github.com/user-attachments/assets/0a035bce-fbe0-4b20-8a7e-6eef36021bcf)

#### Instructions:

1. Navigate back to your folder: `projects/your-project-slug/`.
2. Click **"Add file"** → **"Create new file"**.
3. Name it `README.md`.
4. Add your project details (What it is, Tech stack, How to run it).
5. Scroll down and click **"Commit changes"**.

✅ **Checkpoint:** Your project folder now contains both required files.

---

### Step 9: Open a Pull Request

[video7.webm](https://github.com/user-attachments/assets/7e609f3b-822f-4cd6-adf6-0e863ad6c241)

#### Instructions:

1. Go back to the **original** repository: [vcet-foss/awesome-foss](https://github.com/vcet-foss/awesome-foss).
2. You will likely see a yellow bar saying **"main had recent pushes"**. Click **"Compare & pull request"**.
3. If not, go to the **"Pull requests"** tab and click **"New pull request"**.
4. Click **"compare across forks"**.
5. Ensure the "base" is `vcet-foss/awesome-foss` and "head" is `YOUR-USERNAME/awesome-foss`.
6. Click **"Create pull request"**.

### Title Format:

```
Add project: Your Project Name
```

### Description:

Briefly describe your project and check the boxes:

```
- [x] `project.json` added
- [x] `README.md` included
- [x] Folder name matches slug
```

✅ **Checkpoint:** Your PR is submitted! The automated CI will now validate your changes.

---

## Field Reference

Complete details for `project.json`:

| Field                      | Type    | Required | Description                                                      | Examples                                          |
| -------------------------- | ------- | -------- | ---------------------------------------------------------------- | ------------------------------------------------- |
| `slug`                     | string  | ✅       | Unique identifier. Lowercase kebab-case. Must match folder name. | `"lan-share-app"`, `"ai-chatbot"`                 |
| `name`                     | string  | ✅       | Display name (1-100 characters).                                 | `"LAN Share App"`, `"AI Chatbot"`                 |
| `tagline`                  | string  | ✅       | One-line description (1-150 characters).                         | `"Share files directly over your local network"`  |
| `description`              | string  | ✅       | Detailed explanation (10-500 characters).                        | `"A peer-to-peer file sharing application..."`    |
| `status`                   | string  | ✅       | Project state.                                                   | `"active"`, `"dormant"`, `"idea"`                 |
| `difficulty`               | string  | ✅       | Contributor difficulty level.                                    | `"beginner"`, `"intermediate"`, `"advanced"`      |
| `tech_stack`               | array   | ✅       | Technologies used. At least one required.                        | `["React", "Node.js", "Socket.io"]`               |
| `github_repo`              | string  | ✅       | Full GitHub URL. Must start with `https://github.com/`           | `"https://github.com/vcet-foss/project"`          |
| `maintainers`              | array   | ✅       | At least one with `name` and `contact`.                          | `[{"name": "John", "contact": "john@email.com"}]` |
| `looking_for_contributors` | boolean | ✅       | Whether you want contributors.                                   | `true` or `false`                                 |
| `domain`                   | array   | ✅       | Project categories.                                              | `["Web"]`, `["AI/ML", "GenAI"]`                   |

**Valid `domain` values:**

- `"Web"` — Web applications, sites, or tools
- `"AI/ML"` — Artificial Intelligence and Machine Learning
- `"GenAI"` — Generative AI (ChatGPT-like, image generation, etc.)
- `"Blockchain"` — Cryptocurrency, smart contracts, decentralized apps
- `"IoT/Embedded"` — Internet of Things, hardware, embedded systems

## Need Help?

- 💬 [GitHub Discussions](https://github.com/vcet-foss/awesome-foss/discussions) — Ask questions
- 🐛 [GitHub Issues](https://github.com/vcet-foss/awesome-foss/issues) — Report problems
- 📚 [CONTRIBUTING.md](CONTRIBUTING.md) — Learn about the repo structure

---

**Every great project starts with a single commit. Welcome to VCET FOSS! 🚀**
