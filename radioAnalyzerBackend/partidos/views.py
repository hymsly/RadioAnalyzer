from django.shortcuts import render
from django.http import HttpResponse
from.models import Partido
import time
import datetime
from urllib import request
import os
# Create your views here.
def getPartidos(request):
    partidos = Partido.objects.all()
    return render(request,'partidos/partidosList.html',{"partidos":partidos})
def recordAudio(request2):
    partidosReadyToRecord = Partido.objects.all().filter(estado=0)
    localtime = int(time.strftime("%Y%m%d%H%M%S",time.localtime()))
    for partido in partidosReadyToRecord:
        partidotime = int(partido.fechaInicio.strftime("%Y%m%d%H%M%S"))
        #tiempo = int(partidotime.strftime("%s"))
        print(localtime)
        #print(tiempo)
        print(partidotime)
        if localtime>=partidotime:
            folder ='audios'
            filename = partido.equipoLocal.nombre + "-"+partido.equipoVisitante.nombre + "--" + str(partidotime) + ".wav"
            x_filename = os.path.join(folder,filename.replace(' ','-'))
            #change estado
            partidosReadyToRecord[0].estado=1
            partidosReadyToRecord[0].audio = x_filename
            partidosReadyToRecord[0].save()
            #scrap audio
            response = request.urlopen("https://18493.live.streamtheworld.com/RADIO_RPP.mp3")
            f = open(x_filename, 'wb')
            start_time_in_seconds = time.time()
            time_limit = partido.duracion
            block_size = 1024
            while time.time() - start_time_in_seconds < time_limit:
                buffer = response.read(block_size)
                if not buffer:
                    print('error',time.time())
                    continue
                f.write(buffer)
            f.close()
    return HttpResponse()