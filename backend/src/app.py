import os
from flask import Flask, request, jsonify
from src.routes import init_routes

def create_app():
    app = Flask(__name__)
    
    # Load configuration from environment variables
    app.config.from_envvar('APP_CONFIG', silent=True)
    UPLOAD_FOLDER = 'static/uploads'
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    
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
            
            # TODO: Run Model
            fake_prob = 0.84
            
            return jsonify({
                "probability": fake_prob,
                "likely_fake": fake_prob > 0.5,
                "explanation": "blurry, low resolution, or other artifacts",
                }), 200

        elif url:
            return jsonify({
                "error": "URL processing not implemented yet"
            })
    # Initialize routes
    init_routes(app)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)