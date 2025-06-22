import shutil
import os

from utils import extract_frames, cleanup_file, preprocess_image
from utils.classification_utils import calc_vid_fconf


def analyzer(UPLOAD_FOLDER, model, filename, save_path):
    """
    Main analyzer function:
    - Extracts frames from uploaded video
    - Runs the model prediction on each frame
    - Computes average confidence and labels video
    - Cleans up temporary files
    - Returns structured result
    """
    frames_dir = os.path.join(UPLOAD_FOLDER, f'{filename}_frames')
    frame_paths = extract_frames(save_path, frames_dir)

    results = []
    for frame_path in frame_paths:
        img = preprocess_image(frame_path)
        prob = model.predict(img)[0][0]
        results.append(prob)

    answer = calc_vid_fconf(results)

    shutil.rmtree(frames_dir)
    cleanup_file(save_path)

    return answer
