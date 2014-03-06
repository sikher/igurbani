// John Resig's addEvent/removeEvent methods
function addEvent( obj, type, fn )
{
	if (obj.addEventListener)
		obj.addEventListener( type, fn, false );
	else if (obj.attachEvent)
	{
		obj["e"+type+fn] = fn;
		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
		obj.attachEvent( "on"+type, obj[type+fn] );
	}
}
 
function removeEvent( obj, type, fn )
{
	if (obj.removeEventListener)
		obj.removeEventListener( type, fn, false );
	else if (obj.detachEvent)
	{
		obj.detachEvent( "on"+type, obj[type+fn] );
		obj[type+fn] = null;
		obj["e"+type+fn] = null;
	}
}

// Map the keyboard to the current VKI keyboard layout
var keyboard_map = function setKeyboardMap() {
	var mapping = VKI_layout[VKI_kt].keys;
   	var keyboard_map = {
   	192:[mapping[0][0][0],mapping[0][0][1]],
   	49:[mapping[0][1][0],mapping[0][1][1]],
   	50:[mapping[0][2][0],mapping[0][2][1]],
   	51:[mapping[0][3][0],mapping[0][3][1]],
   	52:[mapping[0][4][0],mapping[0][4][1]],
   	53:[mapping[0][5][0],mapping[0][5][1]],
   	54:[mapping[0][6][0],mapping[0][6][1]],
   	55:[mapping[0][7][0],mapping[0][7][1]],
   	56:[mapping[0][8][0],mapping[0][8][1]],
   	57:[mapping[0][9][0],mapping[0][9][1]],
   	48:[mapping[0][10][0],mapping[0][10][1]],
   	189:[mapping[0][11][0],mapping[0][11][1]],
   	187:[mapping[0][12][0],mapping[0][12][1]],
   	81:[mapping[1][1][0],mapping[1][1][1]],
   	87:[mapping[1][2][0],mapping[1][2][1]],
   	69:[mapping[1][3][0],mapping[1][2][1]],
   	82:[mapping[1][4][0],mapping[1][4][1]],
   	84:[mapping[1][5][0],mapping[1][5][1]],
   	89:[mapping[1][6][0],mapping[1][6][1]],
   	85:[mapping[1][7][0],mapping[1][7][1]],
   	73:[mapping[1][8][0],mapping[1][8][1]],
   	79:[mapping[1][9][0],mapping[1][9][1]],
   	80:[mapping[1][10][0],mapping[1][10][1]],
   	219:[mapping[1][11][0],mapping[1][11][1]],
   	221:[mapping[1][12][0],mapping[1][12][1]],
   	65:[mapping[2][1][0],mapping[2][1][1]],
   	83:[mapping[2][2][0],mapping[2][2][1]],
   	68:[mapping[2][3][0],mapping[2][3][1]],
   	70:[mapping[2][4][0],mapping[2][4][1]],
   	71:[mapping[2][5][0],mapping[2][5][1]],
   	72:[mapping[2][6][0],mapping[2][6][1]],
   	74:[mapping[2][7][0],mapping[2][7][1]],
   	75:[mapping[2][8][0],mapping[2][8][1]],
   	76:[mapping[2][9][0],mapping[2][9][1]],
   	186:[mapping[2][10][0],mapping[2][10][1]],
   	222:[mapping[2][11][0],mapping[2][11][1]],
   	90:[mapping[3][1][0],mapping[3][1][1]],
   	88:[mapping[3][2][0],mapping[3][2][1]],
   	67:[mapping[3][3][0],mapping[3][3][1]],
   	86:[mapping[3][4][0],mapping[3][4][1]],
   	66:[mapping[3][5][0],mapping[3][5][1]],
   	78:[mapping[3][6][0],mapping[3][6][1]],
   	77:[mapping[3][7][0],mapping[3][7][1]],
   	188:[mapping[3][8][0],mapping[3][8][1]],
   	190:[mapping[3][9][0],mapping[3][9][1]],
   	191:[mapping[3][10][0],mapping[3][10][1]]
	};
	return keyboard_map;
}

// Display the correct keyboard character in the relevant input box
// and disable all non-relevant keyboard keys whilst the VKI keyboard is open
function getKeyboardMap(e){
	e = e || window.event;
	var input = $('.keyboardInput');
	var code = e.keyCode;
	var key = keyboard_map()[code];
	console.log(code);
	if(code === 13){
		// If enter is pressed
		// submit the form and close the VKI keyboard
		VKI_close();
		return;
	}
	if(code === 17){
		// If control key is pressed
		return;
	}
	if(code === 32){
		// If spacebar is pressed
		return;
	}
	if(code === 35){
		// If end is pressed
		return;
	}
	if(code === 36){
		// If home is pressed
		return;
	}
	if(code === 8){
		// If backspace is pressed
		return;
	}
	if(code === 16){
		// If shift is pressed
		VKI_modify('Shift');
		return;
	}
	if(code === 20){
		// If caps is pressed
		VKI_modify('Caps');
		return;
	}
	if(code === 0){
		// If alt or altgr is pressed
		VKI_modify('AltGr');
		return;
	}
	if(code === 27){
		// If esc is pressed
		VKI_close();
		return;
	}
	if(VKI_target){
		e.preventDefault();
		if(key != undefined || ''){
			if(VKI_shift || VKI_shiftlock){
				input.val(input.val()+key[1]);
				return;
			} else {
				input.val(input.val()+key[0]);
				return;
			}
		}
	}
}

// Run the function on every keydown
addEvent(this, 'keydown', getKeyboardMap);