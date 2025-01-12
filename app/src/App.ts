import { Colors, Lightning, Utils, Router } from "@lightningjs/sdk";
import routes from "./Router";
import Menu from "./Components/Menu";

interface AppTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: object;
  Widgets: {
    Menu: typeof Menu;
  };
}

export type CardProps = {
  title: string;
  year: number;
  poster: string;
  photo_width: number;
  photo_height: number;
};

interface AppTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: object;
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
          rect: true,
        },
      },
    };
  }

  override async _setup() {
    Router.startRouter(routes, this);
  }

  static getFonts() {
    return [
      {
        family: "Nunito",
        url: Utils.asset("fonts/Nunito.ttf"),
      },
    ];
  }
}
