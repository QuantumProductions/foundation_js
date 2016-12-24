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
		let value = {'stepper' : [Stepper, [{}]],
									// 'incrementer' : [Incrementer, [{x: 0}, {x: 1}]],
											              'logger' : [Logger, [{}]]
	               };
		return value;
	}
}
