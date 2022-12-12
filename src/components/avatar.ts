import { Container, IMG, Span } from "@javascriptui/core";
import '../theme';

const addIcon = 'icon-plus';

interface AvatarConfig {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  src?: string
  alt?: string
  online?: boolean
  imageAccessory?: string
  text?: string
  shadow?: boolean
}

export default class Avatar extends Container {
  image: IMG;
  accessory: Span | IMG;
  constructor(config: AvatarConfig) {
    super();
    config.size = config.size || 'md';
    const sizeValue = {
      xs: 24, sm: 32, md: 40, lg: 48, xl: 56, '2xl': 64
    }

    const iconSize = {
      xs: 16, sm: 20, md: 24, lg: 28, xl: 32, '2xl': 32
    }

    this.accessory = (!config.imageAccessory ? new Span() : new IMG()).height(sizeValue[config.size] / 4)
      .width(sizeValue[config.size] / 4).position('absolute')
      .right(-1).bottom(-1).backgroundColor(Theme.colors.success500)
      .borderRadius((sizeValue[config.size] / 8) + 2)
      .border('1.5px solid ' + Theme.colors.white).display('none')

    if (config.online || config.imageAccessory) {
      this.accessory.display('block');
    }
    if (config.imageAccessory) {
      const assr = this.accessory as IMG;
      assr.attrSrc(config.imageAccessory)
        .attrAlt('avatar accessory')
    }

    this.image = new IMG().attrSrc(config.src)
      .attrAlt(config.alt ? config.alt : 'avatar image').width(sizeValue[config.size])
      .height(sizeValue[config.size]).objectFit('cover').overflow('hidden')
      .borderRadius(sizeValue[config.size] / 2).boxSizing('border-box')
      .pseudo({
        ':active': { boxShadow: '0px 0px 0px 4px ' + Theme.colors.primary100 }
      });
    if (!config.src) {
      this.image = new Span().display('flex').cursor('default')
        .width(sizeValue[config.size]).color(Theme.colors.primary600)
        .height(sizeValue[config.size]).backgroundColor(Theme.colors.primary50)
        .borderRadius(sizeValue[config.size] / 2).boxSizing('border-box')
        .userSelect('none')
        .alignItems('center').justifyContent('center')
        .fontSize(iconSize[config.size])
        .pseudo({
          ':active': { boxShadow: '0px 0px 0px 4px ' + Theme.colors.primary100 }
        });
    }
    if (!config.text) this.image.addClassName('icon-user');
    else {
      this.image.text(config.text.slice(0, 2).toUpperCase())
        .fontSize(Theme.fonts['text' + config.size])
        .fontWeight(Theme.weights.medium)
    }

    if (config.shadow) {
      this.image.boxShadow(Theme.shadows.lg).border('1px solid ' + Theme.colors.white)
    }

    this.position('relative').display('flex')
      .addChild(this.image, this.accessory);
  }

  online(toggle: boolean) {
    this.accessory.display(toggle ? 'block' : 'none');
  }
}

export class AvatarGroup extends Container {
  constructor(avatars: AvatarConfig[], remaining?: number, add?: () => void) {
    super();
    const gap = {
      xs: 4, sm: 8, md: 12, lg: 16, xl: 20, '2xl': 20
    }
    const remainingSize = {
      xs: 24, sm: 32, md: 40, lg: 48, xl: 56, '2xl': 64
    }
    this.display('flex')
      .addChild(
        ...avatars.map((config, index) => {
          const avatar = new Avatar(config)
            .marginLeft(index > 0 ? -gap[config.size] : 0) as Avatar;
          avatar.image.border('1.5px solid ' + Theme.colors.white)
          return avatar
        })
      );

    if (remaining) {
      this.addChild(
        new Span().text('+' + remaining).height(remainingSize[avatars[0].size])
          .width(remainingSize[avatars[0].size])
          .borderRadius((remainingSize[avatars[0].size] / 2))
          .color(Theme.colors.primary600)
          .display('flex').alignItems('center').justifyContent('center')
          .backgroundColor(Theme.colors.primary50)
          .marginLeft(-gap[avatars[0].size]).position('relative')
          .zIndex('1')
          .fontSize(Theme.fonts['text' + avatars[0].size])
      )
    }

    if (add) {
      this.addChild(
        new Span().height(remainingSize[avatars[0].size])
          .width(remainingSize[avatars[0].size])
          .borderRadius((remainingSize[avatars[0].size] / 2))
          .color(Theme.colors.gray400).boxSizing('border-box')
          .border('1px dashed ' + Theme.colors.gray300)
          .addClassName(addIcon).marginLeft(8).cursor('pointer')
          .display('flex').alignItems('center').justifyContent('center')
          .fontSize(Theme.fonts['text' + avatars[0].size])
          .on({ click: add })
      )
    }
  }
}
