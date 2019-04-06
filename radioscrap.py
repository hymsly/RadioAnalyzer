# -*- coding: utf-8 -*-
"""
Editor de Spyder

Este es un archivo temporal.
"""

from urllib import request
import time
response = request.urlopen("https://18493.live.streamtheworld.com/RADIO_RPP.mp3")
filename = time.strftime("%Y%m%d%H%M%S",time.localtime())+".wav"
f = open(filename, 'wb')
start_time_in_seconds = time.time()
time_limit = 10
block_size = 1024
while time.time() - start_time_in_seconds < time_limit:
    buffer = response.read(block_size)
    if not buffer:
        break
    f.write(buffer)
f.close()