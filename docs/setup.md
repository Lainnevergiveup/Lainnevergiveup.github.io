# Setup Guide

## 1. Create Profile Repository

Your GitHub Profile repository must match your username exactly:

```
https://github.com/{USERNAME}/{USERNAME}
```

For example, if your username is `lain`, the repo is `lain/lain`.

## 2. Clone the Repository

```bash
git clone https://github.com/{USERNAME}/{USERNAME}.git
cd {USERNAME}
```

## 3. Configure Variables

Open `README.md` and replace all placeholders:

| Placeholder | Description |
|-------------|-------------|
| `{{USERNAME}}` | Your GitHub username |
| `{{EMAIL}}` | Your contact email |
| `{{BLOG}}` | Your blog URL |
| `{{TWITTER}}` | Your Twitter/X handle |
| `{{PROJECT_PAGE}}` | Your project page URL |
| `{{DOCS_PAGE}}` | Your documentation page URL |
| `{{RESEARCH_PAGE}}` | Your research page URL |
| `{{ACADEMIC_PAGE}}` | Your academic homepage URL |
| `{{GOOGLE_SCHOLAR}}` | Your Google Scholar user ID |
| `{{ORCID}}` | Your ORCID ID |
| `{{LINKEDIN}}` | Your LinkedIn username |
| `{{BILIBILI}}` | Your Bilibili UID |
| `{{ZHIHU}}` | Your Zhihu username |

## 4. Enable GitHub Actions

1. Go to your repository Settings
2. Navigate to **Actions > General**
3. Under **Actions permissions**, select **Allow all actions and reusable workflows**
4. Under **Workflow permissions**, select **Read and write permissions**
5. Click **Save**

## 5. Create Output Branch

The Snake animation workflow pushes to an `output` branch. Create it:

```bash
git checkout --orphan output
git rm -rf .
git commit --allow-empty -m "init output branch"
git push origin output
git checkout main
```

## 6. Configure Navigation Links

In the `README.md` Navigation Hub section, replace `#` placeholder links with your actual URLs.

## 7. Add External Platforms

To add a new social platform, edit the Social Platforms table in `README.md`:

```markdown
| Platform Name | [display-name](https://platform.com/your-id) |
```

## 8. Push Changes

```bash
git add -A
git commit -m "init: GitHub profile setup"
git push origin main
```

Your profile page at `https://github.com/{USERNAME}` will display the README automatically.
