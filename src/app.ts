import { Container, H1, Image, Link, PageComponent } from '@javascriptui/core';
import Button, { ButtonMD, ButtonPrimary, ButtonSecondaryGray, LinkColor } from './components/button';
import ButtonGroup from './components/button-groups';

const logo = require('./assets/logo.png');

export default class App extends PageComponent {

  constructor() {
    super();

    this.addChild(
      new Container().display('flex').minHeight(64)
        .backgroundColor(Theme.colors.white)
        .justifyContent('space-between')
        .boxShadow(Theme.shadows.xl).alignItems('center')
        .padding([0, 24])
        .addChild(
          new Container().display('flex')
            .alignItems('center').gap(8)
            .addChild(
              new Image().attrSrc(logo).attrAlt('logo')
                .width(32),
              new H1().text('Buttons - ').fontSize(26)
                .color(Theme.colors.grey600)
                .fontWeight(Theme.weights.bold)
            ),
          new Link().text('Documentation')
            .style(LinkColor)
            .attrTarget('_new').on({
              click(e) {
                e.preventDefault();
                Router.go('/docs')
              }
            })
        )
    );

    const buttonGroup = new ButtonGroup([
      { title: 'text', icon: 'icon-arrow-left', action: () => console.log('run!') },
      { title: 'text', action: () => console.log('run!'), current: true },
      { title: 'text', icon: 'icon-arrow-left', action: () => console.log('run!') },
      { title: '', icon: 'icon-plus', action: () => {} }
    ]);

    buttonGroup.buttons[2].attrDisabled('disabled');

    this.addChild(
      new Container().display('flex').justifyContent('center')
        .addChild(
          new Container().width(720).marginTop(100)
            .display('flex').flexDirection('column').gap(32)
            .alignItems('start')
            .addChild(
              new Button('Button CTA', 'icon-arrow-right', true)
                .style(ButtonSecondaryGray, ButtonMD),
              buttonGroup
            )
        )
    )
  }
}
