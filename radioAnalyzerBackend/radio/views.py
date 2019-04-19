from django.shortcuts import render
from django.http import HttpResponse
from.models import Radio
# Create your views here.

def getRadios(request):
    radios = Radio.objects.all()
    return render(request,'radio/radioList.html',{"radios":radios})