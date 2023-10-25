import {Product} from "./Product";
import {User} from "./User";

export class Transaction {
    constructor(
        public id = 0,
        public product = new Product(),
        public user = new User(),
        public created = "",
        public price = 0,
        public payed = -1,
        public payment_date = 0
    ) {
    }
}