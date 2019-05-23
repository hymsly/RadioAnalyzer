from django.contrib import admin
from .models import Equipo,Partido,SloganPartido

class SloganInline(admin.TabularInline):
    model = SloganPartido

class PartidoAdmin(admin.ModelAdmin):
    inlines = [SloganInline,]
# Register your models here.
admin.site.register(Equipo)
admin.site.register(Partido,PartidoAdmin)