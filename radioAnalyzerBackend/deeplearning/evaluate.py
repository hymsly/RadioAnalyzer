from keras.models import model_from_json
from sklearn.preprocessing import LabelEncoder
import os
import librosa
import numpy as np
####OPENING MODEL####
json_file = open("model.json",'r')
loaded_model_jon = json_file.read()
json_file.close()
loaded_model = model_from_json(loaded_model_jon)

loaded_model.load_weights("model.h5")

loaded_model.compile(loss='categorical_crossentropy', metrics=['accuracy'], optimizer='adam')

N_FCC = 100
def feature(file):
    file_name = os.path.join('../audios',file+'.wav')
    try:
        X, sample_rate = librosa.load(file_name, res_type='kaiser_fast')
        mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=N_FCC).T,axis=0) 
    except Exception as e:
        print("Error encountered while parsing file: ", e)
        return None
 
    feature = mfccs
    return feature

X = np.array([feature("20194402134438")])
#print(type(X))
encoder = LabelEncoder()
encoder.classes_ = np.load('classes.npy')
y = loaded_model.predict_classes(X)
y_class = encoder.inverse_transform(y)
print(y_class)
