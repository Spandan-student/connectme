from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.index,name='index'),
    path('registration/',views.registration,name='registration'),
    path('login/',views.login_view,name='login'),
    path('logout/',views.logout_view,name='logout'),
    path('profile/',views.profile,name='profile'),
    path('dashboard/',views.dashboard,name='dashboard'),
    path('teampage/',views.teampage,name='teampage'),
    path('connect/',views.connect,name='connect'),
    path('peerprofile/<int:user_id>/',views.peerprofile,name='peerprofile'),
    path('peerprofile/',views.peerprofile,name='my_profile'),
    path('search/',views.search,name='search'),
]
