import os

def cleanup_file(file_path):
    """Delete a file if it exists, safely."""
    try:
        os.remove(file_path)
    except Exception as e:
        print(f"Cleanup failed: {e}")
