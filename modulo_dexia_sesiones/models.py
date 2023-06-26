from django.db import models
import datetime
from modulo_base_login.models import CustomUser 
from modulo_dexia_estudiantes.models import Estudiante 

# Create your models here.

class Sesion(models.Model):
    profesional = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='profesional')
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE, related_name='estudiante')
    asistencia = models.BooleanField(default=False)
    fecha = models.DateField(null = False, default = datetime.date.today)
    descripcion = models.TextField(blank=False, null=False)
    fecha_proxima_sesion = models.DateField(null=False, blank=True)

    def __str__(self):
        return f"Sesión {self.id} - {self.fecha}"
    

class SesionPrimeraVez(Sesion):
    PROGRAMAS = (('Psicología', 'Psicología'), ('Red CAAL', 'Red CAAL'))

    estimacion_estudiante = (('Por debajo de la media', 'Por debajo de la media'), ('Por encima de la media', 'Por encima de la media')
                             ('En la media', 'En la media'), ('No sabe/No responde', 'No sabe/No responde'))
    
    alertas = (('Alto', 'Alto'), ('Medio', 'Medio')
               ('Bajo', 'Bajo'), ('Ninguno', 'Ninguno'))

    estimacion_media = models.CharField(choices=estimacion_estudiante, null=False, blank=False, max_length = 50, unique=True)
    motivo_consulta = models.TextField(blank=False, null=False)
    riesgo_individual = models.CharField(choices=alertas, null=False, blank=False, max_length = 10, unique=True)
    riesgo_familiar = models.CharField(choices=alertas, null=False, blank=False, max_length = 10, unique=True)
    riesgo_academico = models.CharField(choices=alertas, null=False, blank=False, max_length = 10, unique=True)
    riesgo_economico = models.CharField(choices=alertas, null=False, blank=False, max_length = 10, unique=True)
    riesgo_universitario = models.CharField(choices=alertas, null=False, blank=False, max_length = 10, unique=True)
    riesgo_psicologico = models.CharField(choices=alertas, null=False, blank=False, max_length = 10, unique=True)

    

    def __str__(self):
        return f"Sesión de primera vez {self.id} - {self.fecha}"

class SesionSeguimiento(Sesion):
    evaluacion = models.TextField()

    def __str__(self):
        return f"Sesión de seguimiento {self.id} - {self.fecha}"