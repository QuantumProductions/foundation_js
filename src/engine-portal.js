function time(last, acc, structs, msgs) {
  let now = Date.now();
  let delta = now - last;
  let total = acc + delta;
  if (total > 100) { //Reloop
  	let message = ["step", true];
  	let s2m2 = loop(structs, [message])
  	window.requestAnimationFrame(time.bind(null, now, total - 100, s2m2, msgs));
  } else {
  	window.requestAnimationFrame(time.bind(null, now, total, structs, msgs));
  }
}

function loop(structs, msgs) {
	let mRes = iterateStart(msgs[0], structs);
	return mRes;
}

function iterateStart(msg, struct) {
	return iterate(msg, struct, []);
}

function iterate(msg, list, transformed) {
	if (list.length == 0) { return transformed};

	let next = list.pop();
	if (Array.isArray(next)) {
		return transformed;
	}

	//next is not a list, so next is the data
	//that means the remaining list is the class
	let iterClass = list.pop();
	let actions = iterClass.m();
	if (actions[msg]) {
		return iterate(msg, list, transformed.concat([actions[msg](next)]));
	}

	return iterate(msg, list, transformed.concat([next]));
	
}

let startingStructs = StartingStructs.get();
window.requestAnimationFrame(time.bind(null, Date.now(), 0, startingStructs, []));
