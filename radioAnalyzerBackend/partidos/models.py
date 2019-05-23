from django.db import models

# Create your models here.
class Equipo(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    estado = models.IntegerField()
class Partido(models.Model):
    id = models.AutoField(primary_key=True)
    equipoLocal = models.ForeignKey(Equipo,on_delete=models.CASCADE,related_name='local')
    equipoVisitante = models.ForeignKey(Equipo,on_delete=models.CASCADE,related_name='visitante')
    audio = models.CharField(max_length=100)
    fechaInicio = models.DateTimeField()
    duracion = models.IntegerField()
    estado = models.IntegerField()
    estadoAsignacion = models.IntegerField()
    def __str__(self):
        return self.equipoLocal.nombre+"-"+self.equipoVisitante.nombre
class SloganPartido(models.Model):
    id = models.AutoField(primary_key=True)
    partido = models.ForeignKey(Partido,on_delete=models.CASCADE)
    tiempoInicio = models.IntegerField()
    duracion = models.IntegerField()
    tipo_asignacion = models.BooleanField()