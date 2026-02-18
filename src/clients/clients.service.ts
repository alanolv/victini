import { Injectable } from "@nestjs/common";

@Injectable()
export class ClientsService {
    constructor() { }

    async findAll() {
        return {
            message: 'findAll'
        };
    }
}