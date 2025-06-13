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
		const headerHeight =
			document.getElementById("header-strip").clientHeight;
		const menuHeight = document.querySelector("#main-menu ul").clientHeight;
		const menuBg = document.getElementById("menu-bg");
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
