// 배너 하나의 크기.
var BANNER_WIDTH = 980;


// 우리가 움직이게 될 배너 컨텐츠 엘리먼트.
var $banner_content;
var nBannerLength = 0; 
$(document).ready(function(){
	// 배너 컨텐츠 영역의 크기를 동적으로 늘려준다.
	$banner_content	=$("#banner_content");
	nBannerLength = $banner_content.children("img").length;		
	$banner_content.width(BANNER_WIDTH*nBannerLength);

});