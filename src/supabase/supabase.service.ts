import { Injectable, Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;
  private readonly logger = new Logger(SupabaseService.name);

  constructor() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!url || !key) {
      throw new Error('Supabase URL and Key must be provided in environment variables');
    }

    this.supabase = createClient(url, key);
  }

  get client() {
    return this.supabase;
  }

  async getProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId);

    if (error) {
      this.logger.error(`Error fetching profile for user ${userId}: ${error.message}`);
      return null;
    }

    if (!data || data.length === 0) {
      this.logger.warn(`No profile found for user ${userId}`);
      return null;
    }

    if (data.length > 1) {
      this.logger.error(`Multiple profiles found for user ${userId}`);
      // return the first one as a fallback or handle as conflict
    }

    return data[0];
  }

  async getInventory() {
    const { data, error } = await this.supabase
      .from('product_variants')
      .select('*')
      .eq('product_variants.product_id', 'products.id');

    if (error) {
      this.logger.error(`Error fetching products: ${error.message}`);
      return null;
    }

    return data;
  }
  async uploadImage(file: any): Promise<string | null> {
    const filename = `${Date.now()}-${file.originalname.replace(/\\s+/g, '-')}`;
    const filePath = `Products/${filename}`;
    
    const { error } = await this.supabase.storage
      .from('DepositoDentalPlazasDelSol')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      this.logger.error(`Error uploading image: ${error.message}`);
      return null;
    }

    const { data: publicUrlData } = this.supabase.storage
      .from('DepositoDentalPlazasDelSol')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  }
}
