from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from django.contrib.auth import login,logout
from .middlewares import auth,guest
from .models import personal_details_models,personal_team_models

# Create your views here.


def index(request):
    return render(request,'index1.html')

@guest
def registration(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request,user)
            return redirect('dashboard')
    else:
        initial_data={'username':'','password1':'','password2':''}
        form=UserCreationForm(initial=initial_data)
        return render(request,'registration.html',{'form':form})
    # return render(request,'registration.html')

@guest
def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request,user)
            return redirect('dashboard')
    else:
        initial_data={'username':'','password':''}
        form=AuthenticationForm(initial=initial_data)
        return render(request,'loginpage.html',{'form':form})

def logout_view(request):
    logout(request)
    return redirect('login')

@auth
def dashboard(request):
    user = request.user
    username = user.username
    first_name = user.first_name
    last_name = user.last_name
    name=first_name+" "+last_name
    email = user.email
    last_login = user.last_login
    user_profile = personal_details_models.objects.get(university_email=request.user)
    user_teams = personal_team_models.objects.filter(university_email=request.user)

    context = {
        'username': username,
        'name': name,
        'email': email,
        'last_login': last_login,
        'user_profile': user_profile,
        'user_teams' :user_teams
    }
    return render(request,'dashboard.html',context)

def profile(request):
    return render(request,'profile.html')


def teampage(request):
    return render(request,'teampage.html')