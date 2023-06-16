import { Colors, Lightning } from "@lightningjs/sdk";
import { CardContentVertical } from "@lightningjs/ui-components";

export type CardProps = {
  title: string;
  year: number;
  poster: string;
  photo_width: number;
  photo_height: number;
};

interface CardTemplateSpec extends Lightning.Component.TemplateSpec {
  Card: typeof CardContentVertical;
}

export default class Card
  extends Lightning.Component<CardTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<CardTemplateSpec>
{
  static override _template(): Lightning.Component.Template<CardTemplateSpec> {
    return {
      Card: {
        type: CardContentVertical,
        item: {},
      },
    };
  }

  set item(cardItems: CardProps) {
    const { title, year, poster, photo_height, photo_width } = cardItems;

    this.patch({
      Card: {
        type: CardContentVertical,
        item: {
          title,
          src: poster,
        },
      },
    });
  }
}
