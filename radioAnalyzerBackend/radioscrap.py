#!/usr/bin/python
from urllib import request
import time
import os
import sys

HOUR = 60*60
MINUTE = 60
##CONNECTOR A LA RADIO

##file
directory = os.path.dirname(os.path.abspath(__file__))
folder ='audios'
fileName = sys.argv[1] + '.wav'
filePath = os.path.join(directory,folder,fileName)

##url de radio
URL = sys.argv[2]

##margen de error
error = 0
if("RADIO_RPP" in URL):
    error =10
else:
    error = 45

##time in seconds
time_limit = int(sys.argv[3])*HOUR + int(sys.argv[4])*MINUTE - error

f = open(filePath, 'wb')
start_time_in_seconds = time.time()
block_size = 1024
print("Recording...")
response = request.urlopen(URL)

time_start = time.time()
while time.time() < time_start +  time_limit :
    buffer = response.read(block_size)
    if not buffer:
        print('error',time.time())
        break
    f.write(buffer)
print("Fin grabacion")
print("file is at ...",filePath)
f.close()
sys.stdout.flush()
