import { Section } from "components/Section/Section";
import useInView from "hooks/useInView";
import React from "react";

const Style = () => {
  useInView(
    { step: ".step", debug: true, progress: true, threshold: 1 },
    {
      onStepEnter: (enter) => {
        console.log({ enter });

        enter.element.classList.add("border-red");
      },
      onStepExit: (exit) => {
        console.log({ exit });
        exit.element.classList.remove("border-red");
      },
      onStepProgress: (progress) => {
        console.log({ progress, n: progress.progress });
      },
    }
  );
  return (
    <Section>
      <div className="container mx-auto py-8">
        <div className=" flex h-screen w-full items-center justify-center bg-green-500"></div>
        <div className=" flex h-screen w-full items-center  justify-center">
          <div className="step h-60  border-2 bg-gray-500">Bla</div>
        </div>

        <div className="  flex h-screen w-full items-center bg-green-500">
          <div className="step h-full border-2 bg-gray-500">BlaFull</div>
        </div>

        <div className="  flex h-screen w-full items-center bg-green-500">
          <div className="step h-14  border-2 bg-gray-500">Bla2</div>
        </div>
      </div>
    </Section>
  );
};

// eslint-disable-next-line import/no-unused-modules
export default Style;
