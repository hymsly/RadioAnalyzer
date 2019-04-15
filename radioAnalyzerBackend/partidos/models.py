from django.db import models

# Create your models here.
class Equipo(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    estado = models.IntegerField()