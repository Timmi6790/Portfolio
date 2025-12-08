/* eslint-disable no-console */
/* eslint-disable unicorn/no-process-exit */

import * as checker from 'license-checker-rseidelsohn'

const EXCLUDE: string[] = [
  'MIT',
  'ISC',
  'Apache-2.0',
  'BSD-2-Clause',
  'BSD-3-Clause',
  'CC0-1.0',
  'CC-BY-4.0',
  'Unlicense',
  'WTFPL',
  '0BSD',
  'BlueOak-1.0.0',
]

const FAIL_ON: string[] = [
  'GPL-2.0',
  'GPL-3.0',
  'LGPL-2.0',
  'LGPL-2.1',
  'LGPL-3.0',
  'AGPL-3.0',
  'MPL-2.0',
]

checker.init(
  {
    excludeLicenses: EXCLUDE.join(','),
    failOn: FAIL_ON.join(';'),
    production: true,
    start: process.cwd(),
    summary: true,
  },
  (error: Error | null, _packages: object): void => {
    if (error) {
      console.error('❌ License check failed:', error.message)
      process.exit(1)
    }
    console.log('✅ License check passed.')
  }
)
