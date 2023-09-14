export interface IEventPlugProps {
  filter?: string;
  category?: string;
  pricing?: null | any;
}

export const EventPlugQuery = `
    _type == "eventPlug" => {
      category,
    filter,
    pricing,
    }
    `;
