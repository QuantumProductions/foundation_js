function time(last, acc, structs, msgs) {
  let now = Date.now();
  let delta = now - last;
  let total = acc + delta;
  if (total > 1000) { //Reloop
  	let input = gamepadInputs();
  	window.requestAnimationFrame(time.bind(null, now, total - 1000, structs, msgs));
  } else {
  	window.requestAnimationFrame(time.bind(null, now, total, structs, msgs));
  }
}

window.requestAnimationFrame(time.bind(null, Date.now(), 0, {}, []));

function gamepadInputs() {
	var pads = navigator.getGamepads();

	pads.forEach(function (gp, i) {

	});
	for (let gp in pads) {
		if (!gp) {
			break;
		}

	}

}

function mappedInputs(pads, index, mappedPads) {
	if (pads.length == 0) {
		return mapped;
	}

	let gp = pads.pop();

 	let mappedPad = mappedPadInputs(gp, index);

	return mappedInputs(pads, index + 1, mappedPads.concat([mappedPad]));
}

function mappedPadInputs(gp, index) {
	let buttonMap = [1, 2]; //maps for each gamepad slot
	return mappedPadButtonInputs(gp.buttons, buttonMap, {});	 //Buttons only for now
}

function mappedPadButtonInputs(unmappedButtons, buttonMap, mappedButtons) {
	if (buttonMap.length == 0) {
		return mappedButtons;
	}

	mappedButtons[buttonMap.pop()] = unmappedButtons.pop().value;
	return mappedPadButtonInputs(unmappedButtons, buttonMap, mappedButtons);
}