import type { RequestHandler } from './$types';
import { PUBLIC_ENDPOINT, PUBLIC_COOKIES_SECURE } from '$env/static/public';
import { COOKIES_REFRESH_TOKEN, COOKIES_TOKEN } from '$lib/constant/cookies';
import type { JWTTokenPayload, ResultToken } from '$lib/type/auth.type';
import { jwtDecode } from 'jwt-decode';

export const GET: RequestHandler = async () => {
	return new Response();
};

export const POST: RequestHandler = async ({ request, cookies }) => {
	const data = await request.formData();
	const idToken = data.get('idToken');
	const redirect = data.get('redirect');
	const response = await fetch(`${PUBLIC_ENDPOINT}/login`, {
		method: 'POST',
		body: JSON.stringify({ token: idToken?.toString() })
	});
	const json = (await response.json()) as ResultToken;
	cookies.set(COOKIES_TOKEN, json.token, {
		httpOnly: true,
		sameSite: 'strict',
		secure: PUBLIC_COOKIES_SECURE === 'true' ? true : false,
		path: '/',
		maxAge: 60 * 60 * 24 * 7
	});

	cookies.set(COOKIES_REFRESH_TOKEN, json.refreshToken, {
		httpOnly: true,
		sameSite: 'strict',
		secure: PUBLIC_COOKIES_SECURE === 'true' ? true : false,
		path: '/',
		maxAge: 60 * 60 * 24 * 365
	});
	const parsed = jwtDecode<JWTTokenPayload>(json.token);
	
	if (parsed.role_name === 'ADMIN') {
		return new Response('Login Redirect', { status: 303, headers: { location: '/admin' } });
	} else {
		return new Response('Login Redirect', {
			status: 303,
			headers: { location: redirect?.toString() ?? '/' }
		});
	}
};
