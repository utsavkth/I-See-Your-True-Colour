// =========================
// Navbar Toggle (Mobile)
// =========================

// Get the hamburger and nav links elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Toggle the mobile menu when hamburger is clicked
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Close the mobile menu when a nav link is clicked
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});
