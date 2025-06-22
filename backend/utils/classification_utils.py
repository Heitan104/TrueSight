import numpy as np

def calc_vid_fconf(results: list[float], real_threshold=0.6, fake_threshold=0.4) -> dict:
    
    results_np = np.array(results)
    
    avg_conf = np.mean(results_np)
    median_conf = np.median(results_np)
    variance = np.var(results_np)
    min_conf = np.min(results_np)
    
    weights = 1 - results_np
    # Prevent ZeroDivisionError by checking if sum of weights is zero
    if np.sum(weights) == 0:
        weighted_avg = avg_conf.item()
    else:
        weighted_avg = np.average(results_np, weights=weights)
        weighted_avg = round(weighted_avg.item(), 3)

    reasons = []
    fake = False
    if min_conf < 0.2:
        label = 'generated'
        fake = True
        reasons.append('At least one frame has a very low confidence score, indicating it is likely generated.')
    if weighted_avg < fake_threshold:
        label = 'generated'
        fake = True
        reasons.append(f'Weighted avg below {fake_threshold}.')
    if median_conf < fake_threshold:
        label = 'generated'
        fake = True
        reasons.append(f'Median confidence below {fake_threshold}.')
    if variance > 0.02 and min_conf < 0.3:
        label = "generated"
        fake = True
        reasons.append("High variance and some very fake frames detected")

    if not fake and (weighted_avg > real_threshold):
        label = 'real'
        reasons.append(f'Average confidence above {real_threshold}.')
    if not fake and label != 'real':
        label = 'uncertain'
        reasons.append('Confidence scores do not clearly indicate real or generated.')
        
    return {
        'probability': label,
        'reasoning': reasons,
        'percent_real': weighted_avg
    }
        
