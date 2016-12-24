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
  		if (m.length > 0 && m[0][1]) {
        return [{x: s.x, moving: true}, []];
			}
			return [{x: s.x, moving: false}, []];
  	}};
  }
}

class Position {
  static m() {
    return {
      'step' : function(s, m) {
        if (s.r > 360) {
          s.r -= 360;
        } else if (s.r < 0) {
          s.r += 360;
        }

        return [s, [],  [["_position", s]] ]; //in erlang there is dict:update..
      },
      'move' : function(s, m) {
        if (s[m.key]) {
          s[m.key] += m.value; //in erlang there is dict:update.. <- is as close as possible
          return [s, []];
        }
      },
    }
  }
}

class Nose {
  static m() {
    return {
      '_position' : function(s, m) {
        s.position = m;
        return [s, []];
      },
      'step' : function(s, m) {
        if (s.position) {
         s.nosePoint = [s.position.x + 10, s.position.y];
         console.log("Nose point" + s.nosePoint);
        }

        return [s, []];
      }
    }
  }
}