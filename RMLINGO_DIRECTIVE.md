Project Directive: MENA Replica & Deployment (rmlingo.com)

Target Agent: JCode (Terminal)Backend Model: DeepSeek-V4-FlashBase Project: ./ (dip-int)
🎯 Core Objectives

Create a new, separate website for a Middle-East company called RMLingo (rmlingo.com), based on the existing codebase. Rebrand the site, adapt the visual language for the MENA region, push it to a new GitHub repository, and deploy it to here.now.
🛠️ Execution Rules & Constraints

    New Repository: Do NOT push to dip-int. You must create a new GitHub repo named rmlingo using the gh CLI.
    Preserve Structure: Keep the modern tech stack intact. Do not break the build.
    Atomic Commits: Commit locally in the new folder before pushing to GitHub.
    Safety: If a CLI command fails (e.g., gh not authenticated), stop and inform me.

🚀 Implementation Plan (Execute Step-by-Step)
Phase 1: Scaffolding & Duplication

    Create a new directory outside the current project: mkdir ../rmlingo.
    Copy all files from the current dip-int project into ../rmlingo, EXCLUDING node_modules, .git, and dist.
    Navigate into ../rmlingo and initialize a new git repository (git init).
    Update package.json to change the project name to rmlingo.

Phase 2: Rebranding & Content Swap

    Search and replace all instances of "Diplomatic International", "dip-int", and "diplomatic-international.com" with "RMLingo", "rmlingo", and "rmlingo.com".
    Update the index.html title, meta tags, and favicon references.
    Update the sitemap.xml and robots.txt to reflect rmlingo.com.

Phase 3: MENA Visual Adaptation

    Color Palette: Shift the primary brand colors to resonate with the MENA region (e.g., incorporate deep emerald greens, golds, or rich desert tones while maintaining professional contrast).
    Typography: Integrate a modern, clean font family that supports both Latin and Arabic scripts beautifully (e.g., 'IBM Plex Sans Arabic', 'Cairo', or 'Tajawal' via Google Fonts).
    RTL Support (Crucial): Add RTL (Right-to-Left) support. Configure Tailwind/CSS to handle dir="rtl" gracefully. Ensure the layout flips correctly so an Arabic translation can be dropped in later.
    Imagery Placeholders: Update image URLs or placeholders to suggest MENA-relevant imagery (e.g., skylines of Dubai/Riyadh, Middle Eastern cultural motifs).

Phase 4: GitHub Repository & Push

    Run gh repo create rmlingo --public --source=. --remote=origin --push (or private, based on standard practice).
    Ensure all local commits are pushed to the new rmlingo GitHub repository.

Phase 5: Deployment to here.now

    Recall Context: Access your persistent semantic memory from our previous session. Recall the exact CLI commands, authentication method, and workflow used to deploy the dip-int project to here.now yesterday.
    Execute Deployment: Using the recalled method, deploy the newly built rmlingo project to here.now.
    If the deployment is successful, output the live URL. If you cannot recall the method or the deployment fails, pause and ask me for instructions.
