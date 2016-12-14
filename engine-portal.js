function time(last, acc, structs, msgs) {
  let now = Date.now();
  let delta = now - last;
  let total = acc + delta;
  if (total > 100) { //Reloop
  	let input = gamepadInputs();
  	console.log(input);
  	window.requestAnimationFrame(time.bind(null, now, total - 100, structs, msgs));
  } else {
  	window.requestAnimationFrame(time.bind(null, now, total, structs, msgs));
  }
}

window.requestAnimationFrame(time.bind(null, Date.now(), 0, {}, []));

function gamepadInputs() {
	return mappedInputs(navigator.getGamepads(), 0, {});
}

function mappedInputs(pads, index, mappedPads) {
	if (index == pads.length) {
		return mappedPads;
	}

	let gp = pads[index];
 	let mappablePad = mappablePadFromGamePad(gp, {buttons: []}, 0);
 	console.log("mappablePad" + JSON.stringify(mappablePad));
 	let mappedPad = mappedPadInputs(mappablePad, index);
 	console.log("My mapped pad" + JSON.stringify(mappedPad));
	return mappedInputs(pads, index + 1, mappedPads.concat([mappedPad]));
}

function mappablePadFromGamePad(gp, mappablePad, acc) {
	if (acc == gp.buttons.length) {
		return mappablePad;
	}
	console.log(Object.keys(mappablePad));
	return mappablePadFromGamePad(gp, {buttons: mappablePad['buttons'].concat([gp.buttons[acc].value])}, acc+1);
}

function mappedPadInputs(gp, index) {
	let buttonMap = [[1, 3]]; //maps for each gamepad slot
	return mappedPadButtonInputs(gp.buttons, buttonMap[index], {});	 //Buttons only for now
}

function mappedPadButtonInputs(unmappedButtons, buttonMap, mappedButtons) {
	if (buttonMap.length == 0) {
		return mappedButtons;
	}
	
	let popped = buttonMap.pop();
	
	mappedButtons[popped] = unmappedButtons.pop().value;
	return mappedPadButtonInputs(unmappedButtons, buttonMap, mappedButtons);
}