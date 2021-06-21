import React from "react";
import styles from "./ProgressBar.module.css";
import PropTypes from "prop-types";

/**
 * A component that shows the user where they are in the survey.
 * @param {{ fillFirst: boolean; fillSecond: boolean; fillThird: boolean; }} fillRectangles
 */
export function ProgressBar({ fillFirst, fillSecond, fillThird }) {
  let rectangles = [];
  rectangles.push(
    <div
      key="rect1"
      className={fillFirst ? styles.filled : styles.unfilled}
    ></div>
  );
  rectangles.push(
    <div
      key="rect2"
      className={fillSecond ? styles.filled : styles.unfilled}
    ></div>
  );
  rectangles.push(
    <div
      key="rect3"
      className={fillThird ? styles.filled : styles.unfilled}
    ></div>
  );
  return <div>{rectangles}</div>;
}

ProgressBar.propTypes = {
  /* The desired page title content, which appears before the hard-coded suffix */
  fillFirst: PropTypes.bool,
  fillSecond: PropTypes.bool,
  fillThird: PropTypes.bool,
};

ProgressBar.defaultProps = {
  fillFirst: true,
  fillSecond: false,
  fillThird: false,
};
