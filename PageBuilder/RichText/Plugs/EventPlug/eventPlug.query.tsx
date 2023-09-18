export interface IEventPlugProps {
  filter?: string;
  category?: string;
  pricing?: null | any;
  legende?: null | boolean;
  showFilter?: null | boolean;
}

export const EventPlugQuery = `
    _type == "eventPlug" => {
      category,
    filter,
    pricing,
    legende,
    showFilter
    }
    `;
