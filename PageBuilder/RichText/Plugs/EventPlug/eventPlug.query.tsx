export interface IEventPlugProps {
  filter?: string;
  category?: string;
}

export const EventPlugQuery = `
    _type == "eventPlug" => {
      category,
    filter,
    }
    `;
