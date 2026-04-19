# ============================================================================
# GIT INITIALIZATION - Run at project root
# Project: website_courtney_resident
# ============================================================================

# If git was accidentally initialized in src/, remove it first:
rm -rf "C:\Users\court\Dropbox\Medical_School_DROP\Research\website_courtney_resident\src\.git"

# Navigate to project root
cd "C:\Users\court\Dropbox\Medical_School_DROP\Research\website_courtney_resident"

# Initialize project repository at project root
git init
git add .
git commit -m "Initial commit: project scaffold and documentation structure"

# Create GitHub repository and push (using GitHub CLI)
# gh repo create courtney-smith-md/courtney-smith-website --public --source=. --remote=origin --push

# Or manually add remote and push:
# git remote add origin https://github.com/courtney-smith-md/courtney-smith-website.git
# git branch -M main
# git push -u origin main

# ============================================================================
# WEBSITE COURTNEY RESIDENT PROJECT SETUP - SYMLINK COMMANDS
# Run PowerShell as Administrator (required for symlinks)
# Project: website_courtney_resident
# ============================================================================

$projectRoot = "C:\Users\court\Dropbox\Medical_School_DROP\Research\website_courtney_resident"
$utilitiesRoot = "C:\Users\court\Dropbox\Medical_School_DROP\Research\utilities_research"

# ----------------------------------------------------------------------------
# 1. .env symlink (project root)
# ----------------------------------------------------------------------------
$source = "$utilitiesRoot\.env"
$target = "$projectRoot\.env"
if (Test-Path $target) { Remove-Item $target -Force }
New-Item -ItemType SymbolicLink -Path $target -Target $source

# ----------------------------------------------------------------------------
# 2. templates folder symlink (src/documentation/templates)
# ----------------------------------------------------------------------------
$source = "$utilitiesRoot\templates"
$target = "$projectRoot\src\documentation\templates"
if (Test-Path $target) { Remove-Item $target -Recurse -Force -ErrorAction SilentlyContinue }
New-Item -ItemType SymbolicLink -Path $target -Target $source

# ----------------------------------------------------------------------------
# 3. .cursorignore symlink (project root)
# ----------------------------------------------------------------------------
$source = "$utilitiesRoot\.cursorignore"
$target = "$projectRoot\.cursorignore"
if (Test-Path $target) { Remove-Item $target -Force }
New-Item -ItemType SymbolicLink -Path $target -Target $source

# ----------------------------------------------------------------------------
# 4. agent_queue symlink (project root)
# ----------------------------------------------------------------------------
$source = "C:\Users\court\Dropbox\agent_queue"
$target = "$projectRoot\agent_queue"
if (Test-Path $target) { Remove-Item $target -Force }
New-Item -ItemType SymbolicLink -Path $target -Target $source

# ----------------------------------------------------------------------------
# 5. .gitignore symlink (src folder - git repo root)
# ----------------------------------------------------------------------------
$source = "$utilitiesRoot\.gitignore"
$target = "$projectRoot\src\.gitignore"
if (Test-Path $target) { Remove-Item $target -Force }
New-Item -ItemType SymbolicLink -Path $target -Target $source

# ----------------------------------------------------------------------------
# 6. CLAUDE_sessions.md symlink (src/documentation/sessions/CLAUDE.md)
# ----------------------------------------------------------------------------
$source = "$utilitiesRoot\claude_md\CLAUDE_sessions.md"
$target = "$projectRoot\src\documentation\sessions\CLAUDE.md"
if (Test-Path $target) { Remove-Item $target -Force }
New-Item -ItemType SymbolicLink -Path $target -Target $source

# ----------------------------------------------------------------------------
# 7. .claudeignore symlink (project root)
# ----------------------------------------------------------------------------
$source = "$utilitiesRoot\.claudeignore"
$target = "$projectRoot\.claudeignore"
if (Test-Path $target) { Remove-Item $target -Force }
New-Item -ItemType SymbolicLink -Path $target -Target $source


# Reference Content Conversion to Markdown

python "C:\Users\court\Dropbox\Medical_School_DROP\Research\utilities_research\pdf2project.py" "C:\Users\court\Dropbox\Medical_School_DROP\Research\website_courtney_resident\reference\content\CAS-CV-2026-03.pdf" --use-docling --to-markdown -o "C:\Users\court\Dropbox\Medical_School_DROP\Research\website_courtney_resident\reference\content"
python "C:\Users\court\Dropbox\Medical_School_DROP\Research\utilities_research\pdf2project.py" "C:\Users\court\Dropbox\Medical_School_DROP\Research\website_courtney_resident\reference\content\Cheng_Hogeling_LOR_Notes_Courtney_Smith_v2.0.docx" --use-docling --to-markdown -o "C:\Users\court\Dropbox\Medical_School_DROP\Research\website_courtney_resident\reference\content"
python "C:\Users\court\Dropbox\Medical_School_DROP\Research\utilities_research\pdf2project.py" "C:\Users\court\Dropbox\Medical_School_DROP\Research\website_courtney_resident\reference\content\deident_ERAS_Application_09-23-2025.docx" --use-docling --to-markdown -o "C:\Users\court\Dropbox\Medical_School_DROP\Research\website_courtney_resident\reference\content"
python "C:\Users\court\Dropbox\Medical_School_DROP\Research\utilities_research\pdf2project.py" "C:\Users\court\Dropbox\Medical_School_DROP\Research\website_courtney_resident\reference\content\Nguyen_UCLA_LOR_Notes_Courtney_Smith.docx" --use-docling --to-markdown -o "C:\Users\court\Dropbox\Medical_School_DROP\Research\website_courtney_resident\reference\content"
python "C:\Users\court\Dropbox\Medical_School_DROP\Research\utilities_research\pdf2project.py" "C:\Users\court\Dropbox\Medical_School_DROP\Research\website_courtney_resident\reference\content\Yeung_LOR_Notes_Courtney_Smith_ERAS.docx" --use-docling --to-markdown -o "C:\Users\court\Dropbox\Medical_School_DROP\Research\website_courtney_resident\reference\content"
