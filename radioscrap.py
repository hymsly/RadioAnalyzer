from urllib import request
import time
import os

HOUR = 60
MINUTE = 60
URL_RPP = "https://18493.live.streamtheworld.com/RADIO_RPP.mp3"
URL_MODA = "https://18303.live.streamtheworld.com/CRP_MOD.mp3"
##CONNECTOR A LA RADIO

##file
folder ='audios'
fileName = 'MODA' + time.strftime("%Y%m%d",time.localtime())+".wav"
filePath = os.path.join(folder,fileName)

f = open(filePath, 'wb')
start_time_in_seconds = time.time()
###time in seconds
time_limit = 5*MINUTE*HOUR
block_size = 2048
print("Recording...")
response = request.urlopen(URL_MODA)

while time.perf_counter() < time_limit:
    buffer = response.read(block_size)
    if not buffer:
        print('error',time.time())
        continue
    f.write(buffer)
f.close()