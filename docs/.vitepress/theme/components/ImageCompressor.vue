<template>
	<div class="container">
		<div class="background-pattern"></div>
		<div class="content">
			<h1>图片压缩</h1>

			<el-card
				class="upload-area"
				v-if="!imageFile"
				:body-style="{ padding: 0 }"
			>
				<el-upload
					class="upload-drop"
					drag
					:auto-upload="false"
					:show-file-list="false"
					@change="handleFileChange"
					accept="image/*"
					:disabled="loading"
				>
					<template #default>
						<div class="upload-content">
							<el-icon class="el-icon--upload"><upload-filled /></el-icon>
							<div class="el-upload__text">拖拽图片到这里或点击上传</div>
							<div class="el-upload__tip">支持 JPG/PNG 等常见图片格式</div>
						</div>
					</template>
				</el-upload>
			</el-card>

			<div v-else>
				<div class="preview-container">
					<div class="preview-box">
						<h3>原图</h3>
						<div class="image-container">
							<img
								:src="originalPreview"
								alt="Original"
								class="preview-image"
							/>
						</div>
						<div class="image-info">
							<div class="image-info-item">
								<i class="el-icon-document"></i>
								<span>{{ formatFileSize(originalSize) }}</span>
							</div>
							<div class="image-info-item">
								<i class="el-icon-picture"></i>
								<span
									>{{ originalDimensions.width }} x
									{{ originalDimensions.height }}</span
								>
							</div>
						</div>
					</div>

					<div class="preview-box">
						<h3>压缩后</h3>
						<div class="image-container">
							<div
								class="comparison-slider"
								v-if="!loading && compressProgress >= 100"
							>
								<img
									:src="originalPreview"
									alt="Compressed"
									class="comparison-image"
								/>
								<div
									class="comparison-overlay"
									:style="{ '--position': comparisonValue + '%' }"
								>
									<img
										:src="compressedPreview"
										alt="Original"
										class="comparison-image"
									/>
								</div>
								<div
									class="slider-handle"
									:style="{ left: comparisonValue + '%' }"
									@mousedown="startDragging"
								>
									<div class="handle-line"></div>
									<div class="handle-arrows">
										<span>← 原图</span>
										<span>压缩 →</span>
									</div>
								</div>
								<div class="comparison-labels">
									<span class="label-left">原图</span>
									<span class="label-right">压缩</span>
								</div>
							</div>
							<template v-else>
								<div class="loading-overlay">
									<el-progress
										class="progress-circle"
										type="circle"
										color="#9c27b0"
										:percentage="compressProgress"
										:stroke-width="6"
									>
										<template #default>
											<div class="progress-info">
												<span>压缩中</span>
												<span>{{ compressProgress }}%</span>
											</div>
										</template>
									</el-progress>
								</div>
							</template>
						</div>
						<div class="image-info">
							<div class="image-info-item">
								<i class="el-icon-document"></i>
								<span>{{ formatFileSize(compressedSize) }}</span>
								<span
									v-if="compressedSize && originalSize"
									class="compression-ratio"
									:class="{ 'good-ratio': compressedSize / originalSize < 0.6 }"
								>
									({{ calculateCompressionRatio() }})
								</span>
							</div>
							<div class="image-info-item">
								<i class="el-icon-picture"></i>
								<span
									>{{ compressedDimensions.width }} x
									{{ compressedDimensions.height }}</span
								>
							</div>
						</div>
					</div>
				</div>

				<div class="controls">
					<el-form :model="options" label-width="120px">
						<el-form-item label="压缩质量">
							<div class="quality-label">
								<span class="quality-value"
									>{{ (options.quality * 100).toFixed(0) }}%</span
								>
							</div>
							<el-slider
								v-model="options.quality"
								:min="0.1"
								:max="1"
								:step="0.05"
								:marks="{
									0.1: '低质量',
									0.5: '平衡',
									1: '高质量',
								}"
								:disabled="loading"
							/>
						</el-form-item>
						<el-form-item label="输出尺寸">
							<div class="size-inputs">
								<el-input-number
									v-model="options.maxWidth"
									:min="100"
									:max="originalDimensions.width"
									:step="100"
									:disabled="loading"
									placeholder="宽度"
								/>
								<span>×</span>
								<el-input-number
									v-model="options.maxHeight"
									:min="100"
									:max="originalDimensions.height"
									:step="100"
									:disabled="loading"
									placeholder="高度"
								/>
								<el-checkbox v-model="options.maintainRatio" :disabled="loading"
									>保持比例</el-checkbox
								>
							</div>
						</el-form-item>
					</el-form>

					<div class="buttons">
						<el-button
							type="primary"
							@click="handleCompressClick"
							:loading="loading"
							:disabled="loading"
							>重新压缩</el-button
						>
						<el-button
							type="success"
							@click="downloadImage"
							:disabled="loading || !compressedPreview"
							>下载图片</el-button
						>
							<el-button type="danger" @click="resetImage" :disabled="loading"
							>重新选择</el-button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onUnmounted, watch } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";

