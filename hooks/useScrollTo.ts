// animateScroll.js
import React from "react";
import { useEffect } from "react";

const pow = Math.pow;

// The easing function that makes the scroll decelerate over time
function easeOutQuart(x: number) {
  return 1 - pow(1 - x, 4);
}
type animateScrollProps = {
  targetPosition: number;
  initialPosition?: number;
  duration: number;
};
const animateScroll = ({
  targetPosition,
  initialPosition = window.scrollY,
  duration,
}: animateScrollProps) => {
  let start: undefined | number;
  let position: number;
  let animationFrame: number;

  const requestAnimationFrame = window.requestAnimationFrame;
  const cancelAnimationFrame = window.cancelAnimationFrame;

  // maximum amount of pixels we can scroll
  const maxAvailableScroll =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const amountOfPixelsToScroll = initialPosition - targetPosition;

  function step(timestamp: number) {
    if (start === undefined) {
      start = timestamp;
    }

    const elapsed = timestamp - start;

    // this just gives us a number between 0 (start) and 1 (end)
    const relativeProgress = elapsed / duration;

    // ease out that number
    const easedProgress = easeOutQuart(relativeProgress);

    // calculate new position for every thick of the requesAnimationFrame
    position =
      initialPosition - amountOfPixelsToScroll * Math.min(easedProgress, 1);

    // set the scrollbar position
    window.scrollTo(0, position);

    // Stop when max scroll is reached
    if (
      initialPosition !== maxAvailableScroll &&
      window.scrollY === maxAvailableScroll
    ) {
      cancelAnimationFrame(animationFrame);
      return;
    }

    // repeat until the end is reached
    if (elapsed < duration) {
      animationFrame = requestAnimationFrame(step);
    }
  }

  animationFrame = requestAnimationFrame(step);
};

// scrollTo.js

const logError = () =>
  console.error(
    `Invalid element, are you sure you've provided element id or react ref?`
  );

const getElementPosition = (element: HTMLElement) => element.offsetTop;

type scrollToProps = {
  id: string;
  duration?: number;
};

export const scrollTo = ({ id, duration = 500 }: scrollToProps) => {
  // the position of the scroll bar before the user clicks the button
  const initialPosition = window.scrollY;

  // if the reference is id
  if (id) {
    const element = document.getElementById(id);
    if (!element) {
      // log error if the reference passed is invalid
      logError();
      return;
    }

    animateScroll({
      // target position is the elements offsetTop
      targetPosition: getElementPosition(element) - 100,
      initialPosition,
      duration,
    });
  }
};

export const useScrollTo = (duration: number = 500) => {
  const scrollTo = React.useCallback(
    (pos: number) => {
      animateScroll({ targetPosition: pos, duration });
    },
    [duration]
  );

  return scrollTo;
};
