import { Lightning, Colors, Router } from "@lightningjs/sdk";
import { Color } from "../Utils/colors";

interface MenuTemplateSpec extends Lightning.Component.TemplateSpec {
  Recommended: object;
  Bookmarks: object;
}

export enum Icons {
  bookmark = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIGZpbGw9IiNGRkZGRkYiIGhlaWdodD0iODAwcHgiIHdpZHRoPSI4MDBweCIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgCgkgdmlld0JveD0iMCAwIDQ2My4yNzMgNDYzLjI3MyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTMxMy44NzQsMEgxNDkuMzk4Yy0xNi4yOCwwLTI5LjQ3NywxMy4xOTctMjkuNDc2LDI5LjQ3N3Y0MjIuMzY4YzAsNC41MzIsMi42NzksOC42MzcsNi44MjcsMTAuNDYxCgkJCWM0LjE0OCwxLjgyNCw4Ljk4MywxLjAyNSwxMi4zMjQtMi4wMzhsODQuODQtNzcuNzg4YzQuMzY5LTQuMDA2LDExLjA3Ni00LjAwNiwxNS40NDYsMGw4NC44NCw3Ny43ODgKCQkJYzMuMzQsMy4wNjMsOC4xNzUsMy44NjMsMTIuMzI0LDIuMDM4czYuODI3LTUuOTI5LDYuODI3LTEwLjQ2MWgwLjAwMVYyOS40NzdDMzQzLjM1MSwxMy4xOTcsMzMwLjE1NCwwLDMxMy44NzQsMHoiLz4KCTwvZz4KPC9nPgo8L3N2Zz4=",
  recommended = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0Ij48cGF0aCBkPSJNMCAwaDE1LjIwNnYxNS4yMDZIMHoiIGZpbGw9IiNGRkZGRkYiLz48cGF0aCBkPSJNMTYuNzk0IDBIMzJ2MTUuMjA2SDE2Ljc5NHoiIGZpbGw9IiNGRkZGRkYiLz48cGF0aCBkPSJNMCAxNi43OTRoMTUuMjA2VjMySDB6IiBmaWxsPSIjRkZGRkZGIi8+PHBhdGggZD0iTTE2Ljc5NCAxNi43OTRIMzJWMzJIMTYuNzk0eiIgZmlsbD0iI0ZGRkZGRiIvPjwvc3ZnPg==",
}

export default class Menu
  extends Lightning.Component<MenuTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<MenuTemplateSpec>
{
  static override _template(): Lightning.Component.Template<MenuTemplateSpec> {
    return {
      y: 50,
      x: 50,
      w: 130,
      h: 980,
      rect: true,
      color: Colors(Color.Primary).get(),
      shader: {
        type: Lightning.shaders.RoundedRectangle,
        radius: 30,
      },
      Recommended: {
        y: 50,
        x: 50,
        texture: Lightning.Tools.getSvgTexture(Icons.recommended, 30, 30),
        color: Colors(Color.White).get(),
      },
      Bookmarks: {
        y: 120,
        x: 40,
        texture: Lightning.Tools.getSvgTexture(Icons.bookmark, 50, 27),
        color: Colors(Color.White).get(),
      },
    };
  }

  focused!: "recommended" | "bookmark";

  Recommended = this.getByRef("Recommended")!;

  Bookmarks = this.getByRef("Bookmarks")!;

  switchFocus(status: boolean) {
    if (status) {
      this.Recommended.color = Colors(Color.White).get();
      this.Bookmarks.color = Colors(Color.Focused).get();
    } else {
      this.Recommended.color = Colors(Color.Focused).get();
      this.Bookmarks.color = Colors(Color.White).get();
    }
  }

  override _firstActive() {
    this.focused = "recommended";
    this.switchFocus(false);
  }

  override _handleUp() {
    if (this.focused === "bookmark") {
      this.focused = "recommended";
      this.switchFocus(false);
    } else {
      this.focused = "bookmark";
      this.switchFocus(true);
    }
  }

  override _handleDown() {
    if (this.focused === "recommended") {
      this.focused = "bookmark";
      this.switchFocus(true);
    } else {
      this.focused = "recommended";
      this.switchFocus(false);
    }
  }

  override _handleEnter() {
    if (this.focused === "recommended") {
      Router.navigate("home");
    } else {
      Router.navigate("bookmarks");
    }
  }

  override _handleRight() {
    Router.focusPage();
  }
}
