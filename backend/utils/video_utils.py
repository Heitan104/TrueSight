import os
import cv2

def extract_frames(video_path: str, output_dir: str, max_frames=30):
    """
    Extracts up to max_frames evenly spaced frames from the video
    and saves them as JPEGs into output_dir.
    Returns a list of saved frame file paths.
    """
    os.makedirs(output_dir, exist_ok=True)
    cap = cv2.VideoCapture(video_path)

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    interval = max(1, total_frames // max_frames)

    count = 0
    saved = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        if count % interval == 0:
            filename = os.path.join(output_dir, f"frame_{saved}.jpg")
            cv2.imwrite(filename, frame)
            saved += 1
            if saved >= max_frames:
                break
        count += 1

    cap.release()

    return sorted([os.path.join(output_dir, f) for f in os.listdir(output_dir)])
