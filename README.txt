Super-alpha.

The goal is to isolate behavior for your game objects into components, specified by Classes.
The engine should remain unchanging from game to game - at least for a non-networked game. I don't know how networking will impact this design.

The game world is a structure, or `struct` in the code. A structure is a list. (A list is really a Javascript Array)
These aren't real structs or lists but I use these naming conventions because it helps me think of data as immutable instead of a mutable Javascript {} or [].

Currently only 1 message is sent at a time. in engine-portal:19 iterateStart. This is a known bug as the system is still under construction.

The good stuff happens in engine-portal:22, the iterate function.

Popping the list gives you another list. The first index of that list is either
A) Another list -- this means the structure in question has sub-components.
B) A class definition. This means this is a component and the second index is the data for the component.

Classes behave like a Module - groupings of functions related to a similar data structure. Each Class implements one function, m()
m()
 returns a dictionary of functions, keyed by the title of the message.

Each function implementation inside m() returns a list with 2 elements: the first element is the modified data structure. The second is a list of new messages.

The engine appends [['loop', true']] to all of its messages when iterating over its game world (engine-portal:6).
The Stepper static m(s, m)['loop') returns

[s, [["step", true]]

this means it returns s as the data (its data is unchanged)
and it returns a new message, ["step, true"] which is accumulated into the engine_portal's accumulatedMessage variable and sent to the next loop.

The step message is a convention to tell the structures in the game world "step forward in time".

This step message is listened to by the Logger, which calls console.log, the Incrementer, which adds 1 to its .x attribute every step.

These Classes are found in the /data/soup.js file. I called it "Soup" because its where I throw ingredients into.
Conversely, the /src/starting.js is meant to be more of an engine constant. Theoretically this file might never change, starting only with a GameStart structure, where GameStart is defined by the specific game in a /src/ file.
