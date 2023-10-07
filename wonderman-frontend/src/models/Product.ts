import {Category} from "./Category";
import {User} from "./User";

export class Product {
    constructor(
        public name = "",
        public description = "",
        public photo = "",
        public added = "",
        public tax = 0,
        public price = 0.00,
        public category = new Category(),
        public author = new User()
    ) {
    }
}