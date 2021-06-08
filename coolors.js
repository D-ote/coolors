var hidden = document.querySelector('.hidden');

const toggleNavItems = () => {
  if (hidden.style.display === "block") {
    hidden.style.display = "none";
  } else {
    hidden.style.display = "block";
  }
}

const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.navlinks');
  const navLinks = document.querySelectorAll('.navlinks li');

  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = ''
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
      }
    });
    burger.classList.toggle('toggle');

  });
}

navSlide();