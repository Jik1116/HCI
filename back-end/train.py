import os
from load_data import load_data
from model import create_model
from keras.utils import to_categorical
import numpy as np
import numpy as np
from PIL import Image

# Set your dataset, image, labels, texture, keypoints, segm, and DensePose directories
dataset_dir = r'C:\Users\midni\Desktop\School\SUTD\Term 5\HCI\Fashion-Database'
image_dir = r'C:\Users\midni\Desktop\School\SUTD\Term 5\HCI\Fashion-Database\images'
labels_dir = os.path.join(dataset_dir, 'labels')
texture_dir = os.path.join(labels_dir, 'texture')
keypoints_dir = os.path.join(dataset_dir, 'keypoints')
segm_dir = os.path.join(dataset_dir, 'segm')
densepose_dir = os.path.join(dataset_dir, 'densepose')

batch_size = 32  # Set your desired batch size
image_size = (128, 128)  # Set your desired image size

# Load data
data_gen = load_data(dataset_dir, image_dir, labels_dir, texture_dir, keypoints_dir, segm_dir, densepose_dir, image_size, batch_size)

def data_generator(data_gen):
    while True:
        try:
            data = next(data_gen)
            images_batch = data[0]
            shape_labels_batch = data[1][0]
            fabric_labels_batch = data[1][1]
            pattern_labels_batch = data[1][2]
            keypoints_batch = data[1][3]
            captions_batch = data[1][4]
            segm_batch = data[1][5]
            densepose_batch = data[1][6]
            shape_annotations_batch = data[1][7]
            fabric_annotations_batch = data[1][8]
            pattern_annotations_batch = data[1][9]

            num_samples = len(images_batch)
            num_batches = (num_samples + batch_size - 1) // batch_size

            for batch_index in range(num_batches):
                start_index = batch_index * batch_size
                end_index = min((batch_index + 1) * batch_size, num_samples)

                images_batch_batch = images_batch[start_index:end_index]
                shape_labels_batch_batch = shape_labels_batch[start_index:end_index]
                fabric_labels_batch_batch = fabric_labels_batch[start_index:end_index]
                pattern_labels_batch_batch = pattern_labels_batch[start_index:end_index]
                keypoints_batch_batch = keypoints_batch[start_index:end_index]
                segm_batch_batch = segm_batch[start_index:end_index]
                densepose_batch_batch = densepose_batch[start_index:end_index]
                shape_annotations_batch_batch = shape_annotations_batch[start_index:end_index]
                fabric_annotations_batch_batch = fabric_annotations_batch[start_index:end_index]
                pattern_annotations_batch_batch = pattern_annotations_batch[start_index:end_index]

                yield images_batch_batch, [
                    shape_labels_batch_batch,
                    fabric_labels_batch_batch,
                    pattern_labels_batch_batch,
                    keypoints_batch_batch,
                    captions_batch,
                    segm_batch_batch,
                    densepose_batch_batch,
                    shape_annotations_batch_batch,
                    fabric_annotations_batch_batch,
                    pattern_annotations_batch_batch
                ]
        except StopIteration:
            print("Reached the end of the data.")
            data_gen = load_data(dataset_dir, image_dir, labels_dir, texture_dir, keypoints_dir, segm_dir, densepose_dir, image_size, batch_size)


# Create the model
model = create_model()

# Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Train the model using the data generator
steps_per_epoch = 0
for _ in data_gen:
    steps_per_epoch += 1

print("Steps per epoch:", steps_per_epoch)

data_gen = data_generator(data_gen)

for epoch in range(10):
    print("Epoch:", epoch+1)
    for batch_index in range(steps_per_epoch):
        print("Batch:", batch_index+1)
        images, labels = next(data_gen)

        # Convert labels to a list of one-hot encoded vectors
        labels = [to_categorical(label, num_classes=12) for label_list in labels for label in label_list if np.logical_and(label >= 0, label < 12).all() & np.issubdtype(label.dtype, np.number)]

        # Convert the list of one-hot encoded labels to a NumPy array
        labels = np.array(labels, dtype=np.float32)

        # Train the model on batch
        model.train_on_batch(images, labels)

# Save the trained model
model.save('trained_model.h5')
