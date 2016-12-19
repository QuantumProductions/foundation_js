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

	static m(s, t, m) {
		switch (t) {
			case "input":
				if (m.length > 0 && m[0][1]) {
					console.log("hit it");
				}
		}

		return s;
		
	}
}