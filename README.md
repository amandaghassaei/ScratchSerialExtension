# ScratchSerialExtension

This is a Serial Port extension for scratch that allows you to pass serial messages between the scratch interface and any serial device.

To run the extension, go to:

<a href="http://scratchx.org/#scratch">scratchx.org</a>

click "Load Experimental Extension", and paste in the following link:

<a href="https://rawgit.com/amandaghassaei/ScratchSerialExtension/033a78cdf2ca399259dc503a0fce092c8323592e/serial_port_extension.js">https://rawgit.com/amandaghassaei/ScratchSerialExtension/033a78cdf2ca399259dc503a0fce092c8323592e/serial_port_extension.js</a>

Serial communication happens through a node.js server that must be running concurrently with scratch.
To use the node server, first install node and npm:

<a href="https://nodejs.org/en/download/">node.js</a>

this should install both node and npm, then use npm into install the following dependencies:

**npm install -g serialport**<br/>
<a href="https://www.npmjs.com/package/serialport">serialport</a><br/>

**npm install -g socket.io**<br/>
<a href="https://www.npmjs.com/package/socket.io">socket-io</a>

then download this git repo, navigate to the folder in the terminal and run:

**node nodeServer.js**

to start the node server.

If you're interested in understanding better how node.js, socket.io, and serialport allows your browser to find all connected serial devices, check out
a simple demo of standalone node server with web client I wrote <a href="https://github.com/amandaghassaei/NodeSerialPortBoilerplate">here</a>.

I used the documentation <a href="https://github.com/LLK/scratchx/wiki#adding-blocks">here</a> to set up the Scratch interface for this extension.
I'm working on a version of this extension that uses Scratch's serial browser plugin, but am still tryign to get that up and running.
Latest version of that code is in the branch "serialplugin".


**Attribution:**

Door sound effects from <a href="https://www.freesoundeffects.com/">freesoundeffects.com</a><br/>
Bike Horn sound effect from <a href="http://soundbible.com/1446-Bike-Horn.html">soundbible.com</a><br/>
Swoosh sound effect from <a href="http://soundbible.com/706-Swoosh-3.html">soundbible.com</a>