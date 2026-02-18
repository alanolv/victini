import { Injectable } from "@nestjs/common";

@Injectable()
export class SalesService {
    constructor() { }

    async findAll() {
        return {
            message: 'findAll'
        };
    }
}