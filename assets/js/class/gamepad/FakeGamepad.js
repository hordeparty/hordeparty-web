class FakeGamepad {

    buttons = [
        new FakeBtn(), new FakeBtn(), new FakeBtn(), new FakeBtn(),
        new FakeBtn(), new FakeBtn(), new FakeBtn(), new FakeBtn(),
        new FakeBtn(), new FakeBtn(), new FakeBtn(), new FakeBtn(),
        new FakeBtn(), new FakeBtn(), new FakeBtn(), new FakeBtn()
    ];

    axes = [0, 0, 0, 0];
    id;

    mapping;

    constructor(id, mapping) {
        this.id = id;
        this.mapping = mapping;
    }

}
