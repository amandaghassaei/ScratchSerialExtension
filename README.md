# ScratchSerialExtension

This is a Serial Port extension for Scratch - it allows you to pass serial messages between the scratch interface and any serial device.

To run the extension, go to:

<a href="http://scratchx.org/#scratch" target="_blank">scratchx.org</a>

Download this repo, then go to File>>Load Project in Scratch and open the file called SerialDemo.sb2.
Many blocks will initially load up red and undefined, that's ok.

Click "Load Experimental Extension", and paste in the following link:

<a href="http://cdn.rawgit.com/amandaghassaei/ScratchSerialExtension/d365e8bf682b1bba02e3797737ad84ee04ba1217/serial_port_extension.js">
http://cdn.rawgit.com/amandaghassaei/ScratchSerialExtension/d365e8bf682b1bba02e3797737ad84ee04ba1217/serial_port_extension.js</a>

Serial communication happens through a node.js server that must be running concurrently with scratch.
To use the node server, first install nodejs:

<a href="https://nodejs.org/en/download/">node.js</a>

this will also install the node package manager (npm), use npm into install the following dependencies from the terminal:

<a href="https://www.npmjs.com/package/serialport">serialport</a><br/>
**npm install -g serialport**<br/>

<a href="https://www.npmjs.com/package/socket.io">socket-io</a><br/>
**npm install -g socket.io**

Navigate to the parent directory of this repo in the terminal and run:

**node nodeServer.js**

to start the node server.

If you want to know more about how node.js, socket.io, and serialport allows your browser to communicate with  serial devices, check out
a simple demo of standalone node server with web client I wrote <a href="https://github.com/amandaghassaei/NodeSerialPortBoilerplate">here</a>.

I used <a href="https://github.com/LLK/scratchx/wiki#adding-blocks">documentation from the Lifelong Kindergarten Group</a> to set up the Scratch interface for this extension.
I'm working on a version of this extension that uses Scratch's <a href="https://scratch.mit.edu/info/ext_download/">serial browser plugin</a>, but am still trying to get that up and running.
The latest version of that code is in the branch "serialplugin".



**Attribution:**

Door sound effects from <a href="https://www.freesoundeffects.com/">freesoundeffects.com</a><br/>
Bike Horn sound effect from <a href="http://soundbible.com/1446-Bike-Horn.html">soundbible.com</a><br/>
Swoosh sound effect from <a href="http://soundbible.com/706-Swoosh-3.html">soundbible.com</a>