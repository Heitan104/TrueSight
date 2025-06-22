import os
import yt_dlp

def linkDownloader(url, inputPath="backend/src/static/uploads"):

    save_dir = os.path.join("..", inputPath)
    os.makedirs(save_dir, exist_ok=True)

    ydl_opts = {
        'outtmpl': os.path.join(save_dir, '%(title)s.%(ext)s'),
        'format': 'mp4',
        'verbose': True
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])