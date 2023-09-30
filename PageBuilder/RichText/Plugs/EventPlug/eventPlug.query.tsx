export interface IEventPlugProps {
  filter?: string;
  category?: string;
  legende?: null | boolean;
  showFilter?: null | boolean;
}

export const EventPlugQuery = `
    _type == "eventPlug" => {
      category,
    filter,
    legende,
    showFilter
    }
    `;
