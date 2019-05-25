export class Audio {
    id: Number;
    name: String;
    description: String;
    email: String
    constructor() {
        this.id = null;
        this.name = "";
        this.description = "";
        this.email = "";
    }
    public setAudio(_id, _name, _description, _email) {
        this.id = _id;
        this.name = _name;
        this.description = _description;
        this.email = _email;
    }
}