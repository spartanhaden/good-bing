// wait for the page to finish loading
window.addEventListener('load', function () {
    // check if we're on the bing.com domain
    if (location.hostname === 'www.bing.com') {
        console.log('bing.com');

        // set a timeout to give up after 10 seconds (10000 milliseconds)
        let timeout = setTimeout(function () {
            console.log('Timeout: cib-background tag not found after 10 seconds.');
            clearInterval(interval);
        }, 10000);

        // set an interval to check for the cib-serp tag every 100 milliseconds
        let interval = setInterval(function () {
            // find the cib-serp tag inside the cib-serp element with mode set to "conversation"
            let cibSerp = document.querySelector('cib-serp[mode="conversation"]');

            // check if it was not found and continue the loop
            if (!cibSerp) {
                console.log('cib-serp tag not found!');
                return;
            }

            console.log('cib-serp tag found!');
            let cibSerpShadowRoot = cibSerp.shadowRoot;

            if (!cibSerpShadowRoot) {
                console.log('cib-serp shadow root not found!');
                return;
            }

            console.log('cib-serp shadow root found!');
            let cibBackground = cibSerpShadowRoot.querySelector('cib-background');
            let cibConversation = cibSerpShadowRoot.querySelector('cib-conversation');

            if (!cibBackground || !cibConversation) {
                console.log('cib-background or cib-conversation not found!');
                return;
            }

            console.log('cib-background and cib-conversation found!');
            let cibBackgroundShadowRoot = cibBackground.shadowRoot;
            let cibConversationShadowRoot = cibConversation.shadowRoot;

            if (!cibBackgroundShadowRoot || !cibConversationShadowRoot) {
                console.log('cib-background shadow root or cib-conversation shadow root not found!');
                return;
            }

            console.log('cib-background shadow root and cib-conversation shadow root found!');
            let div1 = cibBackgroundShadowRoot.querySelector('div:nth-child(1)');
            let div2 = cibBackgroundShadowRoot.querySelector('div:nth-child(2)');
            let fadeTop = cibConversationShadowRoot.querySelector('div.fade.top');
            let fadeBottom = cibConversationShadowRoot.querySelector('div.fade.bottom');

            if (!div1 || !div2 || !fadeTop || !fadeBottom) {
                console.log('div1 or div2 or fadeTop or fadeBottom not found!');
                return;
            }

            // <div class="image" style="background-image: url(https://www.bing.com/cdx/bg-sprite.png); background-position: 0% 0%"></div>
            console.log('div1 and div2 and fadeTop and fadeBottom found!');

            // delete the divs
            div1.remove();
            div2.remove();
            fadeTop.remove();
            fadeBottom.remove();

            // add a video element to the page in place as the background. this is the same video that is used on the bing.com homepage.
            let videoUrl = 'https://prod-streaming-video-msn-com.akamaized.net/35960fe4-724f-44fc-ad77-0b91c55195e4/bfd49cd7-a0c6-467e-ae34-8674779e689b.mp4';
            let mountainVideo = document.createElement('video');
            mountainVideo.setAttribute('class', 'video');
            mountainVideo.setAttribute('loop', '');
            mountainVideo.setAttribute('muted', '');
            mountainVideo.setAttribute('src', videoUrl);
            mountainVideo.setAttribute('style', '');

            // set height and width to 100% and the object-fit to cover the entire page
            mountainVideo.style.height = '100%';
            mountainVideo.style.width = '100%';
            mountainVideo.style.objectFit = 'cover';

            // add the video to the page
            cibBackgroundShadowRoot.appendChild(mountainVideo);

            // mute the video and play it
            mountainVideo.muted = true;
            mountainVideo.play();

            // stop the interval and timeout
            clearInterval(interval);
            clearTimeout(timeout);
        }, 100);
    }
});
