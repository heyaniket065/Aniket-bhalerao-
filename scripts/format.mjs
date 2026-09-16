import { readFileSync } from 'node:fs'

const files = ['README.md', 'package.json', 'src/style.css', ...process.argv.slice(2)]
for (const file of files) {
  const content = readFileSync(file, 'utf8')
  if (!content.endsWith('\n')) throw new Error(`${file} must end with a newline.`)
}
if (readFileSync('src/style.css', 'utf8').split('\n').length < 20) {
  throw new Error('src/style.css must remain organized into readable sections.')
}
console.log('Formatting checks passed.')
