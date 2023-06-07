var isMusic1Playing = false;
var isMusic2Playing = false;
var $audio1 = $("#audioPlayer1");
var $audio2 = $("#audioPlayer2");
var slider = document.getElementById("myRange");

var lastAudio = 0;

var totalItems = $('.item').length;
var currentIndex = $('div.active').index() + 1;

function fnTemplate3_v1(_div){
	var slide = $(_div);
	var listDataId;
	var listAnsDataId;
	var questionLength = $('.question').length;
	
	$audio1[0].currentTime = 0;
	slider.value = 0;
	$audio1[0].pause();
	$audio1[0].removeEventListener('timeupdate', fnUpdateTimer);
    $('#pButton .playImg').show();
    $('#pButton .pauseImg').hide();
	setAudio($(slide).attr('data-audioSrc'));
	$('.question').on('click',function(){
		if($(this).hasClass('disabled')){
			return false;
		}
		listDataId = $(this).attr('data-id');
		$('.circle').removeClass('selected');
		$(this).find('.circle').addClass('selected');
	});
	
	$('.option').on('click',function(){
		if($(this).hasClass('disabled') || !$('.question').find('.circle').hasClass('selected')){
			return false;
		}
		listAnsDataId = $(this).attr('data-answer-id');
		$(this).find('.circle').addClass('selected');
		
		if(listDataId == listAnsDataId){
			$('.line'+listDataId).show();
			fnAudio($('.showAnswerTickMark'));
			$(this).addClass('disabled');
			setTimeout(function(){
				$('.question_'+listDataId).addClass('disabled');
				$('.circle').removeClass('selected');
			},50);
		}else{
			$(this).parent().find('.showAnswerCrossMark').show();
			console.log($(this).parent().find('.showAnswerCrossMark'));
			fnAudio($('.showAnswerCrossMark'));
			setTimeout(function(){
				$('.list2 .circle').removeClass('selected');
				$('.showAnswerCrossMark').hide();
			},500);
		}
		var showAnsDis = true;
		$('.option').each(function(){
			if(!$(this).hasClass('disabled')){
				showAnsDis = false;
				return false;
			}
		});
		if(showAnsDis){
			$('.showAnsBtn').addClass('disabled');
		}
	});
}
var currNum = 1;
$(".queBox .clickableBox,.queBox .textBox").on("click", function () {
	currNum = $(this).parent().attr("id").split("_")[1];
	$audio1[0].pause();
	$audio2[0].pause();
	$("#pButton .playImg").show();
	$("#pButton .pauseImg").hide();
	$(".pagePopup .carousel-inner .item").removeClass("active");
	$(".pagePopup .carousel-inner .item_" + currNum + "").addClass("active");
	$(".popup_" + currentIndex).show();
});
function fnReloadAll(){	
	$('.list2 .text-center, .option, .question, .queClick').removeClass('disabled');
	$('.line').hide();
	$('.circle').removeClass('selected');
	$('.showAnsBtn').removeClass('disabled');
	$('#myCarousel').carousel(0);
	stopAudio();
	fnTemplate3_v1($('div.active'));
}
function fnReloadScreen(){
	stopAudio();
	fnTemplate3_v1($('div.active'));
}
function fnAudio(obj){
	var titleAudioPath = $(obj).attr('data-audioSrc');		
	$audio2[0].setAttribute('src', titleAudioPath);
	$audio2[0].load();
	var playPromise = $audio2[0].play();

    if (playPromise !== undefined) {
      playPromise.then(function(value) {
		$audio1[0].pause();		
		$audio1[0].removeEventListener('timeupdate', fnUpdateTimer);
		$('#pButton .playImg').show();
		$('#pButton .pauseImg').hide();
      })
      .catch(function(error){
      });
    }	
}

function showAns(){
	if($('.showAnsBtn').hasClass('disabled')){
		return false;
	}
	
	$audio1[0].pause();
	$audio2[0].pause();	
	
	$('.option, .question').addClass('disabled');
	$('.line').show();
	$('.circle').removeClass('selected');
	$(this).addClass('disabled');
}

function setAudio(_src){
	if(_src == ""){
		$('.controlsDiv').addClass('hide');
	}else{
		$('.controlsDiv').removeClass('hide');
	}
	$audio1[0].setAttribute('src', _src);	
	$audio1[0].load();	
}

