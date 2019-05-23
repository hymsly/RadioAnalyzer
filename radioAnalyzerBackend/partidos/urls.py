from django.urls import path,include

from . import views

urlpatterns = [
    path('', views.getPartidos),
    path('record/',views.recordAudio),
    path('<idPartido>/',views.getAudio)
]
