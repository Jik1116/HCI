import tensorflow as tf
from keras.models import Model
from keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Input, LSTM, Embedding, concatenate

def create_model(input_shape_image, max_caption_length, vocab_size, embedding_dim, num_integer_features, num_classes):
    # Image input
    image_input = Input(shape=input_shape_image)
    conv1 = Conv2D(32, (3, 3), activation='relu')(image_input)
    maxpool1 = MaxPooling2D((2, 2))(conv1)
    conv2 = Conv2D(64, (3, 3), activation='relu')(maxpool1)
    maxpool2 = MaxPooling2D((2, 2))(conv2)
    conv3 = Conv2D(128, (3, 3), activation='relu')(maxpool2)
    maxpool3 = MaxPooling2D((2, 2))(conv3)
    flatten = Flatten()(maxpool3)

    # Text input
    text_input = Input(shape=(max_caption_length,))
    embedding = Embedding(vocab_size, embedding_dim)(text_input)
    lstm = LSTM(64)(embedding)

    # Integer input
    integer_input = Input(shape=(num_integer_features,))

    # Concatenate all inputs
    concatenated = concatenate([flatten, lstm, integer_input])

    # Add dense layers for classification
    dense1 = Dense(64, activation='relu')(concatenated)
    output = Dense(num_classes, activation='softmax')(dense1)

    # Create the model
    model = Model(inputs=[image_input, text_input, integer_input], outputs=output)

    return model
