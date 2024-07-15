from django.shortcuts import render

# Create your views here.
from django.http import HttpRequest, HttpResponse, JsonResponse
# from todo.models import Task
from django.core.serializers import serialize
from django.middleware.csrf import get_token

import json

from todo.models import Task
from todo.forms import TaskForm
from django.views.decorators.csrf import csrf_exempt

from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.contrib.auth import authenticate, login, logout

def get_csrf(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    # csrf_token = request.COOKIES.get('csrftoken')
    # response['X-CSRFToken'] = csrf_token
    return response


def index(request):
    tasks = Task.objects.all().order_by("-created")
    tasks_serialized = serialize('json',tasks)

    # context = {"tasks":tasks_json}
    # data = json.loads(tasks_serialized)
    # print(context)
    # print(data)

    # return HttpResponse("ds")
    return JsonResponse({'data':tasks_serialized},safe=False)

# @csrf_exempt
def newForm(request):

    if request.method == "POST":

        return JsonResponse({'jello':'hello'})

def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True})


