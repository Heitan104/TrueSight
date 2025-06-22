import shutil
import cv2
import os

from utils.image_utils import preprocess_image


def cleanup_file(file_path):
    try:
        os.remove(file_path)
    except Exception as e:
        print(f"Cleanup failed: {e}")


def extract_frames(video_path: str, output_dir: str, max_frames=30):
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
    return [os.path.join(output_dir, f) for f in os.listdir(output_dir)]



def analyzer(UPLOAD_FOLDER, model, video, save_path):
    # TODO: Run Model
            frames_dir = os.path.join(UPLOAD_FOLDER, f'{video.filename}_frames')
            frame_paths = extract_frames(save_path, frames_dir)
            
            
            results = []
            for frame_path in frame_paths:
                img = preprocess_image(frame_path)
                prediction = model.predict(img)     
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
                # "likely_fake": float(avg_conf),
                # "explanation": [float(p) for p in results]
                }