import { app, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'

autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = true

// autoUpdater.setFeedURL('http://localhost:5173/')
autoUpdater.on('checking-for-update', () => {
  console.log('checking-for-update')
})
autoUpdater.on('update-available', () => {
  autoUpdater.downloadUpdate()
})
autoUpdater.on('update-not-available', () => {})
autoUpdater.on('update-downloaded', () => {
  dialog
    .showMessageBox({
      title: '',
      type: 'info',
      message: 'Update download complete, whether to install now',
      buttons: ['Yes', 'No']
    })
    .then((res) => {
      if (res.response === 0) {
        autoUpdater.quitAndInstall()
        app.quit()
      } else {
        console.log('cancel')
      }
    })
})
autoUpdater.on('error', () => {})

export function checkUpdate() {
  autoUpdater.checkForUpdates()
}
