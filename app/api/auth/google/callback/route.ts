/*
 * This route.ts file handles the OAuth callback from Google,
 * user grants permission, then after sign-in redirects to this
 * with auth code, exchange for access token and fetch user profile
 * (prettttty sure this is how the high level logic works based of illustrations 
 * on piazza and in instructions)
 */

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // extract the authorization code from the callback URL
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return new NextResponse('Missing authorization code', { status: 400 });
    }

    // exchange the authorization code for access tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        // our .env varibales
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: 'authorization_code',
      }),
    });

    // some error catching/debugging
    if (!tokenRes.ok) {
      const error = await tokenRes.json();
      console.error('Token exchange failed:', error);
      return new NextResponse('Failed to exchange code for token', { status: 500 });
    }

    // extract the access token from the response
    const { access_token } = await tokenRes.json();

    // use the access token to fetch the user's profile information
    const userRes = await fetch(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    // some more error catch and debug
    if (!userRes.ok) {
      const error = await userRes.json();
      console.error('Failed to fetch user info:', error);
      return new NextResponse('Failed to fetch user information', { status: 500 });
    }

    // get user's profile data
    const user = await userRes.json();

    // redirect back to home page with user's information
    // info is passed as a URL parameter
    const redirectUrl = new URL('/', req.url);
    redirectUrl.searchParams.set('user', JSON.stringify(user));
    
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('OAuth callback error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
