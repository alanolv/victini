import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsService {
    constructor() { }

    async findAll() {
        return {
            message: 'findAll'
        };
    }
}