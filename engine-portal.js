function time(last, acc, structs, msgs) {
  let now = Date.now();
  let delta = now - last;
  let total = acc + delta;
  if (total > 100) { //Reloop
  	let input = gamepadInputs();
  	console.log("input" + JSON.stringify(input));
  	msgs.concat([{input: input}]);
  	structs2 = step(structs, msgs);
  	window.requestAnimationFrame(time.bind(null, now, total - 100, structs, msgs));
  } else {
  	window.requestAnimationFrame(time.bind(null, now, total, structs, msgs));
  }
}

function step(structs, msgs) {
	//{}, [], {}	
}

window.requestAnimationFrame(time.bind(null, Date.now(), 0, {}, []));
