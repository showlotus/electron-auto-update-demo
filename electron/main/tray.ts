import { nativeTheme, Tray } from 'electron'
import path from 'node:path'

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
