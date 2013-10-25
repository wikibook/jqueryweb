// 배너 하나의 크기.
var BANNER_WIDTH = 980;
var SHOW_DURATION = 500; 

// 우리가 움직이게 될 배너 컨텐츠 엘리먼트.
var $banner_content;
// 배너 전체 갯수.
var nBannerLength = 0;
// 현재 화면에 보이고 있는 배너 index
var nCurrentBannerIndex = 0;

$(document).ready(function(){
	// 배너 컨텐츠 영역의 크기를 동적으로 늘리기.
	$banner_content	= $("#banner_content");
	nBannerLength = $banner_content.children("img").length;	
	$banner_content.width(BANNER_WIDTH*nBannerLength);

	// 이전  배너 보이기
	$("#btn_prev_banner").bind("click", function(){
		prevBanner();
	});
	
	// 다음 배너 보이기
	$("#btn_next_banner").bind("click", function(){
		nextBanner();
	});
});


// 이전  배너  보이기
function prevBanner(){
	// 이동할 이전 배너 인덱스 값 구하기.
	var nIndex = this.nCurrentBannerIndex-1;
	
	// 이전 내용이 없는 경우 마지막 배너 인덱스 값으로 설정하기.
	if(nIndex<0)
		nIndex = this.nBannerLength-1;
		
	// n번째 배너 보이기.	
	this.showBannerAt(nIndex);			
}


// 다음 배너 보이기
function nextBanner(){
	// 이동할 이전 배너 인덱스 값 구하기.
	var nIndex = this.nCurrentBannerIndex+1;
	
	// 다음 내용이 없는 경우, 첫번째 배너 인덱스 값으로 설정하기.
	if(nIndex>=nBannerLength)
		nIndex = 0;
	
	// n번째 배너 보이기.		
	this.showBannerAt(nIndex);	
}


// nIndex에 해당하는 배너 보이기.
function showBannerAt(nIndex){
	//  n번째 배너 위치값 구하기.
	var nPosition = -BANNER_WIDTH*nIndex;
	
	// 슬라이드 시작.
	$banner_content.stop();
	$banner_content.animate({
			left:nPosition
		},
		SHOW_DURATION, 
		"easeOutQuint"
	);
	//현재 배너 인덱스 업데이트 시키기.
	this.nCurrentBannerIndex = nIndex;
}


