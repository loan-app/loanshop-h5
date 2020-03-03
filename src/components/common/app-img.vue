<template>
	<div>
		<canvas ref="canvas" style="display: none;"></canvas>
		<img :src="imgsrc"  v-if="imgsrc">
		
	</div>
</template>

<script>
export default {
	data() {
		return {
			imgsrc: ''
		}
	},
	props: {
		src: String,
		maxHeight: {
			type: Number,
			default: 400,
		},
	},
	watch: {
		src() {
			const canvas = this.$refs.canvas
			const image = new Image()	
			image.onload = () => {
				if(image.height > this.maxHeight) {
					image.width *= this.maxHeight / image.height
            		image.height = this.maxHeight
				}
				const ctx = canvas.getContext("2d")
				ctx.clearRect(0, 0, canvas.width, canvas.height)
				canvas.width = image.width
				canvas.height = image.height
				ctx.drawImage(image, 0, 0, image.width, image.height)
				this.imgsrc = canvas.toDataURL()
				console.log(this.imgsrc.length/1024+'k')
			}
			image.src = this.src
		}
	},
}
</script>
