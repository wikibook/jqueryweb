

$(document).ready(function(){
	
	// 현재 페이지를 0페이지로.
	var nCurrentPageIndex = 0;
	
	// 썸네일 목록을 가지고 전체 페이지 갯수를 구한다.
	var $thumbs = $("#thumb_list img");
	var nPageLength = Math.ceil($thumbs.size()/8);
	
	alert("페이지 개수 "+nPageLength );
		
	// 페이지 정보를 출력한다.
	var $pageInfo = $("#page_info");	
	$pageInfo.html("page : "+(nCurrentPageIndex+1)+"/"+nPageLength);
	
	// 이전 페이지 구하기.
	$("#prev_page").bind("click",function(){		
		nCurrentPageIndex--;
		if(nCurrentPageIndex<0)
			nCurrentPageIndex = 0;
			
		$pageInfo.html("page : "+(nCurrentPageIndex+1)+"/"+nPageLength);		
	});
	
	// 다음 페이지 구하기.
	$("#next_page").bind("click",function(){
		nCurrentPageIndex++;
		if(nCurrentPageIndex>=nPageLength)
			nCurrentPageIndex = nPageLength-1;
			
		$pageInfo.html("page : "+(nCurrentPageIndex+1)+"/"+nPageLength);
	});		
});
