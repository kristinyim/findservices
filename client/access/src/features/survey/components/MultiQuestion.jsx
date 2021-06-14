import { kebabCase } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import { Form, Message } from "semantic-ui-react";

// Returns a list of options for MULTI_RADIO and MULTI_DROPDOWN questions
function getOptions(t, questionKey) {
  const options = t(`catalog:${questionKey}.options`, { returnObjects: true });
  // Check if we actually have options defined
  if (options != null && typeof options === "object") {
    for (const [idx, option] of options.entries()) {
      // TODO: This fixes a replacement of "Yes" string into "true"
      // and "No" into "false" hidden somewhere in the code. There must be a proper way to fix it.
      if (option === "true") {
        options[idx] = "Yes";
      }
      if (option === "false") {
        options[idx] = "No";
      }
    }
    return options;
  }
  return ["ERROR"];
}

/**
 * Renders a question of types MULTI_RADIO and MULTI_DROPDOWN as a radio group or
 * dropdown menu with options loaded from catalog.
 * This component is intended to be used as a controlled
 * component -- that is, it requires that the parent provide values for both the
 * {@linkcode #value} and {@linkcode #onChange} props.
 */
function MultiQuestion({ questionKey, questionType, value, onChange, error }) {
  const { t } = useTranslation();
  const questionId = kebabCase(questionKey);
  const options = [];

  // The question is rendered as a dropdown menu when true,
  // radio buttons otherwise.
  //const renderDropDown = true;

  if (questionType === "MULTI_DROPDOWN") {
    for (const [index, optionLabel] of getOptions(t, questionKey).entries()) {
      options.push(
        <option
          error={error}
          id={`${questionId}-${index}`}
          name={questionKey}
          label={optionLabel}
          value={`${index + 1}`}
          checked={value === `${index + 1}`}
          onBlur={onChange}
          aria-describedby={`${questionId}-hint ${questionId}-error`}
        >
          {optionLabel}
        </option>
      );
    }

    return (
      <Form.Group as="fieldset" className={error ? "error" : null} grouped>
        <legend>{t(`catalog:${questionKey}.text`)}</legend>
        <small>{t(`catalog:${questionKey}.hint`, "")}</small>
        <select name={`${questionKey}`} onBlur={onChange}>
          {options}
        </select>
        {error && (
          <Message
            visible
            error
            id={`${questionId}-error`}
            size="small"
            role="alert"
          >
            {t("survey.question.multi.error")}
          </Message>
        )}
      </Form.Group>
    );
  } else {
    // Render radiobuttons otherwise
    for (const [index, optionLabel] of getOptions(t, questionKey).entries()) {
      options.push(
        <Form.Radio
          error={error}
          id={`${questionId}-${index}`}
          name={questionKey}
          label={optionLabel}
          value={`${index + 1}`}
          checked={value === `${index + 1}`}
          onChange={onChange}
          aria-describedby={`${questionId}-hint ${questionId}-error`}
        />
      );
    }

    return (
      <Form.Group
        as="fieldset"
        className={error ? "error required" : "required"}
        grouped
      >
        <label>{t(`catalog:${questionKey}.text`)}</label>
        <small>{t(`catalog:${questionKey}.hint`, "")}</small>
        {options}
        {error && (
          <Message
            visible
            error
            id={`${questionId}-error`}
            size="small"
            role="alert"
          >
            {t("survey.question.multi.error")}
          </Message>
        )}
      </Form.Group>
    );
  }
}

MultiQuestion.propTypes = {
  /** The key of the question to be rendered. */
  questionKey: PropTypes.string.isRequired,
  /** The type of the question to be rendered. */
  questionType: PropTypes.oneOf(["MULTI_RADIO", "MULTI_DROPDOWN"]).isRequired,
  /** The current value of the question. */
  value: PropTypes.oneOf(["0", "1", "2", ""]).isRequired,
  /** The function to be called when the value changes. */
  onChange: PropTypes.func.isRequired,
  /**
   * If true, display any validation error messages. The default value for this
   * prop is false because we don't want to display any validation error message
   * before the user has had a chance to type something in. The parent component
   * sets this prop to true when the user triggers validation (such as clicking
   * "submit" or "done" on the parent form.)
   */
  error: PropTypes.bool,
};

MultiQuestion.defaultProps = {
  questionType: "MULTI_DROPDOWN",
  error: true,
};

export default MultiQuestion;
