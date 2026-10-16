"""
Heatmap overlay rendering — blends a Grad-CAM map onto the original image.
"""

import numpy as np
from pytorch_grad_cam.utils.image import show_cam_on_image


def overlay_heatmap(rgb_img, grayscale_cam):
    """
    rgb_img: numpy array, RGB, values in [0, 1], shape (H, W, 3)
    grayscale_cam: 2D numpy array from generate_heatmap(), values in [0, 1]

    Returns: a uint8 RGB numpy array (H, W, 3) — the original image with
             the heatmap blended on top, ready to save as a PNG.
    """
    return show_cam_on_image(rgb_img.astype(np.float32), grayscale_cam, use_rgb=True)
