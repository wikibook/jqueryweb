
// 한페이지에 들어가는 썸네일 이미지 갯수.
var PAGE_THUMB_COUNT = 8;
// 한페이지 높이.
var PAGE_HEIHGT = 66;
// 페이지 애니메이션 진행시간.
var PAGE_ANIMATION = 300; 

var nCurrentPageIndex;
var nPageLength;
var $pageInfo;
var $thumbs;
var $thumbList;

// 로딩 이미지가 출력될 영역.
var $imageCanvas;

// 이미지 로딩패널.
var $imageLoadingPanel;

$(document).ready(function(){
	// 이미지 갤러리와 관련된 정보 초기화 하기.
	init();
	// 썸네일 이미지 정보 설정하기.
	updateThumbnailImages();
	//전체 페이지 갯수 구하기.
	calculatePageLength();
	// 페이지 정보 업데이트 시키기.
	updatePageInfo();
	// 이벤트 초기화시키기.
	initEventListener();
});

// 이미지 갤러리와 관련된 정보 초기화 하기.
function init(){
	// 기본값으로 현재 페이지 정보를 0로 한다.
	this.nCurrentPageIndex = 0;
	this.nPageLength = 0;
	
	this.$pageInfo = $("#page_info");
	this.$thumbList = $("#thumb_list");
	
	this.$imageCanvas = $("#image_canvas");
	
	this.$imageLoadingPanel	= $("#loading_panel");
}

// 썸네일 이미지 정보 설정하기.
function updateThumbnailImages(){
	this.$thumbs = $("#thumb_list img");
}

// 전체 페이지 갯수 구하기.
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
	
	
	// 썸네일이 클릭되는경우, 썸네일에 해당하는 이미지 읽기.
	this.$thumbs.bind("click",function(){
		var nIndex = $thumbs.index($(this));
		loadImage(nIndex)
				
	})
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



// nIndex에 해당하는 이미지 읽기.
function loadImage(nIndex){
	// 1. 로딩 패널 활성화 시키기.
	this.showLoadingPanel(true);
	
	// 2. 이미지 캔버스 안에 들어 있는 기존 이미지 제거하기.
	this.$imageCanvas.empty();
	
	var imageLoader = new Image();
	imageLoader.addEventListener("load", function(){
		//alert("width "+ imageLoader.width+", height ="+imageLoader.height)
		
		// 로딩 패널 비활성화 시키기.
		showLoadingPanel(false);	
		
		$imageCanvas.append(imageLoader);		
	});
	
	// 3. 이미지 로딩 시작.
	imageLoader.src = "../img/"+(nIndex+1)+".jpg";		
	
}


// 로딩중 패널 표시/숨기기 처리.
function showLoadingPanel(bShow){
	if(bShow)
		this.$imageLoadingPanel.css("visibility", "visible");
	else
		this.$imageLoadingPanel.css("visibility", "hidden");
}








