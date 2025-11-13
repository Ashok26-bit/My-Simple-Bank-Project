// Show/Hide sections
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// Default: Show home section on load
document.addEventListener('DOMContentLoaded', function() {
    showSection('home');
    calculateEMI(); // Initialize EMI calculator
});

// Account Form Submission
function submitAccountForm(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const primaryDoc = document.getElementById('primaryDoc').value;

    const formData = {
        fullName: fullName,
        email: email,
        phone: phone,
        primaryDoc: primaryDoc,
        timestamp: new Date().toISOString()
    };

    // Send to backend
    fetch('/api/account-interest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById('formMessage');
        if (data.success) {
            messageDiv.classList.add('success');
            messageDiv.classList.remove('error');
            messageDiv.textContent = '✓ Thank you! We will contact you shortly.';
            document.querySelector('.account-form').reset();
        } else {
            messageDiv.classList.add('error');
            messageDiv.classList.remove('success');
            messageDiv.textContent = '✗ Error submitting form. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const messageDiv = document.getElementById('formMessage');
        messageDiv.classList.add('error');
        messageDiv.classList.remove('success');
        messageDiv.textContent = '✗ Error submitting form. Please try again.';
    });
}

// Contact Form Submission
function submitContactForm(event) {
    event.preventDefault();

    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const phone = document.getElementById('contactPhone').value;
    const queryType = document.getElementById('contactQuery').value;
    const message = document.getElementById('message').value;

    const formData = {
        name: name,
        email: email,
        phone: phone,
        queryType: queryType,
        message: message,
        timestamp: new Date().toISOString()
    };

    // Send to backend
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById('contactMessage');
        if (data.success) {
            messageDiv.classList.add('success');
            messageDiv.classList.remove('error');
            messageDiv.textContent = '✓ Message sent successfully! We will get back to you soon.';
            document.querySelector('.contact-form').reset();
        } else {
            messageDiv.classList.add('error');
            messageDiv.classList.remove('success');
            messageDiv.textContent = '✗ Error sending message. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const messageDiv = document.getElementById('contactMessage');
        messageDiv.classList.add('error');
        messageDiv.classList.remove('success');
        messageDiv.textContent = '✗ Error sending message. Please try again.';
    });
}

// EMI Calculator
function calculateEMI() {
    const principal = parseFloat(document.getElementById('loanAmount').value) || 0;
    const rate = parseFloat(document.getElementById('interestRate').value) || 0;
    const time = parseFloat(document.getElementById('tenure').value) || 1;

    if (principal <= 0 || rate < 0 || time <= 0) {
        document.getElementById('emiResult').textContent = '₹0';
        document.getElementById('totalResult').textContent = '₹0';
        return;
    }

    // EMI Calculation Formula
    const monthlyRate = rate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, time)) / 
                (Math.pow(1 + monthlyRate, time) - 1);
    const totalAmount = emi * time;

    // Display results with proper formatting
    document.getElementById('emiResult').textContent = '₹' + Math.round(emi).toLocaleString('en-IN');
    document.getElementById('totalResult').textContent = '₹' + Math.round(totalAmount).toLocaleString('en-IN');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});
