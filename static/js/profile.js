document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('studentConnect_isLoggedIn');
    // if (!isLoggedIn) {
    //     window.location.href = 'index.html';
    //     return;
    // }
    
    // Profile form handler
    const profileForm = document.getElementById('profile');
    if (profileForm) {
        // If user already has a profile, load the data
        const hasProfile = localStorage.getItem('studentConnect_hasProfile');
        if (hasProfile) {
            loadProfileData();
        }
        
        // Handle profile form submission
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const university = document.getElementById('university').value;
            const major = document.getElementById('major').value;
            const year = document.getElementById('year').value;
            const skillsInput = document.getElementById('skills').value;
            const interestsInput = document.getElementById('interests').value;
            const bio = document.getElementById('bio').value;
            const projects = document.getElementById('projects').value;
            
            // Validate required fields
            if (!university || !major || !year) {
                showAlert('Please fill in all required fields', 'error');
                return;
            }
            
            // Process skills and interests into arrays
            const skills = skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill);
            const interests = interestsInput.split(',').map(interest => interest.trim()).filter(interest => interest);
            
            // In a real app, you would send this data to a server
            // For this demo, we'll store it in local storage
            const profileData = {
                university,
                major,
                year,
                skills,
                interests,
                bio,
                projects
            };
            
            saveProfileData(profileData);
        });
        
        // Handle image upload preview
        const avatarInput = document.getElementById('avatar');
        const avatarPreview = document.getElementById('preview');
        
        avatarInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    avatarPreview.src = e.target.result;
                    // Store the image in local storage (in a real app, this would be uploaded to a server)
                    localStorage.setItem('studentConnect_profileImage', e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Tags functionality for skills
        const skillsInput = document.getElementById('skills');
        const skillsTags = document.getElementById('skills-tags');
        
        if (skillsInput) {
            // Add tags when user presses Enter or comma
            skillsInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    addSkillTag();
                }
            });
            
            // Add tag when input loses focus
            skillsInput.addEventListener('blur', function() {
                addSkillTag();
            });
            
            function addSkillTag() {
                const value = skillsInput.value.trim();
                if (value) {
                    // Add tag to the container
                    const tag = document.createElement('span');
                    tag.className = 'tag';
                    tag.textContent = value;
                    
                    // Add remove button
                    const removeBtn = document.createElement('span');
                    removeBtn.className = 'remove-tag';
                    removeBtn.innerHTML = '&times;';
                    removeBtn.addEventListener('click', function() {
                        tag.remove();
                        updateSkillsInput();
                    });
                    
                    tag.appendChild(removeBtn);
                    skillsTags.appendChild(tag);
                    
                    // Clear input
                    skillsInput.value = '';
                    
                    // Update hidden input with all tags
                    updateSkillsInput();
                }
            }
            
            function updateSkillsInput() {
                const tags = Array.from(skillsTags.querySelectorAll('.tag'))
                    .map(tag => tag.textContent.replace('×', '').trim());
                skillsInput.value = tags.join(', ');
            }
        }
        
        // Tags functionality for interests (similar to skills)
        const interestsInput = document.getElementById('interests');
        const interestsTags = document.getElementById('interests-tags');
        
        if (interestsInput) {
            interestsInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    addInterestTag();
                }
            });
            
            interestsInput.addEventListener('blur', function() {
                addInterestTag();
            });
            
            function addInterestTag() {
                const value = interestsInput.value.trim();
                if (value) {
                    const tag = document.createElement('span');
                    tag.className = 'tag';
                    tag.textContent = value;
                    
                    const removeBtn = document.createElement('span');
                    removeBtn.className = 'remove-tag';
                    removeBtn.innerHTML = '&times;';
                    removeBtn.addEventListener('click', function() {
                        tag.remove();
                        updateInterestsInput();
                    });
                    
                    tag.appendChild(removeBtn);
                    interestsTags.appendChild(tag);
                    interestsInput.value = '';
                    updateInterestsInput();
                }
            }
            
            function updateInterestsInput() {
                const tags = Array.from(interestsTags.querySelectorAll('.tag'))
                    .map(tag => tag.textContent.replace('×', '').trim());
                interestsInput.value = tags.join(', ');
            }
        }
    }
});

