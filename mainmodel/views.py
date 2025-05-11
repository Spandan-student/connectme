# from django.shortcuts import render,redirect
# from django.http import HttpResponse
# from django.contrib.auth.forms import UserCreationForm,AuthenticationForm,User
# from django.contrib.auth import login,logout
# from .middlewares import auth,guest
# from .models import personal_details_models,personal_team_models,personal_skill_models,personal_academics_models,profile_score_models,personal_connections_models
# from . import aiscore
# from . import connectionchecker

# # Create your views here.


# def index(request):
#     return render(request,'index1.html')

# @guest
# def registration(request):
#     if request.method == "POST":
#         form = UserCreationForm(request.POST)
#         if form.is_valid():
#             user = form.save()
#             login(request,user)
#             return redirect('profile')
#     else:
#         initial_data={'username':'','password1':'','password2':''}
#         form=UserCreationForm(initial=initial_data)
#         return render(request,'registration.html',{'form':form})

# @guest
# def login_view(request):
#     if request.method == "POST":
#         form = AuthenticationForm(request, data=request.POST)
#         if form.is_valid():
#             user = form.get_user()
#             login(request,user)
#             return redirect('profile')
#     else:
#         initial_data={'username':'','password':''}
#         form=AuthenticationForm(initial=initial_data)
#         return render(request,'loginpage.html',{'form':form})

# def logout_view(request):
#     logout(request)
#     return redirect('login')

# @auth
# def applayoutsidebar(request):
#     user = request.user
#     username = user.username
#     user_profile = personal_details_models.objects.get(university_email=request.user)
#     context = {
#         'username': username,
#         'user_profile': user_profile,
#     }
#     return render(request,'ApplayoutSidebar.html',context)

# def connect(request):
#     user = request.user
#     users_score = profile_score_models.objects.get(university_email=user)
#     connection_obj, _ = personal_connections_models.objects.get_or_create(university_email=user)

#     all_users_score = profile_score_models.objects.exclude(university_email=user)
#     for each_user in all_users_score:
#         if each_user.user_score and connectionchecker.check_connection(each_user.user_score, users_score.user_score):
#             # Avoid duplicate connection
#             if not connection_obj.connections.filter(id=each_user.university_email.id).exists():
#                 # Add connection for current user
#                 connection_obj.connections.add(each_user.university_email)

#                 # Add reverse connection (make it mutual)
#                 reverse_obj, _ = personal_connections_models.objects.get_or_create(university_email=each_user.university_email)
#                 reverse_obj.connections.add(user)
#     return redirect('dashboard')

# @auth
# def dashboard(request):
#     user = request.user
#     username = user.username
#     first_name = user.first_name
#     last_name = user.last_name
#     name=first_name+" "+last_name
#     email = user.email
#     last_login = user.last_login
#     user_profile = personal_details_models.objects.get(university_email=request.user)
#     user_teams = personal_team_models.objects.filter(university_email=request.user)

#     users_score = profile_score_models.objects.get(university_email=user)
#     all_users_score = profile_score_models.objects.exclude(university_email=user)
#     recommended_connections_personaldetails=[]
#     recommended_connections_skillsdetails=[]
#     for each_user in all_users_score:
#         if each_user.user_score and connectionchecker.check_connection(each_user.user_score, users_score.user_score):
#             try:
#                 personal_details = personal_details_models.objects.get(university_email=each_user.university_email)
#                 skills_details = personal_skill_models.objects.get(university_email=each_user.university_email)
#                 recommended_connections_personaldetails.append(personal_details)
#                 recommended_connections_skillsdetails.append(skills_details)
#             except personal_details_models.DoesNotExist:
#                 continue
#     # print(recommended_connections_skillsdetails)

#     context = {
#         'username': username,
#         'name': name,
#         'email': email,
#         'last_login': last_login,
#         'user_profile': user_profile,
#         'user_teams' :user_teams,
#         'recommended_connections_personaldetails':recommended_connections_personaldetails,
#         'recommended_connections_skillsdetails':recommended_connections_skillsdetails
#     }
#     return render(request,'dashboard.html',context)


# @auth
# def profile(request):
#     # Check if the user already has a profile
#     try:
#         user_details = personal_details_models.objects.get(university_email=request.user)
#         user_skills = personal_skill_models.objects.get(university_email=request.user)
#         user_academics = personal_academics_models.objects.get(university_email=request.user)
#         profile_exists = True
        
