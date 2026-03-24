import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateCompleteProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    brand: string;

    @IsString()
    @IsNotEmpty()
    category_id: string;

    @IsString()
    @IsNotEmpty()
    variant_name: string;

    @IsString()
    @IsNotEmpty()
    sku: string;

    @IsString()
    @IsNotEmpty()
    price: string;

    @IsString()
    @IsNotEmpty()
    stock: string;

    @IsString()
    @IsNotEmpty()
    min_stock: string;

    @IsString()
    @IsOptional()
    color: string;

    @IsString()
    @IsNotEmpty()
    presentation: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}