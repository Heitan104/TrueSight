import os
import re
import unicodedata
import time
import html

def wait_for_file(filepath, timeout=5):
    """Wait until the file exists and is non-empty, or until timeout."""
    start = time.time()
    while time.time() - start < timeout:
        if os.path.exists(filepath) and os.path.getsize(filepath) > 0:
            return True
        time.sleep(0.1)
    return False


def sanitize_filename(filename):
    # Normalize unicode characters (remove emojis and accents)
    filename = unicodedata.normalize("NFKD", filename).encode("ascii", "ignore").decode("ascii")
    
    # Replace spaces with underscores
    filename = filename.replace(" ", "_")
    
    # Remove HTML entities
    filename = html.unescape(filename)
    
    # Remove non-alphanumeric and non-standard characters
    filename = re.sub(r"[^\w\-_.]", "", filename)

    return filename


def cleanup_file(file_path):
    """Delete a file if it exists, safely."""
    
    UPLOAD_DIR = os.path.abspath("static/uploads")
    # file_path is something like "/static/uploads/Googles_Veo_3_.mp4"
    filename = os.path.basename(file_path)  # Extract just 'Googles_Veo_3_.mp4'

    full_path = os.path.join(UPLOAD_DIR, filename)

    # print the file path being cleaned up
    print(f"Cleaning up file: {full_path}")
    try:
        os.remove(full_path)
    except Exception as e:
        print(f"Cleanup failed: {e}")
