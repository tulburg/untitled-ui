import { Input } from "@javascriptui/core";

type ValidStore = {
  [key: string]: {
    touched: boolean, empty: boolean, invalid: boolean, target: Input, value: any,
    validFunction?: (value: string) => boolean, config?: { required?: boolean, pattern?: string | RegExp }
  }
}
export class InputValidator {
  store: ValidStore = {};

  checkTimeout: any;
  events: any = {};

  constructor() {}

  register(name: string, target: Input, config?: { required?: boolean, pattern?: string | RegExp },
    valid?: (value: string) => boolean) {
    this.events[name] = {
      change: (e: Event) => this.change(e, name),
      input: (e: Event) => this.change(e, name),
      blur: (e: Event) => this.blur(e, name),
      focus: (e: Event) => this.focus(e, name)
    };
    Object.keys(this.events[name]).forEach(key => {
      target.node().addEventListener(key, this.events[name][key]);
    });

    this.store[name] = {
      touched: false, empty: false, invalid: false, target: target, validFunction: valid, value: undefined,
      config: config
    };
  }

  change = (event: Event, name: string) => {
    this.clearErrors();
    if (this.checkTimeout) clearTimeout(this.checkTimeout);
    this.checkTimeout = setTimeout(() => {
      if (!this.store[name].touched) { // set touched
        this.store[name].touched = true;
      }
      const value: string = (<any>event.target).value;
      if (this.store[name].config && this.store[name].config.pattern) { // check matching pattern
        if (typeof !this.store[name].config.pattern === 'string') {
          this.store[name].invalid = !(<string>this.store[name].config.pattern).match(value);
        } else this.store[name].invalid = !(<RegExp>this.store[name].config.pattern).test(value);
      }
      if (value.length > 0) {
        this.store[name].empty = false;
      } else if (this.store[name].config && this.store[name].config.required) {
        this.store[name].empty = true;
      }
    }, 0);
  }

  blur = (event: Event, name: string) => {
    this.clearErrors();
    const value: string = (<any>event.target).value;
    if (this.store[name].config && this.store[name].config.required && (value !== undefined && value.trim().length === 0)) {
      this.store[name].empty = true;
    } else this.change(event, name);
  }

  focus = (event: Event, name: string) => {
    const value: string = (<any>event.target).value;
    if (value.trim().length < 1 && this.store[name].config.required) this.store[name].empty = true;
    this.store[name].touched = true;
  }

  clearErrors = () => {
  }

  clear() { this.store = {}; }

  validate(): Promise<ValidStore> {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(this.store);
      let failed = false;
      if (keys.length === 0) reject({ name: '*', state: { empty: true } });
      keys.forEach((key, i) => {
        this.store[key].value = (<any>this.store[key].target.node()).value;
        if (!this.store[key].touched && this.store[key].config && this.store[key].config.required) {
          failed = true;
          reject({ name: key, state: this.store[key] });
        }
        if (this.store[key].empty || this.store[key].invalid) {
          if (this.store[key].validFunction && !this.store[key].validFunction((<any>this.store[key].target.node()).value)) {
            failed = true;
            reject({ name: key, state: this.store[key] });
          }
          if (!this.store[key].validFunction) {
            failed = true;
            console.log()
            reject({ name: key, state: this.store[key] });
          }
        }
        if (i === keys.length - 1 && !failed) resolve(this.store);
      });
    });
  }

  destroy() {
    Object.keys(this.store).forEach(k => {
      this.events[k].forEach((events: any) => {
        Object.keys(events).forEach(name => {
          this.store[k].target.node().removeEventListener(name, events[name]);
        });
      });
    });
    delete this.store;
  }
}
