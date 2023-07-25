import { Plugin } from 'obsidian';

export default class Shirr extends Plugin {
	async onload() {
		const root = document.querySelector<HTMLElement>(':root')?.style;
		root?.setProperty('--flagrantior-shirr-width', '100%');
		const sheet = document.styleSheets[0];
		sheet?.insertRule('.markdown-preview-scroller, .cm-scroller {justify-content: center}', sheet.cssRules.length)
		sheet?.insertRule('.markdown-preview-sizer, .cm-sizer {width: var(--flagrantior-shirr-width) !important}', sheet.cssRules.length)
		this.registerDomEvent(document, 'wheel', (evt: MouseEvent) => {	if (evt.altKey) {
			root?.setProperty('--flagrantior-shirr-width',
				Math.max(Math.min(
					(+(root.getPropertyValue('--flagrantior-shirr-width').slice(0, -1))-(<any>evt).deltaY*0.01),
					100), 20).toString()+'%');
		}});
	}
}
