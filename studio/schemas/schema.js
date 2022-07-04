import schemaTypes from "all:part:@sanity/base/schema-type";
import createSchema from "part:@sanity/base/schema-creator";

import objects from "./objects";
import plugs from "./pageComponents/plugs";
import pageComponents from "./pageComponents";

import Persons from "./Persons";
import Navigation from "./Navigation";
import Page from "./Page";
import Shop from "./Shop";
import Events from "./Events";
import Testimonial from "./Testimonial";
import Therapist from "./Therapist";
import Seo from "./Seo";
import Image from "./Image";
import Settings from "./Settings";
import Tooltip from "./Tooltip";
import tooltipDocument from "./Tooltip/tooltipDocument";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    ...Tooltip,
    ...Settings,
    ...Image,
    ...Seo,
    ...Shop,
    ...Page,
    ...Persons,
    ...Events,
    ...Testimonial,
    ...Therapist,
    ...Navigation,
    ...objects,
    ...pageComponents,
    ...plugs,
  ]),
});