const loading = ref(false);
const imageFile = ref(null);
const originalPreview = ref("");
const compressedPreview = ref("");
const originalSize = ref(0);
const compressedSize = ref(0);
const originalDimensions = reactive({ width: 0, height: 0 });
const compressedDimensions = reactive({ width: 0, height: 0 });
const compressProgress = ref(0);
const comparisonValue = ref(50);
let isDragging = false;

const options = reactive({
	quality: 0.8,
	maxWidth: 1920,
	maxHeight: 1080,
	maintainRatio: true,
});

// 监听宽度变化，自动调整高度
watch(
	() => options.maxWidth,
	(newWidth, oldWidth) => {
		if (
			options.maintainRatio &&
			originalDimensions.width > 0 &&
			newWidth !== oldWidth
		) {
			const ratio = originalDimensions.height / originalDimensions.width;
			options.maxHeight = Math.round(newWidth * ratio);
		}
	}
);

// 监听高度变化，自动调整宽度
watch(
	() => options.maxHeight,
	(newHeight, oldHeight) => {
		if (
			options.maintainRatio &&
			originalDimensions.width > 0 &&
			newHeight !== oldHeight
		) {
			const ratio = originalDimensions.width / originalDimensions.height;
			options.maxWidth = Math.round(newHeight * ratio);
		}
	}
);

const readFileAsDataURL = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => resolve(e.target.result);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
};

const loadImage = (src) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = src;
	});
};

const calculateAspectRatioFit = (srcWidth, srcHeight, maxWidth, maxHeight) => {
	const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
	return {
		width: Math.round(srcWidth * ratio),
		height: Math.round(srcHeight * ratio),
	};
};

const compressImageWithCanvas = async (
	file,
	quality = 0.6,
	maxWidth = 1920,
	maxHeight = 1080
) => {
	const img = await loadImage(await readFileAsDataURL(file));

	// 计算压缩后的尺寸
	const dimensions = calculateAspectRatioFit(
		img.width,
		img.height,
		maxWidth,
		maxHeight
	);

	// 创建 canvas
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	// 设置 canvas 尺寸
	canvas.width = dimensions.width;
	canvas.height = dimensions.height;

	// 清空画布
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// 绘制图片
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

	// 转换为 blob
	return new Promise((resolve) => {
		canvas.toBlob((blob) => resolve(blob), file.type || "image/jpeg", quality);
	});
};

const handleFileChange = async (file) => {
	if (loading.value) return;

	const fileObj = file.raw;
	if (fileObj) {
		try {
			// 读取原图为 base64
			const dataUrl = await readFileAsDataURL(fileObj);
			const img = await loadImage(dataUrl);

			// 设置原图信息
			imageFile.value = fileObj;
			originalSize.value = fileObj.size;
			originalPreview.value = dataUrl;
			originalDimensions.width = img.width;
			originalDimensions.height = img.height;

			// 设置初始输出尺寸与原图一致
			options.maxWidth = img.width;
			options.maxHeight = img.height;

			// 首次压缩
			await doCompressImage();
		} catch (error) {
			console.error("处理图片失败:", error);
			ElMessage.error("处理图片失败，请重试");
			loading.value = false;
			resetImage();
		}
	}
};

