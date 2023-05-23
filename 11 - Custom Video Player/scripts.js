// <div class="player">
//      <video class="player__video viewer" src="652333414.mp4"></video>
//
//      <div class="player__controls">
//        <div class="progress">
//         <div class="progress__filled"></div>
//        </div>
//        <button class="player__button toggle" title="Toggle Play">►</button>
//        <input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
//        <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
//        <button data-skip="-10" class="player__button">« 10s</button>
//        <button data-skip="25" class="player__button">25s »</button>
//      </div>
//    </div>

const [[player], [progressFilled], [progress], [toggle], [volume], [playbackRate], skipBtns] =
    [
        '.player__video',
        '.progress__filled',
        '.progress',
        '.toggle',
        'input[name="volume"]',
        'input[name="playbackRate"]',
        '.player__button[data-skip]',
    ].map(sel => document.querySelectorAll(sel));


//currentTime
//duration
//volume
//playbackRate
//play()
//pause()
[player, toggle].forEach(el => {
    el.addEventListener('click', () => {
        player[player.paused ? 'play' : 'pause']()
        toggle.innerHTML = player.paused ? '⏵' : '⏹'
    });
});

player.addEventListener('timeupdate', () => {
    progressFilled.style.flexBasis = `${player.currentTime / player.duration * 100}%`
});

player.addEventListener('ended', () => {
    toggle.innerHTML = '⏵'
})

progress.addEventListener('click', ev => {
    console.dir(ev)
    player.currentTime = ev.offsetX / ev.target.clientWidth * player.duration
});

[volume, playbackRate].forEach(el => {
    el.addEventListener('input', ({target}) => {
        player[target.name] = target.value
    });
});

skipBtns.forEach(btn => {
    btn.addEventListener('click', ({target}) => {
        player.currentTime += +target.dataset.skip
    })
})
