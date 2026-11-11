import torch
import torch.nn as nn
from torchvision.models import resnet18

PATH = "HemavisionModel/hemavision_resnet18_v1_best.pth"

def load_model():
    # Load the trained checkpoint onto the CPU
    checkpoint = torch.load(
        PATH,
        map_location="cpu",
        weights_only=True
    )

    # Create resnet and adjust the final layers for blood cell classes
    model = resnet18(weights=None)
    model.fc = nn.Linear(model.fc.in_features, len(checkpoint["class_names"]))

    # Loads the trained weights
    model.load_state_dict(checkpoint["model_state_dict"])

    # Set Model to evaluation mode for preditions
    model.eval()

    return model, checkpoint["class_names"]

