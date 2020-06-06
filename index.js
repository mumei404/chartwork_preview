const textarea = document.getElementById('_chatText')
let stash = []
let prevKey;
let timer;
const KEY__CTRL_S = 19
const MODE = {
	KEY__S: 115, // stash
	KEY__P: 112, // pop
	KEY__SHIFT_P: 80, // preview
	KEY__C: 99, // preview cancel
}

textarea.addEventListener('keypress', e => {
	if(!prevKey) {
		prevKey = e.keyCode
		clearTimeout(timer)
		timer = setTimeout(() => {
			prevKey = null
		}, 1000)
		return
	}

	if(prevKey != KEY__CTRL_S) {
		prevKey = null
		return
	}

	prevKey = null
	if(!Object.values(MODE).includes(e.keyCode)) {
		return
	}

	e.preventDefault()

	switch(e.keyCode) {
		case MODE['KEY__S']:
			stash.push(e.target.value)
			e.target.value = ''
			break;
		case MODE['KEY__P']:
			if(!stash.length) break
			e.target.value = stash.pop()
			break
		case MODE['KEY__SHIFT_P']:
			let messageList = document.getElementsByClassName('_message')
			if(!messageList.length) break

			let bro = [...messageList].slice(-1)[0]
			let message = bro.cloneNode(true)

			message.classList.add('shimazaki-preview')

			message.getElementsByTagName('pre')[0].innerHTML = generateHtml(e.target.value)
			message.style = 'background-color: yellow'
			bro.parentNode.insertBefore(message, bro.nextSibling)

			scroll()

			break;
		case MODE['KEY__C']:
			let list = document.getElementsByClassName('shimazaki-preview')
			if(!list.length) break

			let preview = [...list].slice(-1)[0]
			preview.parentNode.removeChild(preview)
			break;
	}
})

textarea.addEventListener('input', e => {
	let list = document.getElementsByClassName('shimazaki-preview')
	if(!list.length) return

	let previewing = [...list].slice(-1)[0]

	previewing.getElementsByTagName('pre')[0].innerHTML = generateHtml(e.target.value)
	scroll()
})

const scroll = () => {
	let timeLine = document.getElementById('_timeLine').children[0]
	timeLine.scrollTop = timeLine.scrollHeight;
}

const generateHtml = html => {
	const quote = html => {
		let startQuote = '<div contenteditable="false" data-cwopen="[qt]" data-cwclose="[/qt]" class="dev_quote chatQuote"><div class="chatQuote__quoteLeftArea"><svg viewBox="0 0 10 10" class="chatQuote__quoteIcon"><use fill-rule="evenodd" xlink:href="#icon_quote"></use></svg></div><div class="quoteText">'
		html = html.replace(/\[引用.+?(aid|time).+?\]/g, startQuote)

		let endQuote = '</div></div>'
		html = html.replace(/\[\/引用\]/g, endQuote)
		return html
	}

	const emoji = html => {
		let smile = '<img alt=":)" src="https://assets.chatwork.com/images/emoticon2x/emo_smile.gif" data-cwtag="SMILE" title="笑っている顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/:\)/g, smile)

		let sad = '<img alt=":(" src="https://assets.chatwork.com/images/emoticon2x/emo_sad.gif" data-cwtag="SAD" title="悲しい顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/:\(/g, sad)

		let moreSmile = '<img alt=":D" src="https://assets.chatwork.com/images/emoticon2x/emo_more_smile.gif" data-cwtag="MORE_SMILE" title="大笑いの顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/:D/g, moreSmile)

		let luckey = '<img alt="8-)" src="https://assets.chatwork.com/images/emoticon2x/emo_lucky.gif" data-cwtag="LUCKY" title="サングラスの笑顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/8-\)/g, luckey)

		let surprise = '<img alt=":o" src="https://assets.chatwork.com/images/emoticon2x/emo_surprise.gif" data-cwtag="SURPRISE" title="驚いた顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/:o/g, surprise)

		let wink = '<img alt=";)" src="https://assets.chatwork.com/images/emoticon2x/emo_wink.gif" data-cwtag="WINK" title="ウィンクの顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/;\)/g, wink)

		let tears = '<img alt=";(" src="https://assets.chatwork.com/images/emoticon2x/emo_tears.gif" data-cwtag="TEARS" title="泣き顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/;\(/g, tears)

		return html
	}

	html = quote(html)
	html = emoji(html)
	return html
}
