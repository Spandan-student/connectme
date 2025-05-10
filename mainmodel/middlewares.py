from django.shortcuts import redirect

#**********Authentication check *****************

def auth(view_function):
    def wrapped_view(request,*args,**kwargs):
        if request.user.is_authenticated == False:
            return redirect('index')
        return view_function(request,*args,**kwargs)
    return wrapped_view

#*******Guest *********
def guest(view_function):
    def wrapped_view(request,*args,**kwargs):
        if request.user.is_authenticated:
            return redirect('dashboard')
        return view_function(request,*args,**kwargs)
    return wrapped_view