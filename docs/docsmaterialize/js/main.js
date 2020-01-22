arr_name = ['учитель БОГа', 'ты БОГ', 'ученик БОГа', 'ястреб', 'рысь', 'ослик', 'заяц' ,'черепаха'];
arr_value = [6, 9, 12, 16, 21, 27, 37, 100];
arr_td = [0, 0, 0];
arr_tx = [0, 0, 0];
_sdvig = 60 // начальное значение
sdvig = _sdvig; // текущее значение
d_sdv = 5; // шаг сдвига
color_td = '';
color_tx = '';
count = 0;
summa = 0;
var pos
var pos_x;
var pos_y;
var row;
var col;
var color_td;
var color_tx;
var param;
var paramValue;
var widthProgress = 0;

function gen_arr(){
	napr = 2*Math.random()<1? -1: 1;
	tmp = 256 - sdvig;
	for (var i=0; i<3; i++) {
		dec = sdvig/2|0 + Math.floor(tmp*Math.random());
		arr_td[i] = +dec;
		arr_tx[i] = +dec+napr*(sdvig/2|0);
	}
}

function gen_color(){
	gen_arr();
	color_td = '#'; color_tx = '#';
	for (var i=0; i<3; i++){
		color_td += check(arr_td[i].toString(16));
		color_tx += check(arr_tx[i].toString(16));
	}
	pos = Math.floor(row*col*Math.random());
	pos_y = pos/row|0; pos_x = pos%col;
}

function check(s){
	if (s.length<2) s = '0' + s;
	return s;
}
var zagol = window.location.href; // взять заголовок из адресной строки
var param = zagol.split("?")[1]; // разделить на массив по символу ? и взять элемент с индексом 1
var paramValue; // размерность таблицы
if (typeof param != "undefined"){
  paramValue = param.split("=")[1]; // взять из заголовка
}
else{
  paramValue = '3';
}
row = parseInt(paramValue);
col = parseInt(paramValue);
function fill_table(){
	gen_color();
	for (var i=0; i<row*col; i++){ // меняем цвет фона ячеек
		id_num = 'block_' + i.toString();
    $('#'+id_num).css('background-color', (i==pos)? color_tx: color_td)
		//document.getElementById(id_num).style.backgroundColor = (i==pos)? color_tx: color_td;
	}
}

function generatedBoard(row, col){
  for (let h =0; h<row*col;h++){
    $('.game-container .row.board').append('<div class="col s4 block" id="block_'+h+'"></div>')
  }
  $('.block').click(function(){
   let colorBlock = rgb2hex($(this).css('background-color'));
   if (colorBlock === color_tx){
     widthProgress = widthProgress + 10;
     if (widthProgress > 100){
       $('.game-container .row.board').append('<div class="darkcolor"><h3>Отлично!</h3><a onlick="restart();">Начать сначала</a></div>');
       $('.darkcolor a').click(function(){
         restart();
       });
     }
     else {
       $('.progress-bar-width').css('width',widthProgress+'%');
     }
     fill_table();
   }
  });
}

var hexDigits = new Array
("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");

//Function to convert rgb color to hex format
function rgb2hex(rgb) {
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

function restart(){
  $('.game-container .row.board').html('');
  generatedBoard(3,3);
  fill_table();
  $('.progress-bar-width').css('width', '0%');
  widthProgress = 0;
}
//($('.progress-bar-width').width() / $('.progress-bar-width').parent().width() * 100).toFixed()
restart();
