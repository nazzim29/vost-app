<template>
	<TransitionRoot appear :show="open" as="template">
		<Dialog @close="closeModal">
			<div
				class="fixed inset-0 overflow-hidden text-center"
				style="z-index: 9999"
			>
				<TransitionChild
					as="template"
					enter="duration-300 ease-out"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="duration-200 ease-in"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<DialogOverlay class="fixed inset-0" />
				</TransitionChild>

				<span class="inline-block h-full align-middle" aria-hidden="true">
					&#8203;
				</span>

				<TransitionChild
					as="template"
					enter="duration-300 ease-out"
					enter-from="opacity-0 scale-95"
					enter-to="opacity-100 scale-100"
					leave="duration-200 ease-in"
					leave-from="opacity-100 scale-100"
					leave-to="opacity-0 scale-95"
				>
					<div
						class="
							overflow-hidden
							mx-5
							pt-2
							inline-flex
							flex-col
							align-middle
							transition-all
							transform
							bg-white
							shadow-xl
							rounded-2xl
						"
						style="
							max-height: calc(100vh - 16px);
						"
					>
						<DialogTitle
							as="h3"
							class="text-lg font-medium leading-6 text-gray-900 shadow-md pb-1"
						>
							<slot name="title"></slot>
						</DialogTitle>
						<div class="flex flex-1 overflow-hidden min-h-16 items-center overflow-y-auto">
							<slot name="body" :obj="obj"></slot>
						</div>

						<div class="w-full flex flex-row justify-end space-x-2 pr-2 py-1.5 shadow-top" style="z-index: 9999">
							<button
								type="button"
								class="
									inline-flex
									justify-center
									px-4
									py-2
									text-sm
									font-medium
									text-blue-900
									bg-blue-100
									border border-transparent
									rounded-md
									hover:bg-blue-200
									focus:outline-none
									focus-visible:ring-2
									focus-visible:ring-offset-2
									focus-visible:ring-blue-500
								"
								@click="closeModal"
							>
								Cancel
							</button>
							<button
								type="button"
								class="
									inline-flex
									justify-center
									px-4
									py-2
									text-sm
									font-medium
									text-blue-900
									bg-blue-100
									border border-transparent
									rounded-md
									hover:bg-blue-200
									focus:outline-none
									focus-visible:ring-2
									focus-visible:ring-offset-2
									focus-visible:ring-blue-500
								"
								@click="this.$emit('submit', this.obj)"
							>
								<slot name="submit"></slot>
							</button>
							
						</div>
					</div>
				</TransitionChild>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script>
import {
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogOverlay,
	DialogTitle,
} from "@headlessui/vue";
export default {
	// props:[{name:"parent",type:Object,}],
	components: {
		TransitionRoot,
		TransitionChild,
		Dialog,
		DialogOverlay,
		DialogTitle,
	},
	data() {
		return { open: false, obj: null };
	},
	methods: {
		closeModal() {
			this.open = false;
		},
		openModal() {
			this.open = true;
		},
	},
};
</script>

<style scoped>
.shadow-top{
	box-shadow:0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