#     except (personal_details_models.DoesNotExist, 
#             personal_skill_models.DoesNotExist,
#             personal_academics_models.DoesNotExist):
#         profile_exists = False
    
#     if request.method == 'POST':
#         # Process form data
#         # Personal Details
#         username = request.POST.get('username')
#         userdept = request.POST.get('userdept')
#         userAge = request.POST.get('userAge')
#         userDOB = request.POST.get('userDOB')
#         userbio = request.POST.get('userbio')
        
#         # Skills
#         skills = request.POST.get('skills')
#         hobbies = request.POST.get('hobbies')
#         sleep_schedule = request.POST.get('sleep_schedule')
        
#         # Academics
#         userCGPA = request.POST.get('userCGPA')
#         hackathonNo = request.POST.get('hackathonNo') or 0
#         leetcodeNo = request.POST.get('leetcodeNo') or 0
#         contestNo = request.POST.get('contestNo') or 0
#         yearofaddmission = request.POST.get('yearofaddmission')
#         passoutyear = request.POST.get('passoutyear')
        
#         # Handle uploaded image
#         userimage = request.FILES.get('userimage')
        
#         # Create or update personal details
#         if profile_exists:
#             # Update existing profile
#             user = request.user
#             username = user.username
#             first_name = user.first_name
#             last_name = user.last_name
#             name=first_name+" "+last_name
#             email = user.email
#             skill=personal_skill_models.objects.get(university_email=request.user).skills
#             hobby=personal_skill_models.objects.get(university_email=request.user).hobbies
#             sleeptime=personal_skill_models.objects.get(university_email=request.user).sleep_schedule
#             cgpa=personal_academics_models.objects.get(university_email=request.user).userCGPA
#             leetcode=personal_academics_models.objects.get(university_email=request.user).leetcodeNo
#             department=personal_details_models.objects.get(university_email=request.user).userdept
#             context = {
#                 'username': username,
#                 'name': name,
#                 'email': email,
#                 'user_profile': user_details,
#             }

#             user_details.username = username
#             user_details.userdept = userdept
#             user_details.userAge = userAge
#             user_details.userbio = userbio
            
#             if userDOB:
#                 user_details.userDOB = userDOB
                
#             if userimage:
#                 user_details.userimage = userimage
            
#             user_details.save()
            
#             # Update skills
#             user_skills.skills = skills
#             user_skills.hobbies = hobbies
#             user_skills.sleep_schedule = sleep_schedule
#             user_skills.save()
            
#             # Update academics
#             user_academics.userCGPA = userCGPA
#             user_academics.hackathonNo = hackathonNo
#             user_academics.leetcodeNo = leetcodeNo
#             user_academics.contestNo = contestNo
            
#             if yearofaddmission:
#                 user_academics.yearofaddmission = yearofaddmission
                
#             if passoutyear:
#                 user_academics.passoutyear = passoutyear
                
#             user_academics.save()

            
#         else:
#             # Create new profile records
#             # Personal details
#             user_details = personal_details_models(
#                 university_email=request.user,
#                 username=username,
#                 userdept=userdept,
#                 userAge=userAge,
#                 userbio=userbio
#             )
            
#             if userDOB:
#                 user_details.userDOB = userDOB
                
#             if userimage:
#                 user_details.userimage = userimage
                
#             user_details.save()
            
#             # Skills
#             user_skills = personal_skill_models(
#                 university_email=request.user,
#                 skills=skills,
#                 hobbies=hobbies,
#                 sleep_schedule=sleep_schedule
#             )
#             user_skills.save()
            
#             # Academics
#             user_academics = personal_academics_models(
#                 university_email=request.user,
#                 userCGPA=userCGPA,
#                 hackathonNo=int(hackathonNo),
#                 leetcodeNo=int(leetcodeNo),
#                 contestNo=int(contestNo)
#             )
            
#             if yearofaddmission:
#                 user_academics.yearofaddmission = yearofaddmission
                
#             if passoutyear:
#                 user_academics.passoutyear = passoutyear
                
#             user_academics.save()
#         return render(request,'profile.html')


# @auth
# def profile1(request):
#     try:
#         user_details = personal_details_models.objects.get(university_email=request.user)
#         user_skills = personal_skill_models.objects.get(university_email=request.user)
#         user_academics = personal_academics_models.objects.get(university_email=request.user)
#         profile_exists = True
#     except (personal_details_models.DoesNotExist, 
#             personal_skill_models.DoesNotExist,
#             personal_academics_models.DoesNotExist):
#         profile_exists = False
    
