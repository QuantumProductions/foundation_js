function time(last, acc) {
	if (acc > 1000) {
		console.log("delta" + delta);
	}

  let now = Date.now();
  let delta = now - last;
  let total = acc + delta;
  if (total > 1000) {
  	console.log("accumulated 1000");
  	window.requestAnimationFrame(time.bind(null, now, 0));
  } else {
  	window.requestAnimationFrame(time.bind(null, now, total));
  }
}

window.requestAnimationFrame(time.bind(null, 0, 0));