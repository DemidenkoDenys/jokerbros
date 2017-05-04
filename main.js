var customing = true,
	login, photo_user;

$(window).load(function()
{
	$(".table_container").mCustomScrollbar(
	{
		theme: "light-thick",
		scrollInertia: 950,
		snapAmount: 50
	});

	setHeight($('#table'), customing);
	setHeight($('#account'), customing);

	$('.menu.active').click();
	$('#message, #stake').hide();

	customization(true);
	getCountOnlineUser();
	isFormFull();
});

$(document).ready(function()
{

//================================================================//
//=================== ИЗМЕНИЕНИЕ РАЗМЕРА ЭКРАНА ==================//
//================================================================//

	$(window).on('resize', function()
	{ 
		setHeight($('#table'), customing);
		setHeight($('#account'), customing);
		setGradient($('.menu.active'));
	});

//================================================================//
//======================= ПЕРЕКЛЮЧЕНИЕ МЕНЮ ======================//
//================================================================//

	$('.menu').on('click', function()
	{
		$('.menu').each(function(){
			$(this).removeClass('active');
		});
		
		$(this).addClass('active');
		
		setGradient($('.menu.active'));
		updateDB();
	});

//================================================================//
//=================== ВКЛЮЧЕНИЕ ДОП НАСТРОЕК =====================//
//================================================================//

	$('.custom img').on('click', function()
	{
		if(customing === false)
		{
			$('.custom').animate({ top: 95 }, 1000,
			function()
			{
				$('#custom').css({"display" : "inline-block"});
				$('#account').animate({ width : 250 }, 500);
				$('#table').animate({ width: 905 }, 500);
				$('.account>*').css({"display": "none"});
				$('#account>*').css({"display": "inline-block"});

				setHeight($('#table'), customing);
				setHeight($('#account'), customing);
			});
			customing = true;
		}
		else
		{
			$(':checkbox').each(function(){ 
				$(this).removeAttr('checked');
			});

			$('#account').animate({ width : 0 }, 500);
			$('#table').animate({ width: 1150 }, 500,
			function()
			{
				$('#custom').css({"display" : "none"});
				$('.custom').animate({ top: 40 }, 1000);
				$('.account>*').css({"display": "inline-block"});
				$('#account>*').css({"display": "none"});

				setHeight($('#table'), customing);
				setHeight($('#account'), customing);
				updateDB();
			});
			customing = false;
		}
	});

//================================================================//
//========================= МАСКИ ВВОДА ==========================//
//================================================================//

	var patternNum = new RegExp(/\d/i);
	var pattern = new RegExp(/^(<?|>?)\d{1,5}$/i);

	$("#f_money, #f_money_before").bind("keydown", function(e){
		if(e.keyCode !== 37 && e.keyCode !== 39 && e.keyCode !== 46 && e.keyCode !== 8 && e.KeyCode !== 1042)
			if(!pattern.test($(this).val() + String.fromCharCode(e.which)))
				e.preventDefault();
	});

	$("#f_coin, #f_coin_before").bind("keypress", function(e){
		if(!patternNum.test(String.fromCharCode(e.which)) || $(this).val().toString().length >= 4)
			e.preventDefault();
	});

	$("#f_place, #f_place_before").bind("keypress", function(e){
		if(!pattern.test($(this).val()) && $(this).val() !== "")
			e.preventDefault();
	});

//================================================================//
//==================== ПЕРЕКЛЮЧЕНИЕ ФИЛЬТРОВ =====================//
//================================================================//

	$(':checkbox').on('change', function(){ updateDB(); });
	$('.select').on('click', function(){ updateDB(); });

//================================================================//
//=================== ОЧИСТКА ПОЛЕЙ ВВОДА ========================//
//================================================================//

	$('.filter label').after().on('click', function(){
		$('.filter .' + $(this).attr('for')).val('');
		$('.select').css({"color": "#147057"});
		updateDB();
	});

//================================================================//
//========================== ФИЛЬТРЫ =============================//
//================================================================//

	$('.filter input').on('keyup', function(){
		var filter_ready = false;

		$('.filter input').each(function(){
			if($(this).val() !== "")
				filter_ready = true;
		});

		filter_ready 
			? $('.select').css({"color": "#F5B919"}) 
			: $('.select').css({"color": "#147057"}).click();
	});

//================================================================//
//================= ОБНОВЛЕНИЕ USERS ONLINE ======================//
//================================================================//

	$('.players').on('click', function(){
		getCountOnlineUser();
	});

//================================================================//
//========================= РЕГИСТРАЦИЯ ==========================//
//================================================================//

	$('#register').on('click', function(){
		
		if($(this).hasClass("active"))
			{	$('.name-author, .repeat, .foto, .gel').animate({ "height": "0px" }, 1000);
				$('#register').toggleClass("active").val("РЕГИСТРАЦИЯ");
				$('#access>p').text('вход');
				isFormFull(); }
		else{	$('.name-author, .repeat, .foto, .gel').animate({ "height": "50px" }, 1000);
				$('#register').toggleClass("active").val("ВХОД");
				$('#access>p').text('регистрация');
				isFormFull(); }
	});

	$('#login, #password, #repeat_password, #gel, #name-author').on('keyup', function(){
		isFormFull();
	});

//================================================================//
//========================= АВТОРИЗАЦИЯ ==========================//
//================================================================//

	$('#submit').on('click', function(){
		if($(this).hasClass('active')){
			if($('#register').hasClass('active')){
				$('#loadfile').trigger("submit");
				registration();
			}
			else
				authorization();
		}
	});

//================================================================//
//======================== ЗАГРУЗКА ФОТО =========================//
//================================================================//

	$('#foto').on('click', function(){
		$('input[type=file]').click();
	});

	$('input[type=file]').on('change', function(){
		if($('input[type=file]').val() !== ""){
			$('#foto').val($('input[type=file]').val().replace("C:\\fakepath\\", ''));
			// var a = $('.foto a').css({"background-image": " url(" + $('input[type=file]').val() + ")"});
			// $('form').before(a);
			// console.log($('input[type=file]').val());
		}
		else{
			$('#foto').val("Выберите файл...");
			$('form').before($('.foto a').css({"background-image": "none"}));
		}
		isFormFull();
	});

//================================================================//
//============================= ИГРА =============================//
//================================================================//

	$(document).on('click', '.cell:last-child', function(){
		var $id = $(this).parent().attr('data_id');
		$.ajax({
			type: 'POST',
			url: 'game.php',
			cache: false,
			data: {log: login, id: $id},
			success: function(db_data){
				var jb = $.parseJSON(db_data);
				$('#message-winner').text("Победитель: " + jb[0] + " !!!").show();
				updateUserData(jb[1], jb[4], jb[2], jb[3], jb[5], photo_user);
				updateDB();
			}
		});
	});

//================================================================//
//======================== СОЗДАНИЕ ИГРЫ =========================//
//================================================================//

	$('#message-winner').on('click', function(){ $(this).hide(); });
	$('.new-table').on('click', function(){ $('#games-new-table').val($('.menu.active').html().toLowerCase()); $('#message').show(); });
	$('.close').on('click', function(){ $(this).parent().parent().hide(); });

	$('.create-table').on('click', function(){
		$stake = $('.stake').val();
		$game = $('#games-new-table').val();
		$round = $('.rounds').val();
		$player = $('.player').val();

		$.ajax({
			type: 'POST',
			url: 'new-table.php',
			cache: false,
			data: { log: login, stake: $stake, gam: $game, round: $round, player: $player },
			success: function(db_data){
				var jb = $.parseJSON(db_data);
				updateDB();
			}
		});

		$('#message').hide();
	});

//================================================================//
//======================== ВВОД ПО ENTER =========================//
//================================================================//

	$('#access input[type=text]').keyup(function(){
		if(event.keyCode == 13)
			$('#submit').click();
	});

});



















