import { Container, Div, H1, P, Span, SVG } from "@javascriptui/core";
import Tooltip from "./tooltip";

export class ProgressBar extends Container {
  bar: Span;
  percent = 0;
  progressText: Span;
  tooltip: Tooltip;
  constructor(percentage?: 'right' | 'bottom-right' | 'tooltip-top' | 'tooltip-bottom') {
    super();

    this.height('auto').width('100%').display('flex');
    if (percentage === 'right') this.alignItems('center').gap(12).height(20);
    if (percentage === 'bottom-right') this.flexDirection('column')
      .alignItems('flex-end').gap(8);

    this.bar = new Span().backgroundColor(Theme.colors.primary600)
      .height('100%').minWidth(8).borderRadius(4).width(this.percent + '%');
    const wrapper = new Container().height(8).backgroundColor(Theme.colors.gray100)
      .borderRadius(4).display('flex').width('100%')
      .addChild(
        this.bar
      );
    this.addChild(wrapper);
    if (percentage && (percentage === 'right' || percentage === 'bottom-right')) {
      this.progressText = new Span().text(this.percent + '%').color(Theme.colors.gray700)
        .fontSize(Theme.fonts.textsm).fontWeight(Theme.weights.medium)
      this.addChild(this.progressText)
    }
    this.tooltip = new Tooltip(this.percent + '%', {
      arrow: true, position: percentage === 'tooltip-top' ? 'center' : 'top'
    });
    this.tooltip.position('absolute');
    if (percentage && (percentage === 'tooltip-top' || percentage === 'tooltip-bottom')) {
      this.position('relative').addChild(this.tooltip);
      if (percentage === 'tooltip-top') this.tooltip.left(this.percent + '%')
        .transform('translate(-50%,-100%)').top(-4)
      if (percentage === 'tooltip-bottom') this.tooltip.left(this.percent + '%')
        .transform('translate(-50%,0%)').top('calc(100% + 4px)')
    }
  }

  progress(perc: number) {
    this.percent = perc;
    this.bar.width(perc + '%');
    if (this.progressText) this.progressText.text(perc + '%');
    if (this.tooltip) this.tooltip.left(this.percent + '%').text(perc + '%');
  }
}


type ProgressCircleSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';

export class ProgressCircle extends Container {

  circle: SVG;
  sliced: boolean;
  progressText: Span;
  percentage: number;

  constructor(progress: number, size: ProgressCircleSize = 'md', caption?: string, slice?: boolean) {
    super();
    this.sliced = slice;
    const dimen = {
      'xxs': 64, 'xs': 160, 'sm': 200, 'md': 240, 'lg': 280
    }
    this.circle = new SVG().attrHeight(dimen[size]).attrWidth(dimen[size])
      .attrViewbox('0 0 160 160').attrPreserveAspectRatio('xMaxYMax');

    this.progressText = new Div().text(progress + '%').fontSize(Theme.fonts.textxs)
      .fontWeight(Theme.weights.medium).color(Theme.colors.gray900)
      .fontSize(
        size !== 'xxs' ? Theme.fonts['display' + size] : Theme.fonts.textsm
      )

    const textWrap = new Container().position('absolute').left('50%').top('50%')
      .transform('translate(-50%, -50%)')
      .addChild(
        this.progressText
      )
    this.display('grid').placeItems('center').height(dimen[size]).width(dimen[size])
      .position('relative')
      .addChild(this.circle, textWrap);
    if (caption) {
      const captionText = new Span().text(caption).fontSize(Theme.fonts.textxs)
        .color(Theme.colors.gray500).fontSize(
          (size !== 'md' && size !== 'lg') ? Theme.fonts.textxs : Theme.fonts.textsm
        );
      if (size !== 'xxs') {
        textWrap.display('flex').flexDirection('column-reverse').alignItems('center')
          .addChild(captionText)
      } else {
        this.addChild(captionText.marginTop(3))
        if (this.sliced) captionText.marginTop('-20%');
      }
    }
    this.progressText.addChild()

  }

