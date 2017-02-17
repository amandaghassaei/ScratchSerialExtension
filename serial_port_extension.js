new (function() {
    var ext = this;

    var nullPort = "nothing connected";
    var availablePorts = [nullPort];
    var devices = {};

    var currentPort = availablePorts[0];
    var currentBaud = 9600;
    var lastMessageReceived = "";
    var lastMessageSent = "";
    var lastError = "";
    var connected = false;

    var poller;
    var device;

    var descriptor = {
        blocks: [
            ['r', "serial port: %m.availablePorts", 'setPort', currentPort],
            ['r', "baud rate: %m.baudRates", 'setBaud', currentBaud],
            ['', 'connect to %s at %s', 'setupSerial', currentPort, currentBaud],
            ['', 'send serial message: %s', 'sendMessage'],
            ['h', 'when serial message received', 'dataIn'],
            ['h', 'when serial port connected', 'portConnected'],
            ['h', 'when serial port disconnected', 'portDisconnected'],
            ['b', 'port is connected', 'checkConnection'],
            ['r', 'get port name', 'getPortName'],
            ['r', 'get baud rate', 'getBaudRate'],
            ['r', 'get last incoming message', 'getLastMessageReceived'],
            ['r', 'get last outgoing message', 'getLastMessageSent']
        ],
        menus: {
            availablePorts: availablePorts,
            baudRates: [9600, 19200, 38400, 57600, 74880, 115200, 230400, 250000]
        },
        url: 'https://github.com/amandaghassaei/ScratchSerialExtension'
    };

    function updateMenu(){
        //this is so hacky!  I know I'm terrible, but this was the only way to update my menus
        Scratch.FlashApp.ASobj.ASloadExtension({
            extensionName: "Serial Port",
            blockSpecs: descriptor.blocks,
            url: descriptor.url,
            menus: descriptor.menus
        });
    }

    ext._deviceConnected = function(dev) {
        if (dev && dev.id){
            if (availablePorts[0] === nullPort) availablePorts.splice(0,1);//remove first element
            if (availablePorts.indexOf(dev.id) < 0){
                availablePorts.push(dev.id);
                devices[dev.id] = dev;
                updateMenu();
            }
        }
    };

    ext._shutdown = function() {
        if(poller) poller = clearInterval(poller);
        if (device) device.close();
        device = null;
    };

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.setPort = function(portName){
        return portName;
    };
    ext.setBaud = function(baudRate){
        return baudRate;
    };

    ext.setupSerial = function(portName, baudRate){
        if (portName === nullPort){
            return;
        }
        if (device) device.close();
        device = devices[portName];
        if (device === undefined) return;
        device.set_receive_handler(receiveMessageHandler);
        currentPort = device.id;
        currentBaud = baudRate;
        device.open({ stopBits: 0, bitRate: baudRate}, deviceOpened);
    };

    ext.sendMessage = function(message){
        lastMessageSent = message;
        console.log(str2ab(message));
        if (device) device.send(str2ab(message));
    };

    function ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    }

    function str2ab(str) {
        var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
        var bufView = new Uint16Array(buf);
        for (var i=0, strLen=str.length; i<strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }

    //warning, you may miss messages this way
    var messageReceivedEvent = false;
    function receiveMessageHandler(data){
        console.log(data);
        lastMessageReceived = data;
        messageReceivedEvent = true;
    }
    ext.dataIn = function(){
        if (messageReceivedEvent === true){
            messageReceivedEvent = false;
            return true;
        }
        return false;
    };

    var portConnectedEvent = false;
    function deviceOpened(){
        connected = true;
        portConnectedEvent = true;
    }
    ext.portConnected = function(){
        if (portConnectedEvent === true){
            portConnectedEvent = false;
            return true;
        }
        return false;
    };

    var portDisonnectedEvent = false;
    ext._deviceRemoved = function(dev) {
        if (dev && dev.id){
            if (availablePorts.indexOf(dev.id) >= 0){
                availablePorts.splice(availablePorts.indexOf(dev.id), 1);
                delete devices[dev.id];
                if (availablePorts.length == 0) availablePorts.push(nullPort);
                updateMenu();
            }
        }
        if (device != dev) return;
        if(poller) poller = clearInterval(poller);
        device = null;
        currentPort = nullPort;
        connected = false;
        portDisonnectedEvent = true;
    };

    ext.portDisconnected = function(){
        if (portDisonnectedEvent === true){
            portDisonnectedEvent = false;
            return true;
        }
        return false;
    };

    ext.checkConnection = function(){
        return connected;
    };

    ext.getPortName = function(){
        return currentPort;
    };
    ext.getBaudRate = function(){
        return currentBaud;
    };

    ext.getLastMessageReceived = function(){
        return lastMessageReceived;
    };
    ext.getLastMessageSent = function(){
        return lastMessageSent;
    };

    ext.getLastError = function(){
        return lastError;
    };

    ScratchExtensions.register('Serial Port', descriptor, ext, {type: 'serial'});
})();