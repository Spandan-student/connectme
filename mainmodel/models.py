from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.
class personal_details_models(models.Model):
    university_email = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(default="someone", max_length=255, null=False, unique=True)
    userdept = models.CharField(default="None", max_length=255, null=True)
    userAge = models.CharField(default="None", max_length=255, null=True)
    userDOB = models.DateField(default=timezone.now, null=False)
    userimage = models.ImageField(upload_to='user_images/', null=True, blank=True)
    userbio = models.TextField(null=True, blank=True)

    def __str__(self):
        return str(self.university_email.username)

class personal_skill_models(models.Model):
    SKILLS_CHOICES = [
        ("AIML", "AI & ML"),
        ("AI", "AI"),
        ("ML", "ML"),
        ("UIUX", "UI & UX"),
        ("Backend", "Backend"),
        ("Frontend", "Frontend"),
    ]

    SLEEP_CHOICES = [
        ("EarlyBirds", "Early Birds"),
        ("NightOwl", "Night Owl"),
        ("Any", "No Such Schedule")
    ]

    university_email = models.ForeignKey(User, on_delete=models.CASCADE)
    skills = models.CharField(max_length=255, choices=SKILLS_CHOICES, null=True)
    hobbies = models.CharField(max_length=255, null=True)
    sleep_schedule = models.CharField(choices=SLEEP_CHOICES, max_length=255, null=True)

class personal_academics_models(models.Model):
    university_email = models.ForeignKey(User, on_delete=models.CASCADE)
    userCGPA = models.CharField(max_length=255, null=False)
    hackathonNo = models.IntegerField()
    leetcodeNo = models.IntegerField()
    contestNo = models.IntegerField()
    yearofaddmission = models.DateField(default=timezone.now, null=False)
    passoutyear = models.DateField(default=timezone.now, null=False)

class personal_team_models(models.Model):
    university_email = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_teams')
    team_name = models.CharField(max_length=255, unique=True, null=False)
    team_project_topic = models.CharField(max_length=255, unique=True, null=False)
    team_members = models.ManyToManyField(User, related_name='teams')
    is_open = models.BooleanField(default=True)

    def __str__(self):
        return self.team_name

class profile_score_models(models.Model):
    university_email = models.ForeignKey(User, on_delete=models.CASCADE)
    user_score=models.CharField(max_length=255,null=False)