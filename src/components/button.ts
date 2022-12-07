import { Button as DefaultButton, EM, P, Style } from '@javascriptui/core'
import Theme from '../theme';

// --- size styles ---
export const ButtonSM = new Style({
  '--icon-size': '20px',
  height: 36, padding: [8, 14], fontSize: Theme.fonts.textsm
})

export const ButtonMD = new Style({
  '--icon-size': '20px',
  height: 40, padding: [10, 16], fontSize: Theme.fonts.textsm
})

export const ButtonLG = new Style({
  '--icon-size': '20px',
  height: 44, padding: [10, 18], fontSize: Theme.fonts.textmd
})

export const ButtonXL = new Style({
  '--icon-size': '20px',
  height: 48, padding: [12, 20], fontSize: Theme.fonts.textmd
})

export const Button2XL = new Style({
  '--icon-size': '24px',
  height: 60, padding: [16, 28], fontSize: Theme.fonts.textlg,
})

export const ButtonIconSM = new Style({
  '--icon-size': '20px', height: 36, width: 36, justifyContent: 'center'
})

export const ButtonIconMD = new Style({
  '--icon-size': '20px', height: 40, width: 40, justifyContent: 'center'
})

export const ButtonIconLG = new Style({
  '--icon-size': '20px', height: 44, width: 44, justifyContent: 'center'
})

export const ButtonIconXL = new Style({
  '--icon-size': '20px', height: 48, width: 48, justifyContent: 'center'
})

export const ButtonIcon2XL = new Style({
  '--icon-size': '24px', height: 60, width: 60, justifyContent: 'center'
})

// -- hierarchy --
export const ButtonPrimary = new Style({
  backgroundColor: Theme.colors.primary600,
  color: Theme.colors.white,
  border: '0'
}).pseudo({
  ':hover': { backgroundColor: Theme.colors.primary700 },
  ':active': {
    boxShadow: '0px 0px 0px 4px rgba(244, 235, 255, 1),' +
      '0px 1px 2px 0px rgba(16, 24, 40, 0.05)'
  },
  ':disabled': { backgroundColor: Theme.colors.primary200 },
  ':disabled:hover': { boxShadow: 'none' }
});

export const ButtonSecondaryColor = new Style({
  backgroundColor: Theme.colors.primary50,
  color: Theme.colors.primary700,
  border: '0'
}).pseudo({
  ':hover': { backgroundColor: Theme.colors.primary100 },
  ':active': {
    backgroundColor: Theme.colors.primary50,
    boxShadow: '0px 0px 0px 4px rgba(244, 235, 255, 1),' +
      '0px 1px 2px 0px rgba(16, 24, 40, 0.05)'
  },
  ':disabled': {
    backgroundColor: Theme.colors.primary25,
    color: Theme.colors.primary300
  },
  ':disabled:hover': {
    backgroundColor: Theme.colors.primary25,
    boxShadow: 'none'
  }
});

export const ButtonSecondaryGray = new Style({
  backgroundColor: Theme.colors.white,
  color: Theme.colors.gray700,
  border: '1px solid ' + Theme.colors.gray300
}).pseudo({
  ':hover': { backgroundColor: Theme.colors.gray50 },
  ':active': {
    backgroundColor: Theme.colors.white,
    boxShadow: '0px 0px 0px 4px ' + Theme.colors.gray100
  },
  ':disabled': {
    backgroundColor: Theme.colors.white,
    color: Theme.colors.gray300,
    border: '1px solid ' + Theme.colors.gray200
  },
  ':disabled:hover': {
    backgroundColor: Theme.colors.white,
    boxShadow: 'none'
  }
});

export const ButtonTertiary = new Style({
  backgroundColor: Theme.colors.transparent,
  color: Theme.colors.primary700,
  border: '0'
}).pseudo({
  ':hover': { backgroundColor: Theme.colors.primary50 },
  ':active': {
    backgroundColor: Theme.colors.transparent
  },
  ':disabled': {
    color: Theme.colors.gray300
  },
  ':disabled:hover': {
    backgroundColor: Theme.colors.transparent
  }
});

export const ButtonTertiaryGray = new Style({
  backgroundColor: Theme.colors.transparent,
  color: Theme.colors.gray700,
  border: '0'
}).pseudo({
  ':hover': { backgroundColor: Theme.colors.gray50 },
  ':active': {
    backgroundColor: Theme.colors.transparent
  },
  ':disabled': {
    color: Theme.colors.gray300
  },
  ':disabled:hover': {
    backgroundColor: Theme.colors.transparent
  }
});

export const LinkColor = new Style({
  backgroundColor: Theme.colors.transparent,
  color: Theme.colors.primary700,
  border: '0', padding: 0, height: 'auto'
}).pseudo({
  ':hover': { color: Theme.colors.primary800 },
  ':active': {
    color: Theme.colors.primary700
  },
  ':disabled': {
    color: Theme.colors.gray300
  },
  ':disabled:hover': {
    color: Theme.colors.primary700
  }
});

