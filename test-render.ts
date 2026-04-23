import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

const nav = { userAgent: 'node' };
globalThis.window = { navigator: nav, addEventListener: () => {}, removeEventListener: () => {}, matchMedia: () => ({ matches: false, addListener: () => {}, removeListener: () => {} }) } as any;
globalThis.document = { body: { classList: { add: () => {}, remove: () => {} } }, createElement: () => ({ style: {} }) } as any;

Object.defineProperty(globalThis, 'navigator', {
  value: nav,
  writable: true
});

async function run() {
  try {
    const { default: App } = await import('./src/App.tsx');
    renderToString(createElement(App));
    console.log('SUCCESS: Rendered properly.');
  } catch (error) {
    console.error('ERROR during render:', error);
  }
}

run();
