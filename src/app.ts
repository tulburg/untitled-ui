import { Container, EM, H1, Image, PageComponent } from '@javascriptui/core';
import Button, { ButtonIcon2XL, ButtonPrimary } from './components/button';

const logo = require('./assets/logo.png');

export default class App extends PageComponent {

  constructor() {
    super();

    this.addChild(
      new Container().display('flex').minHeight(64)
        .backgroundColor(Theme.colors.white)
        .boxShadow(Theme.shadows.xl).alignItems('center')
        .paddingLeft(24).gap(8)
        .addChild(
          new Image().attrSrc(logo).attrAlt('logo')
            .width(50),
          new H1().text('Buttons').fontSize(26)
            .color(Theme.colors.grey600)
            .fontWeight(Theme.weights.bold)
        )
    )

    this.addChild(
      new EM().addClassName('icon-layers-2')
        .fontSize(Theme.fonts.displayxl)
        .color(Theme.colors.error600)
    )

    this.addChild(
      new Button('', 'icon-arrow-right', true)
        .style(ButtonPrimary, ButtonIcon2XL)
        .on({
          click: () => console.log('clicked!')
        })
    )

  }
}
