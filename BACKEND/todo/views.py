from django.shortcuts import render

# Create your views here.
from django.http import HttpRequest, HttpResponse,JsonResponse, QueryDict,HttpResponseBadRequest, HttpResponseRedirect
from django.shortcuts import get_object_or_404


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


def newForm(request):

    if request.method == "POST":

        query_string = request.body.decode('utf-8')
        json_dict = json.loads(query_string)
        query_dict = QueryDict('', mutable=True)
        for key, value in json_dict.items():
            query_dict[key] = value

        # print(query_dict)

        form = TaskForm(data=query_dict)
        if form.is_valid():
            form.save()


        return JsonResponse({"Status":"Successfully added"})

def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True})

def update_task_status(
    request, task_id: int, new_status: str):

    if not new_status in Task.StatusChoice.values:
        return JsonResponse({"Status":"Invalid status"})

    task = get_object_or_404(Task, id=task_id)

    task.status = new_status
    task.save()


    return JsonResponse({'Status':'Successfully updated'})

def delete_task(request, task_id: int):

    task = get_object_or_404(Task, id=task_id)
    task.delete()


    return JsonResponse({'Status':'Successfully deleted'})
