import { Container, PageComponent, Image, Span, EM, H1, Link, P, H4 } from "@javascriptui/core";
import { LinkGray } from "../components/button";
const logo = require('../assets/logo.png');

declare let window: any;

export class TopBar extends Container {
  constructor(route?: string) {
    super();
    this.padding([8, 0]).backgroundColor(Theme.colors.white)
      .borderBottom('1px solid ' + Theme.colors.grey600)
      .marginTop(64).display('flex').alignItems('center')
      .fontSize(Theme.fonts.displayxs).color(Theme.colors.gray900)
      .addChild(
        new Image().attrSrc(logo).attrAlt('logo')
          .width(32).cursor('pointer').on({
            click() { Router.go('/') }
          }),
        new Span().text('Shared components')
          .cursor('pointer')
          .marginLeft(16).pseudo({
            ':hover': { textDecoration: 'underline' }
          }).on({
            click() { Router.go('/docs') }
          })
      );
    if (route) this.addChild(
      new EM().addClassName('icon-arrow-right')
        .color(Theme.colors.gray900).fontSize(24)
        .margin([0, 8]),
      new Span().text(route).fontWeight(Theme.weights.bold)
    )
  }
}

export class Documentation extends PageComponent {
  constructor() {
    super();
    const docs = {
      'Buttons': 'Buttons communicate actions that users can take.',
      'Button groups': 'Button groups combine sets of buttons into toolbars or split buttons for more complex components. Button groups are also useful for acting as mini “tabs” in UI, for example, switching between date ranges.',
      'Badges': 'Badges help highlight important information, such as notifications or new and unread messages. They’re primarily used for communicating secondary or additional information to text.',
      'Inputs': 'Input fields allow users to enter text into a UI. They typically appear in forms and dialogs. Input fields on mobiles should be at least 16px text size to avoid auto zoom on mobile browsers.',
      'Dropdowns': 'Dropdowns are used to group together actions in a subview. They’re useful for hiding menus or when you have multiple actions that cannot be separate buttons.',
      'Toggles': 'Toggles (also known as “switches”) is a UI control that has two mutually-exclusive states, such as ON and OFF. The design and functionality of this component is based on a physical switch that allows users to turn things ON or OFF. Toggles are a great visual cue for settings, especially on mobile, because they take less screen estate (in comparison with two radio buttons).',
      'Checkboxes': 'Checkboxes allow users to select one or more items from a set, while radio buttons allow users to select just one option from a set. Both can also be used to turn an option on or off.',
      'Checkbox groups': 'Checkbox groups are a great way to make checkboxes more interesting, or to add more information to the user’s options without adding clutter. When options are explicitly separated into cards, it’s obvious which elements belong to which group and easier to quickly distinguish between checkbox options.',
      'Avatar': 'All images are sourced from Unsplash and can be used freely for commercial and non-commercial purposes. You can read more about Unsplash’s license here.',
      'Tooltip': '',
      'Progress bar': 'Progress bars indicate the percentage completed of a task. They can be useful to prompt the user to complete an action or process.',
      'Progress cirlce': '',
      'Input validator': 'Form control validator class that receives a configuration and examine target fields on command to report a succes or error according to specified configurations'
    };

    const component = Router.current.data.component;
    let topbar = new TopBar();
    let title = undefined;
    if (component) {
      title = component.replace(/\-/, ' ');
      title = title[0].toUpperCase() + title.slice(1);
      topbar = new TopBar(title);
    }

    const mainPane = new Container().display('flex').flexDirection('column');
    const titlePane = (title: string, desc: string) => new Container().addChild(
      new H1().text(title).fontSize(Theme.fonts.displayxl)
        .color(Theme.colors.gray900).marginBottom(20).media({
          '(max-width: 768px)': { fontSize: Theme.fonts.displaylg },
          '(max-width: 560px)': { fontSize: Theme.fonts.displaymd }
        }),
      new P().text(desc).color(Theme.colors.gray500)
        .fontSize(Theme.fonts.textxl).margin(0).marginBottom(32)
        .lineHeight(34).media({
          '(max-width: 768px)': { fontSize: Theme.fonts.textlg },
          '(max-width: 560px)': { fontSize: Theme.fonts.textmd }
        }),
    )

    this.display('flex').justifyContent('center')
      .addChild(
        new Container()
          .display('flex').flexDirection('column')
          .addChild(
            topbar,
            new Container().width(720)
              .marginTop(128).backgroundColor(Theme.colors.white)
              .addChild(mainPane)
              .media({
                '(max-width: 800px)': { width: '100%' }
              })
          ).media({
            '(max-width: 800px)': { padding: [0, 40] },
            '(max-width: 560px)': { padding: [0, 24] }
          })
      );

    if (component) {
      mainPane.addChild(
        titlePane(title, docs[title]),
        new Container().addClassName(component)
      )
    } else {
      mainPane.addChild(
        titlePane('Shared components', 'Choose a component below to view the documentation'),
        new Container().display('flex').marginTop(64)
          .flexDirection('column').gap(28)
          .addChild(
            ...Object.keys(docs).map(doc => {
              const url = doc.toLowerCase().replace(/\s/, '-')
              return new Link().text(doc).attrHref('/docs/' + url)
                .fontSize(Theme.fonts.textsm)
                .style(LinkGray).textDecoration('none')
                .on({
                  click(e) {
                    e.preventDefault();
                    Router.go('/docs/' + url)
                  }
                })
            })
          )
      )
    }
  }

  onCreate() {
    const title = Router.current.data.component;
    if (title) {
      const Cobalt = window.Cobalt;
      new Cobalt('.' + title.toLowerCase().replace(/\s/, '-'), {
        heading: value => new H4().text(value).fontSize(Theme.fonts.displaysm)
          .color(Theme.colors.gray900).marginBottom(24).marginTop(64)
          .media({
            '(max-width: 768px)': { fontSize: Theme.fonts.displayxs }
          }),
        paragraph: value => new P().text(value).fontSize(Theme.fonts.textlg)
          .color(Theme.colors.gray500).lineHeight(28).marginTop(28),
        image: value => new Image().attrSrc(value).attrAlt('document cover')
          .width('100%').margin([24, 0]).borderRadius(8),
        tip: value => new Container().backgroundColor(Theme.colors.gray50)
          .padding([24, 24, 24, 40]).text(value).color(Theme.colors.gray500)
          .borderRadius(8).margin([16, 0]).lineHeight(22).position('relative')
          .pseudo({
            ':before': {
              content: '"💡"', width: 24, height: 24, left: 16, position: 'absolute',
              top: 24
            }
          })
      })
    }
  }
}

