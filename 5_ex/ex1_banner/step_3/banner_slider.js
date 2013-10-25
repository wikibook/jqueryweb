// 배너 하나의 크기.
var BANNER_WIDTH		=980;
var SHOW_DURATION		=500; 

// 우리가 움직이게 될 배너 컨텐츠 엘리먼트.
var $banner_content;
// 배너 전체 갯수.
var nBannerLength = 0;
// 현재 화면에 보이고 있는 배너 인덱스
var nCurrentBannerIndex = 0;


$(document).ready(function(){
	// 배너 컨텐츠 영역의 크기를 동적으로 늘리기.
	$banner_content	= $("#banner_content");
	nBannerLength = $banner_content.children("img").length;		
	$banner_content.width(BANNER_WIDTH*nBannerLength);
	
	// <--- 이전  배너 이동
	$("#btn_prev_banner").bind("click",function(){
		
		//앞으로 등장할 배너 인덱스 구하기
		var nIndex = nCurrentBannerIndex-1;
		
		//앞으로 등장할 배너가 없는 경우 마지막 배너의 인덱스 값으로 설정
		if(nIndex<0)
			nIndex = nBannerLength-1;
	
		nCurrentBannerIndex = nIndex;
		
		//배너 이동
		var nPosition = -BANNER_WIDTH*nCurrentBannerIndex;
						
		// 슬라이드 효과 시작.
		$banner_content.stop();
		$banner_content.animate({
				left:nPosition
			},
			SHOW_DURATION, 
			"easeOutQuint"
		);
	})
	
	// ---> 다음 배너 이동.
	$("#btn_next_banner").bind("click",function(){
		// 이동할 다음  배너 index값 구하기.
		var nIndex = nCurrentBannerIndex+1;
		
		// 다음 내용이 없는 경우, 첫번째 배너 인덱스 값으로 설정하기.
		if(nIndex>=nBannerLength)
			nIndex = 0;
			
		nCurrentBannerIndex = nIndex;
		
		//  n번째 배너 위치값 구하기.
		var nPosition = -BANNER_WIDTH*nCurrentBannerIndex;		
		// 슬라이드 시작.
		$banner_content.stop();
		$banner_content.animate({
				left:nPosition
			},
			SHOW_DURATION, 
			"easeOutQuint"
		);
	})	
});




