document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('studentConnect_isLoggedIn');
    // if (!isLoggedIn) {
    //     window.location.href = 'index.html';
    //     return;
    // }
    
    // Load user data
    loadUserData();
    
    // Load recommended students
    loadRecommendedStudents();
    
    // Load user teams
    loadTeams();
    
    // Load project ideas
    loadProjectIdeas();
    
    // Handle logout
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
    
    // Handle search functionality
    const searchBar = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch(searchBar.value);
        });
    }
    
    if (searchBar) {
        searchBar.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchBar.value);
            }
        });
    }
    
    // Handle notifications
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            toggleNotifications();
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

// Load recommended students based on user's interests and skills
function loadRecommendedStudents() {
    // In a real app, this would be an API call to get personalized recommendations
    // For this demo, we'll show static data
    
    // Demo data for recommended students
    const recommendedStudents = [
        {
            name: 'Alex Johnson',
            avatar: 'img/default-avatar.png',
            major: 'Computer Science',
            year: '3rd Year',
            skills: ['Python', 'Machine Learning', 'Data Science']
        },
        {
            name: 'Emily Wong',
            avatar: 'img/default-avatar.png',
            major: 'UX Design',
            year: '2nd Year',
            skills: ['UI Design', 'Figma', 'User Research']
        },
        {
            name: 'Marcus Chen',
            avatar: 'img/default-avatar.png',
            major: 'Computer Engineering',
            year: '4th Year',
            skills: ['C++', 'Hardware', 'IoT']
        }
    ];
    
    // Get container
    const studentsList = document.querySelector('.students-list');
    if (!studentsList) return;
    
    // Clear current content
    studentsList.innerHTML = '';
    
    // Add students to the list
    recommendedStudents.forEach(student => {
        const studentCard = document.createElement('div');
        studentCard.className = 'student-card';
        
        const skillTags = student.skills.map(skill => `<span class="tag">${skill}</span>`).join('');
        
        studentCard.innerHTML = `
            <img src="${student.avatar}" alt="${student.name}">
            <div class="student-info">
                <h3>${student.name}</h3>
                <p>${student.major}, ${student.year}</p>
                <div class="tags">
                    ${skillTags}
                </div>
            </div>
            <button class="btn secondary">Connect</button>
        `;
        
        studentsList.appendChild(studentCard);
        
        // Add connect button functionality
        const connectBtn = studentCard.querySelector('.btn.secondary');
        connectBtn.addEventListener('click', function() {
            connectWithStudent(student.name);
        });
    });
}

// Function to handle connecting with a student
function connectWithStudent(studentName) {
    alert(`Connection request sent to ${studentName}!`);
    // In a real app, this would send a connection request to the server
}

// Load user teams
function loadTeams() {
    // In a real app, this would be an API call to get user's teams
    // For this demo, we'll show static data
    
    // Demo data for user teams
    const userTeams = [
        {
            name: 'Web App Development',
            description: 'Building a student connection platform',
            members: [
                { name: 'You', avatar: 'img/default-avatar.png' },
                { name: 'Jane Smith', avatar: 'img/default-avatar.png' },
                { name: 'Mike Johnson', avatar: 'img/default-avatar.png' },
                { name: 'Sarah Lee', avatar: 'img/default-avatar.png' },
                { name: 'David Chen', avatar: 'img/default-avatar.png' }
            ]
        },
        {
            name: 'Machine Learning Study Group',
            description: 'Learning ML concepts and applications',
            members: [
                { name: 'Alex Wong', avatar: 'img/default-avatar.png' },
                { name: 'You', avatar: 'img/default-avatar.png' },
                { name: 'Priya Patel', avatar: 'img/default-avatar.png' }
            ]
        }
    ];
    
    // Get container
    const teamsList = document.querySelector('.teams-list');
    if (!teamsList) return;
    
    // Clear current content
    teamsList.innerHTML = '';
    
    // Add teams to the list
    userTeams.forEach(team => {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';
        
        // Create member avatars (limit to 4 with +X for the rest)
        let membersHTML = '';
        const visibleMembers = team.members.slice(0, 4);
        const remainingMembers = team.members.length - 4;
        
        visibleMembers.forEach(member => {
            membersHTML += `<img src="${member.avatar}" alt="Team member" title="${member.name}">`;
        });
        
        if (remainingMembers > 0) {
            membersHTML += `<span class="more-members">+${remainingMembers}</span>`;
        }
        
        teamCard.innerHTML = `
            <h3>${team.name}</h3>
            <p>${team.description}</p>
            <div class="team-members">
                ${membersHTML}
            </div>
            <a href="#" class="btn secondary">View Team</a>
        `;
        
        teamsList.appendChild(teamCard);
        
        // Add view team button functionality
        const viewTeamBtn = teamCard.querySelector('.btn.secondary');
        viewTeamBtn.addEventListener('click', function(e) {
            e.preventDefault();
            viewTeam(team.name);
        });
    });
}

