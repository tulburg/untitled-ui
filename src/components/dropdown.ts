import { Container, ELEMENT, EM, IMG, Input as DefaultInput, Label, Span } from "@javascriptui/core";
import theme from "../theme";

export interface DropDownConfig {
  options: DropDownOption[]
  type?: 'shortcut' | 'checkbox' | 'radio'
  multiselect?: boolean
}

const checkIcon = 'icon-check';

export interface DropDownOption {
  key: string
  value: string
  icon?: string
  suffix?: string
  image?: string
  command?: string
  endGroup?: boolean // if end group is set, a separator is added after this item
}

export default class DropDown extends Container {

  config: DropDownConfig;
  selectionListeners: ((item: DropDownOption) => void)[] = [];
  isShowing: boolean;

  constructor(config: DropDownConfig) {
    super();

    this.config = config;

    this.backgroundColor(Theme.colors.white)
      .width(config.type !== 'shortcut' ? 320 : 240)
      .maxHeight(320).overflowY('scroll');

    if (config.type !== 'shortcut') {
      this.border('1px solid ' + Theme.colors.gray100)
        .borderRadius(8).boxShadow(Theme.shadows.lg)
    }
    const self = this;
    let lastSelected: DropDownItem;
    this.addChild(
      ...config.options.map(item => new DropDownItem(item, config).on({
        selected() {
          if (!self.config.multiselect) {
            if (lastSelected && lastSelected !== this) lastSelected.select(false);
          }
          self.selectionListeners.forEach(listener => listener(item));
          lastSelected = this;
        }
      }))
    )
  }

  onSelect(listener: (item: DropDownOption) => void) {
    this.selectionListeners.push(listener);
  }

  show() {
    this.display('block');
    this.isShowing = true;
  }

  hide() {
    this.isShowing = false;
    this.display('none');
  }

  toggle(listener?: (toogle: boolean) => void) {
    if (this.isShowing) {
      this.hide();
    } else {
      this.show();
    }
    if (listener) listener(this.isShowing);
  }

  disable(index: number, toggle: boolean) {
    (this.children()[index] as DropDownItem).disable(toggle);
  }

}

export class DropDownItem extends Container {
  label: Label;
  radioCheck: DefaultInput;
  subtext: Span;
  shortcut: Span;
  icon: Span;
  image: IMG;
  command: Span;
  config: DropDownConfig;
  check: EM;
  isSelected = false;
  isDisabled = false;

  constructor(item: DropDownOption, config: DropDownConfig) {
    super();
    this.config = config;
    this.display('flex').alignItems('center')
      .gap(8).height(40).boxSizing('border-box').padding([10, 14])
      .cursor('pointer')
      .pseudo({
        ':hover': { backgroundColor: Theme.colors.gray50 },
        ':disabled': { color: Theme.colors.gray200 }
      }).on({
        click: () => {
          if (this.isDisabled) return;
          if (!this.isSelected) {
            this.select(true);
            this.isSelected = true;
          } else {
            this.select(false);
            this.isSelected = false;
          }
        }
      });

    if (item.icon) {
      this.icon = new EM().addClassName(item.icon)
        .fontSize(16).color(theme.colors.gray700)
      this.addChild(this.icon)
    }

    if (config.type === 'checkbox' || config.type === 'radio') {
      this.radioCheck = new DefaultInput();
      this.addChild(
        this.radioCheck.attrType(config.type)
          .appearance('none').border(
            (config.type === 'checkbox' ? 1 : 1.5) + 'px solid ' + (
              config.type === 'checkbox' ? Theme.colors.gray300 : Theme.colors.gray700
            )
          ).backgroundColor(Theme.colors.white).height(16).width(16)
          .borderRadius(config.type === 'checkbox' ? 4 : 8)
          .cursor('pointer')
      )
      if (config.type === 'checkbox') {
        this.radioCheck.pseudo({
          ':active': {
            borderColor: Theme.colors.primary300, boxShadow: '0px 0px 0px 4px ' + Theme.colors.primary100
          }
        });
        this.pseudo({
          ':hover input[type="checkbox"]': {
            borderColor: Theme.colors.primary300
          }
        })
      }
    }

    if (item.image) {
      this.image = new IMG().attrSrc(item.image).attrAlt(item.key)
        .height(24).width(24).borderRadius(12)
      this.addChild(this.image)
    }

    this.label = new Label().text(item.key)
      .fontSize(Theme.fonts.textmd).color(Theme.colors.gray900)
      .fontWeight(Theme.weights.medium)
    this.label.tag(item.value);

    const labelContainer = new Container().display('flex').alignItems('center')
      .gap(8).flexGrow('1').addChild(this.label);

    if (item.suffix) {
      this.subtext = new Span().text(item.suffix).color(Theme.colors.gray500)
        .fontWeight(Theme.weights.regular)
      labelContainer.addChild(this.subtext)
    }

    this.addChild(labelContainer);

    if (item.command) {
      this.command = new Span().text(item.command).fontWeight(Theme.weights.regular)
        .fontSize(Theme.fonts.textxs).color(Theme.colors.gray500)
      this.addChild(this.command);
    }

    this.check = new EM().addClassName(checkIcon).fontSize(20)
      .color(Theme.colors.primary600).display('none')

    this.addChild(this.check);

    if (item.endGroup) {
      this.borderBottom('1px solid ' + Theme.colors.gray100);
    }
  }

  select(toggle: boolean) {
    this.isSelected = toggle;
    if (toggle) {
      this.backgroundColor(Theme.colors.gray50);
      this.check.display('inline');
      this.dispatch('selected');
    } else {
      this.backgroundColor(Theme.colors.white);
      this.check.display('none');
    }
  }

  disable(toggle: boolean) {
    this.isDisabled = toggle;
    if (toggle) {
      this.backgroundColor(Theme.colors.white).cursor('default');
      if (this.command) this.command.color(Theme.colors.gray200);
      [this.radioCheck, this.icon].forEach(check => {
        if (check) check.backgroundColor(Theme.colors.gray100)
          .borderColor(Theme.colors.gray200);
      });
      if (this.image) this.image.opacity('0.3')
      this.label.color(Theme.colors.gray200);
      if (this.subtext) this.subtext.color(Theme.colors.gray200);
      this.pseudo({
        ':hover': { backgroundColor: Theme.colors.white }
      });
      if (this.config.type == 'checkbox') {
        this.pseudo({
          ':hover input[type="checkbox"]': {
            borderColor: Theme.colors.gray200
          }
        })
      }
    }
  }
}
