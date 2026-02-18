import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor() { }

    async login() {
        return {
            message: 'login'
        };
    }
}