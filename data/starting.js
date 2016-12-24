'use strict';

class Stepper {
	static m() {
  	return {'loop' : function(s, m) { //Delta time could be used for m here
  		return [s, ["step", true]];
  	}};
  }
}

class StartingStructs {
	static get() {
		let value = {'stepper' : [Stepper, [{}]],
	               'mover' : [Mover, [{x: 0}]]};
		return value;
	}
}

// let value = {'incrementer' : [Incrementer, [{x: 0}, {x: 1}]],
// 	               'mover' : [Mover, [{x: 0}]]};