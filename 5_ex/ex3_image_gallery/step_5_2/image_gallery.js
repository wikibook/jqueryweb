
// 한페이지에 들어가는 썸네일 이미지 갯수.
var PAGE_THUMB_COUNT =8;
// 한페이지 높이.
var PAGE_HEIHGT = 66;
// 페이지 애니메이션 진행시간.
var PAGE_ANIMATION = 300; 

// 리사이징 애니메이션 진행시간.
var RESIZING_ANIMATION = 300;

// 페이드인 애니메이션 진행시기나.
var FADEIN_ANIMATION = 1500;

var nCurrentPageIndex;
var nPageLength;
var $pageInfo;
var $thumbs;
var $thumbList;

// 로딩 이미지가 출력될 영역.
var $imageCanvas;

// 이미지 로딩패널.
var $imageLoadingPanel;

var $imageContainer;
// 컨테이너의 너비와 높이값.
var nContainerWidth;
var nContainerHeight;


//썸네일 커서.
var $thumbCursor;

// 이전,다음 이미지 메뉴가 담겨있는 이미지 메뉴.
var $imageMenu;

// 현재 활성화된 이미지 Index값.
var currentActiveImageIndex;

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
	
	// 시작시 첫번째 이미지를 선택된 이미지로 만듬.
	loadImage(0);
	
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
	
	
	// 컨테이너의 너비와 높이를 미리 구해놓은다.
	// 컨테이너의 너비와 높이를 미리 구해놓은다.
	this.$imageContainer = $("div.image_container");
	this.nContainerWidth = this.$imageContainer.width();
	this.nContainerHeight = this.$imageContainer.height();
	

	//썸네일 커서.
	this.$thumbCursor = $("#thumb_cursor");
	
	//이미지 메뉴.
	this.$imageMenu = $("#image_menu");
	
	// 아직 활성화된 이미지가 없다는 의미로 -1을 넣어줌.
	this.currentActiveImageIndex = -1;
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
		var nIndex		 	= $thumbs.index($(this));
		loadImage(nIndex)
				
	});
	
	// 이미지 메뉴  활성화 비활성화 처리.
	
	this.$imageContainer.bind("mouseenter",function(){
		activeImageMenu(true);
	});
	
	this.$imageContainer.bind("mouseleave",function(){
		activeImageMenu(false);
	});
	
	// 이전 이미지 활성화.
	$("#prev_image").bind("click",function(){
		prevImage();
	})
	
	// 다음 이미지 활성화.
	$("#next_image").bind("click",function(){
		nextImage();
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
		
		//4. 로딩 패널 비활성화 시키기.
		showLoadingPanel(false);	
		
		// 이미지 업데이트 시키기.
		updateImageCanvas(imageLoader);
	});
	
	// 3. 이미지 로딩 시작.
	imageLoader.src = "../img/"+(nIndex+1)+".jpg";		
	
	// 썸네일 커서 이동시키기.
	this.moveThumbCursor(nIndex);
	
	// 현재 활성화된 이미지 index값 업데이트 시키기.
	this.currentActiveImageIndex = nIndex;
}


// 로딩중 패널 표시/숨기기 처리.
function showLoadingPanel(bShow){
	if(bShow)
		this.$imageLoadingPanel.css("visibility", "visible");
	else
		this.$imageLoadingPanel.css("visibility", "hidden");
}





// 이미지 업데이트 시키기.
function updateImageCanvas(image){

	//5. 이미지 컨테이너:이미지 종횡비에 따른 이미지 크기와 위치값 구하기.
	var sizeInfo = this.getImageResizingInfo(image.width, image.height);
	
	
	//6. 이미지 캔버스에 애니메이션 적용 시키기.
	this.$imageCanvas.stop();
	this.$imageCanvas.animate(sizeInfo,RESIZING_ANIMATION, "easeOutQuint", function(){			
		
		// 이미지 정보 초기화 시키기.		
		var $image = $(image);
		$image.css({
			opacity: 0,
			width: sizeInfo.width,
			height: sizeInfo.height
		});
		
		
		// 7. 캔버스에 리사이징 된 이미지 추가.
		$imageCanvas.append($image);
		
		
		// 8. 이미지에 FadIn효과 적용시키기.
		$image.animate({opacity: 1	},
				FADEIN_ANIMATION,
				"easeInQuint"
		);
	} );		
}

