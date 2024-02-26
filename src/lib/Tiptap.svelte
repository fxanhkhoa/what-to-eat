<script lang="ts">
	import StarterKit from '@tiptap/starter-kit';
	import { Youtube } from '@tiptap/extension-youtube';
	import { Image } from '@tiptap/extension-image';
	import { TextAlign } from '@tiptap/extension-text-align';
	import { Link } from '@tiptap/extension-link';
	import { Editor } from '@tiptap/core';
	import { createEventDispatcher, onMount } from 'svelte';
	import '@fortawesome/fontawesome-free/css/all.min.css';

	let element: any;
	let editor: any;

	export let content = '';
	export function setContent(data: string) {
		editor.commands.setContent(data);
	}

	const dispatch = createEventDispatcher();

	const addImage = () => {
		const url = window.prompt('URL');

		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	};

	const addYoutube = () => {
		const url = window.prompt('URL');

		if (url) {
			editor.commands.setYoutubeVideo({
				src: url,
				width: 640,
				height: 480
			});
		}
	};

	function setLink() {
		const previousUrl = editor.getAttributes('link').href;
		const url = window.prompt('URL', previousUrl);

		// cancelled
		if (url === null) {
			return;
		}

		// empty
		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run();

			return;
		}

		// update link
		editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
	}

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				Youtube.configure({
					inline: false
				}),
				Image.configure({
					inline: true,
					allowBase64: true
				}),
				TextAlign.configure({
					types: ['heading', 'paragraph']
				}),
				Link.configure({
					openOnClick: true
				})
			],
			content: content,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
				dispatch('valueHtml', editor.getHTML());
			}
		});
	});
</script>

{#if editor}
	<div class="tiptap bg-white p-3 rounded-lg rounded-b-none">
		<div class="border-b pb-2">
			<button
				on:click={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				class={editor.isActive('bold') ? 'is-active' : ''}>
				<i class="fa-solid fa-bold" />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				class={editor.isActive('italic') ? 'is-active' : ''}>
				<i class="fa-solid fa-italic" />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleStrike().run()}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				class={editor.isActive('strike') ? 'is-active' : ''}>
				<i class="fa-solid fa-strikethrough" />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleCode().run()}
				disabled={!editor.can().chain().focus().toggleCode().run()}
				class={editor.isActive('code') ? 'is-active' : ''}>
				Code
			</button>
			<button on:click={() => editor.chain().focus().unsetAllMarks().run()}> clear marks </button>
			<button on:click={() => editor.chain().focus().clearNodes().run()}> clear nodes </button>
			<button
				on:click={() => editor.chain().focus().setParagraph().run()}
				class={editor.isActive('paragraph') ? 'is-active' : ''}>
				paragraph
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				class={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
				h1
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				class={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
				h2
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				class={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>
				h3
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
				class={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}>
				h4
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
				class={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}>
				h5
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
				class={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}>
				h6
			</button>
			<button
				on:click={() => editor.chain().focus().toggleBulletList().run()}
				class={editor.isActive('bulletList') ? 'is-active' : ''}>
				<i class="fa-solid fa-list-ul" />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleOrderedList().run()}
				class={editor.isActive('orderedList') ? 'is-active' : ''}>
				<i class="fa-solid fa-list-ol" />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleCodeBlock().run()}
				class={editor.isActive('codeBlock') ? 'is-active' : ''}>
				<i class="fa-solid fa-code" />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleBlockquote().run()}
				class={editor.isActive('blockquote') ? 'is-active' : ''}>
				<i class="fa-solid fa-quote-left" />
			</button>
			<button on:click={() => editor.chain().focus().setHorizontalRule().run()}>
				horizontal rule
			</button>
			<button on:click={() => editor.chain().focus().setHardBreak().run()}> hard break </button>
			<button
				on:click={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}>
				<i class="fa-solid fa-rotate-left" />
			</button>
			<button
				on:click={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}>
				redo
			</button>
			<button on:click={addImage} disabled={!editor.can().chain().focus().setImage().run()}>
				<i class="fa-solid fa-image" />
			</button>
			<button on:click={addYoutube}>
				<i class="fa-brands fa-youtube" />
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHighlight().run()}
				class={editor.isActive('highlight') ? 'is-active' : ''}>
				<i class="fa-solid fa-highlighter" />
			</button>
			<button
				on:click={() => editor.chain().focus().setTextAlign('left').run()}
				class={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>
				<i class="fa-solid fa-align-left" />
			</button>
			<button
				on:click={() => editor.chain().focus().setTextAlign('center').run()}
				class={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>
				<i class="fa-solid fa-align-center" />
			</button>
			<button
				on:click={() => editor.chain().focus().setTextAlign('right').run()}
				class={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>
				<i class="fa-solid fa-align-right" />
			</button>
			<button
				on:click={() => editor.chain().focus().setTextAlign('justify').run()}
				class={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>
				<i class="fa-solid fa-align-justify" />
			</button>
			<button on:click={setLink} class={editor.isActive('link') ? 'is-active' : ''}>
				<i class="fa-solid fa-link" />
			</button>
			<button
				on:click={editor.chain().focus().unsetLink().run()}
				disabled={!editor.isActive('link')}>
				<i class="fa-solid fa-link-slash" />
			</button>
		</div>
	</div>
{/if}
<div class="bg-white rounded-lg rounded-t-none p-5 overflow-auto h-[60vh]" bind:this={element} />

<style lang="scss">
	/* Basic editor styles */
</style>
