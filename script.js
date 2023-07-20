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
			150;

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
