/*
 * This route.ts file handles the initial OAuth flow with Google
 * when user clicks sign-in button, redirected here
 * which redirects to Google's consent screen
 */

import { NextResponse } from 'next/server';

export async function GET() {
  // ensure we have all required environment variables
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REDIRECT_URI) {
    console.error('Missing required environment variables');
    return new NextResponse('Server configuration error', { status: 500 });
  }

  // construct the OAuth parameters for Google's consent screen
  // also prompt of 'select_account' to stop auto-logging in default google account
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI, 
    response_type: 'code',                    
    scope: 'openid email profile',               
    access_type: 'offline',                      
    prompt: 'select_account',                    
  });

  // construct full authorization URL
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  
  // redirect user to Google's consent screen
  return NextResponse.redirect(authUrl);
}
