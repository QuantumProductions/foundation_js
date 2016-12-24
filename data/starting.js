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
			[
         [Incrementer, {x: 1000}],
         [Logger, {}]
			],
			[
				 [Incrementer, {x:0}],
				 [
				 		Incrementer, {x:3000},
				 		[
				 			Incrementer, {x:2000}
				 		]
				 ]

			]
		]
	}
}
