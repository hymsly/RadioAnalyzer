# Generated by Django 2.2 on 2019-04-19 14:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Equipo',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50)),
                ('estado', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Partido',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('audio', models.CharField(max_length=100)),
                ('fechaInicio', models.DateTimeField()),
                ('duracion', models.IntegerField()),
                ('estado', models.IntegerField()),
                ('estadoAsignacion', models.IntegerField()),
                ('equipoLocal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='local', to='partidos.Equipo')),
                ('equipoVisitante', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='visitante', to='partidos.Equipo')),
            ],
        ),
    ]
