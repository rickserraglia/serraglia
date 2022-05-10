// init
window.onload = function () {
	menuAndBackToTopStatus();
	activeMenuAtCurrentSection();
	sliderUpdate();
};
// scroll
window.addEventListener('scroll', function () {
	menuAndBackToTopStatus();
	activeMenuAtCurrentSection();
});
// resizing fixer (close mobile menu)
window.addEventListener('resize', function () {
	sliderUpdate();
	if (innerWidth >= 1025) {
		document.body.classList.remove('nav-expanded');
	}
});
// menu and back to top status
function menuAndBackToTopStatus() {
	let navScrollClass = document.querySelector('body nav');
	if (window.scrollY > 0 && !(navScrollClass.classList.contains('scroll'))) {
		navScrollClass.classList.add('scroll');
		document.querySelector('#backToTopButton').classList.remove('hidden');
	} else if (window.scrollY == 0 && navScrollClass.classList.contains('scroll')) {
		navScrollClass.classList.remove('scroll');
		document.querySelector('#backToTopButton').classList.add('hidden');
	}
}


// menu active status (only on desktop >= 1024px)
function activeMenuAtCurrentSection() {
	if (innerWidth >= 1024) {
		const scrollLine = scrollY + (innerHeight / 2);
		document.querySelectorAll('section').forEach(sectionItem => {
			const menuItem = document.querySelector(`.menu a.navlink[href*="${sectionItem.getAttribute('id')}"]`);
			((scrollLine >= sectionItem.offsetTop && scrollLine <= (sectionItem.offsetTop + sectionItem.offsetHeight)) ? menuItem.classList.add('active') : menuItem.classList.remove('active'));
		});
	}
};

// mobile nav expand
document.querySelector('.menu-open').addEventListener('click', function () {
	document.body.classList.add('nav-expanded');
});
document.querySelector('.menu-close').addEventListener('click', function () {
	document.body.classList.remove('nav-expanded');
});
document.querySelectorAll('nav div .menu a.navlink').forEach(menuItem => {
	menuItem.addEventListener('click', () => document.body.classList.remove('nav-expanded'));
});

// slider
const slider = document.querySelector('.slider');
let currentSlide = 0;
let sliderQuantity = document.querySelectorAll('.slider-item').length;

function sliderUpdate() {
	document.querySelector('.slider-carrousel').style.width = `calc(${slider.clientWidth}px * ${sliderQuantity})`;
	document.querySelector('.slider-controls').style.width = `${slider.clientWidth}px`;
	document.querySelector('.slider-controls').style.height = `${slider.clientHeight}px`;
	currentSlide = 0;
	updateCarrousel();
}

function updateCarrousel() {
		let newMargin = (currentSlide * slider.clientWidth);
		document.querySelector('.slider-carrousel').style.marginLeft = `-${newMargin}px`;
}

document.querySelectorAll('.slider-control').forEach(function (sliderItem) {
	sliderItem.addEventListener('click', function () {
		if (sliderItem.classList.contains('prev')) {
			currentSlide--;
			if (currentSlide < 0) {
				currentSlide = sliderQuantity - 1;
			}
			updateCarrousel();
		} else {
			currentSlide++;
			if (currentSlide > (sliderQuantity - 1)) {
				currentSlide = 0;
			}
			updateCarrousel();
		}
	});
	
});

// WhatsApp Close
document.querySelector('#whatsapp .message span').addEventListener('click', function () {
	document.querySelector('#whatsapp .message').style.display = 'none';
});