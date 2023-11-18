// import { authRoute } from '$lib/constant/routes';
// import type { ResultToken } from '$lib/type/auth.type';

// export const login = async (idToken: string): Promise<ResultToken> => {
// 	const response = await fetch(authRoute.login, {
// 		method: 'POST',
// 		body: JSON.stringify({
// 			idToken
// 		})
// 	});

// 	const json = await response.json();
// 	return json;
// };

// export const isLoggedIn = (): boolean => {
// 	if (localStorage.getItem('TOKEN')) {
// 		return true;
// 	}
// 	return false;
// };
