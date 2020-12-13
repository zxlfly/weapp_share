<template>
	<view class="content">
		<button type="default" @click="btnTakePhoto">拍照或从相册选择一张照片</button>
		<image :src="imagepath" mode="widthFix" class="img"></image>
		<view class="res">{{selectRes}}</view>
		<view class="res">{{matched}}</view>
		<view v-for="x in list" class="item">
			<view>
				{{x.keywords}}
			</view>
			<view>
				{{x.typename}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imagepath:'',
				matched:'',
				list:[],
				selectRes:''
			}
		},
		onLoad() {

		},
		methods: {
			btnTakePhoto(){
				// 从手机相册选取一张照片，并显示到页面中
				uni.chooseImage({
					count:1,
					success: (res) => {
						console.log(res);
						this.imagepath=res.tempFilePaths[0]
						this.imgto64(this.imagepath)
					}
				})
			},
			imgto64(path){
				// 图片转成base64
				wx.getFileSystemManager().readFile({
					filePath:path,
					encoding:'base64',
					success:(res)=>{
						// 调用百度图像识别api
						uniCloud.callFunction({
							name:'imgClassify',
							data:{
								image:res.data
							},
							success: (d) => {
								console.log(d.result.data.result);
								this.paserRes(d.result.data.result)
							}
						})
					}
				})
			},
			// 展示图像识别结果
			paserRes(res){
				let items =[]
				let absItems=''
				for (var i = 0; i < res.length; i++) {
					items.push(res[i].keyword+""+res[i].score)
					if(res[i].score>=.8){
						absItems=(i)
						break
					}
				}
				if(absItems>=0){
					this.selectRes=res[absItems].keyword
					this.searchKerword(res[absItems].keyword)
					return
				}
				uni.showActionSheet({
					itemList:items,
					success: (res) => {
						this.selectRes=res.tapIndex
						this.searchKerword(res.tapIndex)
					}
				});
			},
			// 使用图片识别的结果去调用垃圾分类查询的api
			searchKerword(key){
				uniCloud.callFunction({
					name:'TrashClassify',
					data:{
						keyword:key
					},
					success: (res) => {
						console.log(res);
						if(res.result.matched){
							this.matched=res.result.matched.typename
						}else{
							this.matched=''
						}
						this.list=res.result.similars
					}
				})
			}
		}
	}
</script>

<style>
	.img{
		width: 100%;
	}
	.res{
		text-align: center;
	}
	.item{
		display: flex;
		justify-content: space-between;
	}
</style>
