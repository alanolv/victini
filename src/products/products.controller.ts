import { Controller, Get, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { SupabaseAuthGuard } from "../supabase/supabase-auth.guard";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }
    
    @UseGuards(SupabaseAuthGuard)
    @Get('inventory')
    getInventory() {
        return this.productsService.getInventory();
    }
}