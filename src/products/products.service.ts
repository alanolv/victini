import { Injectable } from "@nestjs/common";
import { SupabaseService } from "src/supabase/supabase.service";
import { CreateCategoryDto } from "./dto/createCategory.dto";
import { CreateVariantDto } from "./dto/createVariant.dto";

@Injectable()
export class ProductsService {
    constructor(private readonly supabaseService: SupabaseService) { }

    async getInventory() {
        const { data, error } = await this.supabaseService.client
            .from('product_variants')
            .select(`
                    id,
                    variant_name,
                    sku,
                    stock,
                    price,
                    min_stock,
                    color,
                    presentation,
                    image,
                    description,
                    products:product_id (
                    id,
                    name,
                    brand,
                    categories:category_id (
                        id,
                        name
                    )
                    )
                `)
            .order('name', { foreignTable: 'products', ascending: true });

        if (error) {
            throw new Error(`Error fetching inventory: ${error.message}`);
        }

        console.log(JSON.stringify(data, null, 2));

        return data.map((item: any) => ({
            group_id: item.products?.id,
            product_id: item.id,
            name: item.products?.name,
            brand: item.products?.brand,
            variant_name: item.variant_name,
            description: item.description,
            sku: item.sku,
            stock: item.stock,
            price: item.price,
            min_stock: item.min_stock,
            color: item.color,
            presentation: item.presentation,
            category_id: item.products?.categories?.id,
            category_name: item.products?.categories?.name,
            image_url: item.image
        }));
    }

    async getCategories() {
        const { data, error } = await this.supabaseService.client
            .from('categories')
            .select('*')
            .order('name', { ascending: true });

        if (error) {
            throw new Error(`Error fetching categories: ${error.message}`);
        }

        console.log(JSON.stringify(data, null, 2));

        return data;
    }

    async getBaseProducts() {
        const { data, error } = await this.supabaseService.client
            .from('products')
            .select(`
                    id,
                    name,
                    brand,
                    categories:category_id (
                        id,
                        name
                    )
                `)
            .order('name', { ascending: true });

        if (error) {
            throw new Error(`Error fetching base products: ${error.message}`);
        }

        console.log(JSON.stringify(data, null, 2));

        return data;
    }

    async createCategory(category: CreateCategoryDto) {
        const { name } = category;
        const { data, error } = await this.supabaseService.client
            .from('categories')
            .insert({ name })
            .select();

        if (error) {
            throw new Error(`Error creating category: ${error.message}`);
        }

        console.log(JSON.stringify(data, null, 2));

        return data;
    }

    async createVariant(variant: CreateVariantDto, file?: any) {
        let imageUrl = variant.image;

        // If a file is provided, upload it to Supabase and get the public URL
        if (file) {
            const uploadedUrl = await this.supabaseService.uploadImage(file);
            if (uploadedUrl) {
                imageUrl = uploadedUrl;
            } else {
                throw new Error('Failed to upload image to Supabase');
            }
        }

        const { product_id, sku, variant_name, price, stock, min_stock, color, presentation, description } = variant;
        const { data, error } = await this.supabaseService.client
            .from('product_variants')
            .insert({ 
                product_id, 
                sku, 
                variant_name, 
                price: Number(price), 
                stock: Number(stock), 
                min_stock: Number(min_stock), 
                color, 
                presentation, 
                image: imageUrl, 
                description 
            })
            .select();

        if (error) {
            throw new Error(`Error creating variant: ${error.message}`);
        }

        console.log(JSON.stringify(data, null, 2));

        return data;
    }
}