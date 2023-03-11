class FakeGamepad {

    buttons = [];

    axes = [];
    id;

    mapping;

    constructor(id, mapping) {
        this.id = id;
        this.mapping = mapping;
    }

}
