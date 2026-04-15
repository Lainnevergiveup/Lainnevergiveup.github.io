import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const VAULT_DIR = '～/Documents/Obsidian Vault/blogs';
const BLOG_DIR = path.join(process.cwd(), 'content/posts');
const DEBOUNCE_MS = 3000; // Wait 3s after last change before deploying

let deployTimer = null;
let isDeploying = false;

function sync() {
  console.log('\n[Synchronizing] Syncing from Obsidian Vault...');
  try {
    execSync(
      `rsync -av --exclude='.*' --exclude='*.excalidraw.md' "${VAULT_DIR}/" "${BLOG_DIR}/"`,
      { stdio: 'inherit' }
    );
    console.log('[Synced] Files synchronized successfully');
  } catch (e) {
    console.error('[Error] Sync failed:', e.message);
  }
}

function deploy() {
  if (isDeploying) return;
  isDeploying = true;

  try {
    console.log('\n[Deploying] Building and pushing...');
    execSync('node scripts/build-search-index.mjs', { stdio: 'inherit', cwd: process.cwd() });

    execSync('git add -A', { stdio: 'inherit', cwd: process.cwd() });

    // Check if there are changes
    try {
      execSync('git diff --cached --quiet', { cwd: process.cwd() });
      console.log('[Deploy] No changes to commit');
    } catch {
      const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
      execSync(
        `git commit -m "auto: blog post update ${now}"`,
        { stdio: 'inherit', cwd: process.cwd() }
      );
      execSync('git push origin main', { stdio: 'inherit', cwd: process.cwd() });
      console.log('[Deployed] Pushed to GitHub - deployment will auto-trigger');
    }
  } catch (e) {
    console.error('[Error] Deploy failed:', e.message);
  } finally {
    isDeploying = false;
  }
}

function scheduleDeploy() {
  if (deployTimer) clearTimeout(deployTimer);
  deployTimer = setTimeout(() => {
    sync();
    deploy();
  }, DEBOUNCE_MS);
}

// Initial sync
sync();
deploy();

console.log(`\n[Watching] Monitoring "${VAULT_DIR}" for changes...`);
console.log('[Info] Write or edit .md files in Obsidian, changes auto-deploy in ~3s');
console.log('[Info] Press Ctrl+C to stop\n');

// Watch the vault directory recursively
fs.watch(VAULT_DIR, { recursive: true }, (eventType, filename) => {
  if (!filename || !/\.(md|mdx)$/.test(filename)) return;
  console.log(`[Changed] ${filename}`);
  scheduleDeploy();
});
