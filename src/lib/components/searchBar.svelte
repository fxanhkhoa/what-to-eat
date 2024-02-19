<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let selectedLanguage = 'en-US';
	export let value = '';

	const dispatch = createEventDispatcher();
	const onSearchKeyUp = (
		event: KeyboardEvent & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		if (event.key === 'Enter') {
			dispatch('onResult', final_transcript);
		}
	};

	let recognition: any;
	let recognizing = false;
	let start_timestamp = 0;
	let final_transcript = value;
	let ignore_onend = false;

	const setLang = () => {
		if (selectedLanguage === 'en') {
			recognition.lang = 'en-US';
		} else if (selectedLanguage === 'vi') {
			recognition.lang = 'vi-VN';
		}
	};

	onMount(() => {
		const SpeechRecognition =
			(window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
		recognition = new SpeechRecognition();
		// Simple setting
		recognition.continuous = false; // Set true if you want it continuous to recognize
		recognition.interimResults = true; // Set true if you want it return interim result
		setLang();
		// Start speak
		recognition.onstart = function () {
			recognizing = true;
		};

		// Handle speak error
		recognition.onerror = function (event: any) {
			if (event.error == 'no-speech') {
				console.log('no-speech');
			}

			// No microphone
			if (event.error == 'audio-capture') {
				console.log('info_no_microphone');
			}

			// if browser is not allowed to use speaker or micro
			if (event.error == 'not-allowed') {
				if (event.timeStamp - start_timestamp < 100) {
					console.log('info_blocked');
				} else {
					console.log('info_denied');
				}
			}
		};

		// When it got result (run many time)
		recognition.onresult = function (event: any) {
			let interim_transcript = '';
			for (let i = event.resultIndex; i < event.results.length; ++i) {
				if (event.results[i].isFinal) {
					final_transcript = event.results[i][0].transcript;
				} else {
					interim_transcript += event.results[i][0].transcript;
				}
			}
		};

		// When you stop speak and it recognized your speech
		recognition.onend = function () {
			recognizing = false; //
			if (ignore_onend) {
				return;
			}

			if (!final_transcript) {
				return;
			}

			dispatch('onResult', final_transcript);
		};
	});
</script>

<div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl w-full">
	<div class="md:flex w-full">
		<div class="w-full p-3">
			<div class="relative">
				<i class="absolute fa fa-search text-gray-400 top-5 left-4" />
				<input
					on:keyup={onSearchKeyUp}
					type="text"
					class="bg-white h-14 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer"
					name=""
					bind:value={final_transcript} />
				<span class="absolute top-4 right-5 border-l pl-4">
					<button
						class="text-gray-500 hover:text-green-500"
						on:click={() => recognition.start()}
						class:animate-bounce={recognizing}
						class:text-purple-500={recognizing}>
						<i class="fa fa-microphone hover:cursor-pointer transition-all duration-300" />
					</button>
				</span>
			</div>
		</div>
	</div>
</div>