//================================================================//
//=================== ДОПОЛНИТЕЛЬНЫЕ НАСТРОЙКИ ===================//
//================================================================//

function customization(init){
	 customing && init ? $('#custom').css({"display": "none"}) : $('#custom').css({"display": "block"});
	!customing && init ? $('#account').css({"width": 0}) : $('#account').css({"width": 250});
	!customing && init ? $('#table').css({"width": 1150}) : $('#table').css({"width": 905});
	!customing && init ? $('#account>*').css({"display": "none"}) : $('#account>*').css({"display": "inline-block"});	
	!customing && init ? $('.custom').css({"top": 40}) : $('.custom').css({"top": 95});
	 customing && init ? $('.account div').css({"display": "none"}) : $('.account div').css({"display": "block"});

	if(init === false){

	}

}

//================================================================//
//================ ПРОВЕРКА ФОРМЫ НА ЗАПОЛНЕННОСТЬ ===============//
//================================================================//

function isFormFull(){
	var submit = $('#password').val() !== "" && $('#login').val() !== "";

	if($('#register').hasClass('active'))
		submit = submit && $('#repeat_password').val() !== "" 
						&& $('#gel').val() !== "" 
						&& $('#name').val() !== "" 
						&& $('input[type=file]').val() !== "" 
						&& $('#password').val() === $('#repeat_password').val();

	submit ? $('#submit').addClass('active') : $('#submit').removeClass('active');

	return submit;
};

