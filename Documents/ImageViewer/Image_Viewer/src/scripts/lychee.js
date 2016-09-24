/**
 * @description This module provides the basic functions of ProrigoGallery.
 * @copyright   2015 by Tobias Reich
 */

ProrigoGallery = {

	title           : document.title,
	version         : '3.1.4',
	versionCode     : '030104',

	updatePath      : '//update.prorigo.com/index.json',
	updateURL       : 'https://github.com/prorigo/ProrigoGallery',
	website         : 'http://ProrigoGallery.prorigo.com',

	publicMode      : false,
	viewMode        : false,

	checkForUpdates : '1',
	sortingPhotos   : '',
	sortingAlbums   : '',
	location        : '',

	dropbox         : false,
	dropboxKey      : '',

	content         : $('.content'),
	imageview       : $('#imageview')

}

ProrigoGallery.init = function() {

	api.post('Session::init', {}, function(data) {

		// Check status
		// 0 = No configuration
		// 1 = Logged out
		// 2 = Logged in

		if (data.status===2) {

			// Logged in

			ProrigoGallery.sortingPhotos   = data.config.sortingPhotos   || ''
			ProrigoGallery.sortingAlbums   = data.config.sortingAlbums   || ''
			ProrigoGallery.dropboxKey      = data.config.dropboxKey      || ''
			ProrigoGallery.location        = data.config.location        || ''
			ProrigoGallery.checkForUpdates = data.config.checkForUpdates || '1'

			// Show dialog when there is no username and password
			if (data.config.login===false) settings.createLogin()

		} else if (data.status===1) {

			// Logged out

			ProrigoGallery.checkForUpdates = data.config.checkForUpdates || '1'

			ProrigoGallery.setMode('public')

		} else if (data.status===0) {

			// No configuration

			ProrigoGallery.setMode('public')

			header.dom().hide()
			ProrigoGallery.content.hide()
			$('body').append(build.no_content('cog'))
			settings.createConfig()

			return true

		}

		$(window).bind('popstate', ProrigoGallery.load)
		ProrigoGallery.load()

	})

}

ProrigoGallery.login = function(data) {

	let user     = data.username
	let password = data.password

	let params = {
		user,
		password
	}

	api.post('Session::login', params, function(data) {

		if (data===true) {

			window.location.reload()

		} else {

			// Show error and reactive button
			basicModal.error('password')

		}

	})

}

ProrigoGallery.loginDialog = function() {

	let msg = ProrigoGallery.html`
	          <p class='signIn'>
	              <input class='text' name='username' autocomplete='username' type='text' placeholder='username' autocapitalize='off' autocorrect='off'>
	              <input class='text' name='password' autocomplete='current-password' type='password' placeholder='password'>
	          </p>
	          <p class='version'>ProrigoGallery $${ ProrigoGallery.version }<span> &#8211; <a target='_blank' href='$${ ProrigoGallery.updateURL }'>Update available!</a><span></p>
	          `

	basicModal.show({
		body: msg,
		buttons: {
			action: {
				title: 'Sign In',
				fn: ProrigoGallery.login
			},
			cancel: {
				title: 'Cancel',
				fn: basicModal.close
			}
		}
	})

	if (ProrigoGallery.checkForUpdates==='1') ProrigoGallery.getUpdate()

}

ProrigoGallery.logout = function() {

	api.post('Session::logout', {}, function() {
		window.location.reload()
	})

}

ProrigoGallery.goto = function(url = '') {

	url = '#' + url

	history.pushState(null, null, url)
	ProrigoGallery.load()

}

ProrigoGallery.load = function() {

	let albumID = ''
	let photoID = ''
	let hash    = document.location.hash.replace('#', '').split('/')

	$('.no_content').remove()
	contextMenu.close()
	multiselect.close()

	if (hash[0]!=null) albumID = hash[0]
	if (hash[1]!=null) photoID = hash[1]

	if (albumID && photoID) {

		// Trash data
		photo.json = null

		// Show Photo
		if (ProrigoGallery.content.html()==='' || (header.dom('.header__search').length && header.dom('.header__search').val().length!==0)) {
			ProrigoGallery.content.hide()
			album.load(albumID, true)
		}
		photo.load(photoID, albumID)

	} else if (albumID) {

		// Trash data
		photo.json = null

		// Show Album
		if (visible.photo()) view.photo.hide()
		if (visible.sidebar() && (albumID==='0' || albumID==='f' || albumID==='s' || albumID==='r')) sidebar.toggle()
		if (album.json && albumID==album.json.id) view.album.title()
		else album.load(albumID)

	} else {

		// Trash albums.json when filled with search results
		if (search.hash!=null) {
			albums.json = null
			search.hash = null
		}

		// Trash data
		album.json = null
		photo.json = null

		// Hide sidebar
		if (visible.sidebar()) sidebar.toggle()

		// Show Albums
		if (visible.photo()) view.photo.hide()
		ProrigoGallery.content.show()
		albums.load()

	}

}

ProrigoGallery.getUpdate = function() {

	const success = function(data) {
		if (data.ProrigoGallery.version>parseInt(ProrigoGallery.versionCode)) $('.version span').show()
	}

	$.ajax({
		url     : ProrigoGallery.updatePath,
		success : success
	})

}

