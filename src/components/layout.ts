import { Container } from "@javascriptui/core";

//
// This file contains all layout components
//

export class FlexHorizontal extends Container {
  constructor(margin: number = 0) {
    super();
    this.display('flex').alignItems('center')
      .gap(margin);
  }
}

export class FlexVertical extends Container {
  constructor(margin: number = 0) {
    super();
    this.display('flex').justifyItems('center')
      .flexDirection('column')
      .gap(margin);
  }
}
