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
			[
         [Incrementer, {x: 1000}],
         [Logger, {}]
			]
		]
	}
}
