from django.db import models
import datetime
from modulo_base_login.models import CustomUser 
from modulo_dexia_estudiantes.models import Estudiante, Programa_acompañamiento 

# Create your models here.


class Agendar_cita(models.Model):
    profesional = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='profesional_agendar')
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE, related_name='estudiante_agendar')
    fecha = models.DateTimeField(null = False, default = datetime.date.today)


class Sesion(models.Model):

    alertas = (('Alto', 'Alto'), ('Medio', 'Medio'),
               ('Bajo', 'Bajo'), ('Ninguno', 'Ninguno'))

    profesional = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='profesional')
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE, related_name='estudiante')
    asistencia = models.BooleanField(null=False, default=False)
    fecha = models.DateTimeField(null = False, default = datetime.date.today)
    descripcion = models.TextField(blank=True, null=False, max_length=500) #esta pregunta debe resumir la situación descrita por el estudiante
    proxima_reunion = models.BooleanField(null=False, default=False) #Habrá una proxima reunion
    fecha_proxima_sesion = models.DateTimeField(null=True, blank=True)

    remision = models.ForeignKey(Programa_acompañamiento, on_delete=models.CASCADE, null=False, default=None)

    riesgo_individual = models.CharField(choices=alertas, null=False, blank=False, max_length = 10, default=None)
    riesgo_familiar = models.CharField(choices=alertas, null=False, blank=False, max_length = 10, default=None)
    riesgo_academico = models.CharField(choices=alertas, null=False, blank=False, max_length = 10, default=None)
    riesgo_economico = models.CharField(choices=alertas, null=False, blank=False, max_length = 10, default=None)
    riesgo_universitario = models.CharField(choices=alertas, null=False, blank=False, max_length = 10, default=None)
    riesgo_psicologico = models.CharField(choices=alertas, null=False, blank=False, max_length = 10, default=None)

    def __str__(self):
        return f"Sesión {self.id} - {self.fecha}"
    

class SesionPrimeraVez(Sesion):

    estimacion_estudiante = (('Por debajo de la media', 'Por debajo de la media'), ('Por encima de la media', 'Por encima de la media'),
                             ('En la media', 'En la media'), ('No sabe/No responde', 'No sabe/No responde'))
    
    estimacion_media = models.CharField(choices=estimacion_estudiante, null=False, blank=False, max_length = 50, default=None)
    motivo_consulta = models.TextField(max_length=200, blank=True, null=True) #Opcional para cuando el estudiante solicita el acompañamiento
    palabras_clave = models.TextField(blank=True, null=False, max_length=500, default=None) #Palabras clave que describan el caso
    discapacidad = models.CharField(null=True, blank=True, max_length = 20)
    eps = models.TextField(max_length=30, null=False, blank=True)
    motivacion_programa = models.TextField(max_length=100, null=False, blank=True) #¿Cuál o cuáles son las razones por las cuales te encuentras en este momento en el programa académico que elegiste?
    contacto_adicional = models.TextField(max_length=11, null=False, blank=True)
    materias_canceladas = models.BooleanField(default=False)
    motivo_materias_canceladas = models.TextField(max_length=200, blank=True, null=True)
    materias_mas_complejas = models.TextField(max_length=200, blank=True, null=True)

    
    def __str__(self):
        return f"Sesión de primera vez {self.id} - {self.fecha}"