'use strict';

class StartingStructs {
	static get() {
		console.log("Incrementer" + Incrementer);
		let value = {'incrementer' : [Incrementer, [{x: 0}, {x: 1}]]};
		console.log("Value" + value);
		return value;
	}
}