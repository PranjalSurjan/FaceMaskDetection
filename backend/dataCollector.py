from fastapi import FastAPI, File, UploadFile
import cv2
import numpy as np

app = FastAPI()

@app.post("/detect-mask/")
async def detect_mask(file: UploadFile = File(...)):
    contents = await file.read()
    npimg = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    # TODO: add your face mask detection here
    # For now, dummy response:
    return {"mask_detected": True, "confidence": 0.95}
