class ClientHandler {

    online = false;

    name;
    simplePeer;
    controller = 0;

    constructor(name, controller, simplePeer) {
        this.name = name;
        this.controller = controller;
        simplePeer.on('error', err => console.log(err));
        simplePeer.on('data', (data) => {
            this.processData(data);
        });
        this.simplePeer = simplePeer;
    }

    processData(data) {
        // console.log(data);
    }

}
