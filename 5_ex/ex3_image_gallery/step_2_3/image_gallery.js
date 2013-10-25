
// 한페이지에 들어가는 썸네일 이미지 개수.
var PAGE_THUMB_COUNT = 8;
// 한 페이지 높이.
var PAGE_HEIHGT = 66;
// 페이지 애니메이션 진행 시간.
var PAGE_ANIMATION = 300; 

var nCurrentPageIndex;
var nPageLength;
var $pageInfo;
var $thumbs;
var $thumbList;


$(document).ready(function(){
	// 이미지 갤러리와 관련된 정보 초기화 하기.
	init();
	// 썸네일 이미지 정보 설정하기.
	updateThumbnailImages();
	//전체 페이지 개수 구하기.
	calculatePageLength();
	// 페이지 정보 업데이트 시키기.
	updatePageInfo();
	// 이벤트 초기화시키기.
	initEventListener();
});


// 이미지 갤러리와 관련된 정보 초기화 하기.
function init(){
	// 현재 페이지 인덱스를 0으로 초기화.
	this.nCurrentPageIndex = 0;
	this.nPageLength = 0;
	this.$pageInfo = $("#page_info");
	this.$thumbList = $("#thumb_list");
}


// 썸네일 이미지 정보 설정하기.
function updateThumbnailImages(){
	this.$thumbs = $("#thumb_list img");
}


// 전체 페이지 개수 구하기.
function calculatePageLength(){
	this.nPageLength = Math.ceil(this.$thumbs.size()/PAGE_THUMB_COUNT);
	
}


// 페이지 정보 업데이트 시키기.
function updatePageInfo(){
	// 페이지 정보를 출력한다.
	this.$pageInfo.html("page : "+(this.nCurrentPageIndex+1)+"/"+this.nPageLength);
}


// 이벤트 초기화시키기.
function initEventListener(){		
	// 이전 페이지로 이동.
	$("#prev_page").bind("click",function(){
		prevPage();
	});
	
	// 다음 페이지로 이동.
	$("#next_page").bind("click",function(){				
		nextPage();
	});
}


// 이전 페이지 이동.
function prevPage(){
	var nPageIndex = this.nCurrentPageIndex-1;
	if(nPageIndex<0)
		nPageIndex = 0;
	// n페이지 활성화.
	this.showPage(nPageIndex);
}


// 다음 페이지 이동.
function nextPage(){
	var nPageIndex = this.nCurrentPageIndex+1;
	if(nPageIndex>=this.nPageLength)
		nPageIndex = this.nPageLength-1;
	// n페이지 활성화.
	this.showPage(nPageIndex);
}


// n번째에 해당하는 페이지 활성화시키기.(slideup,slidedown 효과 )
function showPage(nPageIndex){
	this.$thumbList.stop();
	this.$thumbList.animate({top:-(nPageIndex*PAGE_HEIHGT)},
			PAGE_ANIMATION,
			"easeOutQuint");
			
	this.nCurrentPageIndex = nPageIndex;		
	this.updatePageInfo();	
}













