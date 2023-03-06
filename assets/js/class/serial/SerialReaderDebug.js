class SerialReaderDebug {
    byteBuffer = new Uint8Array(20);

    cmdCount = 0;

    handle(data) {
        let datastart = data.indexOf(0xB0);
        let dataend = data.indexOf(0xBF);
        if (this.cmdCount === 8) {
            this.printPackage();
            this.resetBuffer(datastart, data);
        } else if (datastart > -1 && dataend === -1) {
            this.resetBuffer(datastart, data);
        } else {
            for (let i = 0; i < data.length; i++) {
                this.byteBuffer[this.cmdCount] = data[i];
                this.cmdCount++;
            }
        }
        // console.log('data: ', data);
        // console.log('buffer: ', this.byteBuffer);
    }

    resetBuffer(datastart, data) {
        this.cmdCount = 0;
        this.byteBuffer.fill(0x00);
        for (let i = datastart; i < data.length; i++) {
            this.byteBuffer[i] = data[i];
            this.cmdCount++;
        }
    }

    printPackage() {
        let byteReply = this.byteBuffer.subarray(0, 8);
        let dataStr = '(8) ';
        for (let i = 0; i < byteReply.length; i++) {
            dataStr = dataStr + ' 0x' + byteReply[i].toString(16).padStart(2, '0').toUpperCase();
        }
        $('#serial-echo').text(dataStr);
        // console.log('printa: ', byteReply);
    }


}
