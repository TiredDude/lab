$window = $(window);
var DOT = '.';
var SHARP = '#';
var SPACE = ' ';
var SLASH = '/';
var NONE = 'none';
var SPAN = 'span';
var SUB_MENU = '#sub-menu';
var MENU_WRAPPER_CLASS = 'menu-wrapper';
var BIG_MENU_WRAPPER_CLASS = 'menu-wrapper-big';
var BIG_MENU_WRAPPER = DOT + BIG_MENU_WRAPPER_CLASS;
var MENU_WRAPPER = DOT + MENU_WRAPPER_CLASS;
var MAIN_MENU_ID = 'menu-main';
var MAIN_MENU = SHARP + MAIN_MENU_ID;
var NAV_BAR_CLASS = 'nav-bar';
var NAV_BAR = DOT + NAV_BAR_CLASS;
var BIG_NAV_BAR_CLASS = 'nav-bar-big';
var BIG_NAV_BAR = DOT + BIG_NAV_BAR_CLASS;
var BREADCRUMB = "#breadcrumb";
var PAGE_CONTAINER = '#page-container';
var SPAN_NOT_ACTIVE = "span:not(.active)";
var SKILL_BLOCK = '.skill-block';
var BIG_NAV_BAR_CLASS = 'nav-bar-big';
var NAV_BAR_ITEM = '.nav-bar-item';
var CONTENT_STATIC = '.content-static';
var CONTENT_WRAPPER = '.content-wrapper';
var CONTENT_SCROLLABLE = '.content-scrollable';
var ACTIVE = 'active';
var HIDDEN = 'hidden';
var INACTIVE = 'inactive';
var TRANSPARENT = 'transparent';
var ACTIVE_CLASS = '.active';
var CONTENT_BLOCK = '.content-block-fixed';
var GO_IN = '.go-in';
var HOME = 'home';
var GAME_TITLE = "#game-title";
var PROFF_BLOCK = ".proff-block";
var NOT_ACTIVE = ':not(.active)';
var LOCATION = '.location';
var MAP_IMAGE = '#map-container img';
var TRANSFORM_NONE = 'matrix(1, 0, 0, 1, 0, 0)';
var LOCATION_TITLE = '.location-title';
var MAP_TITLE = '#map-title';

// init
$(document).ready(function() {
	showBigMenu();
	updateScrollBars();
	startHashTracking();
});

function showBigMenu() {
	if ($(PAGE_CONTAINER)) {
		$(PAGE_CONTAINER).hide();
	}
	$(GAME_TITLE).addClass(ACTIVE);
	switchMenu(SUB_MENU, MAIN_MENU);
	$(MENU_WRAPPER).switchClass(MENU_WRAPPER_CLASS, BIG_MENU_WRAPPER_CLASS,
			5000, "easeInOutSine");
	$(MAIN_MENU + NAV_BAR).switchClass(NAV_BAR_CLASS, BIG_NAV_BAR_CLASS, 5000,
			"easeInOutSine");
	$(BREADCRUMB + ' span:first').nextAll().remove();
	$('.page-active').empty();
};

function hideBigMenu() {
	if ($(PAGE_CONTAINER)) {
		$(PAGE_CONTAINER).show();
	}
	$(GAME_TITLE).removeClass(ACTIVE);
	$(BIG_MENU_WRAPPER).switchClass(BIG_MENU_WRAPPER_CLASS, MENU_WRAPPER_CLASS,
			5000, "easeInOutSine");
	$(BIG_NAV_BAR).switchClass(BIG_NAV_BAR_CLASS, NAV_BAR_CLASS, 5000,
			"easeInOutSine");
};

function startHashTracking() {
	window.onhashchange = function(e) {// TODO handle back btn
		if (e.newURL.match($(NAV_BAR_ITEM + DOT + ACTIVE).data('url')) == null) {
			changePage(location.hash.substring(1), null, null, false);
		}
	};
};

$(BREADCRUMB).on('click', SPAN_NOT_ACTIVE, function(e) {
	var url = $(e.target).data('url');
	var menuItem = $(NAV_BAR_ITEM + '[data-url="' + url + '"]');
	if(url == HOME){
		showBigMenu();
		
	} else if (menuItem.is(':visible')) {
		$(NAV_BAR_ITEM).removeClass(ACTIVE);
		menuItem.addClass(ACTIVE);
		changePage(url, null, null, false);
	} else {
		switchMenu(SUB_MENU, MAIN_MENU, menuItem);
		changePage(url, null, null, false);
	}
	$(e.target).addClass(ACTIVE);
	$(e.target).next().remove();
	$(CONTENT_BLOCK).removeClass(ACTIVE);
});

$(NAV_BAR_ITEM).on('click', function(e) {
	if ($(BIG_NAV_BAR)) {
		hideBigMenu();
	}
	if (!$(e.target).hasClass(ACTIVE)) {
		var revers = false;
		revers = $(e.target).prevAll(NAV_BAR_ITEM + '.active').length !== 0;
		$(NAV_BAR_ITEM).removeClass(ACTIVE);
		$(e.target).addClass(ACTIVE);
		changePage($(e.target).data('url'), null, null, revers);
	}
	updateBreadcrumb();
});


$(PAGE_CONTAINER).on('click', PROFF_BLOCK + NOT_ACTIVE, function(e) {
	$(PROFF_BLOCK).removeClass(ACTIVE);
	$(e.target).addClass(ACTIVE);
});


