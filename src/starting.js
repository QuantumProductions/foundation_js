'use strict';

class Stepper {
	static m() {
  	return {'loop' : function(s, m) { //Delta time could be used for m here
  		return [s, [["step", true]]];
  	}};
  }
}

class Unpauser {
	static m() {
		return {'input' : function(s, m) {
			return [s, []];
		}}
	}
}

class Pauser {
	static m() {
		return {
      'step' : function(s, m) {
      	console.log("Just waiting to pause");
      	return [s, []];
      },

			'input' : function(s, m) {
			if (m.length > 0 && m[0][9]) {
				return [{decon: true},[ ['create', [Unpauser, {}]] ]];
			}

			return [s, []];
		}}
	}
}

class StartingStructs {
	static get() {
		return [
        [Stepper, {}],
        [Pauser, {}]
			]
	}
}
