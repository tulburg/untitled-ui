import { Container, EM, IMG, Input as DefaultInput, Label, Option, P, Select, Span, Textarea } from "@javascriptui/core";
import Theme from '../theme';
import DropDown, { DropDownItem, DropDownOption } from "./dropdown";

const errorIcon = 'icon-alert-circle';
const dropDownArrow = 'icon-chevron-down';
const helpIcon = 'icon-help-circle';

export interface InputConfig {
  placeholder: string
  type: 'text' | 'password' | 'textarea' | 'select' | 'autocomplete'
  label?: string
  hint?: string
  error?: string
  icon?: string
  image?: string
  help?: string
  leadingText?: string
  dropdown?: {
    options: DropDownOption[]
    trailing?: boolean
  }
  link?: boolean
  disabled?: boolean
}

export default class Input extends Container {

  inputField: DefaultInput
  wrapper: Container;
  icon: EM;
  hint: Span;
  config: InputConfig;
  errorIcon: EM;
  helpIcon: EM;
  main: Container;
  dropDown: DropDown;
  caret: EM;
  selectedContainer: Container;

  constructor(config: InputConfig) {
    super();

    this.config = config;

    if (config.type !== 'textarea') {
      this.inputField = new DefaultInput().height(24).attrType(config.type)
    } else {
      this.inputField = new Textarea().height(108).resize('none')
    }

    this.inputField.border(0).fontSize(Theme.fonts.textmd)
      .backgroundColor(Theme.colors.transparent)
      .color(Theme.colors.gray900).attrPlaceholder(config.placeholder)
      .marginTop(-2).outline('none').flexGrow('1')
      .pseudo({
        '::placeholder': { color: Theme.colors.gray500 }
      }).on({
        focus: () => this.onFocus(),
        blur: () => this.onBlur()
      });

    const createDropDown = () => {
      this.dropDown = new DropDown({
        options: config.dropdown.options
      }).position('absolute').top('calc(100% + 8px)')
        .left(-2).width('calc(100% + 2px)')
        .display('none') as DropDown;

      this.wrapper.position('relative').addChild(
        this.dropDown
      );
    }

    const getDropdown = () => {
      this.caret = new EM().addClassName(dropDownArrow).fontSize(20)
        .color(Theme.colors.gray500);
      const selectValue = new Span().text(config.dropdown.options[0].key)
        .fontSize(Theme.fonts.textmd).color(Theme.colors.gray900);
      const menu = new Container()
        .display('flex').alignItems('center').gap(4)
        .cursor('pointer')
        .addChild(selectValue, this.caret);
      createDropDown();
      const toggle = (showing: boolean) => {
        this.caret.transform(!showing ? 'rotate(0deg)' : 'rotate(-180deg)')
      };
      this.dropDown.onSelect(item => {
        selectValue.text(item.key);
        this.dropDown.toggle(value => toggle(value));
      });
      menu.on({
        click: () => this.dropDown.toggle(value => toggle(value))
      })

      return menu
    }
    this.main = new Container();

    this.display('flex').flexDirection('column').gap(6);

    this.wrapper = new Container().height(config.type !== 'textarea' ? 44 : 'auto')
      .borderRadius(8).border('1px solid ' + Theme.colors.gray300)
      .backgroundColor(Theme.colors.white).padding([10, 14]).boxSizing('border-box')
      .display('flex').gap(8).alignItems(
        config.type !== 'textarea' ? 'center' : 'start'
      );

    this.icon = new EM().addClassName(config.icon).fontSize(20)
      .color(Theme.colors.gray500);

    if (config.icon) this.wrapper.addChild(this.icon);

    if (config.dropdown && !config.dropdown.trailing && config.type !== 'select') {
      this.wrapper.addChild(getDropdown())
    }

    if (config.image) {
      this.wrapper.addChild(
        new IMG().attrSrc(config.image).attrAlt(config.placeholder)
          .width(34).height(24).border('1px solid ' + Theme.colors.gray100)
          .borderRadius(4).overflow('hidden').objectFit('cover')
      )
    }

    if (config.leadingText) {
      this.main.display('flex').alignItems('center').addChild(
        new Span().text(config.leadingText).color(Theme.colors.gray500)
          .display('flex').marginRight(-1)
          .alignItems('center').justifyContent('center')
          .padding([10, 12, 10, 14]).borderRadius([8, 0, 0, 8])
          .borderLeft('1px').borderTop('1px')
          .borderBottom('1px').borderStyle('solid')
          .borderColor(Theme.colors.gray300)
          .boxSizing('border-box').height(44)
      );
      this.wrapper.borderRadius([0, 8, 8, 0]);
    }

    this.wrapper.addChild(this.inputField);

    this.errorIcon = new EM().addClassName(errorIcon)
      .fontSize(16).color(Theme.colors.error500).display('none');
    this.wrapper.addChild(this.errorIcon);

    this.helpIcon = new EM().addClassName(helpIcon)
      .fontSize(16).color(Theme.colors.gray400)
      .cursor('pointer');
    if (config.help && !(config.dropdown && config.dropdown.trailing)) {
      this.wrapper.addChild(this.helpIcon);
    }

    if (config.dropdown && config.dropdown.trailing && config.type !== 'select') {
      this.wrapper.addChild(getDropdown())
    }

    if (config.type === 'select') {
      createDropDown();
      this.selectedContainer = new Container().position('absolute')
        .height('auto').width('calc(100% - (20px + 8px + 14px))').backgroundColor(Theme.colors.white)
        .marginLeft(-14).borderRadius(8);
      const self = this;
      this.caret = new EM().addClassName(dropDownArrow).color(Theme.colors.gray500)
        .fontSize(20).cursor('pointer')
        .on({
          click() {
            self.dropDown.toggle(value => {
              this.transform(value ? 'rotate(-180deg)' : 'rotate(0deg)')
            });
          }
        })
      this.wrapper.addChild(this.caret);
      document.addEventListener('click', this.dropDownOutsideClick);
      this.dropDown.onSelect(item => {
        this.inputField.attrValue(item.value);
        this.inputField.dispatch('input');

        this.dropDown.toggle(value => {
          this.caret.transform(value ? 'rotate(-180deg)' : 'rotate(0deg)')
        });
        this.selectedContainer.removeChildren();
        const selected = new DropDownItem(item, {
          options: config.dropdown.options
        });
        selected.check.visibility('hidden');
        selected.pseudo({
          ':hover': { backgroundColor: Theme.colors.transparent }
        }).on({
          click: () => {
            this.dropDown.toggle();
          }
        })
        this.selectedContainer.addChild(selected);
      });
      this.wrapper.position('relative').addChild(
        this.selectedContainer
      )
    }

    if (config.label) {
      this.addChild(
        new Label().text(config.label).fontSize(Theme.fonts.textsm)
          .color(Theme.colors.gray700)
      )
    }

    if (config.disabled) {
      this.wrapper.backgroundColor(Theme.colors.gray50).color(Theme.colors.gray500);
      this.inputField.attrDisabled(config.disabled ? 'disabled' : undefined);
    }

    this.main.addChild(this.wrapper);
    this.addChild(this.main);

    this.hint = new Span().text(config.hint).fontSize(Theme.fonts.textsm)
      .color(Theme.colors.gray500).display('none');
    this.addChild(this.hint);

    if (config.hint) this.hint.display('inline')

    if (config.error !== undefined) {
      this.error(config.error);
    }
  }

