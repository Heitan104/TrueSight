import os
from flask import Flask, request, jsonify
from models.mesoClassifiers import Meso4
from analyzer import analyzer

from keras.backend import clear_session
from utils.url_handler import linkDownloader

def create_app():
    app = Flask(__name__)
    
    # Load configuration from environment variables
    app.config.from_envvar('APP_CONFIG', silent=True)
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'uploads')
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    
    # Load Model 
    clear_session()  # Clear any previous session
    model = Meso4()
    model.load('models/Meso4_DF.h5')
    
    @app.route('/')
    def index():
        return jsonify({"message": "Welcome to the Flask app!"})
    
    @app.route('/analyze', methods=['POST'])
    def analyze():
        video = request.files.get("video")
        url = request.form.get("url")
        if not video and not url:
            return jsonify({"error": "No video file or URL provided"}), 400
        if video and url:
            return jsonify({"error": "Please provide either a video file or a URL, not both"}), 400
        
        if video:
            # TODO: Process Uploaded video
            save_path = os.path.join(UPLOAD_FOLDER, video.filename)
            video.save(save_path)
            print(f"Video saved to {save_path} and file name is {video.filename}")
            # Run the analyzer
            response = analyzer(UPLOAD_FOLDER, model, video.filename, save_path)
            
            
            return jsonify(response), 200

        elif url:
            
            filename, save_path = linkDownloader(url, UPLOAD_FOLDER)
            
            print(f"Video downloaded to {save_path} and file name is {filename}")
            
            response = analyzer(UPLOAD_FOLDER, model, filename, save_path)
            return jsonify(response), 200

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)