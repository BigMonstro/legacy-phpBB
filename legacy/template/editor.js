/**
* bbCode control by subBlue design [ www.subBlue.com ]
*/

// Startup variables
var imageTag = false;
var theSelection = false;
var bbcodeEnabled = true;

var is_ie = ((typeof document.all !== 'undefined') && (typeof window.opera === 'undefined'));
var baseHeight;

/**
* Fix a bug involving the TextRange object. From
* http://www.frostjedi.com/terra/scripts/demo/caretBug.html
*/
function initInsertions() {
	var doc;

	if (document.forms[form_name]) {
		doc = document;
	} else {
		doc = opener.document;
	}

	var textarea = doc.forms[form_name].elements[text_name];

	if (is_ie && typeof(baseHeight) !== 'number') {
		textarea.focus();
		baseHeight = doc.selection.createRange().duplicate().boundingHeight;

		if (!document.forms[form_name]) {
			document.body.focus();
		}
	}

	if (document.forms[form_name]) {
		// Allow to use tab character when typing code
		if ((window.InstallTrigger && typeof globalThis !== 'object') || (!window.matchMedia && window.opera)) {
			textarea.onkeypress = function(event) {
				if ((event.keyCode==9 || event.which==9) && inCodeTag() && !event.altKey && !event.ctrlKey && !event.shiftKey && !event.metaKey) {
					event.preventDefault ? event.preventDefault() : (event.returnValue = false); bbfontstyle('\t','',true);
				}
			}
		} else {
			textarea.onkeydown = function(e) {
				if ((event.keyCode==9 || event.which==9) && inCodeTag() && !event.altKey && !event.ctrlKey && !event.shiftKey && !event.metaKey) {
					event.preventDefault ? event.preventDefault() : (event.returnValue = false); bbfontstyle('\t','',true);
				}
			}
		}
	}
}

function bbstyle(bbnumber) {
	if (bbnumber !== -1) {
		bbfontstyle(bbtags[bbnumber], bbtags[bbnumber+1]);
	} else {
		insert_text('[*]');
		document.forms[form_name].elements[text_name].focus();
	}
}

/**
* Apply bbcode
*/
function bbfontstyle(bbopen, bbclose, appendText) {
	theSelection = false;

	var textarea = document.forms[form_name].elements[text_name];

	textarea.focus();

	if (document.all && document.uniqueID) {
		// Get text selection
		theSelection = document.selection.createRange().text;

		if (theSelection) {
			// Add tags around selection
			if (appendText) {
				document.selection.createRange().text = '';
			} else {
				document.selection.createRange().text = bbopen + theSelection + bbclose;
			}
			textarea.focus();
			theSelection = '';
			if (!appendText) {
				return;
			}
		}
	} else if (textarea.selectionEnd && (textarea.selectionEnd - textarea.selectionStart > 0)) {
		mozWrap(textarea, bbopen, bbclose, appendText);
		textarea.focus();
		theSelection = '';
		return;
	}

	// The new position for the cursor after adding the bbcode
	if (document.getElementById) {
		var caret_pos = getCaretPosition(textarea).start;
		var new_pos = caret_pos + bbopen.length;
	}

	// Open tag
	insert_text(bbopen + bbclose);

	// Center the cursor when we don't have a selection
	// Gecko and proper browsers
	if (!isNaN(textarea.selectionStart) && !(document.all && window.opera)) {
		textarea.selectionStart = new_pos;
		textarea.selectionEnd = new_pos;
	}
	// IE
	else if (document.selection && document.getElementById) {
		var range = textarea.createTextRange(); 
		range.move("character", new_pos); 
		range.select();
		storeCaret(textarea);
	}

	textarea.focus();
}