  onDestroy() {
    document.removeEventListener('click', this.dropDownOutsideClick);
  }

  onFocus() {
    // this.removeError();
    this.dropDown.show();
    this.caret.transform('rotate(-180deg)');
    if (this.config.error !== undefined) {
      this.wrapper.boxShadow('0px 0px 0px 4px ' + Theme.colors.error100)
    } else this.wrapper.boxShadow('0px 0px 0px 4px ' + Theme.colors.primary100);
  }

  onBlur() {
    this.wrapper.boxShadow('none');
  }

  disable(disable: boolean) {
    this.wrapper.backgroundColor(Theme.colors.gray50).color(Theme.colors.gray500);
    this.inputField.attrDisabled(disable ? 'disabled' : undefined);
  }

  error(message?: string) {
    this.config.error = message;
    this.hint.text(message).color(Theme.colors.error500);
    if (!message) this.hint.display('none');
    else this.hint.display('inline');
    this.wrapper.border('1px solid ' + Theme.colors.error300);
    this.errorIcon.display('block');
    this.helpIcon.display('none');
  }

  removeError() {
    this.config.error = undefined;
    this.wrapper.borderColor(Theme.colors.gray300)
    this.hint.text(this.config.hint || '').color(Theme.colors.gray500);
    if (!this.config.hint) this.hint.display('none');
    this.errorIcon.display('none');
    if (this.config.help) {
      this.helpIcon.display('block');
    }
  }

  dropDownOutsideClick = (e: MouseEvent) => {
    if (!this.dropDown || !this.dropDown.node()) return;
    if (!this.dropDown.node().contains(e.target as any)
      && e.target !== this.inputField.node()
      && e.target !== this.caret.node()
      && e.target !== this.selectedContainer.node()
      && !this.selectedContainer.node().contains(e.target as any)
    ) {
      if (this.dropDown.isShowing) {
        this.dropDown.hide();
        this.caret.transform('rotate(0deg)');
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }

}
