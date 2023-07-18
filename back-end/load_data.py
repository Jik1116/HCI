import os
import json
import numpy as np
from PIL import Image

def load_data(dataset_dir, image_dir, labels_dir, texture_dir, keypoints_dir, segm_dir, densepose_dir, image_size, batch_size):
    segm_labels = [
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

    image_paths = []
    shape_labels = []
    fabric_labels = []
    pattern_labels = []
    keypoints = []
    segm_paths = []
    densepose_paths = []
    captions_list = []
    shape_annotations = []
    fabric_annotations = []
    pattern_annotations = []

    for img_name in captions:
        image_path = os.path.join(image_dir, img_name.replace('.jpg', '') + '.jpg')
        segm_path = os.path.join(segm_dir, img_name.replace('.jpg', '') + '_segm.png')
        densepose_path = os.path.join(densepose_dir, img_name.replace('.jpg', '') + '_densepose.png')

        if os.path.exists(segm_path):  # Check if segm file exists
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
            keypoints.append(keypoints_data_img)
            captions_list.append(caption)
            shape_annotations.append([shape_labels_mapping[i][label] for i, label in enumerate(shape_label)])
            fabric_annotations.append([fabric_labels_mapping[label] for label in fabric_label])
            pattern_annotations.append([pattern_labels_mapping[label] for label in pattern_label])

    num_samples = len(image_paths)
    num_batches = (num_samples + batch_size - 1) // batch_size

    for batch_index in range(num_batches):
        start_index = batch_index * batch_size
        end_index = min((batch_index + 1) * batch_size, num_samples)

        images_batch = []
        shape_labels_batch = shape_labels[start_index:end_index]
        fabric_labels_batch = fabric_labels[start_index:end_index]
        pattern_labels_batch = pattern_labels[start_index:end_index]
        keypoints_batch = keypoints[start_index:end_index]
        segm_batch = segm_paths[start_index:end_index]
        densepose_batch = densepose_paths[start_index:end_index]
        captions_batch = captions_list[start_index:end_index]
        shape_annotations_batch = shape_annotations[start_index:end_index]
        fabric_annotations_batch = fabric_annotations[start_index:end_index]
        pattern_annotations_batch = pattern_annotations[start_index:end_index]

        segm_images_batch = []
        densepose_images_batch = []

        for segm_path, densepose_path in zip(segm_batch, densepose_batch):
            if segm_path:
                segm_image = Image.open(segm_path)
                segm_image = np.array(segm_image)
            else:
                segm_image = None

            if densepose_path:
                densepose_image = Image.open(densepose_path)
                densepose_image = np.array(densepose_image)
            else:
                densepose_image = None

            segm_images_batch.append(segm_image)
            densepose_images_batch.append(densepose_image)

        for img_pixels in image_paths[start_index:end_index]:
            image = Image.open(img_pixels)
            image = image.resize(image_size)
            image = np.array(image) / 255.0
            images_batch.append(image)

        yield np.array(images_batch), [
            np.array(shape_labels_batch),
            np.array(fabric_labels_batch),
            np.array(pattern_labels_batch),
            np.array(keypoints_batch, dtype=object),
            np.array(captions_batch),
            np.array(segm_images_batch, dtype=object),
            np.array(densepose_images_batch, dtype=object),
            np.array(shape_annotations_batch),
            np.array(fabric_annotations_batch),
            np.array(pattern_annotations_batch)
        ]
