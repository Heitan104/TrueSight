import shutil
import os

from utils import extract_frames, cleanup_file, preprocess_image



def analyzer(UPLOAD_FOLDER, model, video, save_path):
    """
    Main analyzer function:
    - Extracts frames from uploaded video
    - Runs the model prediction on each frame
    - Computes average confidence and labels video
    - Cleans up temporary files
    - Returns structured result
    """
    frames_dir = os.path.join(UPLOAD_FOLDER, f'{video.filename}_frames')
    frame_paths = extract_frames(save_path, frames_dir)

    results = []
    for frame_path in frame_paths:
        img = preprocess_image(frame_path)
        prob = model.predict(img)[0][0]
        results.append(prob)

    avg_conf = sum(results) / len(results)

    if avg_conf > 0.6:
        label = 'real'
    elif avg_conf > 0.4:
        label = 'unclear'
    else:
        label = 'fake'

    shutil.rmtree(frames_dir)
    cleanup_file(save_path)

    return {
        "probability": label,
        "likely_real": round(avg_conf.item(), 3),
        "explanation": [round(p.item(), 3) for p in results]
    }
