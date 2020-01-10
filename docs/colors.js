arr_name = ['учитель БОГа', 'ты БОГ', 'ученик БОГа', 'ястреб', 'рысь', 'ослик', 'заяц' ,'черепаха'];
arr_value = [6, 9, 12, 16, 21, 27, 37, 100];
arr_td = [0, 0, 0];
arr_tx = [0, 0, 0];
valSq = 90; // размер квадратика
_sdvig = 60 // начальное значение
sdvig = _sdvig; // текущее значение
d_sdv = 5; // шаг сдвига
color_td = '';
color_tx = '';
count = 0;
summa = 0;
var pos;
var pos_x;
var pos_y;
var row;
var col;
var color_td;
var color_tx;
var param;
var paramValue;

function fill_table(){
	gen_color();
	for (var i=0; i<row*col; i++){ // меняем цвет фона ячеек
		id_num = 'td_' + i.toString();
		document.getElementById(id_num).style.backgroundColor = (i==pos)? color_tx: color_td;
	}
}

function printColor(posX, posY){
	ugadal = (posX==pos_x && posY==pos_y);
	d_sdv = 1 + (sdvig-6)/10|0;	if (d_sdv<1) d_sdv = 1;
	sdvig += ugadal ? -d_sdv: 2*d_sdv;
	if (sdvig<1) sdvig = 1;	if (sdvig>120) sdvig=120;
	pos_name = -1; do{} while(sdvig>arr_value[++pos_name]);

	document.getElementById('pole').style.backgroundColor = ugadal ? '#afa': '#f33';
	document.getElementById('res1').innerHTML = 'шагов до Экстрасенса - ' + sdvig; // текущий уровень
	for (var tmpPos=0; tmpPos<arr_name.length; tmpPos++){
		if (tmpPos<pos_name){clrBack = '#aca';} else{clrBack = '#ded';}
		document.getElementById('td_pos_'+tmpPos.toString()).style.backgroundColor = clrBack;
	}

	var lbl = document.getElementById('lblNext');
	var btn = document.getElementById("btnNext");
	if (btn.disabled == true){
		lbl.innerHTML = 'шагов до следующей доски - ' + (sdvig -(arr_value[3]-row-1)).toString();
	}
	if (sdvig<arr_value[3]-row){ // ------------------------------------------------
		btn.disabled = false;
		btn.style.color = 'black';
		lbl.innerHTML = 'шагов до следующей доски - 0';
	}

	count++;
	fill_table();
}

function check(s){
	if (s.length<2) s = '0' + s;
	return s;
}

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

var print_table = function (row, col){
	dw = document.body.clientWidth // Ширина браузера
	dh = document.body.clientHeight // Высота браузера
	sw = screen.width // Ширина экрана
	sh = screen.height // Высота экрана
	min = (sw<sh)? 2.4*sw: 0.66*sh;
	valSq = (min*.7)/col|0;
    document.write("<table id=pole class=pole align=center>"); 
    for (i = 0; i < row; i++) {       
		document.write("<tr>");
		for (j = 0; j < col; j++) {
			td_num = (j+i*col).toString();
			ts = '<td id=td_' + td_num + ' align=center height=' + valSq + ' width=' + valSq;
			ts+= ' onclick=printColor(' + j + ',' + i + ')></td>';
			document.write(ts);
		}
		document.write("</tr>");
	}
	document.write("</table>");
}


function next_page(){
	nextNum = (row + 1).toString(10);
	document.location = "index.html?param=" + nextNum;
}

function start_page(){
	nextNum = (row + 1).toString(10);
	var btn = document.getElementById('btnNext');
		btn.value = 'NEXT ' + nextNum + 'x' + nextNum;
		btn.disabled = true;
		btn.style.color = '#aaa';
	document.getElementById('lblNext').innerHTML =
		'шагов до следующей доски - ' + (sdvig -(arr_value[3]-row-1)).toString();
	document.getElementById('td_pos_'+(arr_name.length-1).toString()).style.backgroundColor = '#ded';
	fill_table();
}
