import { ImageMetaResult } from "../query";

export const imageMeta: ImageMetaResult = {
  alt: "testAlt",
  aspectRatio: 1.412909503730133,
  crop: null,
  height: 3083,
  id: "4ba76be5814da24ee8ea5dd0e6e0225c9cfccf29",
  lqip: "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAOABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABwADBv/EACEQAAIBBAIDAQEAAAAAAAAAAAECAwAEBREGQRIiMSFh/8QAFQEBAQAAAAAAAAAAAAAAAAAABAX/xAAdEQABBAIDAAAAAAAAAAAAAAABAAIDBBIhMZHw/9oADAMBAAIRAxEAPwAowXHiltdJcxacjwB73/K0uOK4eJZtXU0rrEGCL9DHo098S4vj8xjRd3KnzLkMB8OqMLrGtjuX362giEDzHSts60aBQsm1IcRwNhWZREwBh7R9keIGCZBDeRFGQN7+pG+iKq7PNYVL3ISTSvpj+aHVVWhSf4opdCTpf//Z",
  type: "image/jpeg",
  url: "https://cdn.sanity.io/images/jgnu3d9f/production/4ba76be5814da24ee8ea5dd0e6e0225c9cfccf29-4356x3083.jpg",
  width: 4356,
};

export const imageMeatWithCrop = {
  ...imageMeta,
  crop: {
    _type: "sanity.imageCrop",
    bottom: 0,
    left: 0.0034722222222222225,
    right: 0.517361111111111,
    top: 0,
  },
};

export const imageMeatWithHotspot = {
  ...imageMeta,
  hotspot: {
    _type: "sanity.imageHotspot",
    height: 1,
    width: 0.47916666666666674,
    x: 0.24305555555555558,
    y: 0.5,
  },
};
