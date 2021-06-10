import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "semantic-ui-react";
import styles from "./LanguageSwitcher.module.css";

export const languageOptions = [
  // English
  { text: "English", value: "en" },
  // Spanish
  { text: "Español", value: "es" },
  // Vietnamese
  { text: "Tiếng Việt", value: "vi" },
  // Chinese
  { text: "中文", value: "zh" },
];

/**
 * A component that allows the user to switch the language. Switching the
 * language changes the language configured through i18next and triggers an
 * event that re-renders all the content that uses the `t` functions.
 */
export function LanguageSwitcher() {
  const translation = useTranslation();

  const changeLanguage = (value) => (e) => {
    translation.i18n.changeLanguage(value);
  };

  let availableButtons = [];
  for (let i = 0; i < languageOptions.length; i++) {
    if (translation.i18n.language !== languageOptions[i].value) {
      availableButtons.push(
        <Button
          content={languageOptions[i].text}
          onClick={changeLanguage(languageOptions[i].value)}
          className={styles.languageButton}
        />
      );
    }
  }
  return <div className={styles.languageButtons}>{availableButtons}</div>;
}
