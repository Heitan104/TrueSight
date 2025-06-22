import os
import yt_dlp

def linkDownloader(url, inputPath="spurhacks2025/backend/src/static/uploads"):

    path = os.path.abspath(inputPath)
    os.makedirs(path, exist_ok=True)
    
    ydl_opts = {
        'outtmpl': os.path.join(path, '%(title)s.%(ext)s'),
        'format': 'mp4',
        'verbose': True
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