//================================================================//
//============== ФОРМИРОВАНИЕ ЗАПРОСА ПО ФИЛЬТРУ =================//
//================================================================//

function getFilter(cl, queryStr){
	var $first = $('.filter .' + cl).first().val() !== "" ? $('.filter .' + cl).first().val() : "0";
	var $last = $('.filter .' + cl).last().val() !== "" ? $('.filter .' + cl).last().val() : "0";

	if($last == "0" && $first != "0")
		queryStr += $first + " AND 9999";
	else if($first == "0" && $last != "0")
		queryStr += "0 AND " + $last;
	else if(parseInt($first) >= parseInt($last))
		queryStr += $last + " AND " + $first;
	else if(parseInt($first) <= parseInt($last))
		queryStr += $first + " AND " + $last;

	if($first === "0" && $last === "0")
		queryStr = "";

	console.log(queryStr);
	return queryStr;
};

//================================================================//
//===================== ОБНОВЛЕНИЕ БАЗЫ ДАННЫХ ===================//
//================================================================//

function updateDB(){
	var $game = $('.menu.active').html().toLowerCase(), 
		$stat = "",
		$filt = "";

	$(':checkbox').each(function(){
		if($(this).prop("checked"))
			$stat += $(this).val() + ",";
		console.log($stat);
	});

	$stat = $stat.slice(0, -1);

	$filt += getFilter("f_money", " AND jb.players * jb.bet BETWEEN ");
	$filt += getFilter("f_coin", " AND jb.bet BETWEEN ");
	$filt += getFilter("f_place", " AND jb.rounds BETWEEN ");

	$.ajax({
		type: 'POST',
		url: 'get_db_data.php',
		cache: false,
		data: { gameactive: $game, status: $stat, filter: $filt},
		success: function(db_data){
			var jb = jQuery.parseJSON(db_data);
			$('.table .row').remove();

			for(i = 0; i < jb.length; i++){
				var st = "";
				if(jb[i].status_name === "PLAY") st = " play";
				if(jb[i].status_name === "WAITING") st = " wait";
				if(jb[i].status_name === "ENDED") st = " end";
				if(jb[i].status_name === "OPEN") st = " open";

				$('.table').append("<div class='row' data_id='" + jb[i].id + "'><div class='cell'>" + 
					jb[i].name + "</div><div class='cell'>до <span>" + 
					jb[i].rounds + "</span> побед</div><div class='cell'><span>" + 
					jb[i].bet + "</span> gel</div><div class='cell" + st + "'>" + 
					jb[i].status_name +"</div></div>");
			}

			$(".table_container").mCustomScrollbar(
			{
				theme: "light-thick",
				scrollInertia: 950,
				snapAmount: 50
			});
		}
	});
};