// Load profile data from local storage
function loadProfileData() {
    const profileData = JSON.parse(localStorage.getItem('studentConnect_profileData'));
    if (profileData) {
        document.getElementById('university').value = profileData.university || '';
        document.getElementById('major').value = profileData.major || '';
        document.getElementById('year').value = profileData.year || '';
        document.getElementById('skills').value = profileData.skills.join(', ') || '';
        document.getElementById('interests').value = profileData.interests.join(', ') || '';
        document.getElementById('bio').value = profileData.bio || '';
        document.getElementById('projects').value = profileData.projects || '';
        
        // Populate skills tags
        const skillsTags = document.getElementById('skills-tags');
        if (skillsTags) {
            profileData.skills.forEach(skill => {
                if (skill.trim() !== '') {
                    const tag = document.createElement('span');
                    tag.className = 'tag';
                    tag.textContent = skill;
                    
                    const removeBtn = document.createElement('span');
                    removeBtn.className = 'remove-tag';
                    removeBtn.innerHTML = '&times;';
                    removeBtn.addEventListener('click', function() {
                        tag.remove();
                        updateInput('skills', 'skills-tags');
                    });
                    
                    tag.appendChild(removeBtn);
                    skillsTags.appendChild(tag);
                }
            });
        }
        
        // Populate interests tags
        const interestsTags = document.getElementById('interests-tags');
        if (interestsTags) {
            profileData.interests.forEach(interest => {
                if (interest.trim() !== '') {
                    const tag = document.createElement('span');
                    tag.className = 'tag';
                    tag.textContent = interest;
                    
                    const removeBtn = document.createElement('span');
                    removeBtn.className = 'remove-tag';
                    removeBtn.innerHTML = '&times;';
                    removeBtn.addEventListener('click', function() {
                        tag.remove();
                        updateInput('interests', 'interests-tags');
                    });
                    
                    tag.appendChild(removeBtn);
                    interestsTags.appendChild(tag);
                }
            });
        }
    }
    
    // Load profile image if exists
    const profileImage = localStorage.getItem('studentConnect_profileImage');
    if (profileImage) {
        document.getElementById('preview').src = profileImage;
    }
}

// Update input field when tags are removed
function updateInput(inputId, tagsContainerId) {
    const input = document.getElementById(inputId);
    const tagsContainer = document.getElementById(tagsContainerId);
    
    if (input && tagsContainer) {
        const tags = Array.from(tagsContainer.querySelectorAll('.tag'))
            .map(tag => tag.textContent.replace('×', '').trim());
        input.value = tags.join(', ');
    }
}

// Save profile data to local storage
function saveProfileData(profileData) {
    // In a real app, this would be sent to a server
    // For this demo, we'll store it in local storage
    localStorage.setItem('studentConnect_profileData', JSON.stringify(profileData));
    localStorage.setItem('studentConnect_hasProfile', 'true');
    
    // Show success message
    showAlert('Profile saved successfully!', 'success');
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
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
    
    // Style the alert based on type
    if (type === 'success') {
        alertDiv.style.backgroundColor = '#d4edda';
        alertDiv.style.color = '#155724';
        alertDiv.style.border = '1px solid #c3e6cb';
    } else if (type === 'error') {
        alertDiv.style.backgroundColor = '#f8d7da';
        alertDiv.style.color = '#721c24';
        alertDiv.style.border = '1px solid #f5c6cb';
    }
    
    alertDiv.style.padding = '10px 15px';
    alertDiv.style.marginBottom = '20px';
    alertDiv.style.borderRadius = '4px';
    
    // Remove after 3 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}