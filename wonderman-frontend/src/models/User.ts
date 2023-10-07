import {Role} from "./Role";

export class User {
    constructor(
        public first_name = "",
        public last_name = "",
        public login = "",
        public email = "",
        public avatar = "",
        public created = "",
        public role = new Role()
    ) {
    }
}