let progressInterval = null;

const doCompressImage = async () => {
	try {
		if (!imageFile.value) {
			ElMessage.warning("请先上传图片");
			return;
		}

		loading.value = true;
		compressProgress.value = 0;

		progressInterval = setInterval(() => {
			if (compressProgress.value < 90) {
				compressProgress.value = compressProgress.value + 1;
			} else {
				clearInterval(progressInterval);
			}
		}, 20);

		let compressedBlob = await compressImageWithCanvas(
			imageFile.value,
			options.quality,
			options.maxWidth,
			options.maxHeight
		);

		const dataUrl = await readFileAsDataURL(compressedBlob);
		const img = await loadImage(dataUrl);

		compressedSize.value = compressedBlob.size;
		compressedPreview.value = dataUrl;
		compressedDimensions.width = img.width;
		compressedDimensions.height = img.height;

		compressProgress.value = 100;
		ElMessage.success("压缩成功");

		setTimeout(() => {
			// Check if compressed image is larger
			if (compressedBlob.size >= originalSize.value) {
				ElMessage.warning("压缩后的图片比原图大，请降低质量设置.");
			}
		}, 500);
	} catch (error) {
		console.error("doCompressImage 压缩失败:", error);
		ElMessage.error("压缩失败，请重试");
		clearInterval(progressInterval);
		compressProgress.value = 100;
	} finally {
		loading.value = false;
	}
};

const handleCompressClick = async () => {
	if (loading.value) return;

	try {
		await doCompressImage();
	} catch (error) {
		console.error("handleCompressClick 压缩失败:", error);
	}
};

