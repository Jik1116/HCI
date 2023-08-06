import io
from transformers import pipeline
from PIL import Image
from google.cloud import storage
import os

# Initialize the image-to-text pipeline
image_to_text = pipeline("image-to-text", model="nlpconnect/vit-gpt2-image-captioning")

# Initialize GCS client
storage_client = storage.Client()

# Replace with your GCS bucket name
bucket_name = "sparkstyle.appspot.com"

# Function to caption an image and return the result
def get_image_caption(image_data):
    image = Image.open(io.BytesIO(image_data))
    result = image_to_text(image)
    return result[0]['generated_text']

# Function to process all images in the root directory of the bucket
def process_images_in_bucket(bucket_name):
    # List all objects in the bucket
    bucket = storage_client.bucket(bucket_name)
    blobs = list(bucket.list_blobs())

    for blob in blobs:
        file_name = os.path.basename(blob.name)
        if file_name.endswith(".jpg") or file_name.endswith(".png"):
            try:
                # Download the image as bytes directly
                image_data = blob.download_as_bytes()

                # Get the caption for the image
                caption = get_image_caption(image_data)

                # Load existing metadata from customData or initialize as empty dictionary
                metadata = blob.metadata
                if metadata is None:
                    metadata = {}

                # Check if 'caption' key already exists in metadata
                if 'caption' in metadata:
                    continue  # Skip further processing for this image

                # Add the caption to the metadata
                metadata["caption"] = caption

                # Update the metadata in the blob
                blob.metadata = metadata
                blob.patch()

            except Exception as e:
                print(f"Error processing image {file_name}: {e}")

# Process all images in the root folder of the bucket
process_images_in_bucket(bucket_name)
