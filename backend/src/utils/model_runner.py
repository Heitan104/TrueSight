import cv2
import numpy as np
import tensorflow as tf
from keras.models import load_model
from keras.preprocessing.image import img_to_array
import os

# Load model once (keep it global)
model = load_model("models/mesonet.h5")

def extract_frames(video_path, max_frames=15, resize=(256, 256)):
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_idxs = np.linspace(0, total_frames - 1, max_frames, dtype=int)
    frames = []

    for i in frame_idxs:
        cap.set(cv2.CAP_PROP_POS_FRAMES, i)
        ret, frame = cap.read()
        if ret:
            frame = cv2.resize(frame, resize)
            frame = img_to_array(frame) / 255.0
            frames.append(frame)

    cap.release()
    return np.array(frames)

def run_model_on_video(video_path):
    try:
        frames = extract_frames(video_path)
        preds = model.predict(frames)
        avg_pred = np.mean(preds)

        result = {
            "fake_probability": round(float(avg_pred), 3),
            "likely_fake": bool(avg_pred > 0.5),
            "explanation": "Probability based on MesoNet CNN predictions across frames"
        }
        return result
    except Exception as e:
        return {
            "error": f"Model inference failed: {str(e)}"
        }
