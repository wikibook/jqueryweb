

$(document).ready(function(){
	
	// 현재 페이지 인덱스를 0으로 초기화.
	var nCurrentPageIndex = 0;				
	// 전체 페이지 개수를 구함.
	var $thumbs = $("#thumb_list img");		
	var nPageLength = Math.ceil($thumbs.size()/8);		
	// 페이지 정보를 출력.
	var $pageInfo = $("#page_info");			
	$pageInfo.html("page : "+(nCurrentPageIndex+1)+"/"+nPageLength);
	var $thumbList = $("#thumb_list");
	
	// 이전 페이지 구하기.
	$("#prev_page").bind("click",function(){
		
		nCurrentPageIndex--;
		if(nCurrentPageIndex<0)
			nCurrentPageIndex = 0;
			
		$pageInfo.html("page : "+(nCurrentPageIndex+1)+"/"+nPageLength);
		$thumbList.animate({top:-((nCurrentPageIndex)*66)},			
			300,
			"easeOutQuint");
	});
	
	// 다음 페이지 구하기.
	$("#next_page").bind("click",function(){
		
		nCurrentPageIndex++;
		if(nCurrentPageIndex>=nPageLength)
			nCurrentPageIndex = nPageLength-1;
			
		$pageInfo.html("page : "+(nCurrentPageIndex+1)+"/"+nPageLength);				
		$thumbList.animate({top:-((nCurrentPageIndex)*66)},
			300,
			"easeOutQuint");			
	});	
});


