from .views import RestViewSet

routes = [
    {"regex": r"rest", "viewset": RestViewSet, "basename": "Rest"},
from .views import RestViewSet, ModelViewSet

routes = [
    {'regex': r'rest', 'viewset': RestViewSet, 'basename': 'Rest'},
    {'regex': r'model', 'viewset': ModelViewSet, 'basename': 'Model'},
]
