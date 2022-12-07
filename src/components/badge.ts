import { Container, EM, IMG, Span, Style } from "@javascriptui/core";
import Theme from '../theme';

export type BadgeType = 'gray' | 'error' | 'orange' | 'rose' | 'pink' | 'blue' | 'purple' | 'indigo'
  | 'blue-light' | 'blue-gray' | 'success' | 'warning' | 'primary'

export default class Badge extends Container {
  constructor(title: string, type: BadgeType, icon?: string, trailing?: boolean) {
    super();
    const typeset: any = {
      gray: [Theme.colors.gray100, Theme.colors.gray700],
      error: [Theme.colors.error50, Theme.colors.error700],
      orange: [Theme.colors.orange50, Theme.colors.orange700],
      rose: [Theme.colors.rose50, Theme.colors.rose700],
      pink: [Theme.colors.pink50, Theme.colors.pink700],
      blue: [Theme.colors.blue50, Theme.colors.blue700],
      purple: [Theme.colors.purple50, Theme.colors.purple700],
      indigo: [Theme.colors.indigo50, Theme.colors.indigo700],
      'blue-light': [Theme.colors.blueLight50, Theme.colors.blueLight700],
      'blue-gray': [Theme.colors.blueGray50, Theme.colors.blueGray700],
      success: [Theme.colors.success50, Theme.colors.success700],
      warning: [Theme.colors.warning50, Theme.colors.warning700],
      primary: [Theme.colors.primary50, Theme.colors.primary700],
    };

    this.text(title).backgroundColor(typeset[type][0])
      .color(typeset[type][1]).boxSizing('border-box');

    if (icon) {
      this.display('flex').alignItems('center').gap(8)
        .flexDirection(!trailing ? 'row-reverse' : 'row')
        .cursor('pointer')
        .addChild(
          new EM().addClassName(icon)
            .color('inherit').fontSize('inherit')
        )
    }
  }
}

// export type ImageBadgeSize = 'sm' | 'md' | 'lg';

export class ImageBadge extends Badge {
  constructor(title: string, type: BadgeType, image: string) {
    super(title, type, undefined, false);
    this.display('flex').alignItems('center').gap(8)
      .flexDirection('row-reverse')
      .cursor('pointer')
      .addChild(
        new IMG().attrSrc(image)
          .height(16).width(16).borderRadius(8)
      )
  }
}

class BaseStyle extends Style {
  constructor(height: number, fontSize: number, borderRadius: number, padding: number[]) {
    super({ borderRadius, height, fontSize, padding })
  }
}

export const BadgeSMStyle = new BaseStyle(22, Theme.fonts.textxs, 11, [2, 8]);
export const BadgeMDStyle = new BaseStyle(24, Theme.fonts.textsm, 12, [2, 10]);
export const BadgeLGStyle = new BaseStyle(28, Theme.fonts.textsm, 14, [4, 12]);

class BaseIconStyle extends Style {
  constructor(height: number, borderRadius: number, padding: number) {
    super({
      borderRadius, height, width: height, fontSize: 12, padding,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxSizing: 'border-box'
    })
  }
}

export const BadgeIconSMStyle = new BaseIconStyle(20, 11, 4);
export const BadgeIconMDStyle = new BaseIconStyle(24, 12, 6);
export const BadgeIconLGStyle = new BaseIconStyle(28, 14, 8);

class BaseImageStyle extends Style {
  constructor(height: number, fontSize: number, borderRadius: number, padding: number[]) {
    super({ borderRadius, height, fontSize, padding })
  }
}

export const ImageBadgeSMStyle = new BaseImageStyle(22, Theme.fonts.textxs, 11, [2, 8, 2, 3]);
export const ImageBadgeMDStyle = new BaseImageStyle(24, Theme.fonts.textsm, 12, [2, 10, 2, 4]);
export const ImageBadgeLGStyle = new BaseImageStyle(28, Theme.fonts.textsm, 14, [4, 12, 4, 6]);


// --- Button group & styles ---
//

export type BadgeGroupType =
  'primary-medium' | 'primary-light' | 'primary-dark' |
  'gray-medium' | 'gray-light' | 'gray-dark' |
  'error-medium' | 'error-light' | 'error-dark' |
  'warning-medium' | 'warning-light' | 'warning-dark' |
  'success-medium' | 'success-light' | 'success-dark'

export class BadgeGroup extends Container {
  constructor(title: string, caption: string, style: BadgeGroupType, icon?: string, trailing?: boolean) {
    super();

    const styleset = {
      'primary-light': [
        Theme.colors.primary700, Theme.colors.white, Theme.colors.primary700, Theme.colors.primary50
      ],
      'primary-medium': [
        Theme.colors.primary700, Theme.colors.primary50, Theme.colors.primary700, Theme.colors.primary100
      ],
      'primary-dark': [
        Theme.colors.white, Theme.colors.primary600, Theme.colors.primary700, Theme.colors.primary50
      ],
      'gray-light': [
        Theme.colors.gray700, Theme.colors.white, Theme.colors.gray700, Theme.colors.gray50
      ],
      'gray-medium': [
        Theme.colors.gray700, Theme.colors.gray100, Theme.colors.gray700, Theme.colors.gray100
      ],
      'gray-dark': [
        Theme.colors.white, Theme.colors.gray700, Theme.colors.gray700, Theme.colors.gray50
      ],
      'error-light': [
        Theme.colors.error700, Theme.colors.white, Theme.colors.error700, Theme.colors.error50
      ],
      'error-medium': [
        Theme.colors.error700, Theme.colors.error50, Theme.colors.error700, Theme.colors.error100
      ],
      'error-dark': [
        Theme.colors.white, Theme.colors.error600, Theme.colors.error700, Theme.colors.error50
      ],
      'warning-light': [
        Theme.colors.warning700, Theme.colors.white, Theme.colors.warning700, Theme.colors.warning50
      ],
      'warning-medium': [
        Theme.colors.warning700, Theme.colors.warning50, Theme.colors.warning700, Theme.colors.warning100
      ],
      'warning-dark': [
        Theme.colors.white, Theme.colors.warning600, Theme.colors.warning700, Theme.colors.warning50
      ],
      'success-light': [
        Theme.colors.success700, Theme.colors.white, Theme.colors.success700, Theme.colors.success50
      ],
      'success-medium': [
        Theme.colors.success700, Theme.colors.success50, Theme.colors.success700, Theme.colors.success100
      ],
      'success-dark': [
        Theme.colors.white, Theme.colors.success600, Theme.colors.success700, Theme.colors.success50
      ]
    }

    const styleValues = styleset[style];

    if (trailing) this.flexDirection('row-reverse');
    this.height(30).fontSize(Theme.fonts.textxs).cursor('pointer')
      .gap(8).display('flex').alignItems('center').padding(
        trailing ? [4, 4, 4, 12] : [4, 12, 4, 4]
      )
      .backgroundColor(styleValues[3]).color(styleValues[2])
      .boxSizing('border-box').borderRadius(15)
      .addChild(
        new Span().text(title).fontSize(Theme.fonts.textxs)
          .height(22).padding([2, 8]).borderRadius(11)
          .display('flex').alignItems('center').boxSizing('border-box')
          .color(styleValues[0]).backgroundColor(styleValues[1])
          .gap(8)
          .addChild(
            icon && trailing
              ? new EM().addClassName(icon)
              : <any>''
          ),
        new Container().display('flex').alignItems('center').gap(8).addChild(
          new Span().text(caption),
          icon && !trailing
            ? new EM().addClassName(icon)
            : <any>''
        )
      )
  }
}

