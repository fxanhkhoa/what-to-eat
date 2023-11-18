import type { RequestHandler } from './$types';
import { PUBLIC_ENDPOINT } from '$env/static/public';
import { COOKIES_REFRESH_TOKEN, COOKIES_TOKEN } from '$lib/constant/cookies';
import type { ResultToken } from '$lib/type/auth.type';

export const GET: RequestHandler = async () => {
	return new Response();
};

export const POST: RequestHandler = async ({ request, cookies }) => {
	const data = await request.formData();
	const idToken = data.get('idToken');
	const response = await fetch(`${PUBLIC_ENDPOINT}/login`, {
		method: 'POST',
		body: JSON.stringify({ idToken })
	});
	const json = (await response.json()) as ResultToken;
	cookies.set(COOKIES_TOKEN, json.token, {
		httpOnly: true,
		sameSite: 'strict',
		secure: false,
		path: '/',
		maxAge: 60 * 60 * 24 * 7
	});

    cookies.set(COOKIES_REFRESH_TOKEN, json.refreshToken, {
		httpOnly: true,
		sameSite: 'strict',
		secure: false,
		path: '/',
		maxAge: 60 * 60 * 24 * 365
	});
	return response;
};
