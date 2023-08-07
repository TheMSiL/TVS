const scrollToSection = () => {
	const slides = document.querySelectorAll('.slide');
	const progressBarCounter = document.querySelector('.progress-bar_counter');
	const headerHeight = document.querySelector('.header').offsetHeight;

	slides.forEach((item, index) => {
		item.addEventListener('click', event => scrollSection(event, index));
	});

	//scroll to section slider
	function scrollSection(event, index) {
		event.preventDefault();
		const targetId = slides[index].getAttribute('href');
		const targetSection = document.querySelector(targetId);

		const targetPosition =
			targetSection.getBoundingClientRect().top +
			window.scrollY -
			headerHeight +
			160;

		window.scrollTo({
			top: targetPosition,
			behavior: 'smooth',
		});

		setActiveSlide(index);
		updateProgressBar(index);
	}

	//add .active on click //

	function setActiveSlide(index) {
		const activeSlide = document.querySelector('.slide.active');

		if (activeSlide) {
			activeSlide.classList.remove('active');
		}

		slides[index].classList.add('active');
	}

	//update progress bar on scroll

	function updateProgressBar(index) {
		const progressBarHeight = (index / (slides.length - 1)) * 100 + '%';
		progressBarCounter.style.height = progressBarHeight;
	}

	//add .active on scroll //

	function updateActiveSlideOnScroll() {
		const scrollPosition = window.scrollY;

		slides.forEach((slide, index) => {
			const targetId = slide.getAttribute('href');
			const targetSection = document.querySelector(targetId);
			const targetPosition =
				targetSection.getBoundingClientRect().top + scrollY - headerHeight;

			if (
				targetPosition <= scrollPosition &&
				targetPosition + targetSection.offsetHeight > scrollPosition
			) {
				setActiveSlide(index);
				updateProgressBar(index);
			}
		});
	}

	window.addEventListener('scroll', updateActiveSlideOnScroll);
};

scrollToSection();

// burger menu //

const burgerMenu = () => {
	const burger = document.querySelector('.burger');
	const overlay = document.querySelector('.overlay');

	burger.addEventListener('click', () => {
		burger.classList.toggle('active');
		overlay.style.display = 'flex';

		if (!burger.classList.contains('active')) {
			overlay.style.transform = 'translateY(-100%)';
		} else {
			setTimeout(() => {
				overlay.style.transform = 'translateY(0)';
			}, 0);
		}
	});
};

burgerMenu();

// Slider for persons
const personsItems = document.querySelectorAll('.persons_slider-item');
let currentIndexPersons = 0;

function showPersonsSlide(index, direction) {
	personsItems.forEach((item, i) => {
		item.classList.remove('slideR');
		item.classList.remove('slideL');
		if (i === index) {
			if (direction === 'right') {
				item.classList.add('slideR');
			} else if (direction === 'left') {
				item.classList.add('slideL');
			}
			item.classList.add('active-items');
		} else {
			item.classList.remove('active-items');
		}
	});
}

function nextPersonsSlide(arr) {
	currentIndexPersons++;
	if (currentIndexPersons >= arr.length) {
		currentIndexPersons = 0;
	}
	showPersonsSlide(currentIndexPersons, 'right');
}

function prevPersonsSlide(arr) {
	currentIndexPersons--;
	if (currentIndexPersons < 0) {
		currentIndexPersons = arr.length - 1;
	}
	showPersonsSlide(currentIndexPersons, 'left');
}

const prevPersonsBtn = document.querySelector('.prevBtn');
const nextPersonsBtn = document.querySelector('.nextBtn');
if (nextPersonsBtn) {
	prevPersonsBtn.addEventListener('click', () => {
		prevPersonsSlide(personsItems);
	});
	nextPersonsBtn.addEventListener('click', () => {
		nextPersonsSlide(personsItems);
	});
}

showPersonsSlide(currentIndexPersons);

// // Switch category
// const categories = document.querySelectorAll('.category_item');
// let currentIndexCategories = 0;

// function showCategory(index, direction) {
// 	categories.forEach((item, i) => {
// 		item.classList.remove('flipL');
// 		item.classList.remove('flipR');
// 		if (i === index) {
// 			if (direction === 'right') {
// 				item.classList.add('flipR');
// 			} else if (direction === 'left') {
// 				item.classList.add('flipL');
// 			}
// 			item.classList.add('activeCategory');
// 		} else {
// 			item.classList.remove('activeCategory');
// 		}
// 	});
// }


// function nextSlide(arr) {
// 	currentIndexCategories++;
// 	if (currentIndexCategories >= arr.length) {
// 		currentIndexCategories = 0;
// 	}
// 	showCategory(currentIndexCategories, 'right');
// }

// function prevSlide(arr) {
// 	currentIndexCategories--;
// 	if (currentIndexCategories < 0) {
// 		currentIndexCategories = arr.length - 1;
// 	}
// 	showCategory(currentIndexCategories, 'left');
// }

// const prevCategoryBtn = document.querySelector('.prevCategory');
// const nextCategoryBtn = document.querySelector('.nextCategory');

// if (prevCategoryBtn) {
// 	prevCategoryBtn.addEventListener('click', () => {
// 		prevSlide(categories);
// 	});
// 	nextCategoryBtn.addEventListener('click', () => {
// 		nextSlide(categories);
// 	});
// }

// showCategory(currentIndexCategories);
