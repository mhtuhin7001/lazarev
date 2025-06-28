// Initialize Lenis
document.addEventListener("DOMContentLoaded", () => {
	const lenis = new Lenis({
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smooth: true,
		smoothTouch: true,
	});
	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);
});

// Register Gsap Plugin
gsap.registerPlugin(SplitText, ScrollTrigger);

// Initialize SplitText
document.addEventListener("DOMContentLoaded", () => {
	// Line Split
	new SplitText("#hero-home p", {
		type: "lines",
		linesClass: "lineChild",
	});
	new SplitText("#hero-home p", {
		type: "lines",
		linesClass: "lineParent",
	});

	// Letter Split
	new SplitText("#hero-title, #hero-title span, #hero h1", {
		type: "chars",
		charsClass: "charParent",
	});
	new SplitText(
		"#hero-title, #hero-title span, #animated-btn span, #hero h1",
		{
			type: "chars",
			charsClass: "charChild",
		}
	);
});

// Loader & First View Animation
document.addEventListener("DOMContentLoaded", () => {
	window.addEventListener("load", () => {
		const gsapTl = gsap.timeline();
		// Loading
		document.getElementById("loader-bar").style.display = "none";
		gsapTl.to(
			"#loader-path",
			{
				width: "100dvw",
				height: "100dvh",
				bottom: 0,
				borderRadius: 0,
				duration: 1.25,
				ease: "power2.in",
			},
			"-=0.2"
		);
		gsapTl.to("#loader", {
			opacity: 0,
			display: "none",
		});
		gsapTl.to(
			"body",
			{
				overflowY: "auto",
			},
			"-=0.5"
		);
		// First View
		gsapTl.from(
			"#hero-home #hero-title svg",
			{
				scale: 0,
				rotate: -45,
				duration: 0.5,
			},
			"-=0.4"
		);
		// Header
		gsapTl.from(
			"#header-strip, #menu-bg",
			{
				yPercent: -105,
			},
			"-=0.6"
		);
		// Menu
		if (window.matchMedia("(min-width: 1280px)").matches) {
			gsapTl.from("#main-menu", {
				opacity: 0,
				duration: 0.5,
			});
		}
		gsapTl.from(
			"#hero-title .charChild, #hero h1 .charChild",
			{
				opacity: 0,
				yPercent: 100,
				x: -5,
				duration: 0.55,
				stagger: { amount: 0.55 },
				ease: "power1.out",
			},
			"-=0.5"
		);
		// Hero Describe
		gsapTl.from(
			"#hero-home p .lineChild",
			{
				yPercent: 100,
				opacity: 0,
				duration: 0.4,
				stagger: { amount: 0.15 },
				ease: "power2.out",
			},
			"-=0.3"
		);
		// Hero Partners
		gsapTl.from(
			"#partners",
			{
				width: 0,
			},
			"-=0.2"
		);
	});
});

// Header
document.addEventListener("DOMContentLoaded", () => {
	// Common elements
	const menuBtn = document.getElementById("menu-btn");
	const mainMenu = document.getElementById("main-menu");
	// Mobile behavior (<= 1279px)
	if (window.innerWidth <= 1279) {
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
		const menuBg = document.getElementById("menu-bg");
		const menuHeight = mainMenu.clientHeight;
		const headerHeight =
			document.getElementById("header-strip").clientHeight;
		menuBg.style.height = `${headerHeight}px`;
		let gsapTlDesktop = gsap.timeline({ paused: true });
		gsapTlDesktop.to(menuBg, {
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

// On Hove Animated Button
document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("#animated-btn").forEach((btn) => {
		let gsapTl = gsap.timeline({ paused: true });
		gsapTl.to(btn.querySelectorAll("#default-text .charChild"), {
			yPercent: -100,
			rotateX: -75,
			opacity: 0,
			stagger: {
				amount: 0.22,
			},
			ease: "power1.inOut",
		});
		gsapTl.to(
			btn.querySelectorAll("#hover-text .charChild"),
			{
				yPercent: -100,
				rotateX: 0,
				opacity: 1,
				stagger: {
					amount: 0.22,
				},
				ease: "power1.inOut",
			},
			"-=0.7"
		);
		btn.addEventListener("mouseenter", () => {
			gsapTl.play();
		});
		btn.addEventListener("mouseleave", () => {
			gsapTl.reverse();
		});
	});
});

// BG Parallax Effect
document.addEventListener("DOMContentLoaded", () => {
	["#best", "#jump-to"].forEach((selector) => {
		gsap.to(selector, {
			backgroundPosition: `50% ${-innerHeight / 4}px`,
			scrollTrigger: {
				trigger: selector,
				scrub: 4,
			},
		});
	});
});

// Jump to Cursor
document.addEventListener("DOMContentLoaded", () => {
	const jumpTo = document.getElementById("jump-to");
	const jumpToCursor = document.getElementById("jump-to-cursor");

	jumpTo.addEventListener("mouseenter", () => {
		gsap.to(jumpToCursor, {
			scale: 1,
			opacity: 1,
		});
	});
	jumpTo.addEventListener("mousemove", (move) => {
		gsap.to(jumpToCursor, {
			x: move.x - jumpTo.getBoundingClientRect().x - 125,
			y: move.y - jumpTo.getBoundingClientRect().y - 115,
			duration: 0.6,
		});
	});
	jumpTo.addEventListener("mouseleave", () => {
		gsap.to(jumpToCursor, {
			scale: 0,
			opacity: 0,
		});
	});
});
