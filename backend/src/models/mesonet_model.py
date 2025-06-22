from keras.models import Model
from keras.layers import Input, Conv2D, BatchNormalization, MaxPooling2D, Flatten, Dropout, Dense, LeakyReLU
from keras.optimizers import Adam

IMGWIDTH = 256

class Meso4:
    def __init__(self, learning_rate=0.001):
        self.model = self.init_model()
        self.model.compile(optimizer=Adam(learning_rate), loss='mean_squared_error', metrics=['accuracy'])

    def init_model(self):
        x = Input(shape=(IMGWIDTH, IMGWIDTH, 3))
        x = Conv2D(8, (3, 3), padding='same', activation='relu')(x)
        x = BatchNormalization()(x)
        x = MaxPooling2D(pool_size=(2, 2), padding='same')(x)

        x = Conv2D(8, (5, 5), padding='same', activation='relu')(x)
        x = BatchNormalization()(x)
        x = MaxPooling2D(pool_size=(2, 2), padding='same')(x)

        x = Conv2D(16, (5, 5), padding='same', activation='relu')(x)
        x = BatchNormalization()(x)
        x = MaxPooling2D(pool_size=(2, 2), padding='same')(x)

        x = Conv2D(16, (5, 5), padding='same', activation='relu')(x)
        x = BatchNormalization()(x)
        x = MaxPooling2D(pool_size=(4, 4), padding='same')(x)

        y = Flatten()(x)
        y = Dropout(0.5)(y)
        y = Dense(16)(y)
        y = LeakyReLU(0.1)(y)
        y = Dropout(0.5)(y)
        y = Dense(1, activation='sigmoid')(y)

        return Model(inputs=x, outputs=y)

    def load_weights(self, path):
        self.model.load_weights(path)

    def predict(self, img_array):
        return self.model.predict(img_array)
