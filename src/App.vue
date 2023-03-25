<template>
	<nav-bar v-if="loggedIn" :extended="true" />
	<div
		class="flex-1 w-full overflow-x-hidden h-screen"
		:class="{ 'pl-1/6 md:pl-16 bg': loggedIn }"
	>
		<router-view />
	</div>
	<div
		ref="cursorRef"
		:class="['cursor', { hover: hover }, { hidden: hideCursor }]"
		:style="cursorCircle"
	>
		<Icon icon="bi:brush" class="h-10 w-10 text-gray-300" />
	</div>
</template>
<style>
body {
	background-color: rgba(55, 65, 81);
	font-family: Roboto;
	cursor: none;
}
.bg {
	background-color: rgba(55, 65, 81);
}
.pl-1\/6 {
	padding-left: 16.666%;
}
@media (min-width: 768px) {
	.md\:pl-16 {
		padding-left: 3.5rem /* 64px */;
	}
}

.cursor {
	position: fixed;
	pointer-events: none;
	user-select: none;
	top: 0;
	left: 0;
	z-index: 999999;
	backface-visibility: hidden;
}
.cursor.hidden {
	opacity: 0;
	transition: width 0.6s ease, height 0.6s ease, opacity 0.6s ease;
}
</style>
<script>
import { Icon } from '@iconify/vue';
export default {
	name: "App",
	components: {
		Icon
	},
	data() {
		return {
			hover: false,
			hideCursor: true,
			xParent: 0,
			yParent: 0,
		};
	},
	computed: {
		loggedIn() {
			return this.$store.state.users.authenticated;
		},
		cursorCircle() {
			return `transform: translateX(${this.xParent}px) translateY(${this.yParent}px) translateZ(0) translate3d(0, 0, 0);`;
		},
	},
	methods: {
		moveCursor(e) {
			this.xParent = e.clientX-1;
			this.yParent = e.clientY-25;
		},
	},
	mounted() {
		document.addEventListener("mousemove", this.moveCursor);
		document.addEventListener("mouseleave", () => {
			this.hideCursor = true;
		});
		document.addEventListener("mouseenter", () => {
			this.hideCursor = false;
		});
	},
};
</script>

<style></style>
