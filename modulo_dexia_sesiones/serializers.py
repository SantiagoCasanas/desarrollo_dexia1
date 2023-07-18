from rest_framework import serializers
from .models import Sesion, SesionPrimeraVez, Agendar_cita

from modulo_dexia_estudiantes.serializers import EstudianteSerializer
from modulo_base_login.serializer import UsuarioSerializer




class AgendarCitaSerializer(serializers.ModelSerializer):
    profesional = serializers.SerializerMethodField()
    estudiante = serializers.SerializerMethodField()

    class Meta:
        model = Agendar_cita  # Aquí debes utilizar el modelo Agendar_cita en lugar de Sesion
        fields = ['id', 'profesional', 'estudiante', 'fecha']

    def get_profesional(self, obj):
        return obj.profesional.first_name

    def get_estudiante(self, obj):
        return f"{obj.estudiante.nombre} {obj.estudiante.primer_apellido} {obj.estudiante.segundo_apellido}"



class SesionSerializer(serializers.ModelSerializer):

    class Meta:
        Model = Sesion
        fields = '__all__'



class SesionPrimeraVezSerializer(serializers.ModelSerializer):

    class Meta:
        Model = SesionPrimeraVez
        fields = '__all__'