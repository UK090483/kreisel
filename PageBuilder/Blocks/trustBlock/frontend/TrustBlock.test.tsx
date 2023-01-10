import TrustBlock from "./TrustBlock";
import { trustBlockQuery } from "../trustBlock.query";
import { mockClient } from "lib/SanityPageBuilder/lib/MockClient";
import { screen, render } from "@testing-library/react";
import React from "react";

const content = [
  {
    _key: "0489510a4b30",
    _type: "block",
    children: [
      {
        _key: "44eb18bbc08f",
        _type: "span",
        marks: [],
        text: " TestContent ",
      },
    ],

    style: "h1",
  },
];

const items = [
  {
    _key: "1f80da5138df",
    _type: "trustItem",
    image: {
      alt: "sdf",
      aspectRatio: 1,
      crop: null,
      height: 301,
      hotspot: null,
      id: "5b5d9c66c725fa30b183a4bf363fa7d790c1084d",
      lqip: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEm0lEQVQ4jXVU/09TVxQ/pXyRUqwVkAJWKjFIVVoopbTv3XvOva+vpdgWi1CcDN0cypBvQ2XZHAwEJdPNn42LZi6bGXFbolsyYxa/LZuZWRaTybLsh/lP7B/YclsU/MGbnJz33j3vcz7n3Hs+AOtWIrEXOCdAFEAkc4YoLJxTISIVI5IVkSyItBpHIISEV65UqjsXxDnmPKKwIgobonAiikpEcuSBxeo+gdvteTWgYqQyr7IsQCQbIlUhUgMiNSHSVkSyK9bPWcbjnS+DPC9RGediPaBiV4ZINZyTn3MKIpIHUZSrZOviYO2Z8oDPjbGXAJUVrTJsQaQwIm3Ps871dR0RevHPuiwvTAVbWJ6tAqwhpGZC0hCpmXMqR44A7qPAGIIQxgtgKaMAghAYY0DIQRIWGgLLDcE3ScJS5OTgXDQyLtoZFybnJDinOkFYHBW81BR8gyl5gRQSYrE4GAIB2FrJBToTGyO63BbRpQLx6Ey4UzGtdaLP13PqwJ43Dybbk4TkZVzU60xs15is0ZmwEZKF1KlzAiBECISjENFlYdLUagaS7f7+rg7WFdXbQpqxfTLri9ycrl68P7P56rVxd39Msl0CMbIvHmEH9oaa0zGtsi1sFPhDZv5Qxnt9oHoSN1jJ0huNrctTtRPLU7WznwztSBCi6/TArvCjOcelvz8qvftozjGYiUfcY71+89Pj9Se/nKwbvTi0w58ytaK4ZDDW2wJwY6oGTmR3Q8rUyr+YqOt5smj/YWXJ9vjhrHN4ZH/rluFMa/Pt9yrPPTlrv/Hzh5vS2USH89uTru4ni/bvH5/ZeG95qvb1oUzAPn/IC1dG6wEuvtUAAAvqyjiujG7r/3PJ9uDZhZK/fl8oH58b9G7OdoUaLo/Uj96arp6/OV3tNwWz3Z9x7v/nQskvf5wrW/nmZM3IcE9g09UxDzyYqQA41e+F65NbLY2BTsfi4Z3moznHtafnym7/Ou/oGettsSdNrX4y6+ueG/RmzhxqcvlCZtGd9yv3Pl0qu/Pbwsa719+py/YmwvZ7My549nFp/h4OJNuLmtrilRN9vvCt6eqFh7PO8/c+qPC1RcwySdjQabCOrqgeSBjM6fYlrd9NV+NPs86vfjxdceXi0A4RCEft7762G/67CgCMkepfsT9kVh3LtPovve059vm4e+Dycc8W1550sSSqYFxsYVxUGQJtrt1p6+URT/DrEzXzy1O1w5N9viZvMF52or/ZEgibADojiEtmbQsbpYfTwbqJPl/0aCZgJKNaXUuHWdJpsIKUqVu6Y1pBTPJCnUnHUCYQnBv09p4/0ug/lAradwY6rRN9fujQDABNFyAQoT1iQMLQy2KSeSXxIOfk4Zxsggg4CtBZThuLEEV1XPKWdEwL7Ytrrq4os2QTIYhJDgD/5ktW46d6qTMqZoyqOCcX52TnXAnqmgDkJU1syGuj2IooHGpK8nMvoDGYzpcsCaE1HFXAFjXPgtAaFUpkEQzicOTIwVzijggHrjOQRBZJVCQJraoCNcPKq5icYqzJF4Ku3td9U+xWVj7L7THGc94UDIKR3LjmmGks79X6H08va2kpyh9TAAAAAElFTkSuQmCC",
      type: "image/svg+xml",
      url: "https://cdn.sanity.io/images/jgnu3d9f/production/5b5d9c66c725fa30b183a4bf363fa7d790c1084d-301x301.svg",
      width: 301,
    },
    name: "TestItem",
    value: "345",
  },
];

const database: any[] = [];

describe("TrustBlock", () => {
  it("query should be valid ", async () => {
    const client = mockClient({ database });
    const res = await client.fetch(`*[_type == "page"]{
          'content':content[]{
            ${trustBlockQuery}
          }
    
        }`);
  });
  it("should render", () => {
    render(<TrustBlock />);
  });

  it("should render content", () => {
    render(<TrustBlock content={content} />);
    expect(screen.getByText("TestContent")).toBeInTheDocument();
  });

  it("should render Items", () => {
    render(<TrustBlock items={items} />);
    expect(screen.getByText("TestItem")).toBeInTheDocument();
  });
});