// Function to handle viewing a team
function viewTeam(teamName) {
    // In a real app, this would redirect to the team's page or open a modal with team details
    window.location.href = 'teams.html';
}

// Load project ideas
function loadProjectIdeas() {
    // In a real app, this would be an API call to get project ideas
    // For this demo, we'll show static data
    
    // Demo data for project ideas
    const projectIdeas = [
        {
            title: 'AR Campus Navigation App',
            description: 'Help students navigate campus using AR technology',
            tags: ['Mobile Dev', 'AR/VR', 'UI/UX']
        },
        {
            title: 'Student Marketplace Platform',
            description: 'Create a platform for students to buy and sell used textbooks and supplies',
            tags: ['Web Dev', 'E-commerce', 'Database']
        },
        {
            title: 'Virtual Study Group Coordinator',
            description: 'An app that helps students form virtual study groups based on courses and availability',
            tags: ['Web Dev', 'Scheduling', 'Algorithm']
        }
    ];
    
    // Get container
    const ideasList = document.querySelector('.ideas-list');
    if (!ideasList) return;
    
    // Clear current content
    ideasList.innerHTML = '';
    
    // Add ideas to the list
    projectIdeas.forEach(idea => {
        const ideaCard = document.createElement('div');
        ideaCard.className = 'idea-card';
        
        const tagElements = idea.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        ideaCard.innerHTML = `
            <h3>${idea.title}</h3>
            <p>${idea.description}</p>
            <div class="tags">
                ${tagElements}
            </div>
            <div class="idea-actions">
                <button class="btn secondary small">Interested</button>
                <button class="btn outline small">Share</button>
            </div>
        `;
        
        ideasList.appendChild(ideaCard);
        
        // Add button functionality
        const interestedBtn = ideaCard.querySelector('.btn.secondary');
        interestedBtn.addEventListener('click', function() {
            showInterest(idea.title);
        });
        
        const shareBtn = ideaCard.querySelector('.btn.outline');
        shareBtn.addEventListener('click', function() {
            shareIdea(idea.title);
        });
    });
}

// Function to handle showing interest in a project idea
function showInterest(ideaTitle) {
    alert(`You've expressed interest in: ${ideaTitle}. We'll notify you when others are interested too!`);
    // In a real app, this would register the user's interest in the database
}

// Function to handle sharing a project idea
function shareIdea(ideaTitle) {
    // In a real app, this would open a sharing dialog
    alert(`Share ${ideaTitle} with your friends!`);
}

// Function to perform search
function performSearch(query) {
    if (!query || query.trim() === '') {
        alert('Please enter a search term');
        return;
    }
    
    // In a real app, this would redirect to a search results page or make an API call
    alert(`Searching for: ${query}`);
}

// Function to toggle notifications
function toggleNotifications() {
    // In a real app, this would open a notifications panel
    alert('You have no new notifications');
}

// Logout function
function logout() {
    localStorage.removeItem('studentConnect_isLoggedIn');
    window.location.href = 'index.html';
}