import { Container, Span, Style } from "@javascriptui/core";
import Tooltip from "./tooltip";

export default class Slider extends Container {

  range: Span;
  leftKnob: Span;
  rightKnob: Span;

  leftIndicator: Span;
  leftPercentage = 0;
  rightIndicator: Span;
  rightPercentage = 40;

  constructor(percentage?: 'plain' | 'tooltip-top' | 'tooltip-bottom') {
    super();

    this.range = new Span().backgroundColor(Theme.colors.primary600).height('100%')
      .width(this.rightPercentage + '%').display('flex').borderRadius(4).position('relative');
    const knobStyle = new Style({
      height: 24, width: 24, borderRadius: 12, backgroundColor: Theme.colors.white,
      border: '1px solid ' + Theme.colors.primary600, cursor: 'pointer',
      position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
      boxShadow: Theme.shadows.md, boxSizing: 'border-box', userSelect: 'none'
    })
    this.leftKnob = new Span().style(knobStyle);
    this.rightKnob = new Span().style(knobStyle);

    this.rightPercentage = this.rightPercentage;
    this.leftIndicator = new Span().text(this.leftPercentage + '%');
    this.rightIndicator = new Span().text(this.rightPercentage + '%');

    if (percentage && percentage === 'plain') {
      this.leftIndicator = new Span().text(this.leftPercentage + '%');
      this.rightIndicator = new Span().text(this.rightPercentage + '%');
      this.leftKnob.addChild(this.leftIndicator);
      this.rightKnob.addChild(this.rightIndicator);
    }
    [this.leftIndicator, this.rightIndicator].forEach(indicator => {
      indicator.position('absolute')
        .top('calc(100% + 8px)').left(0).color(Theme.colors.gray900)
        .fontSize(Theme.fonts.textmd).fontWeight(Theme.weights.medium)
    });
    let tooltipStyle = new Style({
      position: 'absolute', top: -(8 + 6), transform: 'translate(calc(-50% + 12px), -100%)',
      width: 'fit-content', left: 0
    })
    if (percentage && (percentage === 'tooltip-top' || percentage === 'tooltip-bottom')) {
      this.leftIndicator = new Tooltip(this.leftPercentage + '%', {
        position: percentage === 'tooltip-top' ? 'center' : 'top', arrow: true
      }).style(tooltipStyle);

      this.rightIndicator = new Tooltip(this.rightPercentage + '%', {
        position: percentage === 'tooltip-top' ? 'center' : 'top', arrow: true
      }).style(tooltipStyle);

      if (percentage === 'tooltip-bottom') {
        [this.leftIndicator, this.rightIndicator].forEach(indicator => {
          indicator.top('calc(100% + 8px + 6px)').transform('translate(calc(-50% + 12px), 0%)')
        })
      }

      this.leftKnob.addChild(this.leftIndicator);
      this.rightKnob.addChild(this.rightIndicator);
    }

    let leftDragging = false;
    let leftOffset = 0, left = 0, leftValue = 0;
    let rightDragging = false;
    let rightOffset = 0, right = 0, rightValue = 0;
    let bigWidth = 0;
    this.on({
      create: () => {
        bigWidth = (<any>this.node()).offsetWidth;
        rightValue = ((this.rightPercentage / 100) * bigWidth) - 12;
        this.rightKnob.left(rightValue);
      }
    });
    document.addEventListener('mouseup', () => {
      leftDragging = false;
      rightDragging = false;
    });

    document.addEventListener('mousemove', (e) => {
      if (leftDragging) {
        leftValue = Math.max(-12, (left + e.clientX - leftOffset));
        this.leftKnob.left(Math.min(leftValue, rightValue - 24));
        update(Math.min(leftValue, rightValue - 24) + 12, undefined);
      }
      if (rightDragging) {
        rightValue = Math.min(bigWidth - 12, (right + e.clientX - rightOffset));
        this.rightKnob.left(Math.max(rightValue, leftValue + 24));
        update(undefined, Math.max(rightValue, leftValue + 24) + 12);
      }
    })

    let lastLeft = 0; let lastWidth = 0;
    const update = (xleft: number, xright: number) => {
      if (xleft) {
        this.range.left(xleft).width(lastWidth - xleft)
        lastLeft = xleft;
        this.leftPercentage = Math.floor((xleft / bigWidth) * 100);
        this.leftIndicator.text(this.leftPercentage + '%');
      }
      if (xright) {
        this.range.width(xright - lastLeft);
        lastWidth = xright;
        this.rightPercentage = Math.floor((xright / bigWidth) * 100);
        this.rightIndicator.text(this.rightPercentage + '%');
      }
    }
    this.leftKnob.on({
      mousedown: () => {
        leftDragging = true;
        leftOffset = (<any>this.leftKnob).node().getBoundingClientRect().left + 12;
        left = <any>this.leftKnob.left() || leftValue
      },
      mouseup: () => {
        leftDragging = false
        leftOffset = 0;
      }
    });

    this.rightKnob.on({
      mousedown: () => {
        rightDragging = true;
        rightOffset = (<any>this.rightKnob).node().getBoundingClientRect().left + 12;
        right = <any>this.rightKnob.left() || rightValue
      },
      mouseup: () => {
        rightDragging = false
        rightOffset = 0;
      }
    });

    this.height(24).addChild(
      new Container().position('relative').height(8)
        .backgroundColor(Theme.colors.gray200).borderRadius(4)
        .addChild(
          this.range, this.leftKnob, this.rightKnob
        )
    )
  }
}
