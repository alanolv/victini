import { Controller, Get } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";

@Controller('invoice')
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) { }

    @Get()
    findAll() {
        return this.invoiceService.findAll();
    }
}