import {Product} from "./Product";
import {User} from "./User";

export class Transaction {
    constructor(
        public product = new Product(),
        public user = new User(),
        public date = "",
        public price = 0,
        public payed = -1,
        public payment_date = 0
    ) {
    }
}