// 이미지 리사징정보 구하기.
function getImageResizingInfo(nImageWidth, nImageHeight){
	var objSizeInfo = {
				width: 0,
				height: 0,
				top:0,
				left:0
			};
	// 이미지 너비, 높이가 모두 컨테이너 너비,높이보다 작은경우,
	if (this.nContainerWidth > nImageWidth && this.nContainerHeight > nImageHeight) {
		// 이미지위치만 업데이트 시킴.	
		objSizeInfo.width = nImageWidth;
		objSizeInfo.height = nImageHeight;
		
	}
	else {
		// 이미지 너비, 높이가 모두 컨케이너 너비,높이보다 큰 경우
		
		// 기준이 되는  프로퍼티를 결정하기 위해서 너비와 높이의 비율값을 구한다.
		var nTempWidth = this.nContainerWidth / nImageWidth;
		var nTempHeight = this.nContainerHeight / nImageHeight;
		
		// 너비,높이 비율값중  큰 값이 기준이 되며, 나머지는 비율값에 따른 값을 구함. 
		if (nTempHeight <= nTempWidth) {
			// 기준값을 컨테이너 높이로 하고, 이때 비율에 따른 이미지 너비값을 구한다.
			objSizeInfo.width = this.getImageWidth(this.nContainerHeight, nImageWidth, nImageHeight);
			objSizeInfo.height = this.nContainerHeight;
		}
		else {
			// 기준값을 컨테이너 너비로 하고, 이때 비율에 따른 이미지 높이값을 구한다.
			objSizeInfo.width = this.nContainerWidth;
			objSizeInfo.height = this.getImageHeight(this.nContainerWidth, nImageWidth, nImageHeight);
		}
	}

	// 이미지가 가운데로 정렬되도록 위치값을 구한다.
	objSizeInfo.left = Math.floor((this.nContainerWidth-objSizeInfo.width)/2);
	objSizeInfo.top = Math.floor((this.nContainerHeight-objSizeInfo.height)/2);
	
	return objSizeInfo;
}


// 비율에 따른 이미지 너비값 구하기.
function getImageWidth(nContainerHeight, nImageWidth, nImageHeight){
	/*
	공식 구하기. 
		X(새로운이미지.width) : 컨테이너.height = 이미지.width: 이미지.height
		이기 때문에
		 X*이미지.height = 컨테이너.height*이미지.width
		X = (컨테이너.height*이미지.width)/이미지.height가 됩니다.
	*/
	return Math.floor((nContainerHeight*nImageWidth)/nImageHeight);
}

// 비율에 따른 이미지 높이값 구하기.
function getImageHeight(nContainerWidth, nImageWidth, nImageHeight){
	/*
	공식 구하기. 
		컨테이너.width : X(새로운이미지.height)= 이미지.width: 이미지.height
		이기 때문에
		 X(새로운이미지.height)*이미지.width = 컨테이너.height*이미지.width
		X = (컨테이너.width*이미지.height)/이미지.width가 됩니다.
	*/
	return Math.floor((nContainerWidth*nImageHeight)/nImageWidth);
}
	


// 선택된 썸네일위치에 커서 이동시키기. 
function moveThumbCursor(nIndex){
	// nIndex에 해당하는 썸네일을 구한다.
	var $thumb = this.$thumbs.eq(nIndex);
	
	// nIndex에 해당하는 썸네일 위치로 썸네일 커서를 이동시킨다.
	this.$thumbCursor.stop();
	this.$thumbCursor.animate({left:$thumb.position().left, top:$thumb.position().top},
		300,
		"easeOutQuint"
	);
}




// 이전,다음 이미지 버튼이 있는 이미지 메뉴  활성화/비활성화하기.
function activeImageMenu(bActive){
	this.$imageMenu.stop();
	if (bActive) {
		this.$imageMenu.css("visibility","visible");
		this.$imageMenu.animate({opacity:1},
			500,
			"easeOutQuint"
		);
	}
	else{
		this.$imageMenu.animate({opacity:0},
			500,
			"easeOutQuint",
			function(){
				$imageMenu.css("visibility","hidden");
			}
		);
	}
}	


// 이전 이미지 활성화.
function prevImage(){
	var nIndex = this.currentActiveImageIndex - 1;
	if (nIndex >= 0) {
		this.loadImage(nIndex);
	}

}
// 다음 이미지 활성화.
function nextImage(){
	var nIndex = this.currentActiveImageIndex + 1;
	if (nIndex < this.$thumbs.size()) {
		this.loadImage(nIndex);
	}
}
