'use strict';

class Logger {
  static receive(s, t, m) {

  }

  static acts() {
  	return {'step' : function(s, t, m) {
  		console.log("Logged!");
  		return [s, m];
  	}};
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
	static m() {
  	return {

  	'step' : function(s, m) { //Delta time could be used for m here
  		return [s, []];
  	}, 

  	'input' : function(s, m) {
  		if (m.length > 0 && m[0][1]) {
				console.log("hit it");
			}
			return [s, []];
  	}};
  }
}