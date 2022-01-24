//@ts-nocheck

import { Image } from "@components/Image";
import { Section } from "@components/organisms/Section/Section";
import Typo from "@components/Typography/Typography";
import Underline from "@components/Underline";
import { NavigationMobile } from "@services/NavigationService/NavigationMobile";
import { NavigationModul } from "@services/NavigationService/NavigationModul";
import { NavOverview } from "@privateModules/Navigation/NavOverview";
import { nav } from "@services/NavigationService/t";

const Home = () => {
  return (
    <>
      <div className="pt-[200px] pl-80 ">
        <Typo variant="h1">
          <Underline>Test</Underline>
        </Typo>

        <Typo variant="h2">
          <Underline>Test</Underline>
        </Typo>
        <Typo variant="h3">
          <Underline>Test</Underline>
        </Typo>
        <Typo variant="h4">
          <Underline>Test</Underline>
        </Typo>
        <Typo variant="h5">
          <Underline>Test</Underline>
        </Typo>
        <Typo variant="h6">
          <Underline>Test</Underline>
        </Typo>
      </div>
      {/* <NavigationMobile items={nav} />
      <div className="flex flex-col items-center justify-center w-full h-screen ">
        <div>
          <NavigationModul items={nav} />
        </div>

        <div>
          <NavOverview items={nav} />
        </div>
      </div> */}
      {/* 
      <Section className="col-gap-20 pt-40 lg:col-count-2">
        <div className="relative w-full h-32">
          <Image />
        </div>
        <Typo variant="h2" hand>
          fermentum malesuada porta. Sed consequat
        </Typo>
        <Typo>
          Sed malesuada eleifend ullamcorper. Donec dapibus ante eget
          condimentum molestie. Vestibulum egestas leo sed cursus accumsan.
          Phasellus fermentum malesuada porta. Sed consequat, nibh quis laoreet
          eleifend, turpis est elementum lorem, vel tristique mi leo et nisi.
          Aenean eleifend suscipit elit quis digniss Nulla sed metus neque.
          Aenean molestie orci et orci ultricies, sit amet fringilla ex
          ultricies. Interdum et malesuada fames ac ante ipsum primis in
          faucibus. Pellentesque blandit leo sed lorem rutrum, ut efficitur
          massa gravida. Phasellus venenatis nisi sapien, ac suscipit felis
          imperdiet sed. A vitae, malesuada sit ut lectus lectus. Leo, ac urna,
          ullamcorper sit. Id aliquet vehicula nullam felis, quis diam velit.
          Non, sit erat facilisi ornare. Molestie proin ornare sit venenatis
          augue dolor. Eu dui phasellus id pellentesque. Ut magna vitae sit
          magna amet mi. Elementum sed dignissim pretium etiam nibh facilisi.
          Malesuada nunc mauris ut arcu amet sit vitae, turpis iaculis. Et ac
          vel risus, enim turpis turpis. Cras ornare justo, ante consectetur
          eget ultrices. Eu mattis nisl curabitur vitae dignissim massa non.
          Eget netus non amet tempor nisi sit. Cursus odio vestibulum massa leo
          egestas leo metus. Eget vivamus massa aliquet rhoncus. Molestie
          faucibus enim vulputate cras egestas mi, congue scelerisque ornare.
          Sem mattis augue id turpis libero, consequat, quis non. Blandit nullam
          malesuada nibh id vestibulum. Augue placerat consectetur non purus et
          tellus aliquam nulla adipiscing. Urna massa facilisis nec, nulla eget
          eu egestas habitasse massa. Posuere nisi id cras adipiscing rutrum
          dui. fgfdfg A vitae, malesuada sit ut lectus lectus. Leo, ac urna,
          ullamcorper sit. Id aliquet vehicula nullam felis, quis diam velit.
          Non, sit erat facilisi ornare. Molestie proin ornare sit venenatis
          augue dolor. Eu dui phasellus id pellentesque. Ut magna vitae sit
          magna amet mi. Elementum sed dignissim pretium etiam nibh facilisi.
          Malesuada nunc mauris ut arcu amet sit vitae, turpis iaculis. Et ac
          vel risus, enim turpis turpis. Cras ornare justo, ante consectetur
          eget ultrices. Eu mattis nisl curabitur vitae dignissim massa non.
          Eget netus non amet tempor nisi sit. Cursus odio vestibulum massa leo
          egestas leo metus. Eget vivamus massa aliquet rhoncus. Molestie
          faucibus enim vulputate cras egestas mi, congue scelerisque ornare.
          Sem mattis augue id turpis libero, consequat, quis non. Blandit nullam
          malesuada nibh id vestibulum. Augue placerat consectetur non purus et
          tellus aliquam nulla adipiscing. Urna massa facilisis nec, nulla eget
          eu egestas habitasse massa. Posuere nisi id cras adipiscing rutrum dui
        </Typo>
      </Section> */}
    </>
  );
};

export default Home;
