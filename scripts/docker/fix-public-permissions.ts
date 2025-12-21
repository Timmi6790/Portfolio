/* eslint-disable no-console */
/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable unicorn/prefer-module */
import fs from 'node:fs'
import path from 'node:path'

// Use explicit octal literals for permissions
const DIRECTORY_PERMISSION_MODE: number = 0o555
const FILE_PERMISSION_MODE: number = 0o444

function setPermissionsRecursive(
  directory: string,
  directoryMode: number,
  fileMode: number
): void {
  if (!fs.existsSync(directory)) {
    return
  }

  const items: fs.Dirent[] = fs.readdirSync(directory, { withFileTypes: true })

  for (const item of items) {
    const fullPath: string = path.join(directory, item.name)
    if (item.isDirectory()) {
      setPermissionsRecursive(fullPath, directoryMode, fileMode)
    } else {
      // Set file permissions
      fs.chmodSync(fullPath, fileMode)
    }
  }

  // Set directory permissions AFTER processing children (post-order)
  fs.chmodSync(directory, directoryMode)
}

function cleanupSelf(): void {
  // Cleanup: Delete self
  // We use __filename because correct compilation for Docker is CJS
  if (typeof __filename !== 'undefined' && fs.existsSync(__filename)) {
    try {
      fs.unlinkSync(__filename)
    } catch (cleanupError) {
      console.warn('⚠ Could not delete permission script:', cleanupError)
    }
  }
}

console.log('Setting strict permissions for public directory...')
try {
  // If running from /tmp, path is ../app/public
  // Dockerfile copies to /tmp/fix-public-permissions.js
  const targetDirection: string = path.resolve('/app/public')

  if (fs.existsSync(targetDirection)) {
    setPermissionsRecursive(
      targetDirection,
      DIRECTORY_PERMISSION_MODE,
      FILE_PERMISSION_MODE
    )
    console.log(
      `✓ Public directory permissions set (Files: ${FILE_PERMISSION_MODE.toString(8)}, Dirs: ${DIRECTORY_PERMISSION_MODE.toString(8)})`
    )
  } else {
    console.warn(`⚠ Target directory does not exist: ${targetDirection}`)
  }

  cleanupSelf()
} catch (error) {
  console.error('⚠ Failed to set permissions:', error)
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1)
}
