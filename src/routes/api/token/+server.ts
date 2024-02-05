import { PUBLIC_COOKIES_SECURE, PUBLIC_ENDPOINT } from '$env/static/public';
import { baseHeader } from '$lib/constant/api';
import { COOKIES_REFRESH_TOKEN, COOKIES_TOKEN } from '$lib/constant/cookies';
import type { RetrievedTokenFromRefreshToken } from '$lib/type/auth.type';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return new Response();
};

export const POST: RequestHandler = async ({ cookies, url }) => {
	const refreshToken = cookies.get(COOKIES_REFRESH_TOKEN);
	const response = await fetch(`${PUBLIC_ENDPOINT}/retrieve-token`, {
		method: 'POST',
		headers: { ...baseHeader },
		body: JSON.stringify({
			refreshToken: refreshToken
		})
	});
	const json = (await response.json()) as RetrievedTokenFromRefreshToken;
	cookies.set(COOKIES_TOKEN, json.token, {
		httpOnly: true,
		sameSite: 'strict',
		secure: PUBLIC_COOKIES_SECURE === 'true' ? true : false,
		path: '/',
		maxAge: 60 * 60 * 24 * 7
	});

	return new Response('Redirect', { status: 303, headers: { location: url.pathname } });
};
