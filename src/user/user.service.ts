import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor() {}

    private readonly users =[    
            {
                id:'1',
                name:'John Doe',
                email:'[EMAIL_ADDRESS]'
            },
            {
                id:'2',
                name:'Jane Doe',
                email:'[EMAIL_ADDRESS]'
            }
        ]

    async findAll() {
        return this.users;
    }

    async findOne(id:String){

        const user = this.users.find(user => user.id === id);

        if (!user) {
            return {'message': 'User not found'};
        }

        return user;
    }
}