/**
* Insert text at position
*/
function insert_text(text, spaces, popup) {
	var textarea;

	if (!popup) {
		textarea = document.forms[form_name].elements[text_name];
	} else {
		textarea = opener.document.forms[form_name].elements[text_name];
	}

	if (spaces) {
		text = ' ' + text + ' ';
	}

	// Since IE9, IE also has textarea.selectionStart, but it still needs to be treated the old way.
	// Therefore we simply add a !is_ie here until IE fixes the text-selection completely.
	if (!isNaN(textarea.selectionStart) && !is_ie) {
		var sel_start = textarea.selectionStart;
		var sel_end = textarea.selectionEnd;

		mozWrap(textarea, text, '');
		textarea.selectionStart = sel_start + text.length;
		textarea.selectionEnd = sel_end + text.length;
	} else if (textarea.createTextRange && textarea.caretPos) {
		if (baseHeight !== textarea.caretPos.boundingHeight) {
			textarea.focus();
			storeCaret(textarea);
		}

		var caret_pos = textarea.caretPos;
		caret_pos.text = caret_pos.text.charAt(caret_pos.text.length - 1) === ' ' ? caret_pos.text + text + ' ' : caret_pos.text + text;
	} else {
		textarea.value = textarea.value + text;
	}

	if (!popup) {
		textarea.focus();
	}
}

/**
* Add inline attachment at position
*/
function attachInline(index, filename) {
	insert_text('[attachment=' + index + ']' + filename + '[/attachment]');
	document.forms[form_name].elements[text_name].focus();
}

/**
* Add quote text to message
*/
function addquote(post_id, username, l_wrote, attributes, data) {
	var message_name = 'message_' + post_id;
	var theSelection = '';
	var divarea = false;
	var i;

	if (typeof l_wrote === 'undefined') {
		// Backwards compatibility
		l_wrote = 'wrote';
	}

	if (typeof attributes !== 'object') {
		attributes = {};
	}

	if (document.all) {
		divarea = document.all[message_name];
	} else {
		divarea = document.getElementById(message_name);
	}

	// Get text selection - not only the post content :(
	// IE9 must use the document.selection method but has the *.getSelection so we just force no IE
	// The condition with the window.matchMedia method targets Opera 12.1x to fix an insertion bug
	if ((window.getSelection && !is_ie && !window.opera) || (window.matchMedia && window.opera)) {
		theSelection = window.getSelection().toString();
	} else if (document.getSelection && !is_ie) {
		theSelection = document.getSelection();
	} else if (document.selection && document.getElementById) {
		theSelection = document.selection.createRange().text;
	}

	if (theSelection === '' || typeof theSelection === 'undefined' || theSelection === null) {
		if (data || (divarea.innerHTML && document.getElementById)) {
			if (data) {
				var content = divarea.getAttribute("data-content");
			} else {
				var content = divarea.innerHTML;
			}
			theSelection = content.replace(/<br>/ig, '\n');
			theSelection = theSelection.replace(/<br\/>/ig, '\n');
			theSelection = theSelection.replace(/<br \/>/ig, '\n');
			theSelection = theSelection.replace(/&lt\;/ig, '<');
			theSelection = theSelection.replace(/&gt\;/ig, '>');
			theSelection = theSelection.replace(/&amp\;/ig, '&');
			theSelection = theSelection.replace(/&nbsp\;/ig, ' ');
		} else if (document.all) {
			theSelection = divarea.innerText;
		} else if (divarea.textContent) {
			theSelection = divarea.textContent;
		} else if (divarea.firstChild.nodeValue) {
			theSelection = divarea.firstChild.nodeValue;
		}
	}

	if (theSelection) {
		if (bbcodeEnabled) {
			attributes.author = username;
			insert_text(generateQuote(theSelection, attributes));
		} else {
			insert_text(username + ' ' + l_wrote + ':' + '\n');
			var lines = split_lines(theSelection);
			for (i = 0; i < lines.length; i++) {
				insert_text('> ' + lines[i] + '\n');
			}
		}
	}
}

