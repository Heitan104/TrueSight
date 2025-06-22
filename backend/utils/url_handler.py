import os
import yt_dlp
from utils.file_utils import sanitize_filename  # Make sure this function is implemented
from utils.file_utils import wait_for_file  # Ensure this function is implemented

def linkDownloaderTemp(url, inputPath="/static/uploads"):
    url = url.strip().strip('"').strip("'")
    save_dir = os.path.abspath(inputPath)
    os.makedirs(save_dir, exist_ok=True)

    downloaded_path = {}

    def progress_hook(d):
        if d['status'] == 'finished':
            downloaded_path['filepath'] = d['filename']

    ydl_opts = {
        'outtmpl': os.path.join(save_dir, '%(title)s.%(ext)s'),
        'format': 'mp4',
        'progress_hooks': [progress_hook],
        'quiet': True
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

    if 'filepath' not in downloaded_path:
        raise ValueError("Download failed or filepath not set")

    # Original absolute path and filename
    original_path = downloaded_path['filepath']
    original_filename = os.path.basename(original_path)

    # Sanitize the filename
    sanitized_filename = sanitize_filename(original_filename)

    # If different, rename the file
    if sanitized_filename != original_filename:
        sanitized_path = os.path.join(save_dir, sanitized_filename)
        os.rename(original_path, sanitized_path)
    else:
        sanitized_path = original_path

    # Convert absolute path to a relative web path for Flask
    relative_web_path = os.path.join(inputPath, sanitized_filename)
    relative_web_path = "/" + relative_web_path.replace("\\", "/")  # Ensure URL-friendly
    print(f"File downloaded and saved as: {sanitized_path}")
    
    # if wait_for_file(sanitized_path):
    #     print(f"File downloaded and ready: {sanitized_path}")
    # else:
    #     raise FileNotFoundError(f"File {sanitized_path} not found after download.")

    return sanitized_filename, relative_web_path



import os
import yt_dlp
from utils.file_utils import sanitize_filename

def linkDownloader(url, upload_folder=None):
    """
    Downloads a video from a URL (YouTube, TikTok, etc.) and saves it to the upload_folder.
    Returns (sanitized_filename, absolute_path).
    """
    url = url.strip().strip('"').strip("'")

    # Determine upload folder: prefer backend/static/uploads, fallback to backend/src/static/uploads
    if upload_folder is None:
        # Try backend/static/uploads first
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        candidate = os.path.join(base_dir, "static", "uploads")
        if not os.path.exists(candidate):
            # Fallback to backend/src/static/uploads
            candidate = os.path.join(base_dir, "src", "static", "uploads")
        upload_folder = candidate

    os.makedirs(upload_folder, exist_ok=True)

    downloaded_path = {}

    def progress_hook(d):
        if d['status'] == 'finished':
            downloaded_path['filepath'] = d['filename']

    ydl_opts = {
        'outtmpl': os.path.join(upload_folder, '%(title)s.%(ext)s'),
        'format': 'mp4',
        'progress_hooks': [progress_hook],
        'quiet': True
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

    if 'filepath' not in downloaded_path:
        raise ValueError("Download failed or filepath not set")

    original_path = downloaded_path['filepath']
    original_filename = os.path.basename(original_path)

    # Sanitize the filename
    sanitized_filename = sanitize_filename(original_filename)
    sanitized_path = os.path.join(upload_folder, sanitized_filename)

    # Rename if needed
    if sanitized_filename != original_filename:
        os.rename(original_path, sanitized_path)
    else:
        sanitized_path = original_path

    print(f"File downloaded and saved as: {sanitized_path}")

    return sanitized_filename, sanitized_path