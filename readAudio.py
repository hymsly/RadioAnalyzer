import numpy as np
import pandas as pd
import librosa
import librosa.display
import matplotlib.pyplot as plt

slogan1 ='D:/UNI/IA/RadioAnalyzer/radioAnalyzerBackend/audios/20190415210745-A-Slogan1.wav'
slogan2 ='D:/UNI/IA/RadioAnalyzer/radioAnalyzerBackend/audios/20190415210745-A-Slogan2.wav'
noslogan1 ='D:/UNI/IA/RadioAnalyzer/radioAnalyzerBackend/audios/20190415210745-A-Narracion.wav'


def show(file):
    #plt.figure(figsize=(10, 4))
    data, sample_rate = librosa.core.load(file)
    #librosa.display.waveplot(data, sr=sample_rate)
    mfccs = np.mean(librosa.feature.mfcc(y=data, sr=sample_rate, n_mfcc=10).T,axis=0) 
    plt.plot(mfccs)
    
train = pd.read_csv('D:/UNI/IA/RadioAnalyzer/train.csv')

def parser(row):
    file_name = 'D:/UNI/IA/RadioAnalyzer/train/'+str(row.ID)+'.wav'
    try:
        X, sample_rate = librosa.load(file_name, res_type='kaiser_fast')
        mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=100).T,axis=0) 
    except Exception as e:
        print("Error encountered while parsing file: ", e)
        return None
 
    feature = mfccs
    return feature

train['feature'] = train.apply(lambda row:parser(row),axis=1)


from sklearn.preprocessing import LabelEncoder
from keras.models import Sequential
from keras.layers import Dense, Dropout, Activation
from keras.utils import np_utils

X = np.array(train.feature.tolist())
Y = np.array(train.Class.tolist())

lb = LabelEncoder()

y = np_utils.to_categorical(lb.fit_transform(Y))


num_labels = y.shape[1]
filter_size = 2

# build model
model = Sequential()

model.add(Dense(256, input_shape=(100,)))
model.add(Activation('relu'))
model.add(Dropout(0.5))

model.add(Dense(256))
model.add(Activation('relu'))
model.add(Dropout(0.5))

model.add(Dense(num_labels))
model.add(Activation('softmax'))

model.compile(loss='categorical_crossentropy', metrics=['accuracy'], optimizer='adam')

model.fit(X, y, batch_size=32, epochs=5)

test = pd.read_csv('D:/UNI/IA/RadioAnalyzer/test.csv')

def parser2(row):
    file_name = 'D:/UNI/IA/RadioAnalyzer/test/'+str(row.ID)+'.wav'
    try:
        X, sample_rate = librosa.load(file_name, res_type='kaiser_fast')
        mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=100).T,axis=0) 
    except Exception as e:
        print("Error encountered while parsing file: ", e)
        return None
 
    feature = mfccs
    return feature
test['feature'] = test.apply(lambda row:parser2(row),axis=1)

test_X = np.array(test.feature.tolist())
test_Y = model.predict_classes(test_X)
test_Y_class = lb.inverse_transform(test_Y)
test['Class'] = test_Y_class
test = test.drop('feature',axis=1)
test.to_csv("D:/UNI/IA/RadioAnalyzer/out2.csv", index=False)
