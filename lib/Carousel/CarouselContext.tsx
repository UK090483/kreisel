import React, { useContext, useEffect, useState } from "react";

export interface ICarouselContextState<T> {
  items: T[];
  initialActiveItem?: number;
  next: () => void;
  prev: () => void;
  reset: () => void;
  set: (index: number) => void;
  activeItem: number;
  itemCount: number;
}

const defaultState: ICarouselContextState<any> = {
  items: [],
  next: () => null,
  prev: () => null,
  reset: () => null,
  set: () => null,
  activeItem: 0,
  itemCount: 0,
};

const CarouselContext = React.createContext(defaultState);

interface CarouselContextProviderProps<T>
  extends Pick<ICarouselContextState<T>, "items" | "initialActiveItem"> {
  children?: React.ReactNode | undefined;
}

export function CarouselContextProvider<T>(
  props: CarouselContextProviderProps<T>
) {
  const { children, initialActiveItem, items, ...rest } = props;
  const [activeItem, setActiveItem] = useState(initialActiveItem || 0);
  const itemCount = items.length;
  const next = () => setActiveItem((x) => (x + 1) % itemCount);
  const prev = () => setActiveItem((x) => (x === 0 ? itemCount - 1 : x - 1));
  const reset = () => setActiveItem(initialActiveItem || 0);
  const set = (index: number) => setActiveItem(index || 0);

  return (
    <CarouselContext.Provider
      value={{
        items,
        itemCount,
        activeItem,
        initialActiveItem,
        next,
        prev,
        reset,
        set,
        ...rest,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
}

export const useCarousel = () => {
  return useContext(CarouselContext);
};
type useAnimatedCarouselProps = {
  animateOut: number;
  animateIn: number;
};

const defaultProps: useAnimatedCarouselProps = {
  animateOut: 500,
  animateIn: 500,
};
export const useAnimatedCarousel = (props?: useAnimatedCarouselProps) => {
  const {
    animateOut = defaultProps["animateOut"],
    animateIn = defaultProps["animateIn"],
  } = props || defaultProps;

  const { activeItem: _activeItem, ...rest } = useContext(CarouselContext);

  const initial = React.useRef(true);
  const lastItem = React.useRef(-1);

  const [activeItem, setActiveItem] = useState(_activeItem);
  const [animateInItem, setAnimateInItem] = useState(-1);
  const [animateOutItem, setAnimateOutItem] = useState(-1);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      lastItem.current = _activeItem;
      return;
    }
    let timeOut: NodeJS.Timeout | null = null;

    if (animateOut) {
      setAnimateOutItem(lastItem.current);
      timeOut = setTimeout(() => {
        setAnimateOutItem(-1);
        setActiveItem(_activeItem);
        lastItem.current = _activeItem;
      }, animateOut);
    }
  }, [_activeItem, animateIn, animateOut]);

  useEffect(() => {
    let timeOut: NodeJS.Timeout | null = null;
    if (animateIn) {
      setAnimateInItem(activeItem);
      timeOut = setTimeout(() => {
        setAnimateInItem(-1);
      }, animateIn);
    }
  }, [activeItem, animateIn]);

  return { ...rest, animateInItem, animateOutItem, activeItem };
};
