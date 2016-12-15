function time(last, acc, structs, msgs) {
  let now = Date.now();
  let delta = now - last;
  let total = acc + delta;
  if (total > 100) { //Reloop
  	let input = gamepadInputs();
  	console.log("input" + JSON.stringify(input));
  	msgs.concat([{input: input}]);
  	let s2m2 = step(structs, msgs);
  	window.requestAnimationFrame(time.bind(null, now, total - 100, s2m2.structs, s2m2.msgs));
  } else {
  	window.requestAnimationFrame(time.bind(null, now, total, structs, msgs));
  }
}

function step(structs, msgs) {
	//{}, [], {}	
	return {structs: structs, msgs: msgs};
}

window.requestAnimationFrame(time.bind(null, Date.now(), 0, {}, []));
