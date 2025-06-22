import shutil
import os

from utils import extract_frames, cleanup_file, preprocess_image
from utils.classification_utils import calc_vid_fconf
from utils.file_utils import cleanup_file, wait_for_file


def analyzer(UPLOAD_FOLDER, model, filename, save_path):
    """
    Main analyzer function:
    - Extracts frames from uploaded video
    - Runs the model prediction on each frame
    - Computes average confidence and labels video
    - Cleans up temporary files
    - Returns structured result
    """

    # wait_for_file(save_path)
    if not os.path.exists(save_path):
        return {
            "probability": "error",
            "reasoning": "File not found after waiting",
            "likely_real": 0.0,
            "explanation": []
        }
    frames_dir = os.path.join(UPLOAD_FOLDER, f'{filename}_frames')
    frame_paths = extract_frames(save_path, frames_dir)
    
    print(f"Analyzing video: {filename} @ {save_path}")

    if not frame_paths:
        cleanup_file(save_path)
        cleanup_file(frames_dir)
        return {
            "probability": "error",
            "reasoning": "No frames extracted from video",
            "likely_real": 0.0,
            "explanation": []
        }

    
    results = []
    for frame_path in frame_paths:
        img = preprocess_image(frame_path)
        prob = model.predict(img)[0][0]
        results.append(prob)

    print(f"Processed {len(results)} frames from {filename}")
    print(f"Results: {results}")
    answer = calc_vid_fconf(results)

    shutil.rmtree(frames_dir)
    cleanup_file(save_path)

    return answer
