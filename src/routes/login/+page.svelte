<script lang="ts">
	import { initializeApp } from 'firebase/app';
	import { getAnalytics } from 'firebase/analytics';
	import { GoogleAuthProvider, getAuth, type Auth, signInWithPopup } from 'firebase/auth';
	import { onMount } from 'svelte';
	import {
		PUBLIC_apiKey,
		PUBLIC_authDomain,
		PUBLIC_projectId,
		PUBLIC_storageBucket,
		PUBLIC_messagingSenderId,
		PUBLIC_appId,
		PUBLIC_measurementId
	} from '$env/static/public';

	let provider: GoogleAuthProvider;
	let auth: Auth;

	const firebaseConfig = {
		apiKey: PUBLIC_apiKey,
		authDomain: PUBLIC_authDomain,
		projectId: PUBLIC_projectId,
		storageBucket: PUBLIC_storageBucket,
		messagingSenderId: PUBLIC_messagingSenderId,
		appId: PUBLIC_appId,
		measurementId: PUBLIC_measurementId
	};

	onMount(() => {
		if (localStorage.getItem('TOKEN')) {
			location.href = '/admin';
		}
		// Initialize Firebase
		const app = initializeApp(firebaseConfig);
		const analytics = getAnalytics(app);
		provider = new GoogleAuthProvider();
		auth = getAuth();
	});

	function loginWithGoogle() {
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				if (token) {
					localStorage.setItem('TOKEN', token);
				}
				const user = result.user;
				console.log(user);
				location.href = '/admin';
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	}
</script>

<section id="login">
	<div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
		<div class="relative py-3 sm:max-w-xl sm:mx-auto">
			<div
				class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
			<div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
				<div class="max-w-md mx-auto">
					<div>
						<h1 class="text-2xl font-semibold">Login Form with Floating Labels</h1>
					</div>
					<div class="divide-y divide-gray-200">
						<div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
							<div class="relative">
								<input
									autocomplete="off"
									id="email"
									name="email"
									type="text"
									class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
									placeholder="Email address" />
								<label
									for="email"
									class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
									>Email Address</label>
							</div>
							<div class="relative">
								<input
									autocomplete="off"
									id="password"
									name="password"
									type="password"
									class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
									placeholder="Password" />
								<label
									for="password"
									class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
									>Password</label>
							</div>
							<div class="relative">
								<button class="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
							</div>
							<div class="px-6 sm:px-0 max-w-sm">
								<button
									on:click={loginWithGoogle}
									type="button"
									class="text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
									><svg
										class="mr-2 -ml-1 w-4 h-4"
										aria-hidden="true"
										focusable="false"
										data-prefix="fab"
										data-icon="google"
										role="img"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 488 512"
										><path
											fill="currentColor"
											d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg
									>Sign in with Google
									<div /></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
