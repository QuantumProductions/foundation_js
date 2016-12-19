'use strict';

class StartingStructs {
	static get() {
		let value = {'incrementer' : [Incrementer, [{x: 0}, {x: 1}]],
	               'mover' : [Mover, [{x: 0}]]};
		return value;
	}
}