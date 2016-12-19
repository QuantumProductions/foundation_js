'use strict';

class Logger {
	static step(s) {
		console.log("Logged!");
		return s;
	}
}

class Incrementer {
	static step(s) {
		return {x: s.x + 1};
	}

	static m(s, m) {
		return s;
	}
}

class Mover {
	static step(s) {
		return s;
	}

	static m(s, m) {
		switch (m[0]) {
			case "movex":
				s.x += m[1];
			case "movey":
				s.y += m[1];
		}

		return s;
	}
}