const downloadImage = async () => {
	try {
		if (!compressedPreview.value) {
			ElMessage.warning("请先上传并压缩图片");
			return;
		}

		// 从 base64 创建 Blob
		const base64Data = compressedPreview.value.split(",")[1];
		const byteCharacters = atob(base64Data);
		const byteArrays = [];

		for (let offset = 0; offset < byteCharacters.length; offset += 512) {
			const slice = byteCharacters.slice(offset, offset + 512);
			const byteNumbers = new Array(slice.length);

			for (let i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			const byteArray = new Uint8Array(byteNumbers);
			byteArrays.push(byteArray);
		}

		const blob = new Blob(byteArrays, {
			type: imageFile.value.type || "image/jpeg",
		});
		const url = URL.createObjectURL(blob);

		const link = document.createElement("a");
		link.href = url;
		link.download = `compressed_${imageFile.value.name}`;
		document.body.appendChild(link);
		link.click();

		// 清理
		URL.revokeObjectURL(url);
		document.body.removeChild(link);

		ElMessage.success("下载成功");
	} catch (error) {
		console.error("下载失败:", error);
		ElMessage.error("下载失败，请重试");
	}
};

const resetImage = () => {
	if (loading.value) return;

	compressProgress.value = 0;

	// 先清理 URL 对象
	if (originalPreview.value && originalPreview.value.startsWith("blob:")) {
		URL.revokeObjectURL(originalPreview.value);
	}
	if (compressedPreview.value && compressedPreview.value.startsWith("blob:")) {
		URL.revokeObjectURL(compressedPreview.value);
	}

	// 重置所有状态
	imageFile.value = null;
	originalPreview.value = "";
	compressedPreview.value = "";
	originalSize.value = 0;
	compressedSize.value = 0;
	Object.assign(originalDimensions, { width: 0, height: 0 });
	Object.assign(compressedDimensions, { width: 0, height: 0 });
};

// 组件卸载时清理
onUnmounted(() => {
	if (originalPreview.value) {
		URL.revokeObjectURL(originalPreview.value);
	}
	if (compressedPreview.value) {
		URL.revokeObjectURL(compressedPreview.value);
	}
});

const formatFileSize = (bytes) => {
	if (bytes === 0) return "0 B";
	const k = 1024;
	const sizes = ["B", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
};

const startDragging = (e) => {
	isDragging = true;
	document.addEventListener("mousemove", handleDragging);
	document.addEventListener("mouseup", stopDragging);
};

const handleDragging = (e) => {
	if (!isDragging) return;

	const container = e.target.closest(".comparison-slider");
	if (!container) return;

	const rect = container.getBoundingClientRect();
	const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
	comparisonValue.value = Math.round((x / rect.width) * 100);
};

const stopDragging = () => {
	isDragging = false;
	document.removeEventListener("mousemove", handleDragging);
	document.removeEventListener("mouseup", stopDragging);
};

// const calculateCompressionRatio = () => {
//   const ratio = (compressedSize.value / originalSize.value * 100).toFixed(1)
//   return `节省 ${(100 - ratio)}%`
// }

const calculateCompressionRatio = () => {
	const ratio = (compressedSize.value / originalSize.value) * 100;
	const formattedRatio = Number(ratio.toFixed(2));
	return `节省 ${(100 - formattedRatio).toFixed(2)}%`;
};
</script>

<style scoped lang="scss">
.container {
	max-width: 100%;
	min-height: 100vh;
	position: relative;
	overflow: hidden;
}

.background-pattern {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	pointer-events: none;
	z-index: 0;
}

.content {
	position: relative;
	z-index: 1;
	padding: 40px 20px;
}

h1 {
	text-align: center;
	margin-bottom: 60px;
	color: #9c27b0;
	font-size: 2.5rem;
	font-weight: 800;
	letter-spacing: -1px;
}

.upload-area {
	width: 100%;
	max-width: 800px;
	margin: 0 auto;
	background-color: transparent;
	border: none;
	box-shadow: none;
}

.upload-content {
	border: 2px dashed #d1c4e9;
	border-radius: 24px;
	padding: 60px 40px;
	transition: all 0.3s ease;
	position: relative;
	overflow: hidden;
}

.upload-content:hover {
	border-color: #b39ddb;
}

.el-icon--upload {
	font-size: 64px;
	color: #b39ddb;
	margin-bottom: 24px;
}

.preview-container {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 40px;
	margin: 40px auto;
	max-width: 1400px;
}

.preview-box {
	border-radius: 24px;
	padding: 28px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.preview-box h3 {
	font-size: 1.2rem;
	color: #9c27b0;
	margin-bottom: 20px;
	font-weight: 600;
	display: flex;
	align-items: center;
	gap: 8px;
}

.image-container {
	width: 100%;
	aspect-ratio: 16/9;
	border-radius: 12px;
	overflow: hidden;
	position: relative;
}

.image-container img {
	width: 100%;
	height: 100%;
	object-fit: contain;
}

.loading-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(255, 255, 255, 0.9);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 16px;
}

.progress-circle {
	width: 120px;
	height: 120px;
}

.controls {
	max-width: 800px;
	margin: 32px auto;
	padding: 32px;
	border-radius: 24px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.controls .el-form-item {
	margin-bottom: 24px;
}

.size-inputs {
	display: grid;
	grid-template-columns: 1fr auto 1fr auto;
	gap: 20px;
	align-items: center;
	margin: 8px 0;
}

.size-inputs span {
	color: #666;
	font-size: 1.1rem;
}

:deep(.el-upload-dragger) {
	border: none !important;
	background-color: transparent;
}

:deep(.el-checkbox) {
	margin-left: 8px;
}

:deep(.el-checkbox__label) {
	font-size: 0.95rem;
}

.quality-label {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12px;
}

.quality-label span:first-child {
	font-size: 0.95rem;
	color: #9c27b0;
}

.quality-value {
	color: #666;
	font-size: 0.95rem;
	font-weight: 500;
}

:deep(.el-form-item__label) {
	font-weight: 500;
	color: #9c27b0;
	font-size: 1.05rem;
	padding-bottom: 4px;
}

:deep(.el-input-number .el-input__wrapper) {
	padding: 6px 12px;
	background-color: transparent !important;
}

:deep(.el-slider__runway) {
	margin: 16px 0;
}

.buttons {
	display: flex;
	justify-content: center;
	gap: 16px;
	margin-top: 32px;
	padding-top: 24px;
	border-top: 1px solid #f0f0f0;
}

:deep(.el-button) {
	min-width: 120px;
	padding: 12px 32px;
	font-weight: 500;
	border-radius: 12px;
	transition: all 0.3s ease;
}

:deep(.el-button--primary) {
	background: linear-gradient(135deg, #d1c4e9 0%, #b39ddb 100%);
	border: none;
	box-shadow: 0 4px 12px rgba(209, 196, 233, 0.3);
}

:deep(.el-button--success) {
	background: linear-gradient(135deg, #c5cae9 0%, #9fa8da 100%);
	border: none;
	box-shadow: 0 4px 12px rgba(197, 202, 233, 0.3);
}

:deep(.el-button:hover) {
	transform: translateY(-2px);
	box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.compressed-image-container {
	width: 100%;
	height: 360px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(135deg, #f0f4c3 0%, #e6ee9c 100%);
	border-radius: 16px;
	border: 1px solid #e2e8f0;
	overflow: hidden;
}

.loading-placeholder {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;
	height: 100%;
	width: 100%;
	background: linear-gradient(135deg, #f0f4c3 0%, #e6ee9c 100%);
}

.progress-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	font-size: 1rem;
	color: #9c27b0;
}

.el-upload__text {
	color: #9c27b0;
	font-size: 1.1rem;
	text-align: center;
	font-weight: 500;
	letter-spacing: -0.3px;
}

.el-upload__tip {
	font-size: 0.9rem;
	color: #b39ddb;
	margin-top: 16px;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
	background-color: #b39ddb;
	border-color: #b39ddb;
}

:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
	color: #9c27b0;
}

:deep(.el-slider__bar) {
	background-color: #b39ddb;
}

:deep(.el-slider__button) {
	border-color: #b39ddb;
}

:deep(.el-input-number__decrease:hover),
:deep(.el-input-number__increase:hover) {
	color: #b39ddb;
}

:deep(.el-input-number.is-controls-right .el-input-number__increase),
:deep(.el-input-number.is-controls-right .el-input-number__decrease) {
	border-left: 1px solid #dcdfe6;
}
:deep(.el-input-number__increase),
:deep(.el-input-number__decrease) {
	background-color: transparent !important;

}




.image-info {
	margin-top: 16px;
	display: flex;
	justify-content: space-between;
	color: #666;
	font-size: 0.9rem;
}

.image-info-item {
	display: flex;
	align-items: center;
	gap: 8px;
}

.image-info-item i {
	color: #b39ddb;
	font-size: 1.1rem;
}

.compression-ratio {
	margin-left: 8px;
	color: #666;
}

.good-ratio {
	color: #7e57c2;
	font-weight: 500;
}

.preview-image {
	width: 100%;
	height: 100%;
	object-fit: contain;
}

.comparison-slider {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	user-select: none;
	-webkit-user-select: none;
}

.comparison-image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: contain;
	pointer-events: none;
	user-drag: none;
	-webkit-user-drag: none;
}

.comparison-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	clip-path: inset(0 0 0 calc(var(--position)));
}

.slider-handle {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 40px;
	transform: translateX(-50%);
	z-index: 2;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: col-resize;
	left: var(--position);
}

.handle-line {
	position: absolute;
	width: 2px;
	height: 100%;
	background-color: rgba(179, 157, 219, 0.5);
}

.handle-arrows {
	display: none;
}

.comparison-labels {
	position: absolute;
	top: 10px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 0 10px;
	color: #9c27b0;
	font-weight: bold;
}

.label-left {
	text-align: left;
}

.label-right {
	text-align: right;
}
</style>
