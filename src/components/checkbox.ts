import { Container, EM, Input, Label, P, Span } from "@javascriptui/core";
import '../theme';

const tickIcon = 'icon-check';
const minusIcon = 'icon-minus';

interface CheckboxConfig {
  title?: string
  description?: string
  size?: 'sm' | 'md'
  checked?: boolean
  indeterminate?: boolean
  type: 'checkbox' | 'radio'
}

export default class Checkbox extends Container {

  inputField: Input;
  checkMark: EM;

  constructor(config?: CheckboxConfig) {
    super();

    this.checkMark = new EM()
      .addClassName(config.indeterminate ? minusIcon : tickIcon)
      .fontSize(config && config.size === 'md' ? 14 : 12)
      .color(Theme.colors.primary600)
      .display((config.indeterminate || config.checked) ? 'inline' : 'none')
      .pointerEvents('none').position('absolute')
      .left(config && config.size === 'md' ? 3 : 2)
      .top(config && config.size === 'md' ? 3 : 2);
    if (config.type === 'radio') {
      this.checkMark = new Span()
        .position('absolute').backgroundColor(Theme.colors.primary600)
        .display('none')
        .width(config.size === 'md' ? 8 : 6)
        .height(config.size === 'md' ? 8 : 6)
        .borderRadius(4)
        .left(config && config.size === 'md' ? 6 : 5)
        .top(config && config.size === 'md' ? 6 : 5);
    }

    this.inputField = new Input().attrType(
      config && config.type === 'radio' ? 'radio' : 'checkbox'
    ).appearance('none').border('1px solid ' + Theme.colors.gray300)
      .backgroundColor(
        config.type == 'radio' ? Theme.colors.primary50 : Theme.colors.white
      ).width(config.size === 'md' ? 20 : 16)
      .height(config.size === 'md' ? 20 : 16)
      .borderRadius(config && config.type === 'radio' ? 10 : 4)
      .cursor('pointer');

    this.inputField.pseudo({
      ':hover': {
        borderColor: Theme.colors.primary600
      },
      ':active': {
        borderColor: Theme.colors.primary300,
        boxShadow: '0px 0px 0px 4px ' + Theme.colors.primary100
      },
      ':checked': {
        borderColor: Theme.colors.primary600
      },
      ':disabled': {
        borderColor: Theme.colors.gray200,
        backgroundColor: Theme.colors.gray100
      },
      ':disabled em': {
        color: Theme.colors.gray200
      }
    });

    if (config.type === 'checkbox') {
      this.inputField.pseudo({
        ':indeterminate': {
          borderColor: Theme.colors.primary600
        }
      })
    }

    this.inputField.on({
      change: () => this.toggle(),
      create: () => {
        if (config && config.checked) {
          (<any>this.inputField).node().checked = true;
          this.dispatch('change');
        }
        if (config && config.indeterminate) {
          (<any>this.inputField).node().checked = true;
          this.dispatch('change');
        }
      }
    });

    this.addChild(
      new Container().position('relative').addChild(
        this.checkMark,
        this.inputField
      )
    );

    if (config && config.title) {
      const titleContainer = new Container()
        .display('flex').flexDirection('column')
        .paddingTop(config.size === 'md' ? 2 : 0);
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
      this.checkMark.display('inline');
    } else {
      this.checkMark.display('none');
    }
  }

  check(toggle: boolean) {
    if (!(<any>this.checkMark).node()) {
      throw "Check can't be called because ELEMENT has not render"
    }
    if (toggle) {
      this.inputField.attrChecked('checked');
    } else {
      this.inputField.attrChecked(undefined);
    }
    this.toggle();
  }

  indeterminate(toggle: boolean) {
    if (!(<any>this.checkMark).node()) {
      throw "Indeterminate can't be called because ELEMENT has not render"
    }
    if (toggle) {
      (<any>this.checkMark.node()).indeterminate = true;
      this.checkMark.removeClassName(tickIcon).addClassName(minusIcon);
      this.checkMark.display('inline');
    } else {
      (<any>this.checkMark.node()).indeterminate = false;
      this.checkMark.removeClassName(minusIcon).addClassName(tickIcon);
      this.checkMark.display('none');
    }
  }

  disable(toggle: boolean) {
    if (toggle) {
      this.checkMark.color(Theme.colors.gray200);
      this.inputField.attrDisabled('disabled')
        .pseudo({
          ':active': {
            boxShadow: 'none',
            backgroundColor: Theme.colors.gray100,
          }
        });
    } else {
      this.checkMark.color(Theme.colors.primary600);
      this.inputField.attrDisabled(undefined).pseudo({
        ':active': {
          boxShadow: '0px 0px 0px 4px ' + Theme.colors.primary100,
          backgroundColor: Theme.colors.white,
        }
      });
    }
  }
}
