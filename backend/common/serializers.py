from rest_framework import serializers
from .models import PirdataModel

class PirdataModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PirdataModel
        fields = '__all__'
