import { Container, H1, Image, Link, PageComponent } from '@javascriptui/core';
import Badge, { BadgeIconMDStyle, BadgeMDStyle, BadgeSMStyle, ImageBadge, ImageBadgeLGStyle } from './components/badge';
import Button, { ButtonMD, ButtonPrimary, LinkColor } from './components/button';
import ButtonGroup from './components/button-groups';
import Input from './components/input';

const logo = require('./assets/logo.png');
const mc = require('./assets/mc.png');

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

    const input = new Input({
      placeholder: 'olivia@untitledui.com', help: 'Send some help',
      type: 'text',
      label: 'Email', hint: 'This is a hint text to help user',
      icon: 'icon-dollar-sign',
      // image: mc,
      // leadingText: 'ftp://',
      dropdown: {
        options: [
          { key: 'US', value: 'United States of America' },
          { key: 'UK', value: 'United Kingdom' },
          { key: 'DE', value: 'Germany' },
          { key: 'PL', value: 'Poland' }
        ],
        trailing: true
      },
      error: ''
    }).minWidth(320);

    this.addChild(
      new Container().display('flex').justifyContent('center')
        .addChild(
          new Container().width(720).marginTop(100)
            .display('flex').flexDirection('column').gap(32)
            .alignItems('start')
            .addChild(
              new Button('Button CTA', 'icon-arrow-right', true)
                .style(ButtonPrimary, ButtonMD),
              buttonGroup,
              new Container().display('flex').gap(16)
                .alignItems('center')
                .addChild(
                  new Badge('Label', 'error', 'icon-arrow-left')
                    .style(BadgeMDStyle),
                  new Badge(undefined, 'success', 'icon-plus')
                    .style(BadgeIconMDStyle),
                  new Badge('New feature', 'blue', 'icon-arrow-right', true)
                    .style(BadgeSMStyle)
                ),
              // new BadgeGroup('New feature', 'We\'ve released a new feature', 'gray-dark', 'icon-arrow-right'),
              // new BadgeGroup('Fix now', 'There was a problem with that action', 'error-dark', 'icon-arrow-right', true),
              new ImageBadge('Label', 'gray', logo).style(ImageBadgeLGStyle),
              new Container().display('flex').flexDirection('column')
                .gap(16).addChild(
                  input,
                  new Input({ placeholder: 'Enter password', label: 'Password', type: 'password' })
                )
            )
        )
    )
  }
}
