import { Plugin } from 'obsidian';

export default class Corset extends Plugin {
	async onload() {
		const root = document.querySelector<HTMLElement>(':root')?.style;
		root?.setProperty('--flagrantior-corset-width', '100%');
		const sheet = document.styleSheets[0];
		sheet?.insertRule('.markdown-preview-scroller, .cm-scroller {justify-content: center}', sheet.cssRules.length)
		sheet?.insertRule('.markdown-preview-sizer, .cm-sizer {width: var(--flagrantior-corset-width) !important}', sheet.cssRules.length)
		this.registerDomEvent(document, 'wheel', (evt: MouseEvent) => {	if (evt.altKey) {
			root?.setProperty('--flagrantior-corset-width',
				Math.max(Math.min(
					(+(root.getPropertyValue('--flagrantior-corset-width').slice(0, -1))-(<any>evt).deltaY*0.01),
					100), 20).toString()+'%');
		}});
	}
}
