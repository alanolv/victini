import { Module } from "@nestjs/common";
import { SupabaseService } from "src/supabase/supabase.service";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";

@Module({
    imports: [],
    controllers: [ProductsController],
    providers: [ProductsService, SupabaseService],
    exports: [SupabaseService],
})
export class ProductsModule { }