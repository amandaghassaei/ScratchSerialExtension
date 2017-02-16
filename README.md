# ScratchSerialExtension

I used the documentation <a href="https://github.com/LLK/scratchx/wiki#adding-blocks">here</a> to set up the Scratch interface for these components.

To run the extension, go to:

<a href="http://scratchx.org/#scratch">scratchx.org</a>

click "Load Experimental Extension", and paste in the following link:

<a href="https://rawgit.com/amandaghassaei/ScratchSerialExtension/751c38075af622aa836fa1b3b4de1a03f7ade051/serial_port_extension.js">https://rawgit.com/amandaghassaei/ScratchSerialExtension/751c38075af622aa836fa1b3b4de1a03f7ade051/serial_port_extension.js</a>

Serial communication happens through a node server.  To start the server run:

**node nodeServer.js**

node dependencies:

<a href="https://www.npmjs.com/package/serialport">serialport</a><br/>
<a href="https://www.npmjs.com/package/socket.io">socket-io</a>

Simple demo of standalone node server with web client <a href="https://github.com/amandaghassaei/NodeSerialPortBoilerplate">here</a>.