#!/usr/bin/python
from urllib import request
import time
import os
import sys

HOUR = 60
MINUTE = 60
URL_RPP = "https://18493.live.streamtheworld.com/RADIO_RPP.mp3"
URL_MODA = "https://18303.live.streamtheworld.com/CRP_MOD.mp3"
##CONNECTOR A LA RADIO

##file
directory = os.path.dirname(os.path.abspath(__file__))
folder ='audios'
fileName = 'MODA' + time.strftime("%Y%m%d%H%M%S",time.localtime())+".wav"
#fileName = sys.argv[1] + '.wav'
filePath = os.path.join(directory,folder,fileName)
#print(filePath)

f = open(filePath, 'wb')
start_time_in_seconds = time.time()
###time in seconds
time_limit = 45*MINUTE
block_size = 1024
print("Recording...")
response = request.urlopen(URL_MODA)
#print(time.perf_counter())
time_start = time.time()
while time.time() < time_start +  time_limit :
    buffer = response.read(block_size)
    if not buffer:
        print('error',time.time())
        continue
    f.write(buffer)
print("Fin grabacion")
print("file is at ...",filePath)
f.close()
sys.stdout.flush()
