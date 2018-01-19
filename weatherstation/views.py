# The views page is used to get data from the backend and send it as either JSON data (for a REST API)
# or directly to an HTML page to be
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world. You're at the index.")