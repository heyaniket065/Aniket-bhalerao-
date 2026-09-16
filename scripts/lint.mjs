import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { globSync } from 'node:fs'

const files = globSync('src/**/*.js')
for (const file of files) execFileSync(process.execPath, ['--check', file], { stdio: 'inherit' })
for (const file of ['index.html', 'src/style.css']) {
  if (!existsSync(file)) throw new Error(`Required file is missing: ${file}`)
}
console.log(`Linted ${files.length} JavaScript modules.`)
