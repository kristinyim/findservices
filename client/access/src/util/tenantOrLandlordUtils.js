import _ from "lodash";

export const isTenantSection = (section) => {
  return _.keys(section)[0].startsWith("SECTION_TENANT");
};

export const isLandlordSection = (section) => {
  return _.keys(section)[0].startsWith("SECTION_LANDLORD");
};

export const isTenantOrLandlordSection = (section) => {
  return _.keys(section)[0].startsWith("SECTION_IAMA");
};

export const isTenantFlow = (survey, responses) => {
  if (!survey || survey.length === 0) {
    return false;
  }
  const initSection = survey[0];
  const questionKey = _.values(initSection)[0][0];
  return responses[questionKey] === "OPT_1";
};
