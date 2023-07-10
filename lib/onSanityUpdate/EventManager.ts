import { isObject } from "lodash";

export type PayloadDelta<T extends any> = {
  [P in keyof T]?: { before?: T[P]; after?: T[P] };
};

type ParsedPayload<T extends any> = {
  before: Readonly<T>;
  after: Readonly<T>;
  delta: Readonly<PayloadDelta<T>>;
};

export function makeEvent<const T extends UpdateEventProducer>(arg: T): T {
  return arg;
}

class UpdateEventManager<
  T extends any = any,
  const P extends ReadonlyArray<UpdateEventProducer<T>> = ReadonlyArray<
    UpdateEventProducer<T>
  >
> {
  private _events: string[] = [];

  constructor(
    private readonly events: P,
    private onEvent: (
      types: P[number]["type"][],
      payload: ParsedPayload<T>
    ) => void,
    private onFail?: () => void
  ) {}

  /**
   * Expects
   *
   * @param {
   *  before: Readonly<T>;
   *  after: Readonly<T>;
   *  delta: Readonly<PayloadDelta<T>>;
   * }
   */

  run(input: ParsedPayload<T> | null) {
    const validatedInput = this.validate(input);
    if (!validatedInput) return this.handleFail();
    this.events.forEach((e) => {
      if (this.evaluate(e.evaluate, validatedInput)) {
        this._events.push(e.type);
      }
    });
    if (this._events.length > 0) {
      this.onEvent([...this._events], validatedInput);
      this._events = [];
    }
  }

  evaluate(e: UpdateEventProducer["evaluate"], payload: ParsedPayload<T>) {
    if (Array.isArray(e)) {
      return !e.map((i) => i(payload)).includes(false);
    }
    //@ts-ignore
    return e(payload);
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

export type evaluation<T extends any = any> = (
  input: ParsedPayload<T>
) => boolean;

export type UpdateEventProducer<T extends any = any> = {
  readonly type: string;
  evaluate: evaluation<T> | Readonly<evaluation<T>[]>;
};

export type UpdateEventParser<T extends any = any> = (
  input: any
) => ParsedPayload<T> | null;

export default UpdateEventManager;
