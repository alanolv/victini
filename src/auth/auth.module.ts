import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SupabaseService } from "../supabase/supabase.service";

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService, SupabaseService],
    exports: [SupabaseService],
})
export class AuthModule { }