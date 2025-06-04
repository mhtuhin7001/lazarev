// Header
document.addEventListener("DOMContentLoaded", () => {
	// Common elements
	const menuBtn = document.getElementById("menu-btn");
	const mainMenu = document.getElementById("main-menu");

	// Mobile behavior (<= 1280px)
	if (window.innerWidth <= 1280) {
		// Menu Button Toggle
		function menuBtnToggle() {
			menuBtn.classList.toggle("change");
		}
		let gsapTlMobile = gsap.timeline({ paused: true, reversed: true });
		gsapTlMobile.to("#main-menu", {
			y: 0,
			duration: 0.3,
			ease: "power1.inOut",
		});
		gsapTlMobile.from("#main-menu .menu-item .sub-menu .menu-item a", {
			y: 20,
			opacity: 0,
			stagger: {
				amount: 0.4,
			},
		});
		menuBtn.addEventListener("click", () => {
			menuBtnToggle();
			if (gsapTlMobile.reversed()) {
				gsapTlMobile.timeScale(1).play();
			} else {
				gsapTlMobile.timeScale(1.5).reverse();
			}
		});
	}

	// Desktop behavior (> 1280px)
	else {
		const menuHeight =
			document.querySelector("#main-menu ul").clientHeight + 10;
		let gsapTlDesktop = gsap.timeline({ paused: true });
		gsapTlDesktop.to("#menu-bg", {
			height: menuHeight,
			duration: 0.4,
		});
		gsapTlDesktop.from(
			"#main-menu .menu-item .sub-menu .menu-item a",
			{
				y: 20,
				opacity: 0,
				stagger: {
					amount: 0.4,
				},
			},
			"-=0.2"
		);
		document.querySelector("header").addEventListener("mouseenter", () => {
			gsapTlDesktop.timeScale(1).play();
			mainMenu.style.pointerEvents = "auto";
		});
		document.querySelector("header").addEventListener("mouseleave", () => {
			gsapTlDesktop.timeScale(1.3).reverse();
			mainMenu.style.pointerEvents = "none";
		});
	}
});

// Hero
document.addEventListener("DOMContentLoaded", () => {
	const wrapper = document.getElementById("partners");
	const original = document.querySelector("#partners .partner-logos");
	const screenWidth = window.innerWidth;
	let totalWidth = original.offsetWidth;
	// Clone and append until total width exceeds screen width
	while (totalWidth < screenWidth) {
		const clone = original.cloneNode(true);
		wrapper.appendChild(clone);
		totalWidth += clone.offsetWidth;
	}
});
