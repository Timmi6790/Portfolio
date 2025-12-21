/* eslint-disable no-console */
/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable unicorn/prefer-module */
import fs from 'node:fs'
import path from 'node:path'

const PUBLIC_DIRECTORY: string = path.join(__dirname, '../../public')
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

  // Set directory permissions
  fs.chmodSync(directory, directoryMode)

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
}

function cleanupSelf(): void {
  // Cleanup: Delete self and the scripts directory
  // We use __filename because correct compilation for Docker is CJS
  if (typeof __filename !== 'undefined' && fs.existsSync(__filename)) {
    const scriptDirectory: string = path.dirname(__filename)
    fs.unlinkSync(__filename)

    // Attempt to remove the directory if empty (it should be)
    try {
      if (fs.readdirSync(scriptDirectory).length === 0) {
        fs.rmdirSync(scriptDirectory)
      }
    } catch (directoryError) {
      console.warn('⚠ Could not remove scripts directory:', directoryError)
    }
  }
}

console.log('Setting strict permissions for public directory...')
try {
  setPermissionsRecursive(
    PUBLIC_DIRECTORY,
    DIRECTORY_PERMISSION_MODE,
    FILE_PERMISSION_MODE
  )
  console.log(
    `✓ Public directory permissions set (Files: ${FILE_PERMISSION_MODE.toString(8)}, Dirs: ${DIRECTORY_PERMISSION_MODE.toString(8)})`
  )

  cleanupSelf()
} catch (error) {
  console.error('⚠ Failed to set permissions:', error)
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1)
}
