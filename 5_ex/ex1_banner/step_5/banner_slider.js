// 배너 하나의 크기.
var BANNER_WIDTH = 980;
var SHOW_DURATION = 500; 

// 우리가 움직이게 될 배너 컨텐츠 엘리먼트.
var $banner_content;
// 배너 전체 갯수.
var nBannerLength = 0;
// 현재 화면에 보이고 있는 배너 index
var nCurrentBannerIndex = 0;

// 네비게이션의 위치를 표시할 엘리먼트( <a>)가 담길 변수.
var $banner_dots;

$(document).ready(function(){
	initMenu();
	initEventListener();
});

// 메뉴 엘리먼트 관련 초기화.
function initMenu(){
	// 배너 컨텐츠 영역의 크기를 동적으로 늘려준다.
	$banner_content = $("#banner_content");
	nBannerLength = $banner_content.children("img").length;
	
	// 배너 컨텐츠의 넓이를 배너 하나의 크기 * 배너 갯수의 값으로 설정하기.
	$banner_content.width(BANNER_WIDTH * nBannerLength);
	
	
	// 네비게이션의 위치를 표시할 엘리먼트( <a>)가 담길 변수.
	$banner_dots = $("#banner_nav li a");
	// 네비게이션의 위치를 0번째로 초기화 시킴.
	showBannerDotAt(0);
}

// 이벤트 처리.
function initEventListener(){
	// 이전  배너 보이기
	$("#btn_prev_banner").bind("click", function(){
		prevBanner();
	});
	// 다음 배너 보이기
	$("#btn_next_banner").bind("click", function(){
		nextBanner();
	});
	
	// 네비게이션에서 마우스가 오버되는 경우, 오버된 위치에 맞게 배너를 보이도록 하기.
	$banner_dots.bind("mouseenter",function(){
		var nIndex = $banner_dots.index(this);
		showBannerAt(nIndex);
	})
}
	

// 이전  배너 보이기
function prevBanner(){
	// 이동할 이전 배너 index값 구하기.
	var nIndex = this.nCurrentBannerIndex-1;
	// 이전 내용이 없는 경우 마지막 배너 index값으로 설정하기.
	if(nIndex<0)
		nIndex = this.nBannerLength-1;
		
	// n번째 배너 보이기.	
	this.showBannerAt(nIndex);			
}

// 다음 배너 보이기
function nextBanner(){
	// 이동할 이전 배너 index값 구하기.
	var nIndex = this.nCurrentBannerIndex+1;
	// 다음 내용이 없는 경우, 첫번째 배너 index값으로 설정하기.
	if(nIndex>=nBannerLength)
		nIndex = 0;
	
	// n번째 배너 보이기.		
	this.showBannerAt(nIndex);	
}

// nIndex에 해당하는 배너 보이기.
function showBannerAt(nIndex){
	//  n번째 배너 위치값 구하기.
	var nPosition = -BANNER_WIDTH*nIndex;
	
	// 배너 메뉴의 위치값을 업데이트 시킴.
	this.showBannerDotAt(nIndex);
	
	// 슬라이드 시작.
	$banner_content.stop();
	$banner_content.animate({
			left:nPosition
		},
		SHOW_DURATION, 
		"easeOutQuint"
	);
	//현재 배너 index 업데이트 시키기.
	this.nCurrentBannerIndex = nIndex;
}


// 배너 메뉴의 위치값을 업데이트 시킴.
function showBannerDotAt(nIndex){
	this.$banner_dots.eq(this.nCurrentBannerIndex).removeClass("select");
	this.$banner_dots.eq(nIndex).addClass("select");
}