  onCreate() {
    const whole = `
    <path d="M80 8C89.4552 8 98.8178 9.86234 107.553 13.4807C116.289 17.099 124.226 22.4025 130.912 29.0883C137.598 35.7741 142.901 43.7114 146.519 52.4468C150.138 61.1822 152 70.5448 152 80C152 89.4552 150.138 98.8178 146.519 107.553C142.901 116.289 137.597 124.226 130.912 130.912C124.226 137.598 116.289 142.901 107.553 146.519C98.8177 150.138 89.4552 152 80 152C70.5448 152 61.1822 150.138 52.4468 146.519C43.7113 142.901 35.7741 137.597 29.0883 130.912C22.4025 124.226 17.099 116.289 13.4807 107.553C9.86233 98.8177 8 89.4551 8 80C8 70.5448 9.86234 61.1822 13.4807 52.4468C17.099 43.7113 22.4025 35.7741 29.0883 29.0883C35.7742 22.4025 43.7114 17.099 52.4468 13.4807C61.1823 9.86232 70.5449 7.99999 80 8L80 8Z" fill="none" stroke="#F2F4F7" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M80 8C89.4552 8 98.8178 9.86234 107.553 13.4807C116.289 17.099 124.226 22.4025 130.912 29.0883C137.598 35.7741 142.901 43.7114 146.519 52.4468C150.138 61.1822 152 70.5448 152 80C152 89.4552 150.138 98.8178 146.519 107.553C142.901 116.289 137.597 124.226 130.912 130.912C124.226 137.598 116.289 142.901 107.553 146.519C98.8177 150.138 89.4552 152 80 152C70.5448 152 61.1822 150.138 52.4468 146.519C43.7113 142.901 35.7741 137.597 29.0883 130.912C22.4025 124.226 17.099 116.289 13.4807 107.553C9.86233 98.8177 8 89.4551 8 80C8 70.5448 9.86234 61.1822 13.4807 52.4468C17.099 43.7113 22.4025 35.7741 29.0883 29.0883C35.7742 22.4025 43.7114 17.099 52.4468 13.4807C61.1823 9.86232 70.5449 7.99999 80 8L80 8Z" fill="none" stroke="#F2F4F7" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
    `
    const sliced = `
    <path d="M152 80C152 70.5448 150.138 61.1822 146.519 52.4468C142.901 43.7114 137.598 35.7741 130.912 29.0883C124.226 22.4025 116.289 17.099 107.553 13.4807C98.8178 9.86234 89.4552 8 80 8C70.5448 7.99999 61.1823 9.86232 52.4468 13.4807C43.7114 17.099 35.7742 22.4025 29.0883 29.0883C22.4025 35.7741 17.099 43.7113 13.4807 52.4468C9.86234 61.1822 8 70.5448 8 80" stroke="#F2F4F7" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M152 80C152 70.5448 150.138 61.1822 146.519 52.4468C142.901 43.7114 137.598 35.7741 130.912 29.0883C124.226 22.4025 116.289 17.099 107.553 13.4807C98.8178 9.86234 89.4552 8 80 8C70.5448 7.99999 61.1823 9.86232 52.4468 13.4807C43.7114 17.099 35.7742 22.4025 29.0883 29.0883C22.4025 35.7741 17.099 43.7113 13.4807 52.4468C9.86234 61.1822 8 70.5448 8 80" stroke="#F2F4F7" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    `;
    this.circle.node().innerHTML = this.sliced ? sliced : whole;
    const pathLength = (<any>this.circle.node().childNodes[1]).getTotalLength();

    this.progressText.text(this.percentage + '%');
    this.circle.global({
      'path:last-child': {
        stroke: Theme.colors.primary600,
        strokeDasharray: pathLength,
        strokeDashoffset: (pathLength - ((this.percentage / 100) * pathLength) * (this.sliced ? -1 : 1)) + ''
      }
    })
  }

  progress(percentage: number) {
    this.percentage = percentage;
  }
}
