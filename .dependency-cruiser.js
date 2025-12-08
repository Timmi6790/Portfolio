/* eslint-disable no-restricted-syntax */
/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  options: {
    doNotFollow: {
      path: 'node_modules',
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.json',
    },
  },
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment:
        'This module depends on something that eventually depends back on it',
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: 'no-orphans',
      severity: 'warn',
      comment: 'This is an orphan module - it has no incoming dependencies',
      from: {
        orphan: true,
        pathNot: [
          '^src/app', // Next.js Pages/App Router are entries
          '^src/middleware.ts',
          '^src/proxy.ts',
          '\\.d\\.ts$',
          '\\.config\\.ts$',
          '\\.test\\.ts$',
        ],
      },
      to: {},
    },
  ],
}
