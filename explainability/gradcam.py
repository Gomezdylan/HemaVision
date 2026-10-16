"""
Grad-CAM heatmap generation.

This is the module version of the Colab Cell 5 logic — extracted into a
plain function so it can be imported by the FastAPI backend (or anything
else) instead of living only in a notebook.
"""

from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget


def generate_heatmap(model, input_tensor, target_layers, target_class=None):
    """
    Run Grad-CAM against a model and return a grayscale importance map.

    model: a PyTorch model in eval() mode
    input_tensor: preprocessed input, shape (1, C, H, W)
    target_layers: list of layer(s) to hook, e.g. [model.layer4[-1]]
    target_class: class index to explain. If None, Grad-CAM explains
                  whichever class the model scored highest.

    Returns: a 2D numpy array (grayscale CAM), same spatial size as the
             input image, with values in [0, 1].
    """
    targets = [ClassifierOutputTarget(target_class)] if target_class is not None else None

    with GradCAM(model=model, target_layers=target_layers) as cam:
        grayscale_cam = cam(input_tensor=input_tensor, targets=targets)[0]

    return grayscale_cam
