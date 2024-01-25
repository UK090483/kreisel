import { Listing } from "components";

import { listingBlockQuery } from "PageBuilder/Blocks/listingBlock/listingBlock.query";
import { ComponentProps } from "react";
const render = (
  props?: Partial<
    Parameters<
      typeof cy.mountPageBuilderComponent<ComponentProps<typeof Listing>>
    >[0]
  >
) => {
  cy.mountPageBuilderComponent<ComponentProps<typeof Listing>>({
    Component: Listing,
    blockQuery: listingBlockQuery,
    ...props,
    blockData: {
      _key: "key",
      _type: "listing",
      ...props?.blockData,
    },
  });
};

describe("ListingBlock Custom", () => {
  it.only("should Render custom Card", () => {
    cy.intercept("therapist", {
      member: [...fakeData, ...fakeData, ...fakeData, ...fakeData],
    }).as("therapist");
    render({
      blockData: {
        contentType: "therapist",
      },
    });

    // cy.contains("Title");
    // cy.contains("Description");
  });
});

const fakeData = [
  {
    zipCode: "1700",
    description: "Bli Bla blub sdfjskldfj\n\nsdf\n",
    qualification: "ffffff\r\niiiiifhggdff\r\njkjhkjh rrrrr",
    phone: "+4553856002",
    website: "",
    firstName: "Konrad",
    name: "Ullrich",
    image: {
      alt: null,
      url: "https://cdn.sanity.io/images/jgnu3d9f/production/445136c8e22ca8507228b11293128a16c26f62e5-640x480.png",
      hotspot: null,
      asset: {
        _ref: "image-445136c8e22ca8507228b11293128a16c26f62e5-640x480-png",
        _type: "reference",
      },
      aspectRatio: 1.3333333333333333,
      lqip: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEB0lEQVQ4jR3M/VOTBQDA8f0xef1gl3dlKTLhQM1hNpgvGxgoQzcIhIk6KF7cgA0GbGzs9dnLs2fv7+NFQNPUNLPo7Jeuzk479TjF6+ouS8uMfvh29vkDPjJVxWuoKjehqdnMx7p6Qn4rs2EPI3YLNvsobs8kQtCJGPURjwnEpABixIsY9iJFfORSItcuLXLvznc8/+MpMs3OTairXqepdjPdmmpcFgP+kAPbrA3H7AT+gINwxEM8LpBKhkkmwkiSgCQGSEQF8mmJ65+t8ODuD/z5KuzYt4UTijc5rthC14HtWA1qBNcwHv80PsFJRPQQe5WlI2SzEpmMRDIZIREPk05EKOYSfHH1U9bu3+XFs9+Rjeo/wHS0hn7NDvoa5Yzq6/Cb9Yi+MUIhJ6LkJ5mKkMvFKBQSFApJstk4mXSMfDbBfDHHl9evsr72kI2XfyMLjJ/F19/CdLuCMW0tFt1e3EYN0UkDfqcJIeginREpFpKUSmnKpQzFYoZiIcNcKc/ywjyrN2/y5NFj/t3YQOayncNj6v4/dXUrmeqow2loIDh0lIDVQNAzQToVoVRIUsjEyKeilAoZyqU8i3NlLi0vc/vW1zx5tM7GPxvIxqes2G0mBPsw/pFOXKcOMtOtxHPmMMHh4whWI8KMFdHrIOiYwDc+QkzwksukWCiXuHLxIt9+tcr62mNevniJzJ9MIsSjiMkoQsCB09zNhEHNeJeKaYMaS2cjfa1q+ts+ZKCtmcG2FhyD/cSDAc6Xy1y7dJnbt1Z59GCNF8//QpZcWiG1dJ74fJlQOs6MZ5qRIQODPS2YOhsxtijRKqo4VitHt7eGk0oFg9pm3OZhCpLElZULfHPzFg/v3ef502evwmXSKyskFhcI5TK4xBAW+wTmoTOYDTqMx9RoFTUcqdpOc/UO2nZX0fH+Hs40HmLy7GnS/gBXli5w9/s7PP31N2TSwiKJ80vEFuYJ5rO441GmfG6mJsdwjA4wcroLrVKBquId1JXbaN1Vjb7uPfT7FHSrGhjW6XFbbNy4/Dm/rP+MLFKeQ5pfRCyXEbJp3AkJRyiAyzNDwGPHMW6io+kQDRVbadq5A6PmIFOnejB1fkSHqoGm2t20KA8huALc//EnZEK+RLhYJpjP4UslcCdjzEbD+IJegsIss45xeo83c1j+Lq01clynuliMBIl63fTq26mrrGbPtp0M9/axeu0GMk8qgzedwZ1I4JJEZqIRpgNeJh02xkaG+ORsD3pNPaqKt9DWVuLr72VBipCRRCYtFrSNRzhYuwfjsVZSThcyhxhjRophj4SZCgawet30mc+ha9fRUL+fuho5Svnb7N/6Bq275LiMPSS8LmIhATHgxzowQPuBA5xU1WM+0cZ/MX4YeOL/vuYAAAAASUVORK5CYII=",
      width: 640,
      height: 480,
      crop: null,
    },
    email: "konradullrich@me.com",
    practice: "vvv",
    street: "Halmtorvet 29B, 2. tv",
    city: "København V",
    title: null,
    focusOther: "ddddd\r\nddddeehfdf\r\njhjhkjh",
    degree: [],
    membership: ["kreisel-netzwerk"],
    offersInternship: true,
    focus: ["dyslexie"],
  },
  {
    title: "Möchtegern-Dr",
    name: "Privat",
    description:
      "Ich mach ne dufte Lerntherapie für Kinder und Jugendliche. Aber am liebsten arbeite ich mit Erwachsenen.",
    focusOther: "Coaching und Beratung\nZürcher Ressourcenmodell\nSupervision",
    membership: ["kreisel-netzwerk", "bvl"],
    image: null,
    practice: "Lerntherapeutische Praxis Marieke Klein",
    street: "Lübecker Straße 2",
    focus: ["dyslexie", "dyskalkulie", "jugendliche"],
    firstName: "Marieke",
    email: "marieke.klein@outlook.com",
    phone: "041029817046",
    website: "https://kreiselhh.de",
    degree: [
      "kreiselzertifikat-dyslexie",
      "dyslexietherapeut-bvl",
      "integrative-lerntherapeut-dyslexie",
    ],
    qualification:
      "Dipl. Sportwissenschaftlerin\nErlebnispädagogin\nSupervisorin",
    zipCode: "22926",
    city: "Ahrensburg",
    offersInternship: null,
  },
  {
    firstName: "Marieke",
    phone: "040 38 61 23 71",
    description:
      "Ich leite mit fröhlichem Schwung den KREISEL und liebe meine Arbeit mit Erwachsenen. ",
    membership: ["kreisel-netzwerk", "bvl"],
    offersInternship: null,
    street: "Ehrenbergstraße 25",
    zipCode: "22767",
    website: "https://www.kreiselhh.de",
    degree: [
      "kreiselzertifikat-dyskalkulie",
      "dyslexietherapeut-bvl",
      "integrative-lerntherapeut-dyslexie",
    ],
    practice: null,
    focusOther: null,
    qualification: null,
    city: "Hamburg",
    focus: null,
    title: "Lerntherapeutin",
    name: "Kreisel",
    image: {
      width: 3549,
      height: 3574,
      alt: null,
      aspectRatio: 0.9930050363738109,
      url: "https://cdn.sanity.io/images/jgnu3d9f/production/b4d1855708adfd7d99fff322bfe2da98892f9396-3549x3574.jpg",
      lqip: "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAUGBwj/xAAlEAABBAICAQMFAAAAAAAAAAABAAIDBAURBhIxByFxExRBYcH/xAAXAQADAQAAAAAAAAAAAAAAAAACAwQF/8QAHBEAAwEAAgMAAAAAAAAAAAAAAAECIQMEESIy/9oADAMBAAIRAxEAPwDX+I8kr5yItaOs7Btzfwpy3NFEWCR7Wlx0NnyoLC4+li43PqRtjBG3O/Spl7ltXNZu4KDvqR04iN78kH3IWbMV40fPszbquvt2fCKucb5DBk8PXsVJGPZ16k78OHkItOVhM3pRM3kLLOCW7TX6nNcnt8rnLL98XkulGWWISRNLyHe7tjZREHQ1B8+M230XsSjhbQHewsSfxERU39MSj//Z",
      crop: null,
      hotspot: null,
      asset: {
        _ref: "image-b4d1855708adfd7d99fff322bfe2da98892f9396-3549x3574-jpg",
        _type: "reference",
      },
    },
    email: "mariekeklein@kreiselhh.de",
  },
  {
    name: "ullrich",
    image: null,
    city: null,
    website: null,
    degree: null,
    membership: null,
    practice: null,
    zipCode: null,
    focusOther: null,
    offersInternship: null,
    title: null,
    firstName: "Konrad",
    email: "web@konradullrich.com",
    phone: null,
    description: null,
    qualification: null,
    street: null,
    focus: null,
  },
  {
    city: null,
    offersInternship: false,
    name: "Kreisel",
    image: null,
    zipCode: null,
    website: null,
    focusOther: null,
    membership: null,
    qualification: null,
    firstName: "Info",
    practice: null,
    phone: null,
    description: null,
    focus: null,
    degree: null,
    title: null,
    email: "info@kreiselhh.de",
    street: null,
  },
  {
    firstName: "Konrad",
    image: null,
    street: "Halmtorvet 29B, 2. tv",
    city: "København V",
    focus: ["dyslexie"],
    membership: ["kreisel-netzwerk"],
    offersInternship: true,
    title: null,
    website: "",
    name: "Ullrich",
    focusOther: "ddddd\r\nddddeehfdf\r\njhjhkjh",
    email: "konradullrich@me.com",
    practice: "vvv",
    zipCode: "1700",
    phone: "+4553856002",
    description: "Bli Bla blub sdfjskldfj\n\nsdf\n",
    degree: [],
    qualification: "ffffff\r\niiiiifhggdff\r\njkjhkjh rrrrr",
  },
  {
    name: "Privat",
    practice: "Lerntherapeutische Praxis Marieke Klein",
    zipCode: "22926",
    website: "https://kreiselhh.de",
    focus: ["dyslexie", "dyskalkulie", "jugendliche"],
    focusOther: "Coaching und Beratung\nZürcher Ressourcenmodell\nSupervision",
    qualification:
      "Dipl. Sportwissenschaftlerin\nErlebnispädagogin\nSupervisorin",
    title: "Möchtegern-Dr",
    firstName: "Marieke",
    offersInternship: null,
    street: "Lübecker Straße 2",
    city: "Ahrensburg",
    phone: "041029817046",
    description:
      "Ich mach ne dufte Lerntherapie für Kinder und Jugendliche. Aber am liebsten arbeite ich mit Erwachsenen.",
    degree: [
      "kreiselzertifikat-dyslexie",
      "dyslexietherapeut-bvl",
      "integrative-lerntherapeut-dyslexie",
    ],
    membership: ["kreisel-netzwerk", "bvl"],
    image: null,
    email: "marieke.klein@outlook.com",
  },
  {
    title: null,
    name: null,
    image: null,
    description: null,
    focusOther: null,
    practice: null,
    zipCode: null,
    phone: null,
    website: null,
    membership: null,
    offersInternship: null,
    email: "jochenklein@kreiselhh.de",
    street: null,
    focus: null,
    degree: null,
    qualification: null,
    firstName: null,
    city: null,
  },
  {
    firstName: "Test",
    email: "meikeschueler@kreiselhh.de",
    name: "Adresse MeS",
    image: null,
    street: null,
    website: "www.kreiselhh.de",
    degree: ["kreiselzertifikat-dyskalkulie", "kreiselzertifikat-dyslexie"],
    qualification: "lehrerin",
    offersInternship: null,
    title: null,
    practice: null,
    city: null,
    phone: null,
    description:
      "ich bin lerntherapeutin und will mich eintragen hier ind er beschreibung",
    focus: ["dyslexie", "dyskalkulie", "tiergestützt"],
    focusOther: "sonstige ARbeitsschwerpunke ...",
    zipCode: null,
    membership: ["kreisel-netzwerk"],
  },
];
