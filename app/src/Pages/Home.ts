import { Lightning, Colors } from "@lightningjs/sdk";
import { Color } from "../Utils/colors";

interface HomeTemplateSpec extends Lightning.Component.TemplateSpec {
  Container: object;
}

export interface HomeTypeConfig
  extends Lightning.Component.TypeConfig {
  IsPage: true;
}

export default class Home
  extends Lightning.Component<HomeTemplateSpec, HomeTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<HomeTemplateSpec>
{
  static override _template(): Lightning.Component.Template<HomeTemplateSpec> {
    return {
      w: 1920,
      h: 1080,
      rect: true,
      color: Colors(Color.Background).get(),
    };
  }
}
