def check_connection(user_score,other_users_score):
    if abs(float(user_score)-float(other_users_score))<=20.00:
        return True
    else:
        return False