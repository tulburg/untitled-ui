import { A, Container, Section as DefaultSection, EM, IMG, LI, PageComponent, Span, Style, UL, H1, P, H2, Label, H4, H3, H5 } from "@javascriptui/core";
import Badge, { BadgeGroup, BadgeIconLGStyle, BadgeLGStyle, BadgeMDStyle } from "../components/badge";
import Avatar from "../components/avatar";
import { FlexHorizontal, FlexVertical, PageLayout } from "../components/layout";

import '../theme';
import Button, { Button2XL, ButtonLG, ButtonPrimary, ButtonSecondaryColor, ButtonSecondaryGray, ButtonXL, LinkColor, LinkGray } from "../components/button";
const logo = require('../assets/untitled.png');
const avatar = require('../assets/avatar.png');
const avatarCandice = require('../assets/avatar_candice.png');
const macbook = require('../assets/MacBook_pro_16.png');
const company1 = require('../assets/company1.png');
const company2 = require('../assets/company2.png');
const company3 = require('../assets/company3.png');
const company4 = require('../assets/company4.png');
const company5 = require('../assets/company5.png');
const dashboard = require('../assets/dashboard.png');
const whiteBoard = require('../assets/white-board.png');
const companies = [company1, company2, company3, company4, company5]
const questions: FAQType[] = [
  { question: 'Is there a free trial available?', answer: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.' },
  { question: 'Can I change my plan later?', answer: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.' },
  { question: 'What is your cancellation policy?', answer: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.' },
  { question: 'Is there a free trial available?', answer: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.' },
  { question: 'Can other info be added to an invoice?', answer: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.' },
  { question: 'Is there a free trial available?', answer: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.' },
];
const metrics: Metric[] = [
  { bigNumber: '4,000+', title: 'Global customers', description: 'We’ve helped over 4,000 amazing global companies.' },
  { bigNumber: '4,000+', title: 'Global customers', description: 'We’ve helped over 4,000 amazing global companies.' },
  { bigNumber: '4,000+', title: 'Global customers', description: 'We’ve helped over 4,000 amazing global companies.' },
  { bigNumber: '4,000+', title: 'Global customers', description: 'We’ve helped over 4,000 amazing global companies.' },
];

const topLinks = [
  { title: 'Home', url: '/home' },
  {
    title: 'Products', children: [
      { title: 'Figma design', url: 'https://figma.com/untitledui' },
      { title: 'Webflow Templats', url: 'https://webflow.com/untitledui' }
    ]
  },
  {
    title: 'Resources', children: [
      { title: 'Figma templates', url: '/templates' },
      { title: 'Photoshop designs', url: '/photoshop-designs' },
      { title: 'Illustrator brushes', url: '/brushes' }
    ]
  },
  { title: 'Pricing', url: '/pricing' }
];

const features = [
  {
    icon: 'icon-mail',
    title: 'Share team inboxes',
    description: 'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.'
  },
  {
    icon: 'icon-zap',
    title: 'Deliver instant answers',
    description: 'An all-in-one customer service platform that helps you balance everything your customers need to be happy.'
  },
  {
    icon: 'icon-bar-chart-2',
    title: 'Manage your team with reports',
    description: 'Measure what matters with Untitled’s easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.'
  },
  {
    icon: 'icon-smile',
    title: 'Connect with customers',
    description: 'Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email without confusion.'
  },
  {
    icon: 'icon-command',
    title: 'Connect the tools you already use',
    description: 'Explore 100+ integrations that make your day-to-day workflow more efficient and familiar. Plus, our extensive developer tools.'
  },
  {
    icon: 'icon-message-circle',
    title: 'Our people make the difference',
    description: 'We’re an extension of your customer service team, and all of our resources are free. Chat to our friendly team 24/7 when you need help.'
  }
]

export default class Home extends PageComponent {

  constructor() {
    super();
    document.title = "Untitled UI";

    const supportingTextStyle = new Style({
      fontSize: Theme.fonts.textxl, width: 768, color: Theme.colors.gray500,
      textAlign: 'center', marginTop: 24, lineHeight: 30
    })

    this.addChild(
      new TopBar(topLinks),
      new Container().marginTop(80).display('flex').justifyContent('center').addChild(
        new PageLayout().addChild(
          new Section().addChild(
            new Container().display('flex').flexDirection('column')
              .alignItems('center')
              .addChild(
                new BadgeGroup("New feature", "Check out the team dashboard", 'primary-light', 'icon-arrow-right'),
                new H1().text("Beautiful analytics to grow smarter").fontWeight(Theme.weights.semibold)
                  .fontSize(Theme.fonts.displayxl).margin(0).letterSpacing('-0.02em' as any)
                  .marginTop(16),
                new P().text('Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.')
                  .style(supportingTextStyle),
                new FlexHorizontal(12).marginTop(48).addChild(
                  new Button("Demo", "icon-play-circle").height(60)
                    .style(ButtonSecondaryGray, Button2XL),
                  new Button("Sign up").style(ButtonPrimary, Button2XL)
                )
              ),
            new Container().display('flex').justifyContent('center')
              .marginTop(64).position('relative')
              .addChild(
                new IMG().attrSrc(macbook)
              )
          ),
          new Section(true).borderBottom('1px solid ' + Theme.colors.gray200)
            .addChild(
              new Container().display('flex').alignItems('center')
                .flexDirection('column').gap(32)
                .addChild(
                  new Span().text("Join 4,000+ companies already growing")
                    .fontSize(Theme.fonts.textmd).fontWeight(Theme.weights.medium)
                    .color(Theme.colors.gray500),
                  new Container().display('flex').justifyContent('space-between')
                    .width('100%')
                    .addChild(
                      ...companies.map(company => new IMG().attrSrc(company).attrAlt("company logo"))
                    )
                )
            ),
          new Section(true).display('flex').flexDirection('column')
            .alignItems('center')
            .addChild(
              new Span().text('Features').color(Theme.colors.primary600)
                .fontSize(Theme.fonts.textmd).fontWeight(Theme.weights.semibold),
              new H2().text('Analytics that feels like it’s from the future')
                .fontWeight(Theme.weights.semibold).marginTop(12)
                .fontSize(Theme.fonts.displaymd).color(Theme.colors.gray900),
              new P().text('Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.').style(supportingTextStyle),
              new Container().display('grid').gap([64, 32]).gridTemplateColumns('1fr 1fr 1fr')
                .marginTop(64)
                .addChild(
                  ...features.map(feature => new FeatureText(feature.title, feature.description, feature.icon))
                )
            )
        )
      ),
      new Container().display('flex').justifyContent('center')
        .backgroundColor(Theme.colors.gray50)
        .addChild(
          new PageLayout().addChild(
            new Section(true).display('flex').flexDirection('column').alignItems('center').addChild(
              new IMG().attrSrc(company2).height(40),
              new H4().text('We’ve been using Untitled to kick start every new project and can’t imagine working without it.')
                .fontSize(Theme.fonts.displaylg)
                .color(Theme.colors.gray900).fontWeight(Theme.weights.medium)
                .letterSpacing('-0.02em' as any)
                .textAlign('center').marginTop(32),
              new FlexVertical(16).alignItems('center').marginTop(32).addChild(
                new Avatar({ src: avatarCandice }),
                new FlexVertical(4).alignItems('center').addChild(
                  new Span().text('Candice Wu').fontSize(Theme.fonts.textlg)
                    .fontWeight(Theme.weights.medium).color(Theme.colors.gray900),
                  new Span().text('Product Manager, Sisyphus').color(Theme.colors.gray500)
                    .font(Theme.fonts.textmd)
                )
              )
            )
          )
        ),
      new Container().display('flex').justifyContent('center')
        .addChild(
          new PageLayout().addChild(
            new Section(true).display('flex').flexDirection('column')
              .borderBottom('1px solid ' + Theme.colors.gray200)
              .alignItems('center').addChild(
                new FlexVertical(16).alignItems('center').addChild(
                  new Badge("Features", 'primary').style(BadgeLGStyle),
                  new FlexVertical(20).alignItems('center').addChild(
                    new H3().text('Cutting-edge features for advanced analytics')
                      .fontSize(Theme.fonts.displaymd).fontWeight(Theme.weights.semibold)
                      .color(Theme.colors.gray900),
                    new P().text("Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.")
                      .style(supportingTextStyle),
                    new IMG().attrSrc(dashboard).marginTop(44),
                    new Container().display('grid').gridTemplateColumns('1fr 1fr 1fr')
                      .gap(32).marginTop(96).addChild(
                        ...features.slice(3).map(feature => new FeatureText(feature.title, feature.description, feature.icon, true))
                      )
                  )
                )
              )
          )
        ),
      new Container().display('flex').justifyContent('center')
        .addChild(
          new PageLayout().addChild(
            new Section(true).borderBottom('1px solid ' + Theme.colors.gray100)
              .display('flex').flexDirection('column').alignItems('center').addChild(
                new FlexVertical(64).width('100%').addChild(
                  new FlexVertical(20).alignItems('center').addChild(
                    new H5().text('Frequently asked questions')
                      .fontWeight(Theme.weights.semibold).color(Theme.colors.gray900)
                      .fontSize(Theme.fonts.displaymd).textAlign('center').margin(0),
                    new P().text('Everything you need to know about the product and billing.')
                      .style(supportingTextStyle).textAlign('center').margin(0)
                  ),
                  new FlexVertical().alignItems('center').addChild(
                    ...questions.map(question => new FAQ(question))
                  ),
                  new Container().addChild(
                    new FlexVertical(32).borderRadius(8)
                      .backgroundColor(Theme.colors.gray100)
                      .padding(32).alignItems('center').addChild(
                        new Container().display('flex').alignItems('flex-end').addChild(
                          new Avatar({ src: avatarCandice, size: 'lg' }).marginRight(-16),
                          new Avatar({ src: avatar, size: 'xl', shadow: true }).zIndex('1')
                            .boxShadow('none'),
                          new Avatar({ src: avatarCandice, size: 'lg' }).marginLeft(-16),
                        ),
                        new FlexVertical(8).alignItems('center').addChild(
                          new H5().text('Still have questions?')
                            .fontSize(Theme.fonts.textxl).fontWeight(Theme.fonts.medium)
                            .color(Theme.colors.gray900).textAlign('center'),
                          new P().text('Can’t find the answer you’re looking for? Please chat to our friendly team.')
                            .style(supportingTextStyle).fontSize(Theme.fonts.textlg)
                            .margin(0)
                        ),
                        new Button("Get in touch")
                          .style(ButtonPrimary, ButtonLG)
                      ),
                  )
                )
              )
          )
        ),
      new Container().display('flex').justifyContent('center')
        .addChild(
          new PageLayout().addChild(
            new Section(true).display('flex').flexDirection('column').addChild(
              new Span().text('Launch faster').color(Theme.colors.primary600)
                .fontSize(Theme.fonts.textmd).fontWeight(Theme.weights.semibold),
              new H5().text('Build something great').margin(0).marginTop(12)
                .fontWeight(Theme.weights.semibold).color(Theme.colors.gray900)
                .fontSize(Theme.fonts.displaymd),
              new P().text('We’ve done all the heavy lifting so you don’t have to — get all the data you need to launch and grow your business faster.')
                .style(supportingTextStyle).textAlign('left').margin(0)
                .marginTop(20),
              new FlexHorizontal(96).marginTop(64).addChild(
                new Container().display('grid').gridTemplateColumns('1fr 1fr')
                  .gap([64, 32])
                  .addChild(
                    ...metrics.map(metric => new MetricItem(metric))
                  ),
                new IMG().attrSrc(whiteBoard).width(560)
              )
            )
          )
        ),
      new Container().display('flex').justifyContent('center')
        .backgroundColor(Theme.colors.gray50)
        .addChild(
          new PageLayout().addChild(
            new Section(true).display('flex').flexDirection('column').alignItems('center').addChild(
              new H5().text('Start your free trial').margin(0).marginTop(12)
                .fontWeight(Theme.weights.semibold).color(Theme.colors.gray900)
                .fontSize(Theme.fonts.displaymd),
              new P().text('Join over 4,000+ startups already growing with Untitled.')
                .style(supportingTextStyle).textAlign('center').margin(0)
                .marginTop(20),
              new FlexHorizontal(12).marginTop(48).addChild(
                new Button("Learn more")
                  .style(ButtonSecondaryGray, ButtonXL),
                new Button("Get started").style(ButtonPrimary, ButtonXL)
              )
            )
          )
        ),
      new Footer()

    )

  }
}

interface TopLink {
  title: string
  url?: string
  children?: TopLink[]
}
export class TopBar extends Container {
  constructor(topLinks: TopLink[]) {
    super();

    const linkStyle = new Style({
      textDecoration: 'none', color: Theme.colors.gray500,
      fontWeight: Theme.weights.semibold, fontSize: Theme.fonts.textmd,
      cursor: 'pointer'
    }).pseudo({
      ':hover': { color: Theme.colors.gray900 }
    });

    const createLink = (link: TopLink) => new A().attrHref(link.url ? link.url : '#')
      .text(link.title).style(linkStyle)

    this.position('fixed').top(0).left(0).left('50%').transform('translateX(-50%)')
      .width('100%').backgroundColor(Theme.colors.white).zIndex('10');

    this.display('flex').justifyContent('center')
      .padding([20, 0]).borderBottom('1px solid ' + Theme.colors.gray100)
      .addChild(
        new PageLayout().addChild(
          new FlexHorizontal().justifyContent('space-between').addChild(
            new FlexHorizontal(32).addChild(
              new IMG().attrSrc(logo).attrAlt('untitledui logo'),
              ...topLinks.map(link => {
                if (link.children) {
                  return new Span().style(linkStyle).text(link.title)
                    .position('relative').display('flex').alignItems('center')
                    .addChild(
                      new EM().addClassName('icon-chevron-down')
                        .color(Theme.colors.gray500).marginLeft(8),
                      new UL().position('absolute').top('100%')
                        .listStyle('none').minWidth(240).display('none')
                        .paddingTop(24)
                        .borderRadius(8).backgroundColor(Theme.colors.white)
                        .boxShadow(Theme.shadows.lg).addChild(
                          ...link.children.map(sublink => {
                            return new LI().padding([8, 12])
                              .borderBottom('1px solid ' + Theme.colors.gray100)
                              .addChild(createLink(sublink))
                          })
                        )
                    ).pseudo({
                      ':hover ul': { display: 'block' }
                    })
                }
                return createLink(link)
              })
            ),
            new Avatar({ src: avatar })
          )
        )
      )
  }
}


class Section extends DefaultSection {
  constructor(both: boolean = false) {
    super();
    if (both) this.padding([96, 0]);
    else this.paddingTop(96);
  }
}


class FeatureText extends Container {
  constructor(title: string, description: string, icon: string, learnMore?: boolean) {
    super();

    this.display('flex').flexDirection('column').alignItems('center').addChild(
      new EM().addClassName(icon).fontSize(24).backgroundColor(Theme.colors.primary100)
        .border('8px solid ' + Theme.colors.primary50).height(48).width(48).borderRadius(24)
        .color(Theme.colors.primary600).display('grid').placeItems('center')
        .boxSizing('border-box'),
      new Label().text(title).color(Theme.colors.gray900).fontWeight(Theme.weights.medium)
        .fontSize(Theme.fonts.textxl).marginTop(20).textAlign('center'),
      new P().text(description).color(Theme.colors.gray500).fontSize(Theme.fonts.textmd)
        .margin(0).marginTop(8).textAlign('center')
    );

    if (learnMore) this.addChild(
      new Button('Learn more', 'icon-arrow-right', true)
        .style(ButtonLG, ButtonSecondaryColor).marginTop(20)
        .backgroundColor(Theme.colors.transparent)
    )

  }
}

interface FAQType {
  question: string
  answer: string
}

class FAQ extends Container {
  button: EM;
  constructor(faq: FAQType) {
    super();

    this.button = new EM().addClassName('icon-plus-circle')
      .color(Theme.colors.primary600).fontSize(24)
      .cursor('pointer');

    const content = new P().text(faq.answer).fontSize(Theme.fonts.textmd)
      .display('none').color(Theme.colors.gray500)
      .lineHeight(24)

    this.button.on({
      click: () => {
        const display: any = content.display();
        if (display === 'none') {
          content.display('block');
          this.button.removeClassName('icon-plus-circle')
            .addClassName('icon-minus-circle')
        } else {
          content.display('none');
          this.button.removeClassName('icon-minus-circle')
            .addClassName('icon-plus-circle')
        }
      }
    })

    this.borderBottom('1px solid ' + Theme.colors.gray100).padding([24, 0])
      .width(768)
      .addChild(
        new FlexHorizontal(24).alignItems('flex-start').addChild(
          new FlexVertical(8).width('100%').addChild(
            new Label().text(faq.question).fontSize(Theme.fonts.textlg)
              .fontWeight(Theme.weights.medium).color(Theme.colors.gray900),
            content
          ),
          this.button
        )
      )
  }
}

interface Metric {
  bigNumber: string, title: string, description: string
}

class MetricItem extends Container {
  constructor(metric: Metric) {
    super();
    this.addChild(
      new FlexVertical(12).alignItems('center').addChild(
        new Span().text(metric.bigNumber).fontSize(Theme.fonts.displayxl)
          .fontWeight(Theme.weights.semibold).color(Theme.colors.primary600),
        new FlexVertical(8).addChild(
          new Label().fontSize(Theme.fonts.textlg)
            .fontWeight(Theme.weights.medium).color(Theme.colors.gray900)
            .text(metric.title).textAlign('center'),
          new P().text(metric.description).fontSize(Theme.fonts.textmd)
            .color(Theme.colors.gray500)
            .lineHeight(24).textAlign('center')
        )
      )
    )
  }
}


export class Footer extends Container {
  constructor() {
    super();
    const footerLinks = [
      ['Product', 'Overview', 'Features', 'Solutions', 'New', 'Tutorials', 'Pricing', 'Releases'],
      ['Company', 'About us', 'Careers', 'Press', 'News', 'Media kit', 'Contact'],
      ['Resources', 'Blog', 'Newsletter', 'Events', 'Help centre', 'Tutorials', 'Support'],
      ['Use cases', 'Startups', 'Enterprise', 'Government', 'SaaS', 'Marketplaces', 'Ecommerce'],
      ['Social', 'Twitter', 'LinkedIn', 'Facebook', 'GitHub', 'AngelList', 'Dribbble'],
      ['Legal', 'Terms', 'Privacy', 'Cookies', 'Licenses', 'Settings', 'Contact']
    ]
    const list = new FlexHorizontal(32).width('100%').alignItems('flex-start')
      .marginBottom(64)
      .addChild(
        ...footerLinks.map(links => {
          return new FlexVertical(12).width('100%').alignItems('flex-start').addChild(
            ...links.map((link, index) => {
              if (index === 0) {
                return new Span().text(link).fontSize(Theme.fonts.textsm)
                  .color(Theme.colors.gray400).fontWeight(Theme.weights.semibold)
              }
              return new Button(link).style(LinkGray, ButtonLG)
                .color(Theme.colors.gray500)
            })
          )
        })
      )
    this.display('flex').width('100%').justifyContent('center').paddingTop(64)
      .addChild(
        new PageLayout().addChild(
          list,
          new Container().paddingTop(32).borderTop('1px solid ' + Theme.colors.gray200)
            .display('flex').justifyContent('space-between').marginBottom(48)
            .addChild(
              new IMG().attrSrc(logo),
              new Span().text('© 2077 Untitled UI. All rights reserved.')
                .color(Theme.colors.gray400).fontSize(Theme.fonts.textmd)
            )
        )
      )
  }
}