/* Title Audio function */
function fnTitleAudioClick(obj){
	if($(obj).hasClass('hide')){
		return false;
	}
	$audio1[0].pause();
	$audio1[0].removeEventListener('timeupdate', fnUpdateTimer);
    $('#pButton .playImg').show();
	$('#pButton .pauseImg').hide();
	var titleAudioPath = $(obj).attr('data-audioSrc');	
	$audio2[0].setAttribute('src', titleAudioPath);
	$audio2[0].load();
	$audio2[0].play();
	isMusic1Playing = false;
	isMusic2Playing = true;
}
function fnUpdateTimer(){	
	var progressValue = Math.round(($audio1[0].currentTime/$audio1[0].duration) * 100);	
	slider.value = progressValue;
}

function fnStartAudio(_state){	
	$audio2[0].pause();	
	if(_state == 'play'){
		$('#pButton .playImg').hide();
    	$('#pButton .pauseImg').show();
		$audio1[0].play();
		isMusic1Playing = true;
	}else{
		$('#pButton .playImg').show();
    	$('#pButton .pauseImg').hide();
		$audio1[0].pause();
		lastAudio = 0;
		isMusic1Playing = false;
	}
	$audio1[0].addEventListener('timeupdate', fnUpdateTimer);	
}

function stopAudio(){
	$audio1[0].pause();
	$('#pButton .playImg').show();
    $('#pButton .pauseImg').hide();
	$audio1[0].currentTime = 0;
	slider.value = 0;
	isMusic1Playing = false;
	$audio2[0].pause();
	isMusic2Playing = false;
	lastAudio = 0;
}

function fnSetPlayer(){
	if(currentIndex == 1){
		$('.backBtn').addClass('disabled');
	}

	if(totalItems == 1){
		$('.navigationControls, .nextBtn, .reloadBtnScreen, .backBtn, .pageNumber').addClass('hide');
	}

	if($('.title').attr('data-audioSrc') == ""){
		$('.title').addClass('hide');
		$('.headingTitle').removeClass('col-xs-10').addClass('col-xs-11');
	}

	$audio1[0].addEventListener('playing', function(){
		lastAudio = 1;
		isMusic1Playing = true;
	});

	$audio2[0].addEventListener('playing', function(){
		lastAudio = 2;
		isMusic2Playing = true;
	});

	$audio1[0].addEventListener('pause', function(){
		isMusic1Playing = false;
	});

	$audio2[0].addEventListener('pause', function(){
		isMusic2Playing = false;
	});
	
	$audio1[0].addEventListener('ended', function(){
		lastAudio = 0;
		isMusic1Playing = false;	
		$audio1[0].currentTime = 0;
		slider.value = 0;
		$audio1[0].pause();
		$audio1[0].removeEventListener('timeupdate', fnUpdateTimer);
		$('#pButton .playImg').show();
		$('#pButton .pauseImg').hide();
	});
	
	$audio2[0].addEventListener('ended', function(){
		lastAudio = 0;
	});

	slider.addEventListener("input", function() {
	  $audio1[0].removeEventListener('timeupdate', fnUpdateTimer);
	  var setTime = Math.round((slider.value * $audio1[0].duration)/100);
	  $audio1[0].currentTime = setTime;
	}, false);

	slider.addEventListener("change", function() {
		if(isMusic1Playing){
			$audio1[0].play();
			$audio1[0].addEventListener('timeupdate', fnUpdateTimer);	
		}
	}, false);

	$('#myCarousel').on('slid.bs.carousel', function() {
	   currentIndex = $('div.active').index() + 1;
	   $('.pageNumber').html(currentIndex+' of '+totalItems);
	   if(currentIndex == 1){
	   		$('.backBtn').addClass('disabled');
	   }else{
	   		$('.backBtn').removeClass('disabled');
	   }

	   if(currentIndex == totalItems){
	   		$('.nextBtn').addClass('disabled');
	   }else{
	   		$('.nextBtn').removeClass('disabled');
	   }
	   
	   // need to edit template function name here:
	   fnTemplate3_v1($('div.active'));
	});
	$("#popupSlider_1").on("slid.bs.carousel", function () {
    currentIndex = $("#popupSlider_1 div.active").index() + 1;
    const totalItems = $("#popupSlider_1 div.item").length;
    if (currentIndex == 1) {
      $(".carouselLeft").addClass("disabled pointer-none");
    } else {
      $(".carouselLeft").removeClass("disabled pointer-none");
    }

    if (currentIndex == totalItems) {
      $(".carouselRight").addClass("disabled pointer-none");
    } else {
      $(".carouselRight").removeClass("disabled pointer-none");
    }
  });
}