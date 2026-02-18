import { Injectable } from "@nestjs/common";

@Injectable()
export class InvoiceService {
    constructor() { }

    async findAll() {
        return {
            message: 'findAll'
        };
    }
}