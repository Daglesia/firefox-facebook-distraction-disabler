// https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(_mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

const style = document.createElement('style');

// https://stackoverflow.com/questions/51050533/injecting-css-like-html-through-javascript-into-the-dom
style.appendChild(document.createTextNode(`
    :root, .__fb-dark-mode {
        --header-height: 0;
        }

    @media (prefers-color-scheme: dark) {
        :root, .__fb-dark-mode {
            --header-height: 0;
        }

    div[role="banner"] {
        display: none;
    }
  `
));

const head = document.getElementsByTagName('head')[0];
head.appendChild(style);

waitForElement('a[href="/notifications/"]').then(element => {
    const notificationButton = element.parentElement;

    waitForElement('div[aria-label="Settings, help and more"').then((element) => {
        const chatMenu = element.parentElement.parentElement;

        chatMenu.appendChild(notificationButton);
        notificationButton.style.marginLeft = '8px';
    });
});