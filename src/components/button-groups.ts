import { Container, Button as MainButton, EM, Style } from "@javascriptui/core"
import Theme from '../theme';

interface ButtonType {
  title: string
  action: (args: any) => void
  current?: boolean
  icon?: string
}

export default class ButtonGroup extends Container {
  buttons: Button[];

  constructor(buttons: ButtonType[]) {
    super();
    this.buttons = buttons.map(button => {
      return new Button(button.title, button.icon, button.current)
        .on({ click: e => button.action(e) })
    });
    this.display('flex')
      .border('1px solid ' + Theme.colors.gray300)
      .borderRadius(8).overflow('hidden')
      .addChild(...this.buttons)
      .global({
        ':last-child': {
          borderRight: 'none'
        }
      })
  }
}

class Button extends MainButton {

  constructor(text: string, icon?: string, current?: boolean) {
    super();
    this.text(text);

    const defaultStyle = new Style({
      border: '0', borderRight: '1px solid ' + Theme.colors.gray300,
      color: Theme.colors.gray700, fontWeight: Theme.weights.semibold,
      fontSize: Theme.fonts.textsm, cursor: 'pointer',
      padding: [10, 16], height: 40, backgroundColor: Theme.colors.white
    }).pseudo({
      ':hover': { backgroundColor: Theme.colors.gray50 },
      ':active': { color: Theme.colors.gray700 },
      ':disabled': { color: Theme.colors.gray300, backgroundColor: Theme.colors.white },
      ':disabled:hover': { color: Theme.colors.gray300 }
    });

    this.style(defaultStyle);
    if (current) {
      this.backgroundColor(Theme.colors.gray50)
        .borderColor(Theme.colors.gray300)
    }

    if (text == '') {
      this.padding([10, 12]);
    }

    if (icon) {
      this.display('flex').flexDirection('row-reverse').alignItems('center').gap(8).addChild(
        new EM().addClassName(icon)
          .color('inherit').fontSize('var(--icon-size)')
      )
    }
  }
}
