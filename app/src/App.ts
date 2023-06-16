import { Lightning, Utils, Router } from "@lightningjs/sdk";
import routes from "./Router";
import Menu from "./Components/Menu";

interface AppTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: object;
  Widgets: {
    Menu: typeof Menu;
  };
}

export class App
  extends Router.App
  implements Lightning.Component.ImplementTemplateSpec<AppTemplateSpec>
{
  readonly Background = this.getByRef("Background")!;

  static override _template(): Lightning.Component.Template<AppTemplateSpec> {
    return {
      w: 1920,
      h: 1080,
      Background: {
        w: 1920,
        h: 1080,
      },
      Widgets: {
        Menu: {
          type: Menu,
        },
      },
    };
  };

  override async _setup() {
    super._setup();
    Router.startRouter(routes, this);
  }

  static getFonts() {
    return [
      {
        family: "Regular",
        url: Utils.asset("fonts/Roboto-Regular.ttf") as string,
      },
    ];
  }
}
