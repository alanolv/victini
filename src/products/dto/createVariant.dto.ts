import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class CreateVariantDto {
    @IsString()
    @IsNotEmpty()
    product_id: string;

    @IsString()
    @IsNotEmpty()
    sku: string;

    @IsString()
    @IsNotEmpty()
    variant_name: string;

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    stock: number;

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    min_stock: number;

    @IsString()
    @IsOptional()
    color: string;

    @IsString()
    @IsNotEmpty()
    presentation: string;

    @IsOptional()
    image: any;

    @IsString()
    @IsNotEmpty()
    description: string;
}