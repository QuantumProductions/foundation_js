'use strict';

class Logger {
  static m() {
  	return {'step' : function(s, m) {
  		console.log("Logged!");
  		return [s, []];
  	}};
  }
}

class Incrementer {
	static m() {
		return {
			'step' : function(s, m) {
				console.log(s.x);
				return [{x: s.x + 1}, []];
			}
		}
	}
}

class Mover {
	static m() {
  	return {

  	'step' : function(s, m) { //Delta time could be used for m here
      if (s.moving) {
        return [{x: s.x + 1, moving:s.moving}, []];
      }
      console.log(s.x);
      return [s, []];
  	}, 

  	'input' : function(s, m) {
      console.log("h");
  		if (m.length > 0 && m[0][1]) {
        return [{x: s.x, moving: true}, []];
			}
			return [{x: s.x, moving: false}, []];
  	}};
  }
}