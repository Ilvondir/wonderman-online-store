import {Category} from "./Category";
import {User} from "./User";

export class Product {
    constructor(
        public id = 0,
        public name = "",
        public description = "",
        public photo = "",
        public added = "",
        public tax = 0,
        public netto = 0.00,
        public brutto = 0.00,
        public category = new Category(),
        public author = new User()
    ) {
    }
}