function generateQuote(text, attributes) {
	text = text.replace(/^\s+/, '').replace(/\s+$/, '');
	var quote = '[quote';
	if (attributes.author) {
		// Add the author as the BBCode's default attribute
		quote += '=' + formatAttributeValue(attributes.author);
		delete attributes.author;
	}
	for (var name in attributes) {
		if (typeof attributes[name] !== 'function') {
			var value = attributes[name];
			quote += ' ' + name + '=' + formatAttributeValue(value.toString());
		}
	}
	quote += ']';
	var newline = ((quote + text + '[/quote]').length > 80 || text.indexOf('\n') > -1) ? '\n' : '';
	quote += newline + text + newline + '[/quote]';

	return quote;
}

function formatAttributeValue(str) {
	if (!/[ "'\\\]]/.test(str)) {
		// Return as-is if it contains none of: space, ' " \ or ]
		return str;
	}
	var singleQuoted = "'" + str.replace(/[\\']/g, '\\$&') + "'",
		doubleQuoted = '"' + str.replace(/[\\"]/g, '\\$&') + '"';

	return (singleQuoted.length < doubleQuoted.length) ? singleQuoted : doubleQuoted;
}

function split_lines(text) {
	var lines = text.split('\n');
	var splitLines = new Array();
	var j = 0;
	var i;

	for(i = 0; i < lines.length; i++) {
		if (lines[i].length <= 80) {
			splitLines[j] = lines[i];
			j++;
		} else {
			var line = lines[i];
			var splitAt;
			do {
				splitAt = line.indexOf(' ', 80);

				if (splitAt === -1) {
					splitLines[j] = line;
					j++;
				} else {
					splitLines[j] = line.substring(0, splitAt);
					line = line.substring(splitAt);
					j++;
				}
			}
			while(splitAt !== -1);
		}
	}
	return splitLines;
}

/**
* From http://www.massless.org/mozedit/
*/
function mozWrap(txtarea, open, close, appendText) {
	var selLength = (typeof(txtarea.textLength) === 'undefined') ? txtarea.value.length : txtarea.textLength;
	var selStart = txtarea.selectionStart;
	var selEnd = txtarea.selectionEnd;
	var scrollTop = txtarea.scrollTop;

	var s1 = (txtarea.value).substring(0,selStart);

	if (appendText) {
		var s2 = '';
	} else {
		var s2 = (txtarea.value).substring(selStart, selEnd);
	}

	var s3 = (txtarea.value).substring(selEnd, selLength);

	txtarea.value = s1 + open + s2 + close + s3;
	txtarea.selectionStart = selStart + open.length;

	if (appendText) {
		txtarea.selectionEnd = txtarea.selectionStart;
	} else {
		txtarea.selectionEnd = selEnd + open.length;
	}

	txtarea.focus();
	txtarea.scrollTop = scrollTop;

	return;
}

/**
* Insert at Caret position. Code from
* http://www.faqts.com/knowledge_base/view.phtml/aid/1052/fid/130
*/
function storeCaret(textEl) {
	if (textEl.createTextRange && document.selection) {
		textEl.caretPos = document.selection.createRange().duplicate();
	}
}

/**
* Caret Position object
*/
function caretPosition() {
	var start = null;
	var end = null;
}

/**
* Get the caret position in an textarea
*/
function getCaretPosition(txtarea) {
	var caretPos = new caretPosition();

	// simple Gecko/Opera way
	if (txtarea.selectionStart || txtarea.selectionStart === 0) {
		caretPos.start = txtarea.selectionStart;
		caretPos.end = txtarea.selectionEnd;
	}
	// dirty and slow IE way
	else if (document.selection) {
		// get current selection
		var range = document.selection.createRange();

		// a new selection of the whole textarea
		var range_all = document.body.createTextRange();
		range_all.moveToElementText(txtarea);

		// calculate selection start point by moving beginning of range_all to beginning of range
		var sel_start;
		for (sel_start = 0; range_all.compareEndPoints('StartToStart', range) < 0; sel_start++) {
			range_all.moveStart('character', 1);
		}

		txtarea.sel_start = sel_start;

		// we ignore the end value for IE, this is already dirty enough and we don't need it
		caretPos.start = txtarea.sel_start;
		caretPos.end = txtarea.sel_start;
	}

	return caretPos;
}

function colorPalette() {
	var r = 0, g = 0, b = 0;
	var numberList = new Array(6);
	var color = '';
	var html = '';
	var style = (is_ie && !document.querySelector) ? 'cursor: hand' : 'cursor: inherit';

	if (is_ie && !window.XMLHttpRequest) {
		style += '; overflow: hidden';
	}

	numberList[0] = '00';
	numberList[1] = '40';
	numberList[2] = '80';
	numberList[3] = 'BF';
	numberList[4] = 'FF';

	html += '<table class="main" cellspacing="1" style="width: 61px">';

	for (r = 0; r < 5; r++) {
		for (g = 0; g < 5; g++) {
				html += '<tr>';

			for (b = 0; b < 5; b++) {
				color = String(numberList[r]) + String(numberList[g]) + String(numberList[b]);
				html += '<td style="background-color: #' + color + '; height: 10px; padding: 0; width: 11px">';
				html += '<a style="display: block; height: 100%; width: 100%" href="#" onclick="bbfontstyle(\'[color=#' + color + ']\', \'[/color]\'); return false;" title="#' + color + '"><div style="height: 100%; width: 100%; ' + style + '"></div></a>';
				html += '</td>';
			}

			html += '</tr>';
		}
	}

	html += '</table>';
	return html;
}

/**
* Check if cursor is currently inside a code tag
*/
function inCodeTag() {
	var textarea = document.forms[form_name].elements[text_name];
	var e = textarea.value;
	e = e.replace(/CODE/gi,"code"); // case insensitive
	var str="[code]";
	var n = e.search("\\[code\\]");
	var m = e.search("\\[code=");
	if (m != "-1" && (n == "-1" || m<n)) {
		n = m;
		str="[code=";
	}
	var w = getCaretPosition(textarea).start;
	while (n != "-1") {

		var count = 0;
			// fix for ancient browsers
			if (document.all && !document.addEventListener && !window.opera) {
				e2=e.substr(0,n);
				var xoxo = e2.search(/\n/);
				while (xoxo != "-1") {
					count++;
					e2=e2.replace(/\n/," ");
					var xoxo = e2.search(/\n/);
				}
			} else if (document.all && window.opera) {
				return false;
			}

		n=n+5-count;
		if (n<w) {
			var y = e.search("\\[/code\\]");
			// fix for ancient browsers
			if (y != "-1" && document.all && !document.addEventListener) {
				count = 0;
				e2=e.substr(0,y);
				var xoxo = e2.search(/\n/);
				while (xoxo != "-1") {
					count++;
					e2=e2.replace(/\n/," ");
					var xoxo = e2.search(/\n/);
				}
				y=y-count;
			}
			while (y != "-1" && y<n) {
				e=e.replace("[/code]","       ");
				var y = e.search("\\[/code\\]");
				// fix for ancient browsers
				if (y != "-1" && document.all && !document.addEventListener) {
					count = 0;
					e2=e.substr(0,y);
					var xoxo = e2.search(/\n/);
					while (xoxo != "-1") {
						count++;
						e2=e2.replace(/\n/," ");
						var xoxo = e2.search(/\n/);
					}
					y=y-count;
				}
			}
			if (y == "-1" || w<=y) {
				return true; // the cursor is inside a code tag
			}
		}
		e=e.replace(str,"      ");
		var n = e.search("\\[code\\]");
		var m = e.search("\\[code=");
		if (m != "-1" && (n == "-1" || m<n)) {
			n = m;
			str="[code=";
		} else {
			str="[code]";
		}
	}
	return false;
}