export const LinkGray = new Style({
  backgroundColor: Theme.colors.transparent,
  color: Theme.colors.gray700,
  border: '0', padding: 0, height: 'auto'
}).pseudo({
  ':hover': { color: Theme.colors.gray800 },
  ':active': {
    color: Theme.colors.gray700
  },
  ':disabled': {
    color: Theme.colors.gray300
  },
  ':disabled:hover': {
    color: Theme.colors.gray700
  }
});

export const ButtonPrimaryDestructive = new Style({
  backgroundColor: Theme.colors.error600,
  color: Theme.colors.white, border: '0'
}).pseudo({
  ':hover': { backgroundColor: Theme.colors.error700 },
  ':active': {
    boxShadow: '0px 0px 0px 4px rgba(244, 235, 255, 1),' +
      '0px 1px 2px 0px rgba(16, 24, 40, 0.05)'
  },
  ':disabled': { backgroundColor: Theme.colors.error200 },
  ':disabled:hover': { boxShadow: 'none' }
});


export const ButtonSecondaryColorDestructive = new Style({
  backgroundColor: Theme.colors.error50,
  color: Theme.colors.error700,
  border: '0'
}).pseudo({
  ':hover': { backgroundColor: Theme.colors.error100 },
  ':active': {
    backgroundColor: Theme.colors.error50,
    boxShadow: '0px 0px 0px 4px rgba(244, 235, 255, 1),' +
      '0px 1px 2px 0px rgba(16, 24, 40, 0.05)'
  },
  ':disabled': {
    backgroundColor: Theme.colors.error25,
    color: Theme.colors.error300
  },
  ':disabled:hover': {
    backgroundColor: Theme.colors.error25,
    boxShadow: 'none'
  }
});

export const ButtonSecondaryGrayDestructive = new Style({
  backgroundColor: Theme.colors.white,
  color: Theme.colors.error700,
  border: '1px solid ' + Theme.colors.error300
}).pseudo({
  ':hover': { backgroundColor: Theme.colors.error50 },
  ':active': {
    backgroundColor: Theme.colors.white,
    boxShadow: '0px 0px 0px 4px ' + Theme.colors.error100
  },
  ':disabled': {
    backgroundColor: Theme.colors.white,
    color: Theme.colors.error300,
    border: '1px solid ' + Theme.colors.error200
  },
  ':disabled:hover': {
    backgroundColor: Theme.colors.white,
    boxShadow: 'none'
  }
});

export const ButtonTertiaryDestructive = new Style({
  backgroundColor: Theme.colors.transparent,
  color: Theme.colors.error700,
  border: '0'
}).pseudo({
  ':hover': { backgroundColor: Theme.colors.error50 },
  ':active': {
    backgroundColor: Theme.colors.transparent
  },
  ':disabled': {
    color: Theme.colors.gray300
  },
  ':disabled:hover': {
    backgroundColor: Theme.colors.transparent
  }
});

export const ButtonTertiaryGrayDestructive = new Style({
  backgroundColor: Theme.colors.transparent,
  color: Theme.colors.error700,
  border: '0'
}).pseudo({
  ':hover': { backgroundColor: Theme.colors.error50 },
  ':active': {
    backgroundColor: Theme.colors.transparent
  },
  ':disabled': {
    color: Theme.colors.error300
  },
  ':disabled:hover': {
    backgroundColor: Theme.colors.transparent
  }
});

export const LinkColorDestructive = new Style({
  backgroundColor: Theme.colors.transparent,
  color: Theme.colors.error700,
  border: '0', padding: 0, height: 'auto'
}).pseudo({
  ':hover': { color: Theme.colors.error800 },
  ':active': {
    color: Theme.colors.error700
  },
  ':disabled': {
    color: Theme.colors.gray300
  },
  ':disabled:hover': {
    color: Theme.colors.error700
  }
});

export const LinkGrayDestructive = new Style({
  backgroundColor: Theme.colors.transparent,
  color: Theme.colors.error700,
  border: '0', padding: 0, height: 'auto'
}).pseudo({
  ':hover': { color: Theme.colors.error800 },
  ':active': {
    color: Theme.colors.error700
  },
  ':disabled': {
    color: Theme.colors.error300
  },
  ':disabled:hover': {
    color: Theme.colors.error700
  }
});

export default class Button extends DefaultButton {
  constructor(text: string, icon?: string, trailing = false) {
    super();

    this.text(text).borderRadius(8)
      .fontWeight(Theme.weights.bold)
      .cursor('pointer');

    if (icon) {
      this.display('flex').alignItems('center').gap(8).addChild(
        new EM().addClassName(icon)
          .color('inherit').fontSize('var(--icon-size)')
      )
    }

    if (!trailing) {
      this.flexDirection('row-reverse')
    }
  }
}

