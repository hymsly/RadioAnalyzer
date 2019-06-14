import pandas as pd
import os
from pydub import AudioSegment

excelfile = 'divisiones.xlsx'

df = pd.read_excel(excelfile,headers=None)

for index,row in df.iterrows():
    cantidadSplit = row['cantidad']
    songfile = os.path.join('.\\audios\\DIVISIONES',row['folder'],row['audio'])+'.wav'
    song = AudioSegment.from_wav(songfile)
    largoTotal = len(song)
    largoUnitario = largoTotal//cantidadSplit + (largoTotal%cantidadSplit>0)
    for i in range(cantidadSplit):
        songSplitted = song[i*largoUnitario:(i+1)*largoUnitario]
        newfilename = row['folder']+'_'+row['audio']+'_'+str(i+1)+'.wav'
        print(newfilename)
        newfile = os.path.join('.\\audios\\data',newfilename)
        songSplitted.export(newfile)