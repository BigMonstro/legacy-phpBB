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
	if (document.getElementById)	{ var parent = document.getElementById(id) || document[id]; } else if (document.all) {var parent = document.all(id);}

	if (!parent)
	{
		return;
	}

	if (document.getElementsByTagName) {var rb = parent.getElementsByTagName('input');}	else if (document.all) {var rb = parent.document.all.tags('input');}

	for (var r = 0; r < rb.length; r++)
	{
		if (rb[r].name.substr(0, name.length) == name && rb[r].disabled !== true)
		{
			rb[r].checked = state;
		}
	}
}

function selectCode(a)
{
	'use strict';

	if (document.getElementsByTagName) {var e = a.parentNode.parentNode.getElementsByTagName('PRE')[0];}	else if (document.selection) {var e = a.parentElement.parentElement.all.tags('PRE')[0];}
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

function removeComment(b)
{
	b.innerHTML = b.innerHTML.replace('<!--', ' ');
	var n = b.innerHTML.lastIndexOf('--&gt;');
	if (n >= 0 && n + 6 >= b.innerHTML.length)
	{
		b.innerHTML = b.innerHTML.substring(0, n);
	}
}

function getStuff(c)
{
	if (document.getElementById) { return document.getElementById(c);} else if (document.all) { return document.all(c);}
}

/**
* Dropdown menus initialisation
*/
if (document.documentElement && (document.documentElement.className.indexOf('dropdown-enabled') > -1))
{
	if (document.uniqueID && !window.XMLHttpRequest)
	{
		var iFrameFix=document.createElement("IFRAME"); iFrameFix.scrolling="no"; iFrameFix.src="javascript:'<html></html>';"; iFrameFix.style.position="absolute"; if (document.documentElement.dir == "ltr") { iFrameFix.style.left="-2px"; iFrameFix.style.right="auto";} else { iFrameFix.style.left="auto"; iFrameFix.style.right="-2px";} iFrameFix.style.top="-2px"; iFrameFix.style.zIndex="-1"; iFrameFix.style.filter="mask()";
	};

	if (document.getElementById('menubar')) {

		if (document.uniqueID && !document.compatMode) { var ParentBar = document.getElementById('menubar').getElementsByTagName('table')[0]} else { var ParentBar = document.getElementById('menubar')}; ParentBar.style.position = "relative"; ParentBar.style.zIndex = "1";
	}

	if (document.getElementById('quick_links_list') && document.getElementById('quick_link'))
	{
		var qkl=document.getElementById('quick_links_list'); qkl.style.position="absolute"; if (typeof ParentBar !== 'undefined') { qkl.style.top="17px";} if (document.documentElement.dir == "ltr") { qkl.style.left="0";} else { qkl.style.right="0";} removeComment(qkl); qkl.onclick = function(e) { if (e) { e.stopPropagation(); } else { window.event.cancelBubble = true; } };

		document.getElementById('quick_link').onclick = function(e) {
			if (e) { e.stopPropagation(); } else { window.event.cancelBubble = true; } if (typeof nfl !== 'undefined') {nfl.style.display='none'}; if (typeof usl !== 'undefined') {usl.style.display='none'}; if (typeof ttl !== 'undefined') {ttl.style.display='none'}; var qks = qkl.style.display != 'none'; qkl.style.display = qks ? 'none' : 'block';
			if (qkl.style.display != 'none')
			{
				if (document.uniqueID && !document.querySelector) { for (i=0 ; i<qkl.getElementsByTagName('a').length ; i++) {	var LinkWidth = qkl.getElementsByTagName('a')[i].offsetWidth;	if (i==0) { var LinkWidest = LinkWidth } else if (LinkWidth>LinkWidest) { LinkWidest=LinkWidth }}	qkl.style.width = LinkWidest+"px";}
				if (typeof iFrameFix !== 'undefined') {	qkl.appendChild(iFrameFix); iFrameFix.style.height=qkl.offsetHeight+"px";	iFrameFix.style.width=qkl.offsetWidth+"px";}
			};
			return false;
		};
	}

	if (document.getElementById('user_list') && document.getElementById('user_link'))
	{
		if (document.getElementById('notification_list') && document.getElementById('notification_link'))
		{
			var nfl=document.getElementById('notification_list'); nfl.style.position="absolute"; if (typeof ParentBar !== 'undefined') { nfl.style.top="17px";} nfl.style.width="270px"; nfl.style.maxWidth="100%"; removeComment(nfl); nfl.onclick = function(e) { if (e) { e.stopPropagation(); } else { window.event.cancelBubble = true; } };

			document.getElementById('notification_link').onclick = function(e) {
				if (e) { e.stopPropagation(); } else { window.event.cancelBubble = true; } if (typeof qkl !== 'undefined') {qkl.style.display='none'}; usl.style.display='none'; if (typeof ttl !== 'undefined') {ttl.style.display='none'}; var nfs = nfl.style.display != 'none'; nfl.style.display = nfs ? 'none' : 'block';
				if (nfl.style.display != 'none')
				{
					if (document.documentElement.dir == "ltr") { if (document.getElementById('user_side') && (nfl.offsetWidth < document.getElementById('user_side').offsetWidth)) { nfl.style.right="auto";} else { nfl.style.right="0";}} else { if (document.getElementById('user_side') && (nfl.offsetWidth < document.getElementById('user_side').offsetWidth)) { nfl.style.left="auto";} else { nfl.style.left="0";}}
					if (document.getElementById('notification_scroll')) { var nfo = document.getElementById('notification_scroll'); nfo.style.borderLeft="0"; nfo.style.borderRight="0"; nfo.style.height="auto"; nfo.style.width="100%"; nfo.style.overflow="auto"; if (document.addEventListener) { var TotalHeight = window.innerHeight } else { var TotalHeight = document.documentElement.offsetHeight } if (TotalHeight>520) { var MaxListHeight = 350; nfo.style.maxHeight = "350px"; } else if (TotalHeight>400) { var MaxListHeight = 225; nfo.style.maxHeight = "225px"; } else { var MaxListHeight = 100; nfo.style.maxHeight = "100px"; } if (document.uniqueID && !window.XMLHttpRequest && nfo.offsetHeight > MaxListHeight) { nfo.style.height = MaxListHeight+"px" }}
					if (typeof iFrameFix !== 'undefined') { nfl.appendChild(iFrameFix); iFrameFix.style.height=nfl.offsetHeight+"px"; iFrameFix.style.width=nfl.offsetWidth+"px";}
				};
				return false;
			};
		}

		var usl=document.getElementById('user_list'); usl.style.position="absolute"; if (typeof ParentBar !== 'undefined') { usl.style.top="17px";} if (document.documentElement.dir == "ltr") { usl.style.right="0";} else { usl.style.left="0";} removeComment(usl); usl.onclick = function(e) { if (e) { e.stopPropagation(); } else { window.event.cancelBubble = true; } };

		document.getElementById('user_link').onclick = function(e) {
			if (e) { e.stopPropagation(); } else { window.event.cancelBubble = true; } if (typeof qkl !== 'undefined') {qkl.style.display='none'}; if (typeof nfl !== 'undefined') {nfl.style.display='none'}; if (typeof ttl !== 'undefined') {ttl.style.display='none'}; var uss = usl.style.display != 'none'; usl.style.display = uss ? 'none' : 'block';
			if (usl.style.display != 'none')
			{
				if (document.uniqueID && !document.querySelector) { for (i=0 ; i<usl.getElementsByTagName('a').length ; i++) {	var LinkWidth = usl.getElementsByTagName('a')[i].offsetWidth;	if (i==0) { var LinkWidest = LinkWidth } else if (LinkWidth>LinkWidest) { LinkWidest=LinkWidth }} usl.style.width = LinkWidest+"px";}
				if (typeof iFrameFix !== 'undefined') { usl.appendChild(iFrameFix); iFrameFix.style.height=usl.offsetHeight+"px"; iFrameFix.style.width=usl.offsetWidth+"px";}
			};
			return false;
		};

	}


	document.onclick = function() { if (typeof qkl !== 'undefined') {qkl.style.display='none'};  if (typeof nfl !== 'undefined') {nfl.style.display='none'};  if (typeof usl !== 'undefined') {usl.style.display='none'}; if (typeof ttl !== 'undefined') {ttl.style.display='none'};};
	
	if (document.uniqueID && !document.querySelector) { window.attachEvent('onresize', function() { if (typeof qkl !== 'undefined') { if (qkl.style.display != 'none') { qkl.style.display="none"; qkl.style.display="block"; }}	if (typeof nfl !== 'undefined') {if (nfl.style.display != 'none') { nfl.style.display="none"; nfl.style.display="block"; }}	if (typeof usl !== 'undefined') {if (usl.style.display != 'none') { usl.style.display="none"; usl.style.display="block"; }} if (typeof ttl !== 'undefined') {if (ttl.style.display != 'none') { ttl.style.display="none"; ttl.style.display="block"; }}});}
}

/**
* Change the global class to .hasjs
*/
if (document.documentElement) { document.documentElement.className = document.documentElement.className.replace(/nojs/gi,'hasjs');}	else if (document.all && (document.all.tags('html')[0].className.indexOf('nojs') > -1)) { document.all.tags('html')[0].className = 'hasjs';}
