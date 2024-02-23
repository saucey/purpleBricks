// .storybook/preview.js

// Add global styles or external CSS links
const cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.href = 'https://unpkg.com/wmn-design-system@2.4.0/build/css/wmnds.min.css';
document.head.appendChild(cssLink);

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

// Add the script
const script = document.createElement('script');
script.innerHTML = `
  const ajax = new XMLHttpRequest();
  ajax.open('GET', 'https://unpkg.com/wmn-design-system@2.4.0/build/img/wmnds-icons.min.svg', true);
  ajax.send();
  ajax.onload = function () {
    const div = document.createElement('div');
    div.style.display = 'none';
    div.innerHTML = ajax.responseText;
    document.body.insertBefore(div, document.body.childNodes[0]);
  };
`;
document.body.appendChild(script);