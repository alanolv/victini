import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SupabaseService } from './supabase.service';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly supabaseService: SupabaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SUPABASE_JWT_SECRET || 'lazy-secret',
      passReqToCallback: true,
    });
  }

  async validate(payload: any, req: any) {
    console.log('SupabaseStrategy.validate - payload:', payload);
    const rawToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (!rawToken) {
      console.error('SupabaseStrategy - No raw token found');
      throw new UnauthorizedException('No token provided');
    }

    // Verify token with Supabase client
    const { data: { user }, error } = await this.supabaseService.client.auth.getUser(rawToken);

    if (error) {
      console.error('SupabaseStrategy - Supabase auth.getUser error:', error.message);
      throw new UnauthorizedException('Invalid token');
    }

    if (!user) {
      console.error('SupabaseStrategy - No user returned from Supabase');
      throw new UnauthorizedException('Invalid token');
    }

    // Now fetch the profile
    const profile = await this.supabaseService.getProfile(user.id);
    
    if (!profile) {
      console.error('SupabaseStrategy - Profile not found for UID:', user.id);
      throw new UnauthorizedException('Profile not found');
    }

    console.log('SupabaseStrategy - Validation successful for:', profile.email || profile.id);
    return profile;
  }
}
