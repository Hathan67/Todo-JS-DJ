from django.shortcuts import render

# Create your views here.
from django.http import HttpRequest, HttpResponse, JsonResponse
from todo.models import Task
from django.core.serializers import serialize

import json

def index(request):
    tasks = Task.objects.all().order_by("-created")

    tasks_serialized = serialize('json',tasks)

    # context = {"tasks":tasks_json}
    # data = json.loads(tasks_serialized)
    # print(context)
    # print(data)

    # return HttpResponse("ds")
    return JsonResponse({'data':tasks_serialized},safe=False)