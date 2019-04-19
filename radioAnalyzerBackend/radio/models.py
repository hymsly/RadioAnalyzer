from django.db import models

# Create your models here.
class Radio(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    enlace = models.CharField(max_length=200)
    estado = models.IntegerField()

    def __str__(self):
        return self.nombre + "->" +self.enlace