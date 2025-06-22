import os
import yt_dlp

def linkDownloader(url, inputPath="backend/src/static/uploads"):

    save_dir = os.path.join("..", inputPath)
    os.makedirs(save_dir, exist_ok=True)

    
    # Variable to store the final output path
    downloaded_path = {}

    def progress_hook(d):
        if d['status'] == 'finished':
            downloaded_path['filepath'] = d['filename']
            
            
    ydl_opts = {
        'outtmpl': os.path.join(save_dir, '%(title)s.%(ext)s'),
        'format': 'mp4',
        'verbose': True
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
    
     # Ensure we got the path
    if 'filepath' not in downloaded_path:
        raise ValueError("Failed to determine downloaded file path.")

    save_path = downloaded_path['filepath']
    filename = os.path.basename(save_path)

    return filename, save_path