#     if profile_exists:
#         print("Exists")
#         user = request.user
#         username = user.username
#         first_name = user.first_name
#         last_name = user.last_name
#         name=first_name+" "+last_name
#         email = user.email
#         user_profile = personal_details_models.objects.get(university_email=request.user)

#         skill=personal_skill_models.objects.get(university_email=request.user).skills
#         hobby=personal_skill_models.objects.get(university_email=request.user).hobbies
#         sleeptime=personal_skill_models.objects.get(university_email=request.user).sleep_schedule
#         cgpa=personal_academics_models.objects.get(university_email=request.user).userCGPA
#         leetcode=personal_academics_models.objects.get(university_email=request.user).leetcodeNo
#         department=personal_details_models.objects.get(university_email=request.user).userdept
#         userscore=profile_score_models.objects.get(university_email=request.user).user_score
#         context = {
#             'username': username,
#             'name': name,
#             'email': email,
#             'user_profile': user_profile,
#             'userscore':userscore
#         }
#         return render(request,'profile.html',context)
#     else:
#         if request.method == 'POST':
#             # Process form data
#             # Personal Details
#             username = request.POST.get('username')
#             userdept = request.POST.get('userdept')
#             userAge = request.POST.get('userAge')
#             userDOB = request.POST.get('userDOB')
#             userbio = request.POST.get('userbio')
            
#             # Skills
#             skills = request.POST.get('skills')
#             hobbies = request.POST.get('hobbies')
#             sleep_schedule = request.POST.get('sleep_schedule')
            
#             # Academics
#             userCGPA = request.POST.get('userCGPA')
#             hackathonNo = request.POST.get('hackathonNo') or 0
#             leetcodeNo = request.POST.get('leetcodeNo') or 0
#             contestNo = request.POST.get('contestNo') or 0
#             yearofaddmission = request.POST.get('yearofaddmission')
#             passoutyear = request.POST.get('passoutyear')
            
#             # Handle uploaded image
#             userimage = request.FILES.get('userimage')

#             # Create new profile records
#             # Personal details
#             user_details = personal_details_models(
#                 university_email=request.user,
#                 username=username,
#                 userdept=userdept,
#                 userAge=userAge,
#                 userbio=userbio
#             )
#             if userDOB:
#                 user_details.userDOB = userDOB
                
#             if userimage:
#                 user_details.userimage = userimage
                
#             user_details.save()

#             # Skills
#             user_skills = personal_skill_models(
#                 university_email=request.user,
#                 skills=skills,
#                 hobbies=hobbies,
#                 sleep_schedule=sleep_schedule
#             )
#             user_skills.save()

#             # Academics
#             user_academics = personal_academics_models(
#                 university_email=request.user,
#                 userCGPA=userCGPA,
#                 hackathonNo=int(hackathonNo),
#                 leetcodeNo=int(leetcodeNo),
#                 contestNo=int(contestNo)
#             )
            
#             if yearofaddmission:
#                 user_academics.yearofaddmission = yearofaddmission
                
#             if passoutyear:
#                 user_academics.passoutyear = passoutyear
                
#             user_academics.save()

#             #Profile Score
#             userscore=aiscore.aiscoregenerator(skill,hobby,sleeptime,cgpa,leetcode,department)
#             data=profile_score_models(university_email=request.user,user_score=userscore)
#             data.save()
#         return render(request,'profile.html')
    
#     return render(request,'profile.html',context)


# @auth
# def teampage(request):
#     user = request.user
#     username = user.username
#     first_name = user.first_name
#     last_name = user.last_name
#     name=first_name+" "+last_name
#     email = user.email
#     last_login = user.last_login
#     user_profile = personal_details_models.objects.get(university_email=request.user)
#     user_teams = personal_team_models.objects.filter(university_email=request.user)

#     context = {
#         'username': username,
#         'name': name,
#         'email': email,
#         'last_login': last_login,
#         'user_profile': user_profile,
#         'user_teams' :user_teams
#     }
#     return render(request,'teampage.html',context)





# #@auth
# # def dashboard1(request):
# #     user = request.user
# #     username = user.username
# #     first_name = user.first_name
# #     last_name = user.last_name
# #     name=first_name+" "+last_name
# #     email = user.email
# #     last_login = user.last_login
# #     user_profile = personal_details_models.objects.get(university_email=request.user)
# #     user_teams = personal_team_models.objects.filter(university_email=request.user)
# #     users_score = profile_score_models.objects.get(university_email=user)
# #     connection_obj, _ = personal_connections_models.objects.get_or_create(university_email=user)

