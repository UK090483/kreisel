import Section from "components/Atoms/Section/Section";

import React from "react";

const Style = () => {
  return (
    <Section>
      <div className="container mx-auto py-8">
        <button
          onClick={() => {
            fetch("/api/bla")
              .then((res) => res.json())
              .then((b) => {});
          }}
        >
          BLAAA
        </button>
      </div>
    </Section>
  );
};

// eslint-disable-next-line import/no-unused-modules
export default Style;
