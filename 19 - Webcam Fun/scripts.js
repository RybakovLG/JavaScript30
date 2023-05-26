const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const canvasCtx = canvas.getContext('2d')
navigator.mediaDevices
    .getUserMedia({video: {width: 1280, height: 720}, audio: false})
    .then((stream) => {
        video.srcObject = stream;
        video.play();
    })
    .catch((err) => {
        console.error(`An error occurred: ${err}`);
    });

const processFrame = () => {
    const {videoWidth: width, videoHeight: height} = video;

    if (width && height) {
        canvas.width = width;
        canvas.height = height;
        canvasCtx.drawImage(video, 0, 0, width, height);

        const pixels = canvasCtx.getImageData(0, 0, width, height)

        canvasCtx.putImageData(greenScreen(pixels), 0, 0)
    }

    window.requestAnimationFrame(processFrame);
};

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i += 4) {
        const red = pixels.data[i + 0];
        const green = pixels.data[i + 1];
        const blue = pixels.data[i + 2];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}


video.addEventListener('canplay', processFrame)


function takePhoto() {
    window.requestAnimationFrame(() => {
            snap.currentTime = 0
            snap.play()

            canvasCtx.drawImage(video, 0, 0,);

            const data = canvas.toDataURL("image/png");
            const img = document.createElement('img')
            img.setAttribute('src', data)

            strip.append(img)
        }
    )
}
