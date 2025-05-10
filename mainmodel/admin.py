from django.contrib import admin
from .models import personal_details_models,personal_skill_models,personal_team_models,personal_academics_models,profile_score_models

# Register your models here.
admin.site.register(personal_details_models)
admin.site.register(personal_skill_models)
admin.site.register(personal_academics_models)
admin.site.register(personal_team_models)
admin.site.register(profile_score_models)