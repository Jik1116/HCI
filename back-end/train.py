import os
import numpy as np
from tqdm import tqdm
from model import create_model
from load_data import load_data  # Import the load_data function

# Set your dataset, image, labels, texture, keypoints, segm, and DensePose directories
dataset_dir = r'C:\Users\midni\Desktop\School\SUTD\Term 5\HCI\Fashion-Database'
image_dir = r'C:\Users\midni\Desktop\School\SUTD\Term 5\HCI\Fashion-Database\images'
labels_dir = os.path.join(dataset_dir, 'labels')
texture_dir = os.path.join(labels_dir, 'texture')
keypoints_dir = os.path.join(dataset_dir, 'keypoints')
segm_dir = os.path.join(dataset_dir, 'segm')
densepose_dir = os.path.join(dataset_dir, 'densepose')

batch_size = 8  # Set your desired batch size
image_size = (128, 128)  # Set your desired image size

input_shape_image = (128, 128, 3)
max_caption_length = 50
vocab_size = 10000
embedding_dim = 100
num_integer_features = 5
num_classes = 12

model = create_model(input_shape_image, max_caption_length, vocab_size, embedding_dim, num_integer_features, num_classes)

# Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Train the model using the data generator
epochs = 30
for epoch in range(epochs):
    print("Epoch:", epoch + 1)
    data_gen = load_data(dataset_dir, image_dir, labels_dir, texture_dir, keypoints_dir, segm_dir, densepose_dir, image_size, batch_size)
    with tqdm(desc=f"Epoch {epoch + 1}/{epochs}", unit="batch") as pbar_epoch:
        for batch_index, data in enumerate(data_gen):
            print("Batch:", batch_index + 1)

            images_batch = np.array(data[0])
            shape_annotations_batch_one_hot = data[1]
            fabric_annotations_batch_one_hot = data[2]
            pattern_annotations_batch_one_hot = data[3]
            keypoints_batch = np.array(data[4], dtype=np.float32)
            captions_batch = np.array(data[5], dtype=object)
            segm_images_batch = np.array(data[6])  # Use the processed segm_images_batch
            densepose_images_batch = np.array(data[7])
            shape_annotations_batch = data[8]
            fabric_labels_batch = data[9]
            pattern_labels_batch = data[10]

            model.train_on_batch(
                [images_batch, captions_batch, keypoints_batch],
                [shape_annotations_batch_one_hot, fabric_annotations_batch_one_hot, pattern_annotations_batch_one_hot, segm_images_batch]
            )

            pbar_epoch.update(1)

# Save the final trained model to disk
model.save('trained_model_final.h5')
# Optionally, you can also save the model's architecture and weights separately:
# Save model architecture as JSON
model_json = model.to_json()
with open('trained_model_final.json', 'w') as json_file:
    json_file.write(model_json)

# Save the final trained model to disk
model.save('trained_model_final.h5')
# Optionally, you can also save the model's architecture and weights separately:
# Save model architecture as JSON
model_json = model.to_json()
with open('trained_model_final.json', 'w') as json_file:
    json_file.write(model_json)
