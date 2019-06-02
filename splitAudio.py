from pydub import AudioSegment
import os
from os import listdir
from os.path import isfile, join

class Splitting:
    fileCruda = ""
    songfile = ""
    duracion = 0
    song = []
    GOAL = 4000
    divisiones = 0
    duracionPorParte = 0
    subfolder = 'noslogan'
    directory = "D:/UNI/IA/SOFTBOT/tocut"
    def isSlogan(self):
        idx = self.songfile.lower().find('noslogan')
        if(idx!=-1):
            return False
        return True

    def setFile(self,file):
        self.fileCruda = file
        self.songfile = os.path.join(directory,self.fileCruda)
        self.song = AudioSegment.from_wav(self.songfile)
        self.duracion = len(self.song)
        resto = self.duracion%self.GOAL

        self.divisiones = self.duracion // self.GOAL
        if(resto >= 3*self.GOAL/4):
            self.divisiones+=1

        self.duracionPorParte = self.duracion // self.divisiones
        if(self.isSlogan()):
            self.subfolder = 'slogan'
        else:
            self.subfolder = 'noslogan'

    def split(self):
        print(self.directory)
        print(self.subfolder)
        currentDirectory = os.path.join(self.directory,self.subfolder)
        print(currentDirectory)
        for i in range(self.divisiones):
            currentParte = self.song[i*self.duracionPorParte:(i+1)*self.duracionPorParte]
            newfile = os.path.join(currentDirectory ,self.fileCruda.split('.')[0]+str(i) + '.wav')
            currentParte.export(newfile)

directory = "D:/UNI/IA/SOFTBOT/tocut"
onlyfiles = [f for f in listdir(directory) if isfile(join(directory, f))]

folderOutput = "D:/UNI/IA/SOFTBOT/tocut"
for file in onlyfiles:
    print(file)
    obj = Splitting()
    obj.setFile(file)
    obj.split()