//================================================================//
//======================== СМЕНА ГРАДИЕНТА =======================//
//================================================================//

function setGradient(elem){
	var start = (elem.offset().left/$('html').width()).toFixed(2) * 100;
	var end = ( (elem.offset().left + elem.width() ) /$('html').width()).toFixed(2) * 100;
	$('body').css({'background': 'linear-gradient(to right, #21724d, #4EA88C ' + start + '%, #4EA88C ' + end + '%, #21724d)'});
	$('body').css({'-pie-background': 'linear-gradient(to right, #21724d, #4EA88C ' + start + '%, #4EA88C ' + end + '%, #21724d)'});
	$('body').css({'behavior': 'url(PIE.htc)'});
};

//================================================================//
//=================== УСТАНОВКА ВЫСОТЫ ТАБЛИЦЫ ===================//
//================================================================//

function setHeight(elem, cust){
	cust === true ? $(elem).height($(window).height() - 180) : $(elem).height($(window).height() - 115);
};

//================================================================//
//================== ПОЛУЧЕНИЕ ИНФОРМАЦИИ О USER =================//
//================================================================//

function getCountOnlineUser(){
	$.ajax({
		type: 'POST',
		url: 'get_users_data.php',
		cache: false,
		data: {},
		success: function(user_data){
			var jb = jQuery.parseJSON(user_data);
			$('.online').text(jb[0].online);
		}
	});
};

//================================================================//
//========================= АВТОРИЗАЦИЯ ==========================//
//================================================================//

function authorization(){
	login = $('#login').val();

	$.ajax({
		type: 'POST',
		url: 'authorization.php',
		cache: false,
		data: { login: login, password: $('#password').val()},
		success: function(user_data){
			var jb = jQuery.parseJSON(user_data);

			if(jb.length === 0) alert('Нет такого пользователя!')
			else{
				$('#password, #repeat-password').val('').text('');
				$('#access').css({"display": "none"});

				updateUserData(jb[0].gel, jb[0].name, jb[0].wins, jb[0].defs, jb[0].draws, jb[0].avatar);

				$('.auth').css({"display": "inline-block"});
				$('.players').css({"display": "none"});

				 customing ? $('.account div').css({"display": "none"}) : $('.account div').css({"display": "block"});
				!customing ? $('#custom').css({"display": "none"}) : $('#custom').css({"display" : "inline-block"});

				alert('Нажмите на STATUS для игры! Логин и пароль остальных игроков состоят их одинаковых чисел в формате XXX и XXX');
			}
		}
	});
};

//================================================================//
//========================= РЕГИСТРАЦИЯ ==========================//
//================================================================//

function registration(){
	var names = $('#name').val();
	var gels = $('#gel').val();
	login = $('#login').val();
	var pict_path = $('.filename').val();

	$.ajax({
		type: 'POST',
		url: 'addUser.php',
		cache: false,
		data: { login: login, password: $('#password').val(), gel: gels, name: names, pict: pict_path },
		success: function(){
			alert("успешных игр");

			$('#password, #repeat-password').val('').text('');
			$('#access').css({"display": "none"});
			$('.auth').css({"display": "inline-block"});

			 customing ? $('.account div').css({"display": "none"}) : $('.account div').css({"display": "block"});
			!customing ? $('#custom').css({"display": "none"}) : $('#custom').css({"display" : "inline-block"});
		}
	});
};

//================================================================//
//================ ОБНОВЛЕНИЕ ИНФОРМАЦИИ О ИГРОКЕ ================//
//================================================================//

function updateUserData(gels, names, wins, defs, draws, ava){
	$('.money').text(gels);
	$('.name').text(names);
	$('.wins').text(wins);
	$('.defs').text(defs);
	$('.draws').text(draws);
	photo_user = ava;
	$('.photo').attr('src', photo_user);
}