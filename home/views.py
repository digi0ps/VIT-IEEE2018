from django.shortcuts import render

# Create your views here.


def home(request):
    return render(request, "base.html", )


def timeline(request):
    return render(request, "base.html", )


def contact(request):
    return render(request, "base.html", )
