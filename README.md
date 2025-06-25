# TrueSight  

TrueSight is an AI-powered content authenticity detector created for Spurhacks2025. It analyzes shared TikTok/Reel links in real-time and instantly notifies users whether the content is AI-generated—without interrupting their scrolling session. With TrueSight, you can stay informed about the content you consume while maintaining your social media flow.

### Inspiration  
We built TrueSight to combat the rising wave of AI-generated misinformation on short-form video platforms. Our goal is to empower users to identify synthetic content effortlessly, promoting digital literacy without disrupting their browsing experience.

### Features  
- **Instant AI Detection**: Share a TikTok/Reel link and receive a notification with an AI probability score (e.g., "92% likely AI-generated").  
- **Explainable Results**: Clear reasons for the detection (e.g., "Unnatural facial movements, synthetic voice patterns").  
- **Seamless Integration**: Works entirely in-app—no switching screens or losing your place.  
- **History Log**: Optional saved results for reviewed content (future update).  

### How It Works  
1. **Share a Link**: User shares a TikTok/Reel URL to TrueSight (via app/extension).  
2. **AI Analysis**: Our model processes the video’s visual/audio features. 
3. **Smart Notification**: Returns a percentage score and detection rationale directly to the user’s device.  

### How to Use  
1. **Mobile App**:  
   - Open TrueSight and enable notifications.  
   - Share TikTok/Reel links directly to the app.  
 

### Setup and Installation  
To run TrueSight locally:  
```bash  
git clone https://github.com/your-username/TrueSight.git  
cd TrueSight  
pip install -r requirements.txt  # AI dependencies  
npm install  # Frontend dependencies  
