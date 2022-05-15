////////
// init
window.onload = () => {
	menuAndBackToTopStatus();
	activeMenuAtCurrentSection();
	sliderInit();
	removeLoader();
};
//////////
// scroll
window.addEventListener('scroll', () => {
	menuAndBackToTopStatus();
	activeMenuAtCurrentSection();
});
//////////////////////////////////////
// resizing fixer (close mobile menu)
window.addEventListener('resize', () => {
	if (innerWidth >= 1025) {
		document.body.classList.remove('nav-expanded');
	}
});
/////////////////
// remove loader
function removeLoader() {
	document.querySelector('body .loader').style.animation = "MenuAppear .8s reverse";
	setTimeout(() => {
		document.body.classList.remove('active-loader');
	}, 800);
}
///////////////////////////////
// menu and back to top status
function menuAndBackToTopStatus() {
	let scrollLine = scrollY + (innerHeight / 2);
	let navScrollClass = document.querySelector('body nav');
	let homeSection = document.querySelector('section#home');
	
	if (scrollLine >= (homeSection.offsetHeight) && !(navScrollClass.classList.contains('scroll'))) {
		navScrollClass.classList.add('scroll');
		document.querySelector('#backToTopButton').classList.remove('hidden');
	} else if (scrollLine < (homeSection.offsetHeight) && navScrollClass.classList.contains('scroll')) {
		navScrollClass.classList.remove('scroll');
		document.querySelector('#backToTopButton').classList.add('hidden');
	}
}

/////////////////////////////////////////////////
// menu active status
function activeMenuAtCurrentSection() {
	let scrollLine = scrollY + (innerHeight / 2);
	document.querySelectorAll('section').forEach(sectionItem => {
		const menuItem = document.querySelector(`.menu a.navlink[href*="${sectionItem.getAttribute('id')}"]`);
		((scrollLine >= sectionItem.offsetTop && scrollLine <= (sectionItem.offsetTop + sectionItem.offsetHeight)) ? menuItem.classList.add('active') : menuItem.classList.remove('active'));
	});
};

/////////////////////
// mobile nav expand
document.querySelector('.menu-open').addEventListener('click', () => {
	document.body.classList.add('nav-expanded');
});
document.querySelector('.menu-close').addEventListener('click', () => {
	document.body.classList.remove('nav-expanded');
});
document.querySelectorAll('nav div .menu a.navlink').forEach(menuItem => {
	menuItem.addEventListener('click', () => { 
		document.body.classList.remove('nav-expanded');
		menuAndBackToTopStatus();
	});
});

//////////
// SLIDER
let currentSlide;
const newSlider = document.querySelector('.new-slider-carousel');
const sliderChildrenQuantity = newSlider.children.length - 1;

function sliderInit() {
	currentSlide = 0;
	newSlider.scrollLeft = 0;
	document.querySelectorAll('.new-slider-btn').forEach((eachSliderBtn) => {
		eachSliderBtn.addEventListener('click', () => {
			sliderControl(eachSliderBtn);
		});
	});
}

function sliderControl(element) {
	if (currentSlide <= 0 && element.classList.contains('prev')) {
		newSlider.scrollLeft = newSlider.clientWidth * sliderChildrenQuantity;
		currentSlide = sliderChildrenQuantity;
	} else if(currentSlide >= sliderChildrenQuantity && element.classList.contains('next')) {
		newSlider.scrollLeft = 0;
		currentSlide = 0;
	} else if (element.classList.contains('prev')) {
		newSlider.scrollLeft -= newSlider.clientWidth;
		currentSlide--;
	} else {
		newSlider.scrollLeft += newSlider.clientWidth;
		currentSlide++;
	}
	console.log(currentSlide);
}

//////////////////
// WhatsApp Close
document.querySelector('#whatsapp .message span').addEventListener('click', () => {
	document.querySelector('#whatsapp .message').style.display = 'none';
});

// Scroll Reveal
ScrollReveal({
	origin: 'top',
	distance: '30px',
	duration: 700
}).reveal(`
  #home,
  #home .stat, 
  #about,
  #about .img-box-1,
  #about .img-box-2,
  #about .col-b,
  #features,
  #features header,
  #features .cards,
  #testimonials,
  #testimonials .wrapper,
  #testimonials .slider-carrousel,
  #areas,
  #areas .col-a,
  #areas .col-b,
  #contact,
  #contact .wrapper,
  footer,
  footer .col-a,
  footer .col-b
`);