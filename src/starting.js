'use strict';

class Stepper {
	static m() {
  	return {'loop' : function(s, m) { //Delta time could be used for m here
  		return [s, [["step", true]]];
  	}};
  }
}

class StartingStructs {
	static get() {
		return [
        [Stepper, {}],
        [Mover, {x: 0}]
			]
	}
}
