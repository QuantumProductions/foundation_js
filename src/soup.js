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
}