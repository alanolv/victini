import { Controller, Post, Get, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SupabaseAuthGuard } from "../supabase/supabase-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    
    @UseGuards(SupabaseAuthGuard)
    @Get('login')
    login(@Req() req) {
        return this.authService.login(req.user.id);
    }

    @UseGuards(SupabaseAuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }
}