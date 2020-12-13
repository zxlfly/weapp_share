'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	var res=await uniCloud.httpclient.request(
		'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=mCje1z5RVNto5lELviHMDsuE&client_secret=KtmvGnG1FzG8I1IbeT6p2W1dnl2pyVw1&',
		{
			dataType:'json'
		}
	);
	var access_token =res.data.access_token
	console.log(access_token);
	var classify=uniCloud.httpclient.request(
		'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general',
		{
			method:'POST',
			headers:{
				"content-type":'application/x-www-form-urlencoded'
			},
			data:{
				"access_token":access_token,
				image:event.image
			},
			dataType:'json'
		}
	)
	//返回数据给客户端
	return classify
};
