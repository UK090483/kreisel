import Blog from "./blog";
import page from "./page";
import navigation from "./navigation";
import redirect from "./redirect";
import footer from "./footer";
import pageType from "./pageType";
import article from "./article";
import therapist from "./therapist";
import event from "./event";
import course from "./course";
import testimonial from "./testimonial";

const Documents = [
  ...Blog,
  testimonial,
  page,
  navigation,
  redirect,
  footer,
  pageType,
  article,
  therapist,
  event,
  course,
];

export default Documents;
