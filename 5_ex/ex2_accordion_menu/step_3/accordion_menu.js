// 활성화/비활성화 애니메이션 시간.
var ANIMATION_DURATION	= 500;
//활성화 영역 높이 값.
var ACTIVE_HEIGHT = 93;
//비활성화 영역 높이 값.
var DE_ACTIVE_HEIGHT = 20;


// 현재 활성화되어 있는 메뉴 아이템.
var $currentActiveMenuItem;
var $menuItems;
var $selectMenuItem;
var $menu;

$(document).ready(function(){
	
	initMenu();
	initEventListener();
	
	
	
});
// 메뉴관련 초기화.
function initMenu(){
	$menuItems	=$(".menu_item");
	$menuItems.each(function(index){
		var $menuItem = $(this);
		
		// 메뉴 아이템 컨텐츠를 미리 찾아둠.
		$menuItem.data("content", $menuItem.find("div.menu_item_content"));	
	});
	
	$menu = $(".accordion_menu");
}

// 이벤트 초기화.
function initEventListener(){
	$menuItems.bind("mouseenter", function(){
		//1. 활성화된  메뉴 아이템이 있는 경우 비활성화 시켜준다.
		if($currentActiveMenuItem){
			deactiveMenuItem($currentActiveMenuItem)
		}
		
		// 2. 활성화 처리.
		activeMenuItem($(this));
	});
	
	$menuItems.bind("click", function(){
		// 클릭된 메뉴 아이템을 선택아이템으로.
		selectMenuItem($(this));
	});
	
	// 메뉴 영역을 나가는 경우, 선택된 메뉴 아이템을 활성화 시키기.
	$menu.bind("mouseleave",function(){
		// 기존 활성화되어 있는 메뉴 아이템을 비활성화로 만들기.
		deactiveMenuItem($currentActiveMenuItem);
		
		$currentActiveMenuItem 	=$selectMenuItem;
	
		// 선택메뉴 아이템이 있는경우 활성화 시키기.
		if($selectMenuItem)
			activeMenuItem($selectMenuItem);
	})
}

// 메뉴 아이템 비활성화 처리.
function deactiveMenuItem($menuItem){
	//1-1. 메뉴 아이템의 높이 값을 축소.
	$menuItem.stop();
	$menuItem.animate({height:DE_ACTIVE_HEIGHT},
				ANIMATION_DURATION,
				"easeOutQuint"
	);
	
	//1-2. 메뉴 아이템의 컨텐츠 위치 값을 0으로만든다.(메뉴 아이템 비활성화영역이 보이도록) 
	var $menuItemContent = $menuItem.data("content");
	$menuItemContent.stop();
	$menuItemContent.animate({top:0}, 
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
	
	//2-2. 메뉴 아이템 컨텐츠 위치 값을 -20만큼 이동시킨다(메뉴 아이템 활성화영역이 보이도록)
	var $menuItemContent = $menuItem.data("content");
	$menuItemContent.stop();
	$menuItemContent.animate({top:-DE_ACTIVE_HEIGHT}, 
		ANIMATION_DURATION,
		"easeOutQuint"
	);
	
	// 활성화된 메뉴 아이템 업데이트.
	$currentActiveMenuItem = $menuItem;
}



// 메뉴 아이템 선택하기.
function selectMenuItem($menuItem){
	$selectMenuItem		= $menuItem;
}
