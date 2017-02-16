# ScratchSerialExtension

I used the documentation <a href="https://github.com/LLK/scratchx/wiki#adding-blocks">here</a> to set up the Scratch interface for these components.

To run the extension, go to:

<a href="http://scratchx.org/#scratch">scratchx.org</a>

click "Load Experimental Extension", and paste in the following link:

<a href="https://rawgit.com/amandaghassaei/ScratchSerialExtension/e68c217f033baedcac5cbd04c91876898e4137ac/serial_port_extension.js">https://rawgit.com/amandaghassaei/ScratchSerialExtension/e68c217f033baedcac5cbd04c91876898e4137ac/serial_port_extension.js</a>

Communication to Serial Port happens through a node server.  To start the server run:

**node nodeServer.js**

node dependencies:

<a href="https://www.npmjs.com/package/serialport">serialport</a>
<a href="https://www.npmjs.com/package/socket.io">socket-io</a>

Simple demo of standalone node server with web client <a href="https://github.com/amandaghassaei/NodeSerialPortBoilerplate">here</a>.