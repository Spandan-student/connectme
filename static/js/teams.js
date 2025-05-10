document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('studentConnect_isLoggedIn');
    // if (!isLoggedIn) {
    //     window.location.href = 'index.html';
    //     return;
    // }
    
    // Load user data
    loadUserData();
    
    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to this tab
            this.classList.add('active');
            
            // Hide all tab content
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Show the selected tab content
            const tabId = this.getAttribute('data-tab');
            const activeContent = document.getElementById(tabId);
            if (activeContent) {
                activeContent.style.display = 'block';
            }
        });
    });
    
    // Modal functionality for Create Team
    const createTeamBtn = document.getElementById('create-team-btn');
    const createTeamModal = document.getElementById('create-team-modal');
    const createTeamClose = createTeamModal.querySelector('.close');
    
    if (createTeamBtn && createTeamModal) {
        createTeamBtn.addEventListener('click', function() {
            createTeamModal.style.display = 'block';
        });
        
        createTeamClose.addEventListener('click', function() {
            createTeamModal.style.display = 'none';
        });
    }
    
    // Modal functionality for Join Team
    const joinTeamBtn = document.getElementById('join-team-btn');
    const joinTeamModal = document.getElementById('join-team-modal');
    const joinTeamClose = joinTeamModal.querySelector('.close');
    
    if (joinTeamBtn && joinTeamModal) {
        joinTeamBtn.addEventListener('click', function() {
            joinTeamModal.style.display = 'block';
        });
        
        joinTeamClose.addEventListener('click', function() {
            joinTeamModal.style.display = 'none';
        });
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === createTeamModal) {
            createTeamModal.style.display = 'none';
        }
        if (event.target === joinTeamModal) {
            joinTeamModal.style.display = 'none';
        }
    });
    
    // Create team form handler
    const createTeamForm = document.getElementById('create-team-form');
    if (createTeamForm) {
        createTeamForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const teamName = document.getElementById('team-name').value;
            const teamDescription = document.getElementById('team-description').value;
            const teamSkillsInput = document.getElementById('team-skills').value;
            const teamMaxMembers = document.getElementById('team-max-members').value;
            const teamVisibility = document.getElementById('team-visibility').value;
            
            // Process skills into an array
            const teamSkills = teamSkillsInput.split(',').map(skill => skill.trim()).filter(skill => skill);
            
            // In a real app, this would send the data to a server
            // For this demo, we'll simulate creating a team
            const teamData = {
                name: teamName,
                description: teamDescription,
                skills: teamSkills,
                maxMembers: teamMaxMembers,
                visibility: teamVisibility
            };
            
            createTeam(teamData);
        });
        
        // Tags functionality for team skills
        const teamSkillsInput = document.getElementById('team-skills');
        const teamSkillsTags = document.getElementById('team-skills-tags');
        
        if (teamSkillsInput) {
            teamSkillsInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    addTeamSkillTag();
                }
            });
            
            teamSkillsInput.addEventListener('blur', function() {
                addTeamSkillTag();
            });
            
            function addTeamSkillTag() {
                const value = teamSkillsInput.value.trim();
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
                    teamSkillsTags.appendChild(tag);
                    
                    // Clear input
                    teamSkillsInput.value = '';
                    
                    // Update hidden input with all tags
                    updateSkillsInput();
                }
            }
            
            function updateSkillsInput() {
                const tags = Array.from(teamSkillsTags.querySelectorAll('.tag'))
                    .map(tag => tag.textContent.replace('×', '').trim());
                teamSkillsInput.value = tags.join(', ');
            }
        }
    }
    
    // Join team form handler
    const joinTeamForm = document.getElementById('join-team-form');
    if (joinTeamForm) {
        joinTeamForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const teamCode = document.getElementById('team-code').value;
            
            // In a real app, this would verify the code with a server
            // For this demo, we'll simulate joining a team
            joinTeam(teamCode);
        });
    }
    
    // Handle team actions in the teams list
    setupTeamActionHandlers();
    
    // Handle logout
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
});

// Load user data from local storage
function loadUserData() {
    const userAvatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');
    const userMajor = document.getElementById('user-major');
    
    // Get user data from local storage
    const storedName = localStorage.getItem('studentConnect_userName');
    const storedEmail = localStorage.getItem('studentConnect_userEmail');
    const profileData = JSON.parse(localStorage.getItem('studentConnect_profileData'));
    
    // Update UI
    if (userName) {
        userName.textContent = storedName || 'User';
    }
    
    if (profileData && userMajor) {
        userMajor.textContent = `${profileData.major}, ${getYearText(profileData.year)}`;
    }
    
    // If user has uploaded a profile image
    const profileImage = localStorage.getItem('studentConnect_profileImage');
    if (profileImage && userAvatar) {
        userAvatar.src = profileImage;
    }
}

