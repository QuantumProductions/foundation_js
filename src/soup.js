'use strict';

class Logger {
  static m() {
  	return {'step' : function(s, m) {
  		console.log("Logged!");
  		return s;
  		return [s, []];
  	}};
  }
}

class Incrementer {
	static m() {
		return {
			'step' : function(s, m) {
				console.log(s.x);
				return {x: s.x + 1};
				return [{x: s.x + 1}, []];
			}
		}
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