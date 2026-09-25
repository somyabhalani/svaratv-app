const electronInstaller = require('electron-winstaller');
async function build() {
  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: './dist/FanCodePlayer-win32-x64',
      outputDirectory: './dist/installer',
      authors: 'FanCode Player',
      exe: 'FanCodePlayer.exe',
      description: 'FanCode Native Windows Player',
      setupExe: 'FanCodePlayer_Setup.exe',
      noMsi: true
    });
    console.log('Done');
  } catch(e) { console.log(e); }
}
build();
