import os
from flask import Flask, request, jsonify
from flask_cors import CORS

from models.mesoClassifiers import Meso4
from keras.backend import clear_session

from analyzer import analyzer
from utils.url_handler import linkDownloader

def create_app():
    app = Flask(__name__)
    CORS(app)  # <-- Required for cross-origin requests (Vercel + Render)

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'uploads')
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    # Load model once on startup
    clear_session()
    model = Meso4()
    model_path = os.path.join(BASE_DIR, 'models', 'Meso4_DF.h5')
    model.load(model_path)

    @app.route('/')
    def index():
        return jsonify({"message": "Welcome to the Flask app!"})

    @app.route('/analyze', methods=['POST'])
    def analyze_route():
        video = request.files.get("video")
        url = request.form.get("url")

        if not video and not url:
            return jsonify({"error": "No video file or URL provided"}), 400
        if video and url:
            return jsonify({"error": "Provide either a video file or a URL, not both"}), 400

        if video:
            save_path = os.path.join(UPLOAD_FOLDER, video.filename)
            video.save(save_path)
            print(f"Video saved to {save_path}")
            result = analyzer(UPLOAD_FOLDER, model, video.filename, save_path)
            return jsonify(result), 200

        if url:
            filename, save_path = linkDownloader(url, UPLOAD_FOLDER)
            print(f"Video downloaded to {save_path}")
            result = analyzer(UPLOAD_FOLDER, model, filename, save_path)
            return jsonify(result), 200

    return app

app = create_app()

# 👇 This part is required for Render
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
