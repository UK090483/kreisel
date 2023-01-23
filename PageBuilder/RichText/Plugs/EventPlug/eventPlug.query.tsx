export interface IEventPlugProps {
  filter?: string;
}

export const EventPlugQuery = `
    _type == "eventPlug" => {
    filter,
    }
    `;
