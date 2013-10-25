// 활성화/비활성화 애니메이션 시간.
var ANIMATION_DURATION	=600;
//활성화 영역 높이값.
var ACTIVE_HEIGHT = 93;
//비활성화 영 높이값.
var DE_ACTIVE_HEIGHT = 20;
	// 현재 활성화되어 있는 메뉴 아이템.
	var $currentActiveMenuItem;

	$(document).ready(function(){
		$(".menu_item").bind("mouseenter", function(){
			//1. 활성화된  메뉴 아이템이 있는 경우 비활성화 시켜준다.
			if($currentActiveMenuItem){
				deactiveMenuItem($currentActiveMenuItem)
			}
			
			activeMenuItem($(this));
		});
		
	});
	
	
	// 메뉴 아이템 비활성화 처리.
	function deactiveMenuItem($menuItem){
		//1-1. 메뉴 아이템의 높이 값을 축소.
		$menuItem.stop();
		$menuItem.animate({height:DE_ACTIVE_HEIGHT},
					ANIMATION_DURATION,
					"easeOutQuint"
		);
		
		//1-2. 메뉴 아이템의 컨텐츠 위치 값을 0으로 만든다.
		// (메뉴 아이템 비활성화 영역이 보이도록) 
		$menuItem.find("div").stop();
		$menuItem.find("div").animate({top:0}, 
			ANIMATION_DURATION,
			"easeOutQuint"
		);
		
	}
	
	
	// 메뉴 아이템 활성화 처리.
	function activeMenuItem($menuItem){
		
		//2. 메뉴 아이템을 활성화 시켜준다.
		//2-1. 메뉴 아이템의 높이 값을 메뉴 아이템 이미지만큼 확대시켜줌.
		$menuItem.stop();
		$menuItem.animate({height:ACTIVE_HEIGHT}, 
			ANIMATION_DURATION,
			"easeOutQuint"
		);
		
		//2-2. 메뉴 아이템 컨텐츠 위치값을 -20만큼 이동시킨다
		// (메뉴 아이템 활성화 영역이 보이도록)
		$menuItem.find("div").stop();
		$menuItem.find("div").animate({top:-DE_ACTIVE_HEIGHT}, 
			ANIMATION_DURATION,
			"easeOutQuint"
		);
		
		
		// 활성화된 메뉴 아이템 업데이트.
		$currentActiveMenuItem = $menuItem;
		
	}

	
	
	