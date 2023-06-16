import { Colors, Lightning, Utils, Router } from "@lightningjs/sdk";
import { Card, CardContentVertical, Tile } from "@lightningjs/ui-components";
import routes from "./Router";
import Menu from "./Components/Menu";
import data from "../../items.json";

interface AppTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: object;
  Widgets: {
    Menu: typeof Menu;
  };
  Container: {
    children: Tile[];
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

  Container = this.getByRef("Container")!;

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
          color: Colors("#10141F").get(),
        },
      },
      Container: {
        x: 200,
        h: 1080,
        w: 1700,
        flex: {
          direction: "row",
        },
        children: [],
      },
    };
  }

  override async _setup() {
    super._setup();
    Router.startRouter(routes, this);
  }

  override _init() {
    Router.focusWidget("menu");
  }

  static getFonts() {
    return [
      {
        family: "Nunito",
        url: Utils.asset("fonts/Nunito.ttf"),
      },
    ];
  }

  setItems() {
    const children = data.map((item: CardProps) => {
      const { title, year, poster, photo_height, photo_width } = item;
      console.log("POSTER", poster);
      return {
        type: Tile,
        title,
        src: poster,
      };
    });

    console.log("CHILDREN", children);

    this.Container.children = children;
  }

  override _init() {
    this.setItems();
  }
}
