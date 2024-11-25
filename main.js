// https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
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

const root = document.querySelector(':root');
root.style.setProperty('--header-height', '0');

const banner = document.querySelector('div[role="banner"]');
banner.style.display = 'none';

const notificationButton = document.querySelector('a[href="/notifications/"]').parentElement;

waitForElement('div[aria-label="Settings, help and more"').then((element) => {
    const chatMenu = element.parentElement.parentElement;

    chatMenu.appendChild(notificationButton);
    notificationButton.style.marginLeft = '8px';
});