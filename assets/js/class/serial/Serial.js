class Serial {

    connected = false;

    writer;

    reader;

    constructor(handleSerialDataFunction) {
        if (handleSerialDataFunction) {
            this.handleSerialData = handleSerialDataFunction;
        }
    }

    async connect(enableReader) {
        const port = await navigator.serial.requestPort();
        await port.open({
            baudRate: 921600
        });
        this.writer = port.writable.getWriter();
        if (enableReader === true) {
            this.reader = port.readable.getReader();
            this.reader.read().then(this.handleSerialData.bind(this));
        }
        this.connected = true;
    }

    send(data) {
        if (this.connected === true) {
            this.sendUint8Array(new Uint8Array(data));
        } else {
            console.log("not connected to serial port");
        }
    }

    sendUint8Array(bufferTmp) {
        if (this.connected === true) {
            this.writer.write(bufferTmp.buffer).then();
        } else {
            console.log("not connected to serial port");
        }
    }

    handleSerialData({value, done}) {
        this.handleSerialDataCallBack(value);
        this.reader.read().then(this.handleSerialData.bind(this));
    }

    handleSerialDataCallBack (value){
        console.log(`${new TextDecoder().decode(value)}`);
    }

}