# #     all_users_score = profile_score_models.objects.exclude(university_email=user)
# #     for each_user in all_users_score:
# #         if each_user.user_score and connectionchecker.check_connection(each_user.user_score, users_score.user_score):
# #             # Avoid duplicate connection
# #             if not connection_obj.connections.filter(id=each_user.university_email.id).exists():
# #                 # Add connection for current user
# #                 connection_obj.connections.add(each_user.university_email)

# #                 # Add reverse connection (make it mutual)
# #                 reverse_obj, _ = personal_connections_models.objects.get_or_create(university_email=each_user.university_email)
# #                 reverse_obj.connections.add(user)
    
# #     context = {
# #         'username': username,
# #         'name': name,
# #         'email': email,
# #         'last_login': last_login,
# #         'user_profile': user_profile,
# #         'user_teams' :user_teams
# #     }
# #     return render(request,'dashboard.html',context)

# # @auth
# # def profile1(request):
# #     user = request.user
# #     username = user.username
# #     first_name = user.first_name
# #     last_name = user.last_name
# #     name=first_name+" "+last_name
# #     email = user.email
# #     user_profile = personal_details_models.objects.get(university_email=request.user)

# #     skill=personal_skill_models.objects.get(university_email=request.user).skills
# #     hobby=personal_skill_models.objects.get(university_email=request.user).hobbies
# #     sleeptime=personal_skill_models.objects.get(university_email=request.user).sleep_schedule
# #     cgpa=personal_academics_models.objects.get(university_email=request.user).userCGPA
# #     leetcode=personal_academics_models.objects.get(university_email=request.user).leetcodeNo
# #     department=personal_details_models.objects.get(university_email=request.user).userdept
# #     context = {
# #         'username': username,
# #         'name': name,
# #         'email': email,
# #         'user_profile': user_profile,
# #     }
# #     try:
# #         userscore=profile_score_models.objects.get(university_email=request.user).user_score
# #         return render(request,'profile.html',context)
# #     except profile_score_models.DoesNotExist:
# #         userscore=aiscore.aiscoregenerator(skill,hobby,sleeptime,cgpa,leetcode,department)
# #         data=profile_score_models(university_email=request.user,user_score=userscore)
# #         data.save()
# #         # return render(request,'profile.html',{'skill':userscore})
    
# #     return render(request,'profile.html',context)


#ai added

from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, User
from django.contrib.auth import login, logout
from .middlewares import auth, guest
from .models import personal_details_models, personal_team_models, personal_skill_models, personal_academics_models, profile_score_models, personal_connections_models
from . import aiscore
from . import connectionchecker
from django.contrib import messages

# Create your views here.
def index(request):
    return render(request, 'index1.html')