ProrigoGallery.setTitle = function(title, editable) {

	document.title = ProrigoGallery.title + ' - ' + title

	header.setEditable(editable)
	header.setTitle(title)

}

ProrigoGallery.setMode = function(mode) {

	$('#button_settings, #button_trash_album, .button_add, .header__divider').remove()
	$('#button_trash, #button_move, #button_star').remove()

	$('#button_share, #button_share_album')
		.removeClass('button--eye')
		.addClass('button--share')
		.find('use')
		.attr('xlink:href', '#share')

	$(document)
		.off('click',       '.header__title--editable')
		.off('touchend',    '.header__title--editable')
		.off('contextmenu', '.photo')
		.off('contextmenu', '.album')
		.off('drop')

	Mousetrap
		.unbind([ 'u' ])
		.unbind([ 's' ])
		.unbind([ 'f' ])
		.unbind([ 'r' ])
		.unbind([ 'd' ])
		.unbind([ 't' ])
		.unbind([ 'command+backspace', 'ctrl+backspace' ])
		.unbind([ 'command+a', 'ctrl+a' ])

	if (mode==='public') {

		ProrigoGallery.publicMode = true

	} else if (mode==='view') {

		Mousetrap.unbind([ 'esc', 'command+up' ])

		$('#button_back, a#next, a#previous').remove()
		$('.no_content').remove()

		ProrigoGallery.publicMode = true
		ProrigoGallery.viewMode   = true

	}

}

ProrigoGallery.animate = function(obj, animation) {

	let animations = [
		[ 'fadeIn', 'fadeOut' ],
		[ 'contentZoomIn', 'contentZoomOut' ]
	]

	if (!obj.jQuery) obj = $(obj)

	for (let i = 0; i < animations.length; i++) {
		for (let x = 0; x < animations[i].length; x++) {
			if (animations[i][x]==animation) {
				obj.removeClass(animations[i][0] + ' ' + animations[i][1]).addClass(animation)
				return true
			}
		}
	}

	return false

}

ProrigoGallery.retinize = function(path = '') {

	let extention = path.split('.').pop()
	let isPhoto   = extention!=='svg'

	if (isPhoto===true) {

		path = path.replace(/\.[^/.]+$/, '')
		path = path + '@2x' + '.' + extention

	}

	return {
		path,
		isPhoto
	}

}

ProrigoGallery.loadDropbox = function(callback) {

	if (ProrigoGallery.dropbox===false && ProrigoGallery.dropboxKey!=null && ProrigoGallery.dropboxKey!=='') {

		loadingBar.show()

		let g = document.createElement('script')
		let s = document.getElementsByTagName('script')[0]

		g.src   = 'https://www.dropbox.com/static/api/1/dropins.js'
		g.id    = 'dropboxjs'
		g.type  = 'text/javascript'
		g.async = 'true'
		g.setAttribute('data-app-key', ProrigoGallery.dropboxKey)
		g.onload = g.onreadystatechange = function() {
			let rs = this.readyState
			if (rs && rs!=='complete' && rs!=='loaded') return
			ProrigoGallery.dropbox = true
			loadingBar.hide()
			callback()
		}
		s.parentNode.insertBefore(g, s)

	} else if (ProrigoGallery.dropbox===true && ProrigoGallery.dropboxKey!=null && ProrigoGallery.dropboxKey!=='') {

		callback()

	} else {

		settings.setDropboxKey(callback)

	}

}

ProrigoGallery.getEventName = function() {

	let touchendSupport = (/Android|iPhone|iPad|iPod/i).test(navigator.userAgent || navigator.vendor || window.opera) && ('ontouchend' in document.documentElement)
	let eventName       = (touchendSupport===true ? 'touchend' : 'click')

	return eventName

}

ProrigoGallery.escapeHTML = function(html = '') {

	// Ensure that html is a string
	html += ''

	// Escape all critical characters
	html = html.replace(/&/g, '&amp;')
	           .replace(/</g, '&lt;')
	           .replace(/>/g, '&gt;')
	           .replace(/"/g, '&quot;')
	           .replace(/'/g, '&#039;')
	           .replace(/`/g, '&#96;')

	return html

}

ProrigoGallery.html = function(literalSections, ...substs) {

	// Use raw literal sections: we don’t want
	// backslashes (\n etc.) to be interpreted
	let raw    = literalSections.raw
	let result = ''

	substs.forEach((subst, i) => {

		// Retrieve the literal section preceding
		// the current substitution
		let lit = raw[i]

		// If the substitution is preceded by a dollar sign,
		// we escape special characters in it
		if (lit.slice(-1)==='$') {
			subst = ProrigoGallery.escapeHTML(subst)
			lit   = lit.slice(0, -1)
		}

		result += lit
		result += subst

	})

	// Take care of last literal section
	// (Never fails, because an empty template string
	// produces one literal section, an empty string)
	result += raw[raw.length - 1]

	return result

}

ProrigoGallery.error = function(errorThrown, params, data) {

	console.error({
		description : errorThrown,
		params      : params,
		response    : data
	})

	loadingBar.show('error', errorThrown)

}