document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('studentConnect_isLoggedIn');
    
    // Get the current page
    const currentPage = window.location.pathname.split('/').pop();
    
    // Redirect logic
    if (isLoggedIn && (currentPage === 'index.html' || currentPage === 'register.html')) {
        window.location.href = 'dashboard.html';
    } else if (!isLoggedIn && 
        currentPage !== 'index.html' && 
        currentPage !== 'register.html' && 
        currentPage !== '') {
        window.location.href = 'index.html';
    }
    
    // Login form handler
    const loginForm = document.getElementById('login');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Validate university email
            if (!validateUniversityEmail(email)) {
                showAlert('Please use a valid university email address (.edu)', 'error');
                return;
            }
            
            // In a real app, you would send these credentials to a server
            // For this demo, we'll simulate a successful login
            simulateLogin(email, password);
        });
    }
    
    // Registration form handler
    const registerForm = document.getElementById('register');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const termsAccepted = document.getElementById('terms').checked;
            
            // Validate university email
            if (!validateUniversityEmail(email)) {
                showAlert('Please use a valid university email address (.edu)', 'error');
                return;
            }
            
            // Password validation
            if (password.length < 8) {
                showAlert('Password must be at least 8 characters long', 'error');
                return;
            }
            
            // Password match check
            if (password !== confirmPassword) {
                showAlert('Passwords do not match', 'error');
                return;
            }
            
            // Terms acceptance check
            if (!termsAccepted) {
                showAlert('You must accept the terms of service', 'error');
                return;
            }
            
            // In a real app, you would send this data to a server
            // For this demo, we'll simulate a successful registration
            const userData = {
                firstName,
                lastName,
                email,
                password
            };
            
            simulateRegistration(userData);
        });
    }
    
    // Logout functionality
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
});

// Validate university email (basic check for .edu domain)
function validateUniversityEmail(email) {
    return email.toLowerCase().endsWith('.edu');
}

// Simulate login (in a real app, this would be an API call)
function simulateLogin(email, password) {
    // Simulate server delay
    setTimeout(() => {
        // For demo purposes, any credentials will work
        localStorage.setItem('studentConnect_isLoggedIn', 'true');
        localStorage.setItem('studentConnect_userEmail', email);
        localStorage.setItem('studentConnect_userName', email.split('@')[0]);
        
        // Redirect to profile page if first time, otherwise dashboard
        const hasProfile = localStorage.getItem('studentConnect_hasProfile');
        if (hasProfile) {
            window.location.href = 'dashboard.html';
        } else {
            window.location.href = 'profile.html';
        }
    }, 1000);
}

// Simulate registration (in a real app, this would be an API call)
function simulateRegistration(userData) {
    // Simulate server delay
    setTimeout(() => {
        // Store user data in local storage (for demo purposes only)
        localStorage.setItem('studentConnect_isLoggedIn', 'true');
        localStorage.setItem('studentConnect_userEmail', userData.email);
        localStorage.setItem('studentConnect_userName', `${userData.firstName} ${userData.lastName}`);
        
        // Redirect to profile creation
        window.location.href = 'profile.html';
    }, 1000);
}

// Logout function
function logout() {
    localStorage.removeItem('studentConnect_isLoggedIn');
    window.location.href = 'index.html';
}

// Show alert message
function showAlert(message, type) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Find where to insert the alert
    const form = document.querySelector('form');
    form.parentNode.insertBefore(alertDiv, form);
    
    // Remove after 3 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}