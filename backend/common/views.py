from django.views import generic

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
<<<<<<< HEAD


class IndexView(generic.TemplateView):
    template_name = "common/index.html"

=======
from .plang import PLangProgram
from .models import PirdataModel
from .serializers import PirdataModelSerializer  # Create a serializer for model
import importlib
import json

class IndexView(generic.TemplateView):
    template_name = 'common/index.html'

class ModelInputView(generic.TemplateView):
    template_name = 'common/model_input.html'

class ModelManageView(generic.TemplateView):
    template_name = 'common/model_manage.html'

class PirServerView(generic.TemplateView):
    template_name = 'common/pir_server.html'

class PirClientView(generic.TemplateView):
    template_name = 'common/pir_client.html'
>>>>>>> b8f188b (增加PIR相关应用)

class RestViewSet(viewsets.ViewSet):
    @action(
        detail=False,
<<<<<<< HEAD
        methods=["get"],
        permission_classes=[AllowAny],
        url_path="rest-check",
=======
        methods=['get'],
        permission_classes=[AllowAny],
        url_path='rest-check',
>>>>>>> b8f188b (增加PIR相关应用)
    )
    def rest_check(self, request):
        return Response(
            {"result": "If you're seeing this, the REST API is working!"},
            status=status.HTTP_200_OK,
        )
<<<<<<< HEAD
=======

class ModelViewSet(viewsets.ViewSet):
    def _get_model_format(self):
        with open('compiled.fmt', 'r') as f:
            format = f.readline()
        return format
    
    def _get_model_inputs(self):
        with open('compiled.in', 'r') as f:
            inputs = [input.strip() for input in f.readlines()]
        return inputs

    @action(
        detail=False,
        methods=['post'],
        permission_classes=[AllowAny],
        url_path='upload-model',
    )
    def upload_model(self, request):
        model = request.data.get('model')
        plang_program = PLangProgram(model)

        compiled_code, compiled_format = plang_program.compile_and_save('compiled')
        mod = importlib.import_module('compiled')
        mod.compile()

        return Response(
            {"result": json.dumps({
                "code": compiled_code,
                "format": compiled_format
            })},
            status=status.HTTP_200_OK,
        )

    @action(
        detail=False,
        methods=['get'],
        permission_classes=[AllowAny],
        url_path='get-model-format',
    )
    def get_model_format(self, request):
        format = self._get_model_format()

        return Response(
            {"result": json.dumps({
                "format": format
            })},
            status=status.HTTP_200_OK,
        )

    @action(
        detail=False,
        methods=['get'],
        permission_classes=[AllowAny],
        url_path='get-model-inputs',
    )
    def get_model_inputs(self, request):
        inputs = self._get_model_inputs()

        return Response(
            {"result": json.dumps({
                "inputs": inputs
            })},
            status=status.HTTP_200_OK,
        )
    
    @action(
        detail=False,
        methods=['get'],
        permission_classes=[AllowAny],
        url_path='get-model-params',
    )
    def get_model_params(self, request):
        format = self._get_model_format()
        mod = importlib.import_module('compiled')
        params = mod.getParams()

        if (format == 'eva'):
            return Response(
                {"result": json.dumps({
                    "primeBits": params.prime_bits,
                    "polyModulusDegree": params.poly_modulus_degree
                })},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"result": json.dumps(params)},
                status=status.HTTP_200_OK,
            )
    
    @action(
        detail=False,
        methods=['post'],
        permission_classes=[AllowAny],
        url_path='upload-keys',
    )
    def upload_keys(self, request):
        mod = importlib.import_module('compiled')
        keys = request.data.get('keys')
        mod.recoverKeys(keys)

        return Response(
            {"result": "ok"},
            status=status.HTTP_200_OK,
        )
    
    @action(
        detail=False,
        methods=['post'],
        permission_classes=[AllowAny],
        url_path='upload-inputs',
    )
    def upload_inputs(self, request):
        mod = importlib.import_module('compiled')
        encodoed_enc_inputs = request.data.get('encryptedInputs')
        mod.recoverEncryptedInputs(encodoed_enc_inputs)

        return Response(
            {"result": "ok"},
            status=status.HTTP_200_OK,
        )

    @action(
        detail=False,
        methods=['get'],
        permission_classes=[AllowAny],
        url_path='evaluate',
    )
    def evaluate(self, request):
        mod = importlib.import_module('compiled')
        mod.eval()
        enc_outputs = mod.getEncodedEncOutputs()

        return Response(
            {"result": json.dumps(enc_outputs)},
            status=status.HTTP_200_OK,
        )
    
class PirdataModelViewSet(viewsets.ViewSet):
    queryset = PirdataModel.objects.all()
    serializer_class = PirdataModelSerializer

    @action(
        detail=False,
        methods=['post'],
        permission_classes=[AllowAny],
        url_path='upload-pirdata',
    )
    def upload_pirdata(self, request):
        pirdata = request.data.get('pirdata')
        serializer = PirdataModelSerializer(data=pirdata)
        
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"result": "Data uploaded successfully"},
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                {"error": "Invalid data"},
                status=status.HTTP_400_BAD_REQUEST,
            )
    # @action(
    #     detail=False,
    #     methods=['post'],
    #     permission_classes=[AllowAny],
    #     url_path='upload-pirdata',
    # )
    # def upload_pirdata(self, request):
    #     data = request.data.get('data')
    #     plang_program = PLangProgram(model)

    #     compiled_code, compiled_format = plang_program.compile_and_save('compiled')
    #     mod = importlib.import_module('compiled')
    #     mod.compile()

    #     return Response(
    #         {"result": json.dumps({
    #             "code": compiled_code,
    #             "format": compiled_format
    #         })},
    #         status=status.HTTP_200_OK,
    #     )
>>>>>>> b8f188b (增加PIR相关应用)
