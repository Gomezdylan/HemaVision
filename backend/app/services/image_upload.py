import io
import base64
import numpy as np

from fastapi import HTTPException
from PIL import Image, UnidentifiedImageError

# Validates and decodes uploaded image bytes into a PIL Image.
def validate_image(image_bytes: bytes, content_type: str):

# Check the declared file type
    if content_type not in ("image/jpeg", "image/png"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a JPG or PNG image."
        )

    # Check that the image can actually be decoded
    try:
        img = Image.open(io.BytesIO(image_bytes))

        if img.format not in ("JPEG", "PNG"):
            raise HTTPException(
                status_code=400,
                detail="Image contents must be JPG or PNG."
            )

        img.load()

    except (UnidentifiedImageError, OSError, ValueError):
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is not a valid image."
        )
    return True

# Convert the generated heatmap into a base64 PNG
def image_to_base64_png(img_array: np.ndarray) -> str:
    """Convert a uint8 RGB numpy array into a base64 PNG data URL the browser can render directly."""
    pil_img = Image.fromarray(img_array)
    buf = io.BytesIO()
    pil_img.save(buf, format="PNG")
    encoded = base64.b64encode(buf.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{encoded}"