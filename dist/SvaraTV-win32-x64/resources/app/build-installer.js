const electronInstaller = require('electron-winstaller');
async function build() {
  try {
    console.log('Building SvaraTV Windows Installer...');
    await electronInstaller.createWindowsInstaller({
      appDirectory: './dist/SvaraTV-win32-x64',
      outputDirectory: './dist/installer',
      authors: 'Somya Bhalani',
      exe: 'SvaraTV.exe',
      description: 'SvaraTV Native Windows Player',
      setupExe: 'SvaraTV_Setup_1.0.0.exe',
      noMsi: true,
      setupIcon: './icon.ico'
    });
    console.log('Installer build complete! Found in dist/installer/SvaraTV_Setup_1.0.0.exe');
  } catch(e) { console.log(e); }
}
build();
