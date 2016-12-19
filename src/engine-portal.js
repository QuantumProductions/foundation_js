function time(last, acc, structs, msgs) {
  let now = Date.now();
  let delta = now - last;
  let total = acc + delta;
  if (total > 100) { //Reloop
  	let input = gamepadInputs();
  	console.log("input" + input);
  	let s2m2 = step(structs, msgs.concat([["input", input]]));


//Gameplayer = accepts input for pause
 //  		let msgdStructs = messagedStructs(Object.keys(structs), structs, msgs, {});
	// let structs2 = stepStructs(Object.keys(msgdStructs), msgdStructs, {});
	// return {structs: structs2, msgs: msgs};
  	window.requestAnimationFrame(time.bind(null, now, total - 100, s2m2.structs, s2m2.msgs));
  } else {
  	window.requestAnimationFrame(time.bind(null, now, total, structs, msgs));
  }
}

function stepStructs3(remaining, keyClass, transformed) {
	if (remaining.length == 0) {return transformed;}
	let transformedStruct = keyClass.step(remaining.pop());
	return stepStructs3(remaining, keyClass, transformed.concat([transformedStruct]));
}

function stepStructs2(keyClass, structs) {
	return stepStructs3(structs, keyClass, []);
}

function stepStructs(keys, structs, transformedStructs) {
	if (keys.length == 0) {return transformedStructs;}

	let key = keys.pop();
	
	let keyClass = structs[key][0];
	if (!transformedStructs[key]) {
		transformedStructs[key] = [keyClass, []];
	}

	let transformedStructsForKey = stepStructs2(keyClass, structs[key][1]);
	transformedStructs[key][1] = transformedStructsForKey;
	return stepStructs(keys, structs, transformedStructs);
}

function messagedStruct3(keyClass, struct, remaining) {
	if (remaining.length == 0) { return struct; }

	let msg = remaining.pop();
	console.log("my message" + JSON.stringify(msg));
	let msgdStruct = keyClass.m(struct, msg[0], msg[1]);
	return messagedStruct3(keyClass, msgdStruct, remaining);
}

function messagedStructs2(keyClass, remaining, msgs, messaged) {
		if (remaining.length == 0) { return messaged;}
		let struct = remaining.pop();
		let transformedStruct = messagedStruct3(keyClass, struct, msgs);
		return messagedStructs2(keyClass, remaining, msgs, messaged.concat([transformedStruct]));
}

function messagedStructs(keys, structs, msgs, transformedStructs) {
	if (keys.length == 0) { return transformedStructs;}
	let key = keys.pop();
	let keyClass = structs[key][0];
	if (!transformedStructs[key]) {
		transformedStructs[key] = [keyClass, []];
	}

	let transformedStructsForKey = messagedStructs2(keyClass, structs[key][1], msgs, []);
	transformedStructs[key][1] = transformedStructsForKey;

	return messagedStructs(keys, structs, msgs, transformedStructs);
}

function step(structs, msgs) {
	let msgdStructs = messagedStructs(Object.keys(structs), structs, msgs, {});
	let structs2 = stepStructs(Object.keys(msgdStructs), msgdStructs, {});
	return {structs: structs2, msgs: msgs};
}

let startingStructs = StartingStructs.get();
window.requestAnimationFrame(time.bind(null, Date.now(), 0, startingStructs, []));
