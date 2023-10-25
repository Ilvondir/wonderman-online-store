import {Role} from "./Role";

export class User {
    constructor(
        public id = 0,
        public first_name = "",
        public last_name = "",
        public login = "",
        public email = "",
        public avatar = "",
        public created = "",
        public role = new Role(),
        public jwt = ""
    ) {
    }
}