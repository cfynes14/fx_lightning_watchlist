import { Colors, Lightning, Utils } from "@lightningjs/sdk";
import { Color } from "../Utils/colors";
import { Icons } from "./Menu";

export type CardProps = {
  title: string;
  year: number;
  poster: string;
  photo_width: number;
  photo_height: number;
};

interface CardTemplateSpec extends Lightning.Component.TemplateSpec {
  Container: {
    Card: object;
    Year: object;
    Title: object;
    Bookmark: { Icon: object };
  };
  items: CardProps;
  bookmarkStatus: boolean;
}

export class Card
  extends Lightning.Component<CardTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<CardTemplateSpec>
{
  static override _template(): Lightning.Component.Template<CardTemplateSpec> {
    return {
      Container: {
        Card: {
          w: 350,
          h: 250,
          rect: true,
          shader: {
            type: Lightning.shaders.RoundedRectangle,
            radius: 10,
            stroke: 0,
            strokeColor: Colors(Color.White).get(),
          },
        },
        Bookmark: {
          w: 45,
          h: 45,
          y: 10,
          x: this.width - 40 - 20,
          rect: true,
          color: Colors(Color.Black).alpha(0.6).get(),
          shader: {
            type: Lightning.shaders.RoundedRectangle,
            radius: 20,
          },
          Icon: {
            y: 13,
            x: 10,
            texture: Lightning.Tools.getSvgTexture(Icons.bookmark, 25, 18),
            color: Colors(Color.White).get(),
          },
        },
        Year: {
          y: 260,
          w: 350,
          text: {
            text: "",
            textColor: Colors(Color.Focused).get(),
            fontSize: 15,
            fontFace: "Nunito",
          },
        },
        Title: {
          y: 300,
          text: {
            text: "",
            textColor: Colors(Color.White).get(),
            fontSize: 22,
            fontFace: "Nunito",
            wordWrapWidth: 300,
            maxLines: 1,
            maxLinesSuffix: "...",
          },
        },
      },
    };
  }

  isSelected = false;

  set items(cardItems: CardProps) {
    const { title, year, poster } = cardItems;

    this.patch({
      Container: {
        Card: {
          src: Utils.asset(poster),
        },
        Year: {
          text: {
            text: year.toString(),
          },
        },
        Title: {
          text: {
            text: title,
          },
        },
      },
    });
  }

  changeBookmark(status: boolean) {
    this.patch({
      Container: {
        Bookmark: {
          Icon: {
            color: Colors(status ? Color.Focused : Color.White).get(),
          },
        },
      },
    });
  }

  set bookmarkStatus(status: boolean) {
    this.isSelected = status;
    this.changeBookmark(status);
  }

  static get height() {
    return 310;
  }

  static get width() {
    return 350;
  }

  override _handleEnter() {
    this.isSelected = !this.isSelected;
    this.changeBookmark(this.isSelected);
  }

  override _focus() {
    this.patch({
      shader: {
        stroke: 2,
      },
    });
  }

  override _unfocus() {
    this.patch({
      shader: {
        stroke: 0,
      },
    });
  }
}
