import { Container, H1, Image, Link, P, PageComponent } from '@javascriptui/core';
import Badge, { BadgeIconMDStyle, BadgeMDStyle, BadgeSMStyle, ImageBadge, ImageBadgeLGStyle } from './components/badge';
import Button, { ButtonMD, ButtonPrimary, ButtonSecondaryColor, LinkColor } from './components/button';
import ButtonGroup from './components/button-groups';
import DropDown from './components/dropdown';
import Input from './components/input';
import { InputValidator } from './utils/input-validator';

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
      placeholder: 'olivia@untitledui.com',
      type: 'text',
    }).minWidth(320) as Input;

    const inputValidator = new InputValidator();
    // input.inputField.on({
    //   create() {
    //     inputValidator.register(
    //       'email', input.inputField, { required: true }
    //     )
    //   }
    // });

    const message = new Input({
      placeholder: 'Enter a description', label: 'Description', type: 'textarea',
      icon: 'icon-mail'
    }).minWidth(320) as Input;
    // message.inputField.on({
    //   create() {
    //     inputValidator.register('message', this, { required: true })
    //   }
    // });


    const dropdown = new DropDown({
      options: [
        { key: 'View profile', value: 'profile', command: 'CTL P', endGroup: true },
        { key: 'Settings', value: 'settings', suffix: '@tulburg', command: 'Alt+S' },
        { key: 'Image sample', value: 'image', image: 'https://c1.wallpaperflare.com/preview/651/682/531/portrait-black-and-white-architecture-sweater.jpg' },
        { key: 'Keyboard shortcut', value: 'keyboard' },
      ]
    });
    dropdown.disable(2, true);


    const inputWithDropDown = new Input({
      placeholder: 'Select team member', label: 'Team', type: 'text',
      dropdown: {
        options: [
          { key: 'US', value: 'us' },
          { key: 'UK', value: 'uk' },
          { key: 'CA', value: 'ca' },
        ],
        trailing: false
      }
    }).minWidth('100%').marginTop(40) as Input;

    inputWithDropDown.dropDown.onSelect(item => {
      console.log(item);
    });



    const selectInput = new Input({
      type: 'select', placeholder: 'Select team member',
      icon: 'icon-user', label: 'Team',
      dropdown: {
        options: [
          { key: 'Olivia Rhye', value: '@olivia', suffix: '@olivia', icon: 'icon-user' },
          { key: 'Phoenix Baker', value: '@phoenix', suffix: '@phoenix', icon: 'icon-settings' },
          { key: 'Lana Steiner', value: '@lana', suffix: '@lana', icon: 'icon-user' }
        ]
      }
    }).marginTop(16) as Input;

    selectInput.inputField.on({
      create() {
        inputValidator.register('team-select', this, { required: true });
      }
    });

    const searchInput = new Input({
      placeholder: 'Search', type: 'autocomplete', icon: 'icon-search',
      dropdown: {
        options: [
          { key: 'Olivia Rhye', value: '@olivia', suffix: '@olivia', icon: 'icon-user' },
          { key: 'Phoenix Baker', value: '@phoenix', suffix: '@phoenix', icon: 'icon-settings' },
          { key: 'Lana Steiner', value: '@lana', suffix: '@lana', icon: 'icon-user' }
        ]
      }
    }).marginTop(24) as Input;

    searchInput.inputField.on({
      create() {
        inputValidator.register('user-search', this, { required: true });
      }
    });
    searchInput.dropDown.onSelect(item => {
      console.log(item);
      searchInput.removeError();
    })

    this.addChild(
      new Container().display('flex').justifyContent('center')
        .addChild(
          new Container().width(720).marginTop(100)
            .display('flex').flexDirection('column').gap(32)
            .alignItems('start').paddingLeft(100)
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
                .alignItems('start')
                .gap(16).addChild(
                  input,
                  new Input({ placeholder: 'Enter password', label: 'Password', type: 'password' })
                    .minWidth(320),
                  message,
                  new Button('Login', 'icon-arrow-right', true)
                    .style(ButtonSecondaryColor, ButtonMD)
                    .on({
                      click() {
                        inputValidator.validate().then(res => {
                          alert('success!');
                          input.removeError();
                        }).catch(err => {
                          if (err.name === 'email') {
                            input.error('Email is required, please try again!');
                          }
                          if (err.name === 'message') {
                            message.error('Please enter a description');
                          }
                          if (err.name === 'team-select') {
                            selectInput.error('Please select a team member');
                          }
                          if (err.name === 'user-search') {
                            searchInput.error('Find a user first');
                          }
                        });
                      }
                    }),
                  new Container().marginTop(64).marginBottom(200).addChild(
                    dropdown.zIndex('4').position('relative'),
                    inputWithDropDown.zIndex('3').position('relative'),
                    selectInput.zIndex('2').position('relative'),
                    searchInput.zIndex('1').position('relative')
                  )
                )
            )
        )
    )
  }
}
