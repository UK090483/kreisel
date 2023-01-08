import ImageGalleryPlug from "./ImageGaleriePlug";

import { render, screen, act } from "@testing-library/react";

describe("ImageGalerie Plug", () => {
  it("should render", () => {
    render(
      <ImageGalleryPlug
        key={"k"}
        node={{ _type: "imageGalleryPlug", items: [] }}
      />
    );
  });
});
