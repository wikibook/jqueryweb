
var $currentActiveMenuItem;

$(document).ready(function(){
	$(".menu_item").bind("mouseenter", function(){
		//1. 활성화된  메뉴아이템이 있는 경우 비활성화 시켜준다.
		if($currentActiveMenuItem){
			//1-1. 메뉴아이템의 높이값을 축소.
			$currentActiveMenuItem.stop();
			$currentActiveMenuItem.animate({height:20}, 
						200,
						"easeOutQuint"
			);
			
			//1-2. 메뉴아이템의 컨텐츠 위치값을 0으로만든다.(메뉴아이템 비활성화영역이 보이도록) 
			$currentActiveMenuItem.find("div").stop();
			$currentActiveMenuItem.find("div").animate({top:0}, 
				200,
				"easeOutQuint"
			);
		}
		
		// 활성화된 메뉴 아이템 업데이트.
		$currentActiveMenuItem = $(this);
		
		//2. 메뉴아이템을 활성화 시켜준다.
		//2-1. 메뉴아이템의 높이값을 메뉴아이템 이미지만큼 확대시켜줌.
		$currentActiveMenuItem.stop();
		$currentActiveMenuItem.animate({height:93}, 
			200,
			"easeOutQuint"
		);
		//2-2. 메뉴아이템 컨텐츠 위치값을 -20만큼 이동시킨다(메뉴아이템 활성화영역이 보이도록)
		$currentActiveMenuItem.find("div").stop();
		$currentActiveMenuItem.find("div").animate({top:-20}, 
			200,
			"easeOutQuint"
		);
	});
	
});
