/* Rebrand sweep for RMLingo: replaces legacy brand strings across the repo. */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = '/home/seven/rmlingo'
const EXCLUDE_DIRS = new Set(['node_modules', '.git', 'dist'])
const EXCLUDE_FILES = new Set(['RMLINGO_DIRECTIVE.md', 'pnpm-lock.yaml'])

const REPLACEMENTS = [
  ['Diplomatic International', 'RMLingo'],
  ['diplomatic-international.com', 'rmlingo.com'],
  ['dip-int', 'rmlingo'],
]

const SUFFIXES = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json', '.html', '.md', '.css', '.txt', '.xml', '.svg', '.mjs']

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (EXCLUDE_DIRS.has(name)) continue
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) {
      walk(full)
    } else if (SUFFIXES.some((s) => name.endsWith(s)) && !EXCLUDE_FILES.has(name)) {
      const before = readFileSync(full, 'utf8')
      let after = before
      for (const [from, to] of REPLACEMENTS) {
        after = after.split(from).join(to)
      }
      if (after !== before) {
        writeFileSync(full, after)
        console.log('rewrote', relative(ROOT, full))
      }
    }
  }
}

walk(ROOT)
console.log('done')
