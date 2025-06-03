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
			y: 52,
			duration: 0.3,
			ease: "power2.inOut",
		});
		menuBtn.addEventListener("click", () => {
			menuBtnToggle();
			if (gsapTlMobile.reversed()) {
				gsapTlMobile.play();
			} else {
				gsapTlMobile.reverse();
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
			ease: "power1.inOut",
		});
		gsapTlDesktop.from(
			"#main-menu .menu-item .sub-menu .menu-item a",
			{
				y: 20,
				opacity: 0,
				stagger: {
					amount: 0.2,
				},
			},
			"-=0.2"
		);
		document.querySelector("header").addEventListener("mouseenter", () => {
			gsapTlDesktop.play();
			mainMenu.style.pointerEvents = "auto";
		});
		document.querySelector("header").addEventListener("mouseleave", () => {
			gsapTlDesktop.reverse();
			mainMenu.style.pointerEvents = "none";
		});
	}
});
