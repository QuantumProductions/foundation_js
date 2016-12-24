function time(last, acc, structs, msgs) {
  let now = Date.now();
  let delta = now - last;
  let total = acc + delta;
  if (total > 100) { //Reloop
  	let input = gamepadInputs();
  	// console.log("input" + input);
  	let s2m2 = loop(structs, msgs.concat([["input", input]], [["loop", true]]));
  	window.requestAnimationFrame(time.bind(null, now, total - 100, s2m2.structs, s2m2.msgs));
  } else {
  	window.requestAnimationFrame(time.bind(null, now, total, structs, msgs));
  }
}

function loop(structs, msgs) {
	let mRes = messagedStructs(Object.keys(structs), structs, msgs, {}, [], []);
	let msgdStructs = mRes[0];
	return {structs: msgdStructs, msgs: mRes[1]};
}

function messagedStructs(keys, structs, msgs, transformedStructs, accNewMessages, queuedNewMessages) {
	if (queuedNewMessages.length > 0) {
		return messagedStructs(keys, structs, msgs, transformedStructs, accNewMessages.concat([queuedNewMessages.pop()]), queuedNewMessages);
	}
	if (keys.length == 0) { return [transformedStructs, accNewMessages]};
	let key = keys.pop();
	let keyClass = structs[key][0];
	if (!transformedStructs[key]) {
		transformedStructs[key] = [keyClass, []];
	}

	let mRes = messagedStructs2(keyClass, structs[key][1], msgs, [], [], []);
	let transformedStructsForKey = mRes[0];
	let newMessages = mRes[1];
	transformedStructs[key][1] = transformedStructsForKey;
	return messagedStructs(keys, structs, msgs, transformedStructs, accNewMessages, newMessages);
}

function messagedStructs2(keyClass, remaining, msgs, messaged, accNewMessages, queuedNewMessages) {
	  if (queuedNewMessages.length > 0) {
		  return messagedStructs2(keyClass,remaining, msgs, messaged, accNewMessages.concat([queuedNewMessages.pop()]), queuedNewMessages);
	  }
		if (remaining.length == 0) { return [messaged, accNewMessages]};
		let struct = remaining.pop();
		let mRes = messagedStruct3(keyClass, struct, msgs, [], []);
		let transformedStruct = mRes[0];
		let newMessages = mRes[1];
		return messagedStructs2(keyClass, remaining, msgs, messaged.concat([transformedStruct]), accNewMessages, newMessages);
}

function messagedStruct3(keyClass, struct, remaining, accNewMessages, queuedNewMessages) {
	if (queuedNewMessages.length > 0) {
		return messagedStruct3(keyClass, struct, remaining, accNewMessages.concat([queuedNewMessages.pop()]), queuedNewMessages);
	}
	if (remaining.length == 0) { return [struct, accNewMessages]; }

	let msg = remaining.pop();
	let messageActions = keyClass.m()
	if (messageActions[msg[0]]) {
		let mRes = keyClass.m()[msg[0]](struct, msg[1]);
		let msgdStruct = mRes[0];
		let newMessages = mRes[1];
		return messagedStruct3(keyClass, msgdStruct, remaining, accNewMessages, newMessages);
	}

	return messagedStruct3(keyClass, struct, remaining, accNewMessages, []);
	
}



let startingStructs = StartingStructs.get();
window.requestAnimationFrame(time.bind(null, Date.now(), 0, startingStructs, []));
