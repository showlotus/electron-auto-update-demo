import { dialog, Menu, nativeTheme, Tray } from 'electron'
import path from 'node:path'
import pkg from '../../package.json'

let tray: Tray | null

export function initTray() {
  let currIconTheme = ''
  nativeTheme.on('updated', () => {
    const theme = nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
    if (theme === currIconTheme) return
    currIconTheme = theme
    tray?.setImage(getTrayIcon())
  })

  tray = new Tray(getTrayIcon())
  tray.setToolTip(pkg.name + ' ' + pkg.version)
  const menus = Menu.buildFromTemplate([
    {
      label: 'Open',
      type: 'normal',
      accelerator: 'Ctrl+V',
      click() {}
    },
    { label: '', type: 'separator' },
    {
      label: 'Check for Updates',
      type: 'normal',
      visible: true,
      click() {
        menus.items[2].visible = false
        menus.items[3].visible = true

        // 更新下载完毕
        setTimeout(() => {
          menus.items[3].visible = false
          menus.items[4].visible = true

          dialog
            .showMessageBox({
              title: '',
              type: 'info',
              message: 'Update completed, restart now?',
              buttons: ['Yes', 'No']
            })
            .then((res) => {
              if (res.response === 0) {
                console.log('restart')
              } else {
                console.log('cancel')
              }
            })
          // TODO 重启应用
        }, 3000)
      }
    },
    {
      label: 'Checking...',
      type: 'normal',
      visible: false,
      enabled: false
    },
    {
      label: 'Update completed, restart now',
      type: 'normal',
      visible: false,
      enabled: true,
      click() {
        // TODO
        console.log('restart')
      }
    },
    {
      label: 'Quit',
      type: 'normal',
      role: 'quit'
    }
  ])
  tray.setContextMenu(menus)
}

function getTrayIcon() {
  const size = 48
  const darkIcon = path.join(
    process.env.VITE_PUBLIC,
    'tray/dark',
    `icon@${size}x${size}.png`
  )
  const lightIcon = path.join(
    process.env.VITE_PUBLIC,
    'tray/light',
    `icon@${size}x${size}.png`
  )
  return nativeTheme.shouldUseDarkColors ? lightIcon : darkIcon
}
