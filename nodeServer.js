/**
 * Created by aghassaei on 6/17/15.
 */

var SerialPort = require('SerialPort');
const Readline = require('node_modules/@serialport/parser-readline')

var app = require('http').createServer();
var io = require('socket.io')(app);
app.listen(8080);

//defaults
var portName = null;
var currentPort = null;
var baudRate = 9600;
var allPorts = [];

io.on('connection', function(socket){

    socket.emit("socketConnected");

    refreshAvailablePorts(function(_allPorts, _portName, _baudRate){
        changePort(_portName, _baudRate);
    });

    socket.on('initPort', function(data){
        refreshAvailablePorts(function(){
            var _portName = data.portName || portName;
            var _baudRate = data.baudRate || baudRate;
            if (!checkThatPortExists(_portName)) return;
            changePort(_portName, _baudRate);
        });
    });

    socket.on('dataOut', function(data){
        io.emit('dataSent', data);
        // data += '\n';
        console.log("Sending data: " + data);
        if (!currentPort){
            socket.emit("errorMsg", {error:"no port currently connected"});
            return;
        }
        currentPort.write(new Buffer(data), function(err, res) {
            if (err) onPortError(err);
        });
//        currentPort.write(new Buffer([parseInt(data)]));//write byte
    });

    socket.on('flush', function(){
        if (currentPort) currentPort.flush(function(){
            console.log("port " + portName + " flushed");
        });
    });

    socket.on('refreshPorts', function(){
        // console.log("refreshing ports list");
        refreshAvailablePorts();
    });

    socket.on('disconnectPort', function(){
        disconnectPort();
    });

    function checkThatPortExists(_portName){
        if (allPorts.indexOf(_portName) < 0) {
            onPortError("no available port called " + _portName);
            return false;
        }
        return true;
    }

    function refreshAvailablePorts(callback){
        var _allPorts = [];
        SerialPort.list(function(err, ports){
            ports.forEach(function(port) {
                _allPorts.push(port.comName);
            });

            allPorts = _allPorts;

            if (!portName && _allPorts.length>0) portName = _allPorts[0];
            if (callback) callback(allPorts, portName, baudRate);

            io.emit('connected', {
                baudRate: baudRate,
                portName: portName,
                availablePorts: _allPorts
            });
        });
    }

    function initPort(_portName, _baudRate){

        console.log("initing port " + _portName + " at " + _baudRate);
        var port = new SerialPort(_portName, {
            baudRate: parseInt(_baudRate),
            parser: SerialPort.parsers.readline("\n"),
            autoOpen: false
        //       parser: SerialPort.parsers.raw
        });

        port.open(function(error){
            if (error) {
                onPortError(error);
                // currentPort = null;
                return;
            }
            onPortOpen(_portName, _baudRate);
            port.on('data', onPortData);
            port.on('error', onPortError);
        });
        return port;
    }

    function disconnectPort(callback){
        if (currentPort && currentPort.isOpen()){
            var oldBaud = baudRate;
            var oldName = portName;
            console.log("disconnecting port " + oldName + " at " + oldBaud);
            currentPort.on('close', function(){
                io.emit("portDisconnected", {baudRate:oldBaud, portName:oldName});
                if (callback) callback();
            });
            currentPort.close(function(error){
                if (error) {
                    onPortError(error);
                    return null;
                }

            });
        } else if (callback) callback();
    }

    function changePort(_portName, _baudRate){
        console.log("change");
        if (!_portName) {
            onPortError("no port name specified");
            return null;
        }
        if (!_baudRate) _baudRate = baudRate;
        disconnectPort(function(){
            currentPort = initPort(_portName, _baudRate);
            portName = _portName;
            baudRate = _baudRate;
        });
    }

    function onPortOpen(name, baud){
        console.log("connected to port " + name + " at " + baud);
        io.emit("portConnected", {baudRate:baud, portName:name});
    }

    function onPortData(data){
        console.log(data);
        io.emit('dataIn', data);
    }

    function onPortError(error){
        console.log("Serial port error " + error);
        io.emit("errorMsg", {error:String(error)});
    }

});






