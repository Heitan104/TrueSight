from PIL import Image
import numpy as np

def preprocess_image(filepath: str) -> np.ndarray:
    img = Image.open(filepath).convert("RGB")
    img = img.resize((256, 256))
    img_array = np.asarray(img).astype('float32') / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array
