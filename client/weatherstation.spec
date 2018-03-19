# -*- mode: python -*-

block_cipher = None


a = Analysis(['weatherstation.py'],
             pathex=['/home/pi/dev/weather-station-site/client'],
             binaries=[],
             datas=[
                ('env/lib/python3.5/site-packages/sense_hat/sense_hat_text.png', 'sense_hat_text.png'), 
                ('env/lib/python3.5/site-packages/sense_hat/sense_hat_text.txt', 'sense_hat_text.txt')    
             ],
             hiddenimports=[],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
          a.datas,
          name='weatherstation',
          debug=False,
          strip=False,
          upx=True,
          runtime_tmpdir=None,
          console=True )
