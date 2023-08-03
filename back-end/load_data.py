import os
import json
import numpy as np
from PIL import Image
from tqdm import tqdm
from keras.utils import to_categorical
from sklearn.preprocessing import LabelEncoder, OneHotEncoder




def load_data(dataset_dir, image_dir, labels_dir, texture_dir, keypoints_dir, segm_dir, densepose_dir, image_size, batch_size):

    # Define the number of classes for each label type
    num_shape_classes = 6  # Update with the correct number of shape classes
    num_fabric_classes = 8  # Update with the correct number of fabric classes
    num_pattern_classes = 8  # Update with the correct number of pattern classes


    segm_labels_list = [
        'background', 'top', 'outer', 'skirt', 'dress', 'pants', 'leggings', 'headwear',
        'eyeglass', 'neckwear', 'belt', 'footwear', 'bag', 'hair', 'face', 'skin',
        'ring', 'wrist wearing', 'socks', 'gloves', 'necklace', 'rompers', 'earrings', 'tie'
    ]

    # Load labels for shape
    shape_labels_file = os.path.join(labels_dir, 'shape', 'shape_anno_all.txt')
    shape_label_data = {}
    with open(shape_labels_file, 'r') as f:
        for line in f:
            values = line.strip().split()
            img_name = values[0]
            shape_labels = [int(label) for label in values[1:]]
            shape_label_data[img_name] = shape_labels

    # Define the mapping for shape annotations
    shape_labels_mapping = {
        0: {
            0: 'sleeveless',
            1: 'short-sleeve',
            2: 'medium-sleeve',
            3: 'long-sleeve',
            4: 'not long-sleeve',
            5: 'NA'
        },
        1: {
            0: 'three-point',
            1: 'medium short',
            2: 'three-quarter',
            3: 'long',
            4: 'NA'
        },
        2: {
            0: 'no',
            1: 'socks',
            2: 'leggings',
            3: 'NA'
        },
        3: {
            0: 'no',
            1: 'yes',
            2: 'NA'
        },
        4: {
            0: 'no',
            1: 'eyeglasses',
            2: 'sunglasses',
            3: 'have a glasses in hand or clothes',
            4: 'NA'
        },
        5: {
            0: 'no',
            1: 'yes',
            2: 'NA'
        },
        6: {
            0: 'no',
            1: 'yes',
            2: 'NA'
        },
        7: {
            0: 'no',
            1: 'yes',
            2: 'NA'
        },
        8: {
            0: 'no',
            1: 'belt',
            2: 'have a clothing',
            3: 'hidden',
            4: 'NA'
        },
        9: {
            0: 'V-shape',
            1: 'square',
            2: 'round',
            3: 'standing',
            4: 'lapel',
            5: 'suspenders',
            6: 'NA'
        },
        10: {
            0: 'yes',
            1: 'no',
            2: 'NA'
        },
        11: {
            0: 'no',
            1: 'yes',
            2: 'NA'
        }
    }

    # Load labels for fabric
    fabric_labels_file = os.path.join(texture_dir, 'fabric_ann.txt')
    fabric_label_data = {}
    with open(fabric_labels_file, 'r') as f:
        for line in f:
            values = line.strip().split()
            img_name = values[0]
            fabric_labels = [int(label) for label in values[1:]]
            fabric_label_data[img_name] = fabric_labels

    # Define the mapping for fabric annotations
    fabric_labels_mapping = {
        0: 'denim',
        1: 'cotton',
        2: 'leather',
        3: 'furry',
        4: 'knitted',
        5: 'chiffon',
        6: 'other',
        7: 'NA'
    }

    # Load labels for pattern
    pattern_labels_file = os.path.join(texture_dir, 'pattern_ann.txt')
    pattern_label_data = {}
    with open(pattern_labels_file, 'r') as f:
        for line in f:
            values = line.strip().split()
            img_name = values[0]
            pattern_labels = [int(label) for label in values[1:]]
            pattern_label_data[img_name] = pattern_labels

    # Define the mapping for pattern annotations
    pattern_labels_mapping = {
        0: 'floral',
        1: 'graphic',
        2: 'striped',
        3: 'pure color',
        4: 'lattice',
        5: 'other',
        6: 'color block',
        7: 'NA'
    }

    # Load captions
    captions_file = os.path.join(dataset_dir, 'captions.json')
    with open(captions_file, 'r') as f:
        captions_data = json.load(f)

    captions = {}
    for image_filename, caption in captions_data.items():
        captions[image_filename] = caption

    keypoints_loc_file = os.path.join(keypoints_dir, 'keypoints_loc.txt')
    keypoints_vis_file = os.path.join(keypoints_dir, 'keypoints_vis.txt')

    keypoints_data = {}
    with open(keypoints_loc_file, 'r') as f_loc, open(keypoints_vis_file, 'r') as f_vis:
        for line_loc, line_vis in zip(f_loc, f_vis):
            values_loc = line_loc.strip().split()
            values_vis = line_vis.strip().split()
            img_name = values_loc[0]
            keypoints_loc = [float(coord) for coord in values_loc[1:]]
            keypoints_vis = [int(vis) for vis in values_vis[1:]]

            # Pad keypoints_loc and keypoints_vis with zeros to ensure the same length
            num_keypoints = 14  # Specify the desired number of keypoints
            keypoints_loc += [0.0] * (num_keypoints - len(keypoints_loc))
            keypoints_vis += [0] * (num_keypoints - len(keypoints_vis))

            keypoints_data[img_name] = {'loc': keypoints_loc, 'vis': keypoints_vis}

    # Lists to store file paths and labels
    image_paths = []
    segm_paths = []
    densepose_paths = []
    captions_list = []

    # Labels for different attributes
    shape_labels = []
    fabric_labels = []
    pattern_labels = []

    # Keypoints data
    keypoints_data_list = []

    # Annotations for shape, fabric, and pattern labels
    shape_annotations = []
    fabric_annotations = []
    pattern_annotations = []

    # Lists to store images and their corresponding segmentation labels
    images_batch = []
    segm_images_batch = []   # Store the processed segmentation images
    segm_labels_batch = []   # Store the segmentation labels


    for img_name in captions:
        image_path = os.path.join(image_dir, img_name.replace('.jpg', '') + '.jpg')
        segm_path = os.path.join(segm_dir, img_name.replace('.jpg', '') + '_segm.png')
        densepose_path = os.path.join(densepose_dir, img_name.replace('.jpg', '') + '_densepose.png')

        image_paths.append(image_path)
        segm_paths.append(segm_path)
        densepose_paths.append(densepose_path)

        shape_label = shape_label_data[img_name]
        fabric_label = fabric_label_data[img_name]
        pattern_label = pattern_label_data[img_name]
        keypoints_data_img = keypoints_data.get(img_name, {'loc': [], 'vis': []})['loc']
        caption = captions[img_name]

        shape_labels.append(shape_label)
        fabric_labels.append(fabric_label)
        pattern_labels.append(pattern_label)
        keypoints_data_list.append(keypoints_data_img)  # Changed variable name to keypoints_data_list
        captions_list.append(caption)
        shape_annotations.append([shape_labels_mapping[i][label] for i, label in enumerate(shape_label)])
        fabric_annotations.append([fabric_labels_mapping[label] for label in fabric_label])
        pattern_annotations.append([pattern_labels_mapping[label] for label in pattern_label])

    # Flatten the nested data structure
    flattened_shape_labels_mapping = {}
    for key, nested_dict in shape_labels_mapping.items():
        for sub_key, value in nested_dict.items():
            flattened_shape_labels_mapping[(key, sub_key)] = value

    # Convert values to integers using LabelEncoder
    label_encoder = LabelEncoder()
    encoded_labels = label_encoder.fit_transform(list(flattened_shape_labels_mapping.values()))

    # Reshape the encoded_labels to a 2D array with a single column
    encoded_labels = np.array(encoded_labels).reshape(-1, 1)

    # Apply OneHotEncoder
    onehot_encoder = OneHotEncoder(sparse_output=False)
    one_hot_encoded_labels = onehot_encoder.fit_transform(encoded_labels)

    # Calculate the number of batches and iterate over the data
    num_samples = len(image_paths)
    num_batches = (num_samples + batch_size - 1) // batch_size

    for batch_index in tqdm(range(num_batches), desc="Loading batches", leave=False):
        start_index = batch_index * batch_size
        end_index = min((batch_index + 1) * batch_size, num_samples)

        images_batch = []
        segm_images_batch = []   # Initialize an empty list to store the processed segmentation images for the batch
        segm_labels_batch = []   # Initialize an empty list to store the segmentation labels for the batch
        densepose_images_batch = []

        shape_labels_batch = shape_labels[start_index:end_index]
        fabric_labels_batch = fabric_labels[start_index:end_index]
        pattern_labels_batch = pattern_labels[start_index:end_index]
        keypoints_batch = keypoints_data_list[start_index:end_index]
        captions_batch = captions_list[start_index:end_index]
        shape_annotations_batch = shape_annotations[start_index:end_index]

        for img_path, segm_path, densepose_path in zip(image_paths[start_index:end_index], segm_paths[start_index:end_index], densepose_paths[start_index:end_index]):
            # Load and resize the image
            image = Image.open(img_path)
            image = image.resize(image_size)
            image = np.array(image) / 255.0
            images_batch.append(image)

            if segm_path and os.path.exists(segm_path):
                segm_image = Image.open(segm_path)
                segm_image = segm_image.resize(image_size)
                segm_image = np.array(segm_image)

                segm_image = np.zeros_like(segm_image, dtype=np.int32)
                for class_idx, class_name in enumerate(segm_labels_list):
                    class_mask = (segm_image.astype(int) == class_name)
                    segm_image[class_mask] = class_idx

                segm_labels_batch.append(segm_image)
            else:
                segm_labels_batch.append(np.zeros((image_size[0], image_size[1]), dtype=np.int32))  # Fill with zeros if segm_path is None or file does not exist

            # Append the preprocessed image to segm_images_batch
            segm_images_batch.append(image)

            # Load and resize the densepose image
            if densepose_path and os.path.exists(densepose_path):
                densepose_image = Image.open(densepose_path)
                densepose_image = densepose_image.resize(image_size)
                densepose_image = np.array(densepose_image)
            else:
                densepose_image = None

            densepose_images_batch.append(densepose_image)

        # Flatten the nested data structure
        flattened_shape_labels_mapping = {}
        for key, nested_dict in shape_labels_mapping.items():
            for sub_key, value in nested_dict.items():
                flattened_shape_labels_mapping[(key, sub_key)] = value

        # Convert shape labels to integer indices using LabelEncoder
        label_encoder = LabelEncoder()
        encoded_labels = label_encoder.fit_transform(list(flattened_shape_labels_mapping.values()))

        # Reshape the encoded_labels to a 2D array with a single column
        encoded_labels = np.array(encoded_labels).reshape(-1, 1)

        # Apply OneHotEncoder
        onehot_encoder = OneHotEncoder(sparse_output=False)
        one_hot_encoded_labels = onehot_encoder.fit_transform(encoded_labels)

    # Calculate the number of batches and iterate over the data
    num_samples = len(image_paths)
    num_batches = (num_samples + batch_size - 1) // batch_size

    for batch_index in tqdm(range(num_batches), desc="Loading batches", leave=False):
        start_index = batch_index * batch_size
        end_index = min((batch_index + 1) * batch_size, num_samples)

        images_batch = []
        segm_images_batch = []   # Initialize an empty list to store the processed segmentation images for the batch
        segm_labels_batch = []   # Initialize an empty list to store the segmentation labels for the batch
        densepose_images_batch = []

        shape_annotations_batch = shape_annotations[start_index:end_index]
        fabric_labels_batch = fabric_labels[start_index:end_index]
        pattern_labels_batch = pattern_labels[start_index:end_index]
        keypoints_batch = keypoints_data_list[start_index:end_index]
        captions_batch = captions_list[start_index:end_index]
        shape_annotations_batch = shape_annotations[start_index:end_index]

        for img_path, segm_path, densepose_path in zip(image_paths[start_index:end_index], segm_paths[start_index:end_index], densepose_paths[start_index:end_index]):
            # Load and resize the image
            image = Image.open(img_path)
            image = image.resize(image_size)
            image = np.array(image) / 255.0
            images_batch.append(image)

            if segm_path and os.path.exists(segm_path):
                segm_image = Image.open(segm_path)
                segm_image = segm_image.resize(image_size)
                segm_image = np.array(segm_image)

                segm_image = np.zeros_like(segm_image, dtype=np.int32)
                for class_idx, class_name in enumerate(segm_labels_list):
                    class_mask = (segm_image == class_name)
                    segm_image[class_mask] = class_idx

                segm_labels_batch.append(segm_image)
            else:
                segm_labels_batch.append(np.zeros((image_size[0], image_size[1]), dtype=np.int32))  # Fill with zeros if segm_path is None or file does not exist

            # Append the preprocessed image to segm_images_batch
            segm_images_batch.append(image)

            # Load and resize the densepose image
            if densepose_path and os.path.exists(densepose_path):
                densepose_image = Image.open(densepose_path)
                densepose_image = densepose_image.resize(image_size)
                densepose_image = np.array(densepose_image)
            else:
                densepose_image = None

            densepose_images_batch.append(densepose_image)

        # List to store one-hot encoded representations for each inner list in fabric_labels_batch
        fabric_annotations_batch_one_hot = []

        # Convert each inner list of integers to one-hot encoded representations for fabric annotations
        for labels in fabric_labels_batch:
            one_hot_labels = to_categorical(labels, num_classes=num_fabric_classes)
            fabric_annotations_batch_one_hot.append(one_hot_labels)

        # List to store one-hot encoded representations for each inner list in pattern_labels_batch
        pattern_annotations_batch_one_hot = []

        # Convert each inner list of integers to one-hot encoded representations for pattern annotations
        for labels in pattern_labels_batch:
            one_hot_labels = to_categorical(labels, num_classes=num_pattern_classes)
            pattern_annotations_batch_one_hot.append(one_hot_labels)

        # Process shape annotations using shape_labels_batch
        shape_annotations_batch_one_hot = []
        for annotations in shape_annotations_batch:
            annotations_array = np.array(annotations)  # Convert the list to a numpy array
            annotations_indices = label_encoder.transform(annotations_array)  # Convert annotations to integer indices
            annotations_one_hot = one_hot_encoded_labels[annotations_indices].sum(axis=0, keepdims=True)
            shape_annotations_batch_one_hot.append(annotations_one_hot)

        # Process segmentation labels (segm_images_batch)
        segm_images_batch_processed = []
        for segm_image in segm_labels_batch:
            if segm_image is not None and isinstance(segm_image, np.ndarray) and segm_image.size > 0:
                segm_image = segm_image.astype(np.uint8)  # Convert to uint8 to ensure Image.fromarray works correctly
                segm_image = Image.fromarray(segm_image)
                segm_image = segm_image.resize(image_size)
                segm_image = np.array(segm_image)
            else:
                segm_image = np.zeros((image_size[0], image_size[1], 3), dtype=np.uint8)

            segm_images_batch_processed.append(segm_image)

        yield [
            np.array(images_batch),
            np.array(shape_annotations_batch_one_hot),
            np.array(fabric_annotations_batch_one_hot),
            np.array(pattern_annotations_batch_one_hot),
            np.array(keypoints_batch, dtype=object),
            np.array(captions_batch),
            np.array(segm_images_batch_processed),
            np.array(densepose_images_batch),
            np.array(shape_annotations_batch),
            np.array(fabric_labels_batch),
            np.array(fabric_labels_batch)
        ]




