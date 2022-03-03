<template>
	<div
		v-if="dataLength != 0"
		class="h-10 self-end flex flex-row w-full justify-center items-center"
	>
		<ul class="flex flex-row items-center justify-center space-x-3">
			<li class="diamond bg-blue-800 p-0.5 rounded-md text-white">
				<div>
					<ChevronDoubleLeftIcon
						class="h-5"
						@click="currentPage != 1&&$emit('first')"
						:disabled="currentPage == 1"
					/>
				</div>
			</li>
			<li class="diamond bg-blue-800 p-0.5 rounded-md text-white">
				<div>
					<ChevronLeftIcon
						class="h-5"
						@click="currentPage != 1&&$emit('prev')"
						:disabled="currentPage == 1"
					/>
				</div>
			</li>
			<div class="flex flex-row space-x-3 items-center justify-center px-3">
				<template v-for="i in pageNumber" :key="i">
					<li
						v-if="currentPage - 3 < i && i < currentPage + 3"
						class="diamond bg-blue-800 p-0.5 h-5 w-5 rounded-md text-white"
					>
						<div
							@click="$emit('page', i)"
							:class="[
								'flex h-full w-full items-center justify-center cursor-pointer',
								i === currentPage && 'text-red-500',
							]"
						>
							{{ i }}
						</div>
					</li>
				</template>
			</div>
			<li class="diamond bg-blue-800 p-0.5 rounded-md text-white">
				<div>
					<ChevronRightIcon
						class="h-5"
						@click="currentPage != pageNumber&&$emit('next')"
						:disabled="currentPage == pageNumber"
					/>
				</div>
			</li>
			<li class="diamond bg-blue-800 p-0.5 rounded-md text-white">
				<div>
					<ChevronDoubleRightIcon
						class="h-5"
						@click="currentPage != pageNumber&&$emit('last')"
						:disabled="currentPage == pageNumber"
					/>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import {
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
	ChevronRightIcon,
	ChevronLeftIcon,
} from "@heroicons/vue/solid";

export default {
    name: "Pagination",
    props:{
        currentPage:{
            type: Number,
            default: 1
        },
        pageSize:{
            type: Number,
            default: 1
        },
        dataLength:{
            type:Number,
            required:true
        }
    },
    components:{
        ChevronDoubleLeftIcon,
        ChevronDoubleRightIcon,
        ChevronRightIcon,
        ChevronLeftIcon,
    },
    computed:{
        pageNumber() {
			let nb = this.dataLength / this.pageSize;
			if (this.dataLength % this.pageSize != 0) nb++;
            console.log(nb)
			return parseInt(nb);
		},
    }
};
</script>

<style></style>
