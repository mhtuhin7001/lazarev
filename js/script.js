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
	new SplitText("#hero-title ,#hero-title span", {
		type: "chars",
		charsClass: "charParent",
	});
	new SplitText("#hero-title ,#hero-title span, #animated-btn span", {
		type: "chars",
		charsClass: "charChild",
	});
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
			"#hero-title .charChild",
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

// Advertise on Hover Play Video
document.addEventListener("DOMContentLoaded", () => {
	const advBox = document.querySelectorAll("#advertise .advertise-box");
	advBox.forEach(function (box) {
		const video = box.querySelector("video");
		box.addEventListener("mouseenter", function () {
			video.play();
			video.style.opacity = 1;
		});
		box.addEventListener("mouseleave", function () {
			video.pause();
			video.currentTime = 0;
			video.style.opacity = 0;
		});
	});
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
	gsap.to("#best", {
		backgroundPosition: `50% ${-innerHeight / 4}px`,
		scrollTrigger: {
			trigger: "#best",
			scrub: 4,
		},
	});
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

// Show Reel
document.addEventListener("DOMContentLoaded", () => {
	const shortReel = document.getElementById("short-reel");
	const reelCursor = document.getElementById("reel-cursor");

	// Reel Cursor
	shortReel.addEventListener("mouseenter", () => {
		gsap.to(reelCursor, {
			scale: 1,
			opacity: 1,
		});
	});
	shortReel.addEventListener("mousemove", (e) => {
		gsap.to(reelCursor, {
			x: e.x - shortReel.getBoundingClientRect().x - 14,
			y: e.y - shortReel.getBoundingClientRect().y - 4,
			duration: 0.6,
		});
	});
	shortReel.addEventListener("mouseleave", () => {
		gsap.to(reelCursor, {
			scale: 0,
			opacity: 0,
		});
	});

	// Full Reel
	let gsapTl = gsap.timeline({ paused: true });
	const fullReel = document.getElementById("full-reel");
	gsapTl.to(fullReel, {
		width: "100dvw",
		height: "100dvh",
		bottom: 0,
		borderRadius: 0,
		duration: 1.25,
		ease: "power2.in",
	});
	gsapTl.to("#reel-controls", {
		width: "90%",
	});
	fullReel.addEventListener("mousemove", (e) => {
		gsap.to("#reel-close", {
			x: e.x,
			y: e.y - 18,
			duration: 0.6,
		});
	});

	// Show Reel Animation
	shortReel.addEventListener("click", () => {
		gsapTl
			.timeScale(1)
			.play()
			.eventCallback("onComplete", () => {
				document.body.style.overflow = "hidden";
				document.getElementById("reel-close").style.display =
					"inline-block";
			});
		fullReel.play();
		fullReel.muted = false;
	});
	fullReel.addEventListener("click", () => {
		document.getElementById("reel-close").style.display = "none";
		document.body.style.overflow = "auto";
		fullReel.muted = true;
		fullReel.pause();
		gsapTl.timeScale(15).reverse();
	});

	// Video Controls
	// Play Pause
	const playPause = document.getElementById("reel-play-pause");
	playPause.addEventListener("click", function () {
		if (fullReel.paused) {
			fullReel.play();
			playPause.innerHTML = `<path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd"/>`;
		} else {
			fullReel.pause();
			playPause.innerHTML = `<path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clip-rule="evenodd" />`;
		}
	});
	// Progress
	const progressBar = document.getElementById("reel-progress");
	fullReel.addEventListener("timeupdate", function () {
		progressBar.value = (fullReel.currentTime / fullReel.duration) * 100;
	});
	progressBar.addEventListener("input", function () {
		fullReel.currentTime = (progressBar.value / 100) * fullReel.duration;
	});
	// Mute Unmute
	const muteUnmute = document.getElementById("reel-mute-unmute");
	muteUnmute.addEventListener("click", function () {
		if (fullReel.muted) {
			fullReel.muted = false;
			muteUnmute.innerHTML = `<path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z"/> <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z"/>`;
		} else {
			fullReel.muted = true;
			muteUnmute.innerHTML = `<path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />`;
		}
	});
});

// Featured News
document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("#featured-news a").forEach(function (e) {
		e.addEventListener("mouseenter", () => {
			gsap.to(e.childNodes[1], {
				scale: 1,
				opacity: 1,
			});
		});
		e.addEventListener("mousemove", (t) => {
			gsap.to(e.childNodes[1], {
				x: t.x - e.getBoundingClientRect().x - 55,
				y: t.y - e.getBoundingClientRect().y - 50,
				duration: 0.6,
			});
		});
		e.addEventListener("mouseleave", () => {
			gsap.to(e.childNodes[1], {
				opacity: 0,
				scale: 0,
			});
		});
	});
});

// Design Process
document.addEventListener("DOMContentLoaded", () => {
	const isSmallScreen = window.innerWidth <= 640;
	const step = isSmallScreen ? 10 : 25;
	document.querySelectorAll("#design-process ol").forEach((ul) => {
		ul.querySelectorAll("li").forEach((li, index) => {
			li.style.transform = `translateX(${index * step}px)`;
		});
	});
	gsap.from("#design-process ol li", {
		x: 0,
		duration: 1.5,
		stagger: {
			amount: 0.2,
		},
		scrollTrigger: {
			trigger: "#design-process",
			scrub: true,
		},
	});
});

// Case Studies Filter
document.addEventListener("DOMContentLoaded", () => {
	// Project Filtering
	const buttons = document.querySelectorAll("#projects-filter button");
	const cards = document.querySelectorAll("#case-studies .project");
	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			const filter = button.getAttribute("data-filter");
			buttons.forEach((btn) =>
				btn.classList.remove("text-shamrockGreen")
			);
			button.classList.add("text-shamrockGreen");
			cards.forEach((card) => {
				card.style.display = "none";
			});
			document
				.querySelectorAll(`.project[data-category="${filter}"]`)
				.forEach((card) => {
					card.style.display = "block";
				});
		});
	});
	if (buttons.length > 0) {
		buttons[0].click();
	}

	// on Hover Play Video
	cards.forEach(function (box) {
		const video = box.querySelector("video");
		box.addEventListener("mouseenter", function () {
			video.play();
		});
		box.addEventListener("mouseleave", function () {
			video.pause();
			video.currentTime = 0;
		});
	});

	// Mobile Devices Filter Options
	if (window.innerWidth <= 1279) {
		let isOpen = false;
		document
			.querySelector("#projects-filter")
			.addEventListener("click", () => {
				isOpen = !isOpen;
				document.getElementById("projects-filter").style.height = isOpen
					? "100%"
					: "44px";
			});
	}
});