// Convert year value to text
function getYearText(year) {
    const yearMap = {
        '1': '1st Year',
        '2': '2nd Year',
        '3': '3rd Year',
        '4': '4th Year',
        '5+': '5+ Year',
        'grad': 'Graduate'
    };
    return yearMap[year] || year;
}

// Create a new team
function createTeam(teamData) {
    // In a real app, this would send the data to a server
    // For this demo, we'll just show a success message and reset the modal
    
    alert(`Team "${teamData.name}" has been created successfully!`);
    
    // Close the modal
    const createTeamModal = document.getElementById('create-team-modal');
    if (createTeamModal) {
        createTeamModal.style.display = 'none';
    }
    
    // Reset the form
    const createTeamForm = document.getElementById('create-team-form');
    if (createTeamForm) {
        createTeamForm.reset();
    }
    
    // Clear the tags container
    const teamSkillsTags = document.getElementById('team-skills-tags');
    if (teamSkillsTags) {
        teamSkillsTags.innerHTML = '';
    }
    
    // In a real app, we would refresh the teams list here
}

// Join an existing team
function joinTeam(teamCode) {
    // In a real app, this would verify the code with a server
    // For this demo, we'll just show a success message and reset the modal
    
    if (teamCode === 'DEMO123') {
        alert(`You have successfully joined the Mobile App Development team!`);
        
        // Close the modal
        const joinTeamModal = document.getElementById('join-team-modal');
        if (joinTeamModal) {
            joinTeamModal.style.display = 'none';
        }
        
        // Reset the form
        const joinTeamForm = document.getElementById('join-team-form');
        if (joinTeamForm) {
            joinTeamForm.reset();
        }
        
        // In a real app, we would refresh the teams list here
    } else {
        alert('Invalid team code. Please try again.');
    }
}

// Setup handlers for team actions
function setupTeamActionHandlers() {
    // Apply to join team buttons
    const applyButtons = document.querySelectorAll('.team-actions .btn.primary');
    applyButtons.forEach(button => {
        if (button.textContent.includes('Apply')) {
            button.addEventListener('click', function() {
                const teamName = this.closest('.team-card').querySelector('h2').textContent;
                applyToTeam(teamName);
            });
        }
    });
    
    // Contact team lead buttons
    const contactButtons = document.querySelectorAll('.team-actions .btn.outline');
    contactButtons.forEach(button => {
        if (button.textContent.includes('Contact')) {
            button.addEventListener('click', function() {
                const teamName = this.closest('.team-card').querySelector('h2').textContent;
                const teamLead = this.closest('.team-card').querySelector('.member-info h5').textContent.replace(' (Team Lead)', '');
                contactTeamLead(teamName, teamLead);
            });
        }
    });
    
    // Team workspace buttons
    const workspaceButtons = document.querySelectorAll('.team-actions .btn.primary');
    workspaceButtons.forEach(button => {
        if (button.textContent.includes('Workspace')) {
            button.addEventListener('click', function() {
                const teamName = this.closest('.team-card').querySelector('h2').textContent;
                openTeamWorkspace(teamName);
            });
        }
    });
    
    // Invite members buttons
    const inviteButtons = document.querySelectorAll('.team-actions .btn.secondary');
    inviteButtons.forEach(button => {
        if (button.textContent.includes('Invite')) {
            button.addEventListener('click', function() {
                const teamName = this.closest('.team-card').querySelector('h2').textContent;
                inviteMembers(teamName);
            });
        }
    });
}

// Apply to join a team
function applyToTeam(teamName) {
    // In a real app, this would send an application to the team lead
    alert(`Application to join "${teamName}" has been sent!`);
}

// Contact a team lead
function contactTeamLead(teamName, teamLead) {
    // In a real app, this would open a messaging interface
    alert(`Opening message window to contact ${teamLead} about "${teamName}"`);
}

// Open team workspace
function openTeamWorkspace(teamName) {
    // In a real app, this would redirect to the team workspace
    alert(`Opening workspace for "${teamName}"`);
}

// Invite members to a team
function inviteMembers(teamName) {
    // In a real app, this would open an interface to invite members
    const teamCode = 'TEAM' + Math.floor(1000 + Math.random() * 9000);
    alert(`Share this code with students you want to invite to "${teamName}": ${teamCode}`);
}

// Logout function
function logout() {
    localStorage.removeItem('studentConnect_isLoggedIn');
    window.location.href = 'index.html';
}