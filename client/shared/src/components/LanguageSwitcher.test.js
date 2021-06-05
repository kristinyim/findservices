import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { i18nTestingInstance, renderWith } from "../util/testing";
import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";

import { LanguageSwitcher, languageOptions } from "./LanguageSwitcher";

expect.extend(toHaveNoViolations);

describe("language switcher", () => {
  let container = null;

  beforeEach(() => {
    i18nTestingInstance.changeLanguage(languageOptions[0].value);
    ({ container } = renderWith(<LanguageSwitcher />));
  });

  it("renders", async () => {
    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });

  it("switches language", async () => {
    // setup a spy so that we can validate that i18next.changeLanguage is called
    const changeLanguage = jest.spyOn(i18nTestingInstance, "changeLanguage");

    // get available language buttons
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(languageOptions.length - 1);

    // find the currently selected language by finding the unavailable button
    const currentLanguage = languageOptions.filter((lang) => {
      return (
        buttons.filter((btn) => {
          return btn.textContent === lang.text;
        }).length === 0
      );
    })[0].text;

    // pick some other language option
    const desired = screen.getAllByRole("button")[0];
    expect(desired).toBeInTheDocument();
    const desiredLanguage = desired.textContent;

    // check that none of the buttons have the current language
    buttons.forEach((button) => {
      expect(button.textContent).not.toEqual(currentLanguage);
    });

    // click on the other language option
    expect(desiredLanguage).not.toEqual(currentLanguage);
    userEvent.click(desired);

    // check that none of the buttons have the desired language
    buttons.forEach((button) => {
      expect(button.textContent).not.toEqual(desiredLanguage);
    });

    // check that the first button has the current language
    expect(desired).toHaveTextContent(currentLanguage);

    // check that i18next.changeLanguage has been called
    expect(changeLanguage).toHaveBeenCalled();
  });

  it("has no axe violations", async () => {
    const cut = await axe(container);
    expect(cut).toHaveNoViolations();
  });
});
