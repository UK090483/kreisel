import { isObject } from "lodash";

export type PayloadDelta<T extends any> = {
  [k: string]: { before: T; after: T };
};
type ParsedPayload<T extends any> = {
  before: T;
  after: T;
  delta: PayloadDelta<T>;
};

class UpdateEventManager<T extends any> {
  constructor(
    private events: UpdateEventProducer<T>[],
    private onEvent: (type: string, payload: ParsedPayload<T>) => void,
    private onFail?: () => void
  ) {}
  run(input: any) {
    const validatedInput = this.validate(input);
    if (!validatedInput) return this.handleFail();
    this.events.forEach((e) => {
      if (e.evaluate(validatedInput)) {
        this.onEvent(e.type, validatedInput);
      }
    });
  }
  private handleFail() {
    if (this.onFail) {
      this.onFail();
    }
  }
  private validate: (input: any) => ParsedPayload<T> | null = (input) => {
    if (
      !isObject(input?.before) ||
      !isObject(input?.after) ||
      !isObject(input?.delta)
    )
      return null;
    return input;
  };
}

export interface UpdateEventProducer<T extends any = any> {
  type: string;
  evaluate: (input: ParsedPayload<T>) => boolean;
}

export type UpdateEventParser<T extends any = any> = (
  input: any
) => ParsedPayload<T> | null;

export default UpdateEventManager;
