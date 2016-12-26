/**
* phpBB3 forum functions
*/

function find_username(url)
{
	popup(url, 760, 570, '_usersearch');
	return false;
}

function popup(url, width, height, name)
{
	if (!name)
	{
		name = '_popup';
	}

	window.open(url.replace(/&amp;/g, '&'), name, 'height=' + height + ',resizable=yes,scrollbars=yes,width=' + width);
	return false;
}

function jumpto(page, per_page, base_url)
{
	if (page !== null && !isNaN(page) && page == Math.floor(page) && page > 0)
	{
		if (base_url.indexOf('?') == -1)
		{
			document.location.href = base_url + '?start=' + ((page - 1) * per_page);
		}
		else
		{
			document.location.href = base_url.replace(/&amp;/g, '&') + '&start=' + ((page - 1) * per_page);
		}
	}
}

function marklist(id, name, state)
{
	if (document.getElementById)	{ var parent = document.getElementById(id) || document[id]; }	else if (document.all) {var parent = document.all(id);}

	if (!parent)
	{
		return;
	}

	if (document.getElementsByTagName) {var rb = parent.getElementsByTagName('input');}	else if (document.all) {var rb = parent.document.all.tags('input');}

	for (var r = 0; r < rb.length; r++)
	{
		if (rb[r].name.substr(0, name.length) == name)
		{
			rb[r].checked = state;
		}
	}
}

function selectCode(a)
{
	'use strict';

	if (document.getElementsByTagName) {var e = a.parentNode.parentNode.getElementsByTagName('PRE')[0];}	else if (document.all) {var e = a.parentElement.parentElement.all.tags('PRE')[0];}
	var s, r;

	if (window.getSelection)
	{
		s = window.getSelection();
		if (window.opera && e.innerHTML.substring(e.innerHTML.length - 4) === '<BR>')
		{
			e.innerHTML = e.innerHTML + '&nbsp;';
		}
		r = document.createRange();
		r.selectNodeContents(e);
		s.removeAllRanges();
		s.addRange(r);
	}
	else if (document.getSelection)
	{
		s = document.getSelection();
		r = document.createRange();
		r.selectNodeContents(e);
		s.removeAllRanges();
		s.addRange(r);
	}
	else if (document.selection)
	{
		r = document.body.createTextRange();
		r.moveToElementText(e);
		r.select();
	}
}

/**
* Play quicktime file by determining it's width/height
* from the displayed rectangle area
*/
function play_qt_file(obj)
{
	var rectangle = obj.GetRectangle();

	if (rectangle)
	{
		rectangle = rectangle.split(',')
		var x1 = parseInt(rectangle[0]);
		var x2 = parseInt(rectangle[2]);
		var y1 = parseInt(rectangle[1]);
		var y2 = parseInt(rectangle[3]);

		var width = (x1 < 0) ? (x1 * -1) + x2 : x2 - x1;
		var height = (y1 < 0) ? (y1 * -1) + y2 : y2 - y1;
	}
	else
	{
		var width = 200;
		var height = 0;
	}

	obj.width = width;
	obj.height = height + 16;

	obj.SetControllerVisible(true);

	obj.Play();
}
