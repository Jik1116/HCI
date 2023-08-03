from sklearn.preprocessing import LabelEncoder, OneHotEncoder
import numpy as np

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
onehot_encoder = OneHotEncoder(sparse=False)
one_hot_encoded_labels = onehot_encoder.fit_transform(encoded_labels)

# Now you have the one-hot encoded labels for your nested data
print(one_hot_encoded_labels)