@guest
def registration(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            # Redirect to profile page after successful registration
            return redirect('profile')
    else:
        initial_data = {'username': '', 'password1': '', 'password2': ''}
        form = UserCreationForm(initial=initial_data)
    return render(request, 'registration.html', {'form': form})

@guest
def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            # Check if user has completed their profile
            try:
                personal_details_models.objects.get(university_email=user)
                personal_skill_models.objects.get(university_email=user)
                personal_academics_models.objects.get(university_email=user)
                # If profile is complete, redirect to dashboard
                return redirect('dashboard')
            except (personal_details_models.DoesNotExist, 
                    personal_skill_models.DoesNotExist, 
                    personal_academics_models.DoesNotExist):
                # If profile is incomplete, redirect to profile page
                return redirect('profile')
    else:
        initial_data = {'username': '', 'password': ''}
        form = AuthenticationForm(initial=initial_data)
    return render(request, 'loginpage.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('login')

@auth
def applayoutsidebar(request):
    user = request.user
    username = user.username
    users_score = profile_score_models.objects.get(university_email=user)
    try:
        user_profile = personal_details_models.objects.get(university_email=request.user)
        context = {
            'username': username,
            'user_profile': user_profile,
            'users_score': users_score
        }
    except personal_details_models.DoesNotExist:
        # Handle case when user profile doesn't exist
        context = {
            'username': username,
            'user_profile': None,
            'users_score': None,
        }
    return render(request, 'ApplayoutSidebar.html', context)

def connect(request):
    user = request.user
    users_score = profile_score_models.objects.get(university_email=user)
    connection_obj, _ = personal_connections_models.objects.get_or_create(university_email=user)

    all_users_score = profile_score_models.objects.exclude(university_email=user)
    for each_user in all_users_score:
        if each_user.user_score and connectionchecker.check_connection(each_user.user_score, users_score.user_score):
            # Avoid duplicate connection
            if not connection_obj.connections.filter(id=each_user.university_email.id).exists():
                # Add connection for current user
                connection_obj.connections.add(each_user.university_email)

                # Add reverse connection (make it mutual)
                reverse_obj, _ = personal_connections_models.objects.get_or_create(university_email=each_user.university_email)
                reverse_obj.connections.add(user)
    return redirect('dashboard')

@auth
def dashboard(request):
    # Check if user has completed their profile first
    try:
        user_profile = personal_details_models.objects.get(university_email=request.user)
        user_skills = personal_skill_models.objects.get(university_email=request.user)
        user_academics = personal_academics_models.objects.get(university_email=request.user)
    except (personal_details_models.DoesNotExist, 
            personal_skill_models.DoesNotExist,
            personal_academics_models.DoesNotExist):
        # If profile is not complete, redirect to profile page
        messages.warning(request, "Please complete your profile first")
        return redirect('profile')
    
    # Continue with dashboard if profile is complete
    user = request.user
    # username = personal_details_models(university_email=request.user)
    # first_name = user.first_name
    # last_name = user.last_name
    # name = first_name + " " + last_name
    email = user.email
    last_login = user.last_login
    user_teams = personal_team_models.objects.filter(university_email=request.user)
    user_connections = personal_connections_models.objects.filter(university_email=request.user)
    
    try:
        user_connections_obj = personal_connections_models.objects.get(university_email=request.user)
        user_connections = user_connections_obj.connections.all()  # This gives actual connected users
    except personal_connections_models.DoesNotExist:
        user_connections = []

    try:
        connection_obj = personal_connections_models.objects.get(university_email=user)
        connected_users = connection_obj.connections.all()
    except personal_connections_models.DoesNotExist:
        connected_users = []



    try:
        users_score = profile_score_models.objects.get(university_email=user)
        all_users_score = profile_score_models.objects.exclude(university_email=user)
        recommended_connections = []
        
        for each_user in all_users_score:
            if (each_user.university_email not in connected_users and each_user.user_score and connectionchecker.check_connection(each_user.user_score, users_score.user_score)):
                try:
                    personal_details = personal_details_models.objects.get(university_email=each_user.university_email)
                    skills_details = personal_skill_models.objects.get(university_email=each_user.university_email)
                    recommended_connections.append({'personal_details':personal_details, 'skills_details':skills_details})
                except personal_details_models.DoesNotExist:
                    continue
    except profile_score_models.DoesNotExist:
        recommended_connections = []

    context = {
        'user_profile': user_profile,
        # 'name': name,
        'email': email,
        'last_login': last_login,
        'user_profile': user_profile,
        'user_teams': user_teams,
        'users_score': users_score,
        'recommended_connections': recommended_connections,
        'user_connections':user_connections
    }
    return render(request, 'dashboard1.html', context)

@auth
def profile(request):
    """
    View for displaying and handling profile form submissions.
    """
    # Check if the user already has a profile
    try:
        user_details = personal_details_models.objects.get(university_email=request.user)
        user_skills = personal_skill_models.objects.get(university_email=request.user)
        user_academics = personal_academics_models.objects.get(university_email=request.user)
        profile_exists = True
    except (personal_details_models.DoesNotExist, 
            personal_skill_models.DoesNotExist,
            personal_academics_models.DoesNotExist):
        profile_exists = False
    
    if request.method == 'POST':
        # Process form data
        # Personal Details
        username = request.POST.get('username')
        userdept = request.POST.get('userdept')
        userAge = request.POST.get('userAge')
        userDOB = request.POST.get('')
        userbio = request.POST.get('userbio')
        
        # Skills
        skills = request.POST.get('skills')
        hobbies = request.POST.get('hobbies')
        sleep_schedule = request.POST.get('sleep_schedule')
        
        # Academics
        userCGPA = request.POST.get('userCGPA')
        hackathonNo = request.POST.get('hackathonNo') or 0
        leetcodeNo = request.POST.get('leetcodeNo') or 0
        contestNo = request.POST.get('contestNo') or 0
        yearofaddmission = request.POST.get('yearofaddmission')
        passoutyear = request.POST.get('passoutyear')
        
        # Handle uploaded image
        userimage = request.FILES.get('userimage')
        
        if profile_exists:
            # Update existing profile
            user_details.username = username
            user_details.userdept = userdept
            user_details.userAge = userAge
            user_details.userbio = userbio
            
            if userDOB:
                user_details.userDOB = userDOB
                
            if userimage:
                user_details.userimage = userimage
            
            user_details.save()
            
            # Update skills
            user_skills.skills = skills
            user_skills.hobbies = hobbies
            user_skills.sleep_schedule = sleep_schedule
            user_skills.save()
            
            # Update academics
            user_academics.userCGPA = userCGPA
            user_academics.hackathonNo = int(hackathonNo)
            user_academics.leetcodeNo = int(leetcodeNo)
            user_academics.contestNo = int(contestNo)
            
            if yearofaddmission:
                user_academics.yearofaddmission = yearofaddmission
                
            if passoutyear:
                user_academics.passoutyear = passoutyear
                
            user_academics.save()
        else:
            # Create new profile records
            # Personal details
            user_details = personal_details_models(
                university_email=request.user,
                username=username,
                userdept=userdept,
                userAge=userAge,
                userbio=userbio
            )
            if userDOB:
                user_details.userDOB = userDOB
                
            if userimage:
                user_details.userimage = userimage
                
            user_details.save()
            
            # Skills
            user_skills = personal_skill_models(
                university_email=request.user,
                skills=skills,
                hobbies=hobbies,
                sleep_schedule=sleep_schedule
            )
            user_skills.save()
            
            # Academics
            user_academics = personal_academics_models(
                university_email=request.user,
                userCGPA=userCGPA,
                hackathonNo=int(hackathonNo),
                leetcodeNo=int(leetcodeNo),
                contestNo=int(contestNo)
            )
            
            if yearofaddmission:
                user_academics.yearofaddmission = yearofaddmission
                
            if passoutyear:
                user_academics.passoutyear = passoutyear
                
            user_academics.save()
        
        # Generate and save AI score
        try:
            user_score = aiscore.aiscoregenerator(
                skills,
                hobbies,
                sleep_schedule,
                userCGPA,
                leetcodeNo,
                userdept
            )
            
            try:
                profile_score = profile_score_models.objects.get(university_email=request.user)
                profile_score.user_score = user_score
                profile_score.save()
            except profile_score_models.DoesNotExist:
                profile_score = profile_score_models(
                    university_email=request.user,
                    user_score=user_score
                )
                profile_score.save()
            
            messages.success(request, 'Profile updated successfully!')
            return redirect('dashboard')  # Redirect to dashboard after successful submission
            
        except Exception as e:
            messages.error(request, f'Error generating profile score: {str(e)}')
    
    # For GET requests or after processing POST
    # Prepare context for rendering the template
    context = {
        'profile_exists': profile_exists,
        'skills_choices': personal_skill_models.SKILLS_CHOICES,
        'sleep_choices': personal_skill_models.SLEEP_CHOICES
    }
    
    # If profile exists, add user data to context
    if profile_exists:
        user = request.user
        username = user.username
        first_name = user.first_name
        last_name = user.last_name
        name = first_name + " " + last_name
        email = user.email
        
        # Add user details to context
        context.update({
            'username': username,
            'name': name,
            'email': email,
            'user_details': user_details,
            'user_skills': user_skills,
            'user_academics': user_academics,
            'user_profile': user_details,
        })
        
        # Get profile score if it exists
        try:
            profile_score = profile_score_models.objects.get(university_email=request.user)
            context['users_score'] = profile_score
        except profile_score_models.DoesNotExist:
            context['users_score'] = None
    
    return render(request, 'profile1.html', context)

@auth
def teampage(request):
    user = request.user
    users_score = profile_score_models.objects.get(university_email=user)
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
        'user_teams' :user_teams,
        'users_score': users_score
    }
    return render(request,'teampage.html',context)

def peerprofile(request):
    user=request.user
    user_personal_profile=personal_details_models.objects.filter(university_email=user)
    user_skill_profile=personal_skill_models.objects.filter(university_email=user)
    user_academic_profile=personal_academics_models.objects.filter(university_email=user)
    context={
        'user_personal_profile':user_personal_profile,
        'user_skill_profile':user_skill_profile,
        'user_academic_profile':user_academic_profile,
    }
    return render(request, 'peerprofile.html', context)