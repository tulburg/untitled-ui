import { Container, ELEMENT, P } from "@javascriptui/core";

type TooltipPosition = 'center' | 'bottom-left' | 'bottom-right' | 'top' | 'left' | 'right'

export default class Tooltip extends Container {

  host: ELEMENT;

  constructor(text: string, config?: {
    supportingText?: string, mode?: 'dark' | 'light', arrow?: boolean
    position?: TooltipPosition
  }) {
    super();

    this.text(text)
      .maxWidth(320)
      .backgroundColor(
        config && config.mode === 'dark'
          ? Theme.colors.gray900
          : Theme.colors.white
      ).color(
        config && config.mode === 'dark'
          ? Theme.colors.white
          : Theme.colors.gray700
      ).padding([8, 12]).borderRadius(8)
      .fontSize(Theme.fonts.textxs).fontWeight(Theme.weights.semibold)
      .boxShadow(Theme.shadows.lg);
    const left = {
      center: 'calc(50% - 6px)',
      'bottom-left': 12,
      'bottom-right': 'calc(100% - 12px - 12px)',
      top: 'calc(50% - 6px)',
      left: -3,
      right: 'calc(100% - 10px)'
    }
    const top = {
      center: 'calc(100% - 10px)',
      'bottom-left': 'calc(100% - 10px)',
      'bottom-right': 'calc(100% - 10px)',
      top: -3,
      left: 'calc(50% - 6px)',
      right: 'calc(50% - 6px)'
    }

    if (config && config.arrow) {
      this.position('relative').pseudo({
        ':before': {
          content: "''", position: 'absolute',
          left: config && config.position ? left[config.position] : left.center,
          top: config && config.position ? top[config.position] : top.center,
          height: 12, width: 12, borderRadius: 1, transform: 'rotate(45deg)',
          boxSizing: 'border-box',
          backgroundColor: config && config.mode === 'dark' ? Theme.colors.gray900 : Theme.colors.white,
          display: 'inline-block'
        }
      })
    }

    if (config.supportingText) {
      this.padding(12).addChild(
        new P().text(config.supportingText).margin(0).fontSize(Theme.fonts.textxs)
          .fontWeight(Theme.weights.regular).marginTop(4)
          .color(config && config.mode === 'dark' ? Theme.colors.white : Theme.colors.gray500)
      )
    }
  }

  attach(host: ELEMENT) {
    this.position('fixed').zIndex('1');
    this.host = host;
    document.body.addEventListener('mouseover', (e: any) => {
      const t = e.target;
      if (host.node() === t || host.node().contains(t)) {
        this.show();
      }
    })
    document.body.addEventListener('mouseout', (e: any) => {
      const t = e.target;
      if (host.node() === t || host.node().contains(t)) {
      } else this.hide();
    })
    this.host.addChild(this)
  }

  show() {
    if (!this.host.node()) throw new Error("Host is not rendered!");
    const hostNode: any = this.host.zIndex('10').node();
    const node: any = this.node();
    const rect = hostNode.getBoundingClientRect();
    const topOffset = rect.top - node.offsetHeight - 4 - 6;
    this.top(topOffset).display('block')
      .left(rect.left);
  }
  hide() {
    this.display('none');
  }
}
