import { dialog } from 'electron'
import { autoUpdater } from 'electron-updater'

autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = true

export default function () {
  autoUpdater.setFeedURL('http://localhost:5173/')
  autoUpdater.checkForUpdates()
  autoUpdater.on('checking-for-update', () => {
    dialog.showMessageBox({
      message: 'checking-for-update'
    })
    console.log('checking-for-update')
  })
  autoUpdater.on('update-available', () => {
    autoUpdater.downloadUpdate()
  })
  autoUpdater.on('update-not-available', () => {})
  autoUpdater.on('update-downloaded', () => {})
  autoUpdater.on('error', () => {})
}
