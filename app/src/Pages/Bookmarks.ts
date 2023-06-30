import { Lightning, Colors } from "@lightningjs/sdk";
import { Color } from "../Utils/colors";
import { Card } from "../Components/Card";
import data from "../../../items.json";

interface BookmarksTemplateSpec extends Lightning.Component.TemplateSpec {
  Container: {
    Title: object;
    ItemsContainer: object;
  };
}

export interface BookmarksTypeConfig extends Lightning.Component.TypeConfig {
  IsPage: true;
}

export type CardProps = {
  title: string;
  year: number;
  poster: string;
  photo_width: number;
  photo_height: number;
};

export default class Bookmarks
  extends Lightning.Component<BookmarksTemplateSpec, BookmarksTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<BookmarksTemplateSpec>
{
  static override _template(): Lightning.Component.Template<BookmarksTemplateSpec> {
    return {
      w: 1920,
      h: 1080,
      rect: true,
      color: Colors(Color.Background).get(),
      Container: {
        x: 130 + 2 * 50,
        Title: {
          y: 50,
          text: {
            text: "Bookmarks",
            textColor: Colors(Color.White).get(),
            fontSize: 36,
            fontFace: "Nunito",
          },
        },
        ItemsContainer: {
          y: 150,
          h: 1080,
          w: 1700,
          children: [],
        },
      },
    };
  }

  ItemsContainer = this.getByRef("Container")!.getByRef("ItemsContainer")!;

  numberOfColumns = 4;

  offset = 20;

  index = 0;

  override _init() {
    // Router.focusWidget("Menu");
    // add, update, add to watchlist

    data.forEach((items: CardProps, index: number) => {
      const cardWidth = Card.width + this.offset;
      const cardHeight = Card.height + 100;

      const card = this.stage.element({
        type: Card,
        items,
        bookmarkStatus: true,
        x:
          (index >= this.numberOfColumns ? index - this.numberOfColumns : index) * cardWidth +
          this.offset / 2,
        y: index >= this.numberOfColumns ? cardHeight : 0,
      });
      this.ItemsContainer?.childList.add(card);
    });
  }

  override _getFocused() {
    return this.ItemsContainer.children[this.index] as Lightning.Component;
  }

  override _handleRight() {
    if (this.index > 0) {
      this.index += 1;
    }
  }

  override _handleLeft() {
    if (this.index > 0 && this.index < this.ItemsContainer.children.length) {
      this.index -= 1;
    }
  }

  override _handleUp() {
    if (this.index > this.numberOfColumns) {
      this.index -= this.numberOfColumns;
    }
  }

  override _handleDown() {
    if (this.index < this.numberOfColumns) {
      this.index += this.numberOfColumns;
    }
  }
}
