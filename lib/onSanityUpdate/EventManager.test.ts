import UpdateEventManager from "./EventManager";

const run = (data: any, eventHandler?: any[]) => {
  const failHandler = jest.fn();
  const callback = jest.fn();
  const evaluateTrue = jest.fn().mockReturnValue(true);
  const evaluateFalse = jest.fn().mockReturnValue(false);

  const EventManager = new UpdateEventManager(
    [
      {
        type: "neverTestEvent",
        evaluate: evaluateFalse,
      },
      {
        type: "testEvent",
        evaluate: evaluateTrue,
      },
      ...(eventHandler ? eventHandler : []),
    ],
    callback,
    failHandler
  );
  EventManager.run(data);
  return { failHandler, eventHandler: evaluateTrue, EventManager, callback };
};

const testData = {
  before: { any: "any" },
  after: { any: "any" },
  delta: { any: "any" },
};

describe("UpdateEventManager", () => {
  it("should call failHandler with incorrect data", () => {
    const { eventHandler, failHandler, callback } = run({});
    expect(callback).not.toHaveBeenCalledTimes(1);
    expect(eventHandler).not.toHaveBeenCalledTimes(1);
    expect(failHandler).toHaveBeenCalledTimes(1);
  });
  it("should call failHandler with incorrect data", () => {
    const { eventHandler, failHandler, callback } = run({
      before: { bla: "bla" },
    });
    expect(callback).not.toHaveBeenCalledTimes(1);
    expect(eventHandler).not.toHaveBeenCalledTimes(1);
    expect(failHandler).toHaveBeenCalledTimes(1);
  });
  it("should call failHandler with incorrect data", () => {
    const { eventHandler, failHandler, callback } = run({
      after: { bla: "bla" },
    });
    expect(callback).not.toHaveBeenCalledTimes(1);
    expect(eventHandler).not.toHaveBeenCalledTimes(1);
    expect(failHandler).toHaveBeenCalledTimes(1);
  });

  it("should call event handler", () => {
    const { eventHandler, failHandler } = run(testData);
    expect(eventHandler).toHaveBeenNthCalledWith(1, testData);
    expect(failHandler).not.toHaveBeenCalledTimes(1);
  });

  it("should callback", () => {
    const { callback } = run(testData);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("testEvent", testData);
  });
});
