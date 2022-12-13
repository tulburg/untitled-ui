import { Container, ELEMENT, P } from "@javascriptui/core";

type TooltipPosition = 'center' | 'bottom-left' | 'bottom-right' | 'top' | 'left' | 'right'

export default class Tooltip extends Container {

  host: ELEMENT;
  hostIndex: string;

  constructor(text: string, config?: {
    supportingText?: string, mode?: 'dark' | 'light', arrow?: boolean
    position?: TooltipPosition
  }) {
    super();

    this.text(text)
      .maxWidth(320).lineHeight(18)
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
      this.position('relative').zIndex('1').pseudo({
        ':before': {
          content: "''", position: 'absolute', zIndex: '-1',
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
    this.hostIndex = <any>host.zIndex();
    this.position('absolute').top(-8).left(0).transform('translateY(-100%)')
      .zIndex('1').display('none');
    this.host = host;

    //MARK: This code can be improved to use offsetTop calculation
    // for components that can't host elements
    const position = <any>this.host.position();
    if (position !== 'absolute' && position !== 'fixed') {
      this.host.position('relative');
    }
    this.host
      .addChild(this.addClassName('tooltip'))
      .pseudo({
        ':hover .tooltip': { display: 'block' },
        ':hover': { zIndex: '10' }
      });
  }
}
