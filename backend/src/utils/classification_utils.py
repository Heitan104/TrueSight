import numpy as np

def calc_vid_fconf(results: list[float], real_threshold=0.6, fake_threshold=0.4 -> dict):
    
    confidences = np.array(results)
    
    avg_conf = np.mean(confidences)
    median_conf = np.median(confidences)
    variance = np.var(confidences)
    min_conf = np.min(confidences)

    reasoning = []
    if min_conf < 0.2:
        label = 'generated'
        
    return {
        'avg_conf': avg_conf,
        'median_conf': median_conf,
        'variance': variance
    }
        
