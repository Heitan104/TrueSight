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
            
    COOKIES_FILE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'secrets', 'youtube_cookies.txt'))
    print(f"Using cookies from: {COOKIES_FILE}")

    ydl_opts = {
        'cookies': COOKIES_FILE,
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