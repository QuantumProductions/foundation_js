function time(last, acc, structs, msgs) {
  let now = Date.now();
  let delta = now - last;
  let total = acc + delta;
  if (total > 100) { //Reloop
  	let input = gamepadInputs();
  	console.log("input" + JSON.stringify(input));
  	msgs.concat([{input: input}]);
  	let s2m2 = step(structs, msgs);
  	console.log("Returned" + JSON.stringify(s2m2.structs));
  	window.requestAnimationFrame(time.bind(null, now, total - 100, s2m2.structs, s2m2.msgs));
  } else {
  	window.requestAnimationFrame(time.bind(null, now, total, structs, msgs));
  }
}

function stepStructs3(remaining, keyClass, transformed) {
	if (remaining.length == 0) {
		return transformed;
	}
	let transformedStruct = keyClass.step(remaining.pop());
	return stepStructs3(remaining, keyClass, transformed.concat([transformedStruct]));
}

function stepStructs2(keyClass, structs) {
	return stepStructs3(structs, keyClass, []);
}

function stepStructs(keys, structs, transformedStructs) {
	if (keys.length == 0) {
		return transformedStructs;
	}

	let key = keys.pop();
	console.log(structs[key][0]);
	console.log(structs[key][1]);

	let keyClass = structs[key][0];
	if (!transformedStructs[key]) {
		transformedStructs[key] = [];
		transformedStructs[key].push(keyClass);
		transformedStructs[key].push([]);
	}

	let transformedStructsForKey = stepStructs2(structs[key][0], structs[key][1]);
	transformedStructs[key][1] = transformedStructsForKey;
	return stepStructs(keys, structs, transformedStructs);
}

function step(structs, msgs) {
	//Loop Messages
	let structs2 = stepStructs(Object.keys(structs), structs, {});
	//{}, [], {}	
	return {structs: structs2, msgs: msgs};
}

let startingStructs = {'incrementer' : [Incrementer, [{x: 0}]]};

window.requestAnimationFrame(time.bind(null, Date.now(), 0, startingStructs, []));
