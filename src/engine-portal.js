function time(last, acc, structs, msgs) {
  let now = Date.now();
  let delta = now - last;
  let total = acc + delta;
  if (total > 100) { //Reloop
  	let input = gamepadInputs();
  	msgs.concat([{input: input}]);
  	let s2m2 = step(structs, msgs);
  	console.log(JSON.stringify(s2m2));
  	window.requestAnimationFrame(time.bind(null, now, total - 100, s2m2.structs, s2m2.msgs));
  } else {
  	window.requestAnimationFrame(time.bind(null, now, total, structs, msgs));
  }
}

function stepStructs3(remaining, keyClass, transformed) {
	console.log("Arg" + JSON.stringify(arguments));
	if (remaining.length == 0) {return transformed;}
	console.log(remaining);
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
	if (remaining.length == 0) { console.log("Returning Messaged Struct" + JSON.stringify(struct));
		return struct; }

	let msg = remaining.pop();
	console.log("my message" + msg);
	let msgdStruct = keyClass.m(struct, msg);
	return messagedStruct3(keyClass, msgdStruct, remaining);
}

function messagedStructs2(keyClass, remaining, msgs, messaged) {
		if (remaining.length == 0) { return messaged;}
		let struct = remaining.pop();
		let transformedStruct = messagedStruct3(keyClass, struct, msgs);
		return messagedStructs2(keyClass, remaining, msgs, messaged.concat([transformedStruct]));
}

function messagedStructs(keys, structs, msgs, transformedStructs) {
	if (keys.length == 0) {
		return transformedStructs;}
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
