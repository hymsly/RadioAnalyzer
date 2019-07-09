
from PIL import Image
from os import listdir
from os.path import isfile, join
import cv2 as cv
import numpy as np
from matplotlib import pyplot as plt

class Binarizador:
    
    def setFilename(self,filename):
        self.filename = filename
    def readImageColor(self):
        return cv.imread('muestra/'+self.filename)
    def escalaGrises(self,fotoColor):
        return cv.cvtColor(fotoColor, cv.COLOR_BGR2GRAY) 
    def binaryImage(self,fotoGris):
        nueva_imagen = cv.adaptiveThreshold(fotoGris,255,cv.ADAPTIVE_THRESH_GAUSSIAN_C,cv.THRESH_BINARY_INV,11,2)
        return nueva_imagen
    def saveBinaryImage(self,fotoBinaria):
        cv.imwrite('Binario/'+self.filename,fotoBinaria)
    def closeImage(self):
        cv.destroyAllWindows()
    def binarizar(self):
        foto = self.readImageColor()
        fotoGris = self.escalaGrises(foto)
        fotoBinaria = self.binaryImage(fotoGris)
        self.saveBinaryImage(fotoBinaria)
        self.closeImage()


images = [f for f in listdir('muestra') if isfile(join('muestra', f))]

binarizer = Binarizador()

for image in images:
    print(image)
    binarizer.setFilename(image)
    binarizer.binarizar()