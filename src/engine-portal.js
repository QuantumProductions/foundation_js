function time(last, acc, structs, msgs) {
  let now = Date.now();
  let delta = now - last;
  let total = acc + delta;
  if (total > 100) { //Reloop
  	let s2m2 = loop(structs, msgs.concat([['loop', true]]));
  	window.requestAnimationFrame(time.bind(null, now, total - 100, s2m2.structs, s2m2.messages));
  } else {
  	window.requestAnimationFrame(time.bind(null, now, total, structs, msgs));
  }
}

function loop(structs, msgs) {
	let mRes = iterateStart(msgs, structs, []);
	return {structs: mRes[0], messages: mRes[1]};
}

function iterateStart(msgs, struct, accumulatedMessages) {
	if (msgs.length == 0) {
		return [struct, accumulatedMessages];
	}
	let msg = msgs.pop();
	let res = iterate(msg, struct, [], [], []);
	return iterateStart(msgs, res[0], accumulatedMessages.concat(res[1]));
}

function iterate(msg, list, transformed, accumulatedMessages, queuedMessages) {
	if (queuedMessages.length > 0) {
		return iterate(msg, list, transformed, accumulatedMessages.concat([queuedMessages.pop()]), queuedMessages);
	}

	if (list.length == 0) { return [transformed, accumulatedMessages]};

	let next = list.pop();
	if (Array.isArray(next)) {
		let res = iterate(msg, next, [], [], []);
		return iterate(msg, list, transformed.concat([res[0]]), accumulatedMessages, queuedMessages.concat(res[1]));
	}

	//NOTE: This implementation sends every message to every structure.
	//NOTE: A potential optimization for deep structures (many layers nested)
	//NOTE: is to aggregate list of messages listened to like [listens,[ 'm1', m2'], List]
	//NOTE: and to only send messages when a List will have those keys.
	//NOTE: this would require re-aggregating when structures are Created.

	//next is not a list, so next is the data
	//that means the remaining list is the class
	let iterClass = list.pop();
	let actions = iterClass.m();
	if (actions[msg[0]]) {
		let res = actions[msg[0]](next, msg[1]);
		let structs = res[0];
		let newMessages = res[1];
		return iterate(msg, list, transformed.concat([iterClass, structs]), accumulatedMessages, newMessages);
	}

	return iterate(msg, list, transformed.concat([iterClass, next]), accumulatedMessages, queuedMessages);
	
}

let startingStructs = StartingStructs.get();
window.requestAnimationFrame(time.bind(null, Date.now(), 0, startingStructs, []));
