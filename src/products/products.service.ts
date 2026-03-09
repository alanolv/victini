import { Injectable } from "@nestjs/common";
import { SupabaseService } from "src/supabase/supabase.service";

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
}