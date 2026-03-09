import { Injectable } from "@nestjs/common";
import { SupabaseService } from "../supabase/supabase.service";

@Injectable()
export class AuthService {

    constructor(private readonly supabaseService: SupabaseService) { }

    async login(userId: string) {
        const user = await this.supabaseService.getProfile(userId)
        if (user != null) {
            return {
                user: user,
                status: 'succes'    
            };
        } else {
            return {
                message: 'error fetching user data',
                status: 'false'
            };
        }

    }
}