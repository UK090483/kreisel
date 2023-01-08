// import schemaTypes from "all:part:@sanity/base/schema-type";
// import createSchema from "part:@sanity/base/schema-creator";

import objects from "./objects";
import plugs from "./pageComponents/plugs";
import pageComponents from "./pageComponents";

import Persons from "./Persons";
import Navigation from "./Navigation";
import Page from "./Page";
import Shop from "./Shop";

import Testimonial from "./Testimonial";
import Therapist from "./Therapist";
import Seo from "./Seo";
import Image from "./Image";
import Settings from "./Settings";
import Reusable from "./Reusable";

const schema = [
  ...Settings,
  ...Image,
  ...Seo,
  ...Shop,
  ...Page,
  ...Persons,
  ...Reusable,
  ...Testimonial,
  ...Therapist,
  ...Navigation,
  ...objects,
  ...pageComponents,
  ...plugs,
];

export default schema;

// export default createSchema({
//   name: "default",
//   types: schemaTypes.concat([
//     ...Settings,
//     ...Image,
//     ...Seo,
//     ...Shop,
//     ...Page,
//     ...Persons,
//     ...Reusable,
//     ...Testimonial,
//     ...Therapist,
//     ...Navigation,
//     ...objects,
//     ...pageComponents,
//     ...plugs,
//   ]),
// });
