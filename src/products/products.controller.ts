import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProductsService } from "./products.service";
import { SupabaseAuthGuard } from "../supabase/supabase-auth.guard";
import { CreateCategoryDto } from "./dto/createCategory.dto";
import { CreateVariantDto } from "./dto/createVariant.dto";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }
    
    @UseGuards(SupabaseAuthGuard)
    @Get('inventory')
    getInventory() {
        return this.productsService.getInventory();
    }

    @UseGuards(SupabaseAuthGuard)
    @Get('categories')
    getCategories() {
        return this.productsService.getCategories();
    }

    @UseGuards(SupabaseAuthGuard)
    @Get('base-products')
    getBaseProducts() {
        return this.productsService.getBaseProducts();
    }

    @UseGuards(SupabaseAuthGuard)
    @Post('create-category')
    createCategory(@Body() category: CreateCategoryDto) {
        return this.productsService.createCategory(category);
    }

    // @UseGuards(SupabaseAuthGuard)
    // @Post('create-product')
    // createProduct(@Body() product: CreateProductDto) {
    //     return this.productsService.createProduct(product);
    // }

    @UseGuards(SupabaseAuthGuard)
    @Post('create-variant-product')
    @UseInterceptors(FileInterceptor('image'))
    createVariant(
        @Body() variant: CreateVariantDto,
        @UploadedFile() file?: any
    ) {
        console.log(variant);
        return this.productsService.createVariant(variant, file);
    }
}