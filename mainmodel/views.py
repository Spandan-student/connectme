from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from django.contrib.auth import login,logout
from .middlewares import auth,guest
from .models import personal_details_models,personal_team_models,personal_skill_models,personal_academics_models,profile_score_models
from . import aiscore

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
def applayoutsidebar(request):
    user = request.user
    username = user.username
    user_profile = personal_details_models.objects.get(university_email=request.user)
    context = {
        'username': username,
        'user_profile': user_profile,
    }
    return render(request,'ApplayoutSidebar.html',context)

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

@auth
def profile(request):
    skill=personal_skill_models.objects.get(university_email=request.user).skills
    hobby=personal_skill_models.objects.get(university_email=request.user).hobbies
    sleeptime=personal_skill_models.objects.get(university_email=request.user).sleep_schedule
    cgpa=personal_academics_models.objects.get(university_email=request.user).userCGPA
    leetcode=personal_academics_models.objects.get(university_email=request.user).leetcodeNo
    department=personal_details_models.objects.get(university_email=request.user).userdept
    userscore=profile_score_models.objects.get(university_email=request.user).user_score
    if userscore:
        pass
    else:
        userscore=aiscore.aiscoregenerator(skill,hobby,sleeptime,cgpa,leetcode,department)
        data=profile_score_models(university_email=request.user,user_score=userscore)
        data.save()
    return render(request,'profile.html',{'skill':userscore})

@auth
def teampage(request):
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
    return render(request,'teampage.html',context)