$(PAGE_CONTAINER).on('click',GO_IN,function(e) {
			var url = $(e.target).data('url');
			var active = $(NAV_BAR_ITEM + DOT + ACTIVE).data('url');
			var menuItem = $(NAV_BAR_ITEM + '[data-url="' + active + SLASH
					+ url + '"]');
			switchMenu(MAIN_MENU, SUB_MENU, menuItem);
			updateBreadcrumb();
		});

function updateBreadcrumb() {
	var $current = $(BREADCRUMB + SPACE + SPAN).last();
	var url = $(NAV_BAR_ITEM + DOT + ACTIVE).data('url');
	var level = $(NAV_BAR_ITEM + DOT + ACTIVE).closest(NAV_BAR).data('level');
	$(BREADCRUMB + ' span:nth-child('+ level +'n)').nextAll().remove();
	var $new = $current.clone();
	$current.removeClass(ACTIVE);
	setTimeout(function() {
		$new.appendTo($(BREADCRUMB)).text(url.substr(url.lastIndexOf('/') +1)).attr('data-url', url);
	}, 100);
}


// skill-page
$(PAGE_CONTAINER).on('click', SKILL_BLOCK, function(e) {
	if (!$(e.target).hasClass(ACTIVE)) {
		var lp = getItemLayoutProp($(e.target));
		$(CONTENT_BLOCK).css({
			width : lp.width,
			height : lp.height,
			top : lp.top,
			left : lp.left,
			background : $(e.target).css('background')
		});
		setTimeout(function() {
			$(SKILL_BLOCK).addClass(TRANSPARENT);
			$(CONTENT_BLOCK).addClass(ACTIVE);
		}, 100);
	}
});

function switchMenu(from, to, avtiveItem) {
	$(NAV_BAR_ITEM).removeClass(ACTIVE);
	$(avtiveItem).addClass(ACTIVE);
	$(to).addClass(ACTIVE);

	$(from + SPACE + NAV_BAR_ITEM).each(function(i) {
		var _item = $(this);
		setTimeout(function() {
			$(_item).addClass(INACTIVE).removeClass(ACTIVE);
		}, 50 + i * 30);
	});

	$(to + SPACE + NAV_BAR_ITEM).each(function(i) {
		var _item = $(this);
		setTimeout(function() {
			$(_item).removeClass(INACTIVE);
		}, 100 + i * 30);
	});

	setTimeout(function() {
		$(from).removeClass(ACTIVE);
		updateScrollBars();
	}, 600);
};

function changePage(pageName, data, method, revers) {
	$.ajax({
		type : method == null ? "POST" : method,
		url : "/legacy/" + pageName.toLowerCase(),
		data : data,
	}).done(function(data) {
		var pageBefore = $('.page-before');
		var pageActive = $('.page-active');
		var pageAfter = $('.page-after');
		if (revers) {
			pageBefore.html(data);
			pageActive.addClass('page-after').removeClass('page-active');
			pageBefore.removeClass('page-before').addClass('page-active');
			pageAfter.removeClass('page-after').addClass('page-before');
		} else {
			pageAfter.html(data);
			pageActive.addClass('page-before').removeClass('page-active');
			pageAfter.removeClass('page-after').addClass('page-active');
			pageBefore.removeClass('page-before').addClass('page-after');
		}
		updateScrollBars();
		window.location.hash = pageName;
		$(CONTENT_BLOCK).removeClass(ACTIVE);
	});
};

function updateScrollBars() {
	$(CONTENT_SCROLLABLE).perfectScrollbar({
		suppressScrollX : true,
		includePadding : true,
		wheelPropagation : true,
		wheelSpeed : 2
	});
	$(CONTENT_SCROLLABLE).perfectScrollbar('update');
};

function getItemLayoutProp($item) {
	var scrollT = $window.scrollTop(), scrollL = $window.scrollLeft(), itemOffset = $item
			.offset();

	return {
		left : itemOffset.left - scrollL,
		top : itemOffset.top - scrollT,
		width : $item.outerWidth(),
		height : $item.outerHeight()
	};
}

$(PAGE_CONTAINER).on('click', MAP_TITLE, function(e) {
	deActivate(LOCATION_TITLE);
	$(MAP_IMAGE).css('transform','scale(1.1)' );
});

$(PAGE_CONTAINER).on('click', LOCATION, function(e) {
	var $this = $(e.target);
	var cTransform = $(MAP_IMAGE).css('transform');
	var initialDelay =  $(MAP_IMAGE).css('transition-duration').slice(0,-1) * 1000;
	delay = cTransform == NONE || cTransform == TRANSFORM_NONE ? 0 : initialDelay;
	deActivate(LOCATION);
	activate($this);
	deActivate(LOCATION_TITLE);
	$(MAP_IMAGE).css('transform','scale(1)');
	setTimeout(function() {
		$(MAP_IMAGE).css('transform','translate('+ $this.data('x') +', '+ $this.data('y') +') scale('+ $this.data('scale') +')' );
	}, delay);
	setTimeout(function() {
		$(LOCATION_TITLE).html($this.text());
		activate(LOCATION_TITLE);
	}, initialDelay);
});


function activate(obj){
	$(obj).addClass(ACTIVE);
};

function deActivate(obj){
	$(obj).removeClass(ACTIVE);
};

