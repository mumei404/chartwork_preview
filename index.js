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
		let grin = '<img alt="]:)" src="https://assets.chatwork.com/images/emoticon2x/emo_grin.gif" data-cwtag="GRIN" title="不敵な笑顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\]:\)/g, grin)

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

		let wrySmile = '<img alt="(^^;)" src="https://assets.chatwork.com/images/emoticon2x/emo_wry_smile.gif" data-cwtag="WRY_SMILE" title="汗をかいた笑顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(\^\^;\)/g, wrySmile)

		let wink = '<img alt=";)" src="https://assets.chatwork.com/images/emoticon2x/emo_wink.gif" data-cwtag="WINK" title="ウィンクの顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/;\)/g, wink)

		let tears = '<img alt=";(" src="https://assets.chatwork.com/images/emoticon2x/emo_tears.gif" data-cwtag="TEARS" title="泣き顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/;\(/g, tears)

		let sweat = '<img alt="(sweat)" src="https://assets.chatwork.com/images/emoticon2x/emo_sweat.gif" data-cwtag="SWEAT" title="冷や汗の顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(sweat\)/g, sweat)

		let mumu = '<img alt=":|" src="https://assets.chatwork.com/images/emoticon2x/emo_mumu.gif" data-cwtag="MUMU" title="黙っている顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/:\|/g, mumu)

		let kiss = '<img alt=":*" src="https://assets.chatwork.com/images/emoticon2x/emo_kiss.gif" data-cwtag="KISS" title="キスの顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/:\*/g, kiss)

		let tongueout = '<img alt=":p" src="https://assets.chatwork.com/images/emoticon2x/emo_tongueout.gif" data-cwtag="TONGUEOUT" title="舌を出した顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/:p/g, tongueout)

		let blush = '<img alt="(blush)" src="https://assets.chatwork.com/images/emoticon2x/emo_blush.gif" data-cwtag="BLUSH" title="頬を赤らめる顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(blush\)/g, blush)

		let wonder = '<img alt=":^)" src="https://assets.chatwork.com/images/emoticon2x/emo_wonder.gif" data-cwtag="WONDER" title="眉をひそめる顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/:\^\)/g, wonder)

		let snooze = '<img alt="|-)" src="https://assets.chatwork.com/images/emoticon2x/emo_snooze.gif" data-cwtag="SNOOZE" title="寝てる顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\|-\)/g, snooze)

		let love = '<img alt="(inlove)" src="https://assets.chatwork.com/images/emoticon2x/emo_love.gif" data-cwtag="LOVE" title="ハートの笑顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(inlove\)/g, love)


		let talk = '<img alt="(talk)" src="https://assets.chatwork.com/images/emoticon2x/emo_talk.gif" data-cwtag="TALK" title="お喋りしてる顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(talk\)/g, talk)

		let yawn = '<img alt="(yawn)" src="https://assets.chatwork.com/images/emoticon2x/emo_yawn.gif" data-cwtag="YAWN" title="眠い顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(yawn\)/g, yawn)

		let puke = '<img alt="(puke)" src="https://assets.chatwork.com/images/emoticon2x/emo_puke.gif" data-cwtag="PUKE" title="嘔吐の顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(puke\)/g, puke)

		let emo = '<img alt="(emo)" src="https://assets.chatwork.com/images/emoticon2x/emo_ikemen.gif" data-cwtag="IKEMEN" title="髪をかきあげる顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(emo\)/g, emo)

		let otaku = '<img alt="8-|" src="https://assets.chatwork.com/images/emoticon2x/emo_otaku.gif" data-cwtag="OTAKU" title="メガネをかけている顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/8-\|/g, otaku)

		let ninmari = '<img alt=":#)" src="https://assets.chatwork.com/images/emoticon2x/emo_ninmari.gif" data-cwtag="NINMARI" title="ニヤニヤした笑顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/:#\)/g, ninmari)

		let nod = '<img alt="(nod)" src="https://assets.chatwork.com/images/emoticon2x/emo_nod.gif" data-cwtag="NOD" title="頷く顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(nod\)/g, nod)

		let shake = '<img alt="(shake)" src="https://assets.chatwork.com/images/emoticon2x/emo_shake.gif" data-cwtag="SHAKE" title="首を横に振る顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(shake\)/g, shake)

		let whew = '<img alt="(whew)" src="https://assets.chatwork.com/images/emoticon2x/emo_whew.gif" data-cwtag="WHEW" title="汗を拭う顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(whew\)/g, whew)

		let clap = '<img alt="(clap)" src="https://assets.chatwork.com/images/emoticon2x/emo_clap.gif" data-cwtag="CLAP" title="拍手する人" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(clap\)/g, clap)

		let bow = '<img alt="(bow)" src="https://assets.chatwork.com/images/emoticon2x/emo_bow.gif" data-cwtag="BOW" title="おじぎする人" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(bow\)/g, bow)

		let roger = '<img alt="(roger)" src="https://assets.chatwork.com/images/emoticon2x/emo_roger.gif" data-cwtag="ROGER" title="了解する人" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(roger\)/g, roger)

		let flex = '<img alt="(flex)" src="https://assets.chatwork.com/images/emoticon2x/emo_muscle.gif" data-cwtag="MUSCLE" title="力こぶを作る人" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(flex\)/g, flex)

		let dance = '<img alt="(dance)" src="https://assets.chatwork.com/images/emoticon2x/emo_dance.gif" data-cwtag="DANCE" title="è¸る人" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(dance\)/g, dance)

		let komanechi = '<img alt="(:/)" src="https://assets.chatwork.com/images/emoticon2x/emo_komanechi.gif" data-cwtag="KOMANECHI" title="ひょうきんな顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(:\/\)/g, komanechi)

		let gogo = '<img alt="(gogo)" src="https://assets.chatwork.com/images/emoticon2x/emo_gogo.gif" data-cwtag="GOGO" title="こぶしを掲げる人" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(gogo\)/g, gogo)

		let think = '<img alt="(think)" src="https://assets.chatwork.com/images/emoticon2x/emo_think.gif" data-cwtag="THINK" title="考えている顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(think\)/g, think)

		let please = '<img alt="(please)" src="https://assets.chatwork.com/images/emoticon2x/emo_please.gif" data-cwtag="PLEASE" title="お願いする人" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(please\)/g, please)

		let quick = '<img alt="(quick)" src="https://assets.chatwork.com/images/emoticon2x/emo_quick.gif" data-cwtag="QUICK" title="急いでいる人" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(quick\)/g, quick)

		let anger = '<img alt="(anger)" src="https://assets.chatwork.com/images/emoticon2x/emo_anger.gif" data-cwtag="ANGER" title="怒っている顔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(anger\)/g, anger)

		let devil = '<img alt="(devil)" src="https://assets.chatwork.com/images/emoticon2x/emo_devil.gif" data-cwtag="DEVIL" title="笑顔の悪魔" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(devil\)/g, devil)

		let lightbulb = '<img alt="(lightbulb)" src="https://assets.chatwork.com/images/emoticon2x/emo_lightbulb.gif" data-cwtag="LIGHTBULB" title="電球" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(lightbulb\)/g, lightbulb)

		let star = '<img alt="(*)" src="https://assets.chatwork.com/images/emoticon2x/emo_star.gif" data-cwtag="STAR" title="星" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(\*\)/g, star)

		let heart = '<img alt="(h)" src="https://assets.chatwork.com/images/emoticon2x/emo_heart.gif" data-cwtag="HEART" title="ふるえるハート" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(h\)/g, heart)

		let flower = '<img alt="(F)" src="https://assets.chatwork.com/images/emoticon2x/emo_flower.gif" data-cwtag="FLOWER" title="開花" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(F\)/g, flower)

		let cracker = '<img alt="(cracker)" src="https://assets.chatwork.com/images/emoticon2x/emo_cracker.gif" data-cwtag="CRACKER" title="クラッカー" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(cracker\)/g, cracker)

		let eat = '<img alt="(eat)" src="https://assets.chatwork.com/images/emoticon2x/emo_eat.gif" data-cwtag="EAT" title="食事" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(eat\)/g, eat)

		let cake = '<img alt="(^)" src="https://assets.chatwork.com/images/emoticon2x/emo_cake.gif" data-cwtag="CAKE" title="ã±ーキ" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(\^\)/g, cake)

		let coffee = '<img alt="(coffee)" src="https://assets.chatwork.com/images/emoticon2x/emo_coffee.gif" data-cwtag="COFFEE" title="コーヒー" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(coffee\)/g, coffee)

		let beer = '<img alt="(beer)" src="https://assets.chatwork.com/images/emoticon2x/emo_beer.gif" data-cwtag="BEER" title="ビール" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(beer\)/g, beer)

		let handshake = '<img alt="(handshake)" src="https://assets.chatwork.com/images/emoticon2x/emo_handshake.gif" data-cwtag="HANDSHAKE" title="握手する手" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(handshake\)/g, handshake)

		let yes = '<img alt="(y)" src="https://assets.chatwork.com/images/emoticon2x/emo_yes.gif" data-cwtag="YES" title="親指を上げた手" class="sc-iQtOjA kvmypc">'
		html = html.replace(/\(y\)/g, yes)

		return html
	}

	html = quote(html)
	html = emoji(html)
	return html
}
