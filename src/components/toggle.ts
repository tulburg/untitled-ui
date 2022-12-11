import { Container, Input, Label, P, Span } from "@javascriptui/core";
import '../theme';

interface ToggleConfig {
  title?: string
  description?: string
  size?: 'sm' | 'md',
  checked?: boolean
}

export default class Toggle extends Container {

  inputField: Input;
  knob: Span;

  constructor(config?: ToggleConfig) {
    super();

    this.knob = new Span().display('block')
      .width(config.size === 'md' ? 20 : 16)
      .height(config.size === 'md' ? 20 : 16)
      .backgroundColor(Theme.colors.white)
      .boxShadow(Theme.shadows.sm).position('absolute')
      .left(config.checked ? 'auto' : 2)
      .right(config.checked ? 2 : 'auto')
      .top(2).borderRadius(config.size === 'md' ? 10 : 8)
      .pointerEvents('none');
    this.inputField = new Input().attrType('checkbox').appearance('none')
      .width(config.size === 'md' ? 40 : 36)
      .height(config.size === 'md' ? 24 : 20)
      .borderRadius(config.size === 'md' ? 12 : 10).border('none')
      .backgroundColor(Theme.colors.gray100)
      .outline('none')
      .pseudo({
        ':hover': { backgroundColor: Theme.colors.gray200 },
        ':active': {
          boxShadow: '0px 0px 0px 4px ' + Theme.colors.primary100,
          backgroundColor: Theme.colors.gray50
        },
        ':disabled': {
          backgroundColor: Theme.colors.gray100
        },
        ':checked': {
          backgroundColor: Theme.colors.primary600
        }
      }).on({
        change: () => this.toggle(),
        create: () => {
          if (config.checked) {
            (<any>this.inputField).node().checked = true;
            this.dispatch('change');
          }
        }
      });

    this.addChild(
      new Container().position('relative').addChild(
        this.knob,
        this.inputField
      )
    );

    if (config && config.title) {
      const titleContainer = new Container()
        .display('flex').flexDirection('column')
        .paddingTop(config.size === 'md' ? 4 : 2);
      titleContainer.addChild(
        new Label().text(config.title).fontSize(Theme.fonts.textsm)
          .fontWeight(Theme.weights.medium)
      )
      if (config.description) {
        titleContainer.addChild(
          new P().text(config.description).color(Theme.colors.gray500)
            .fontSize(Theme.fonts.textsm).margin(0)
        )
      }
      this.display('flex').gap(8).addChild(
        titleContainer
      )
    }
  }

  private toggle() {
    if ((<any>this.inputField).node().checked) {
      this.knob.left('auto').right(2);
    } else {
      this.knob.left(2).right('auto');
    }
  }

  check(toggle: boolean) {
    if (!(<any>this.check).node()) {
      throw "Check can't be called because ELEMENT has not render"
    }
    if (toggle) {
      this.inputField.attrChecked('checked');
    } else {
      this.inputField.attrChecked(undefined);
    }
    this.toggle();
  }

  disable(toggle: boolean) {
    if (toggle) {
      this.knob.backgroundColor(Theme.colors.gray50);
      this.inputField.attrDisabled('disabled').pseudo({
        ':active': { boxShadow: 'none', backgroundColor: Theme.colors.gray100 }
      });
    } else {
      this.knob.backgroundColor(Theme.colors.white);
      this.inputField.attrDisabled(undefined).pseudo({
        ':active': {
          boxShadow: '0px 0px 0px 4px ' + Theme.colors.primary100,
          backgroundColor: Theme.colors.gray50
        }
      });
    }
  }
}
