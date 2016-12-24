function gamepadInputs() {
	return mappedInputs(navigator.getGamepads(), 0, []);
}

function mappedInputs(pads, index, mappedPads) {
	if (index == pads.length) {
		return mappedPads;
	}

	let gp = pads[index];
 	let mappablePad = mappablePadFromGamePad(gp, {buttons: []}, 0);
 	// console.log("mappablePad" + JSON.stringify(mappablePad));
 	let mappedPad = mappedPadInputs(mappablePad, index);
 	// console.log("My mapped pad" + JSON.stringify(mappedPad));
	return mappedInputs(pads, index + 1, mappedPads.concat([mappedPad]));
}

function mappablePadFromGamePad(gp, mappablePad, acc) {
	if (acc == gp.buttons.length) {
		return mappablePad;
	}
	return mappablePadFromGamePad(gp, {buttons: mappablePad['buttons'].concat([gp.buttons[acc].value])}, acc+1);
}

function mappedPadInputs(gp, index) {
	let buttonMap = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1,2]]; //maps for each gamepad slot
	return mappedPadButtonInputs(gp.buttons.reverse(), buttonMap[index].reverse(), {});
	//Buttons only for now
}

function mappedPadButtonInputs(unmappedButtons, buttonMap, mappedButtons) {
	if (buttonMap.length == 0) {
		return mappedButtons;
	}
	
	let popped = buttonMap.pop();
	let v = unmappedButtons.pop();
	mappedButtons[popped] = v;
	return mappedPadButtonInputs(unmappedButtons, buttonMap, mappedButtons);
}