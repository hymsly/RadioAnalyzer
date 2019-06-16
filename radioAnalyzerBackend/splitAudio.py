import pandas as pd
import os
from pydub import AudioSegment
import sys

filename = sys.argv[1]
cantidadSplit = sys.argv[2]

directory = os.path.join(os.getcwd(),filename)

if not os.path.exists(directory):
    os.makedirs(directory)

songfile = os.path.join(os.getcwd(),'audios',filename)+'.wav'
print(songfile)
song = AudioSegment.from_wav(songfile)
print(song[:5])
largoTotal = len(song)
largoUnitario = largoTotal//cantidadSplit + (largoTotal%cantidadSplit>0)
for i in range(cantidadSplit):
        songSplitted = song[i*largoUnitario:(i+1)*largoUnitario]
        newfilename = str(i+1)+'.wav'
        newfile = os.path.join(directory,newfilename)
        songSplitted.export(newfile)

sys.stdout.flush()