import _ from "lodash";
import {
  isLandlordSection,
  isTenantOrLandlordSection,
  isTenantSection,
  isTenantFlow,
} from "./tenantOrLandlordUtils";

export default function isTenantOrLandlordResponseMissing(survey, responses) {
  let responseMissing = false;
  const tenantFlow = isTenantFlow(survey, responses);
  survey.forEach((section) => {
    if (
      isTenantOrLandlordSection(section) ||
      (tenantFlow && isTenantSection(section)) ||
      (!tenantFlow && isLandlordSection(section))
    ) {
      _.values(section).find((questionKeys) => {
        return questionKeys.forEach((questionKey) => {
          if (!(questionKey in responses)) {
            responseMissing = true;
          }
        });
      });
    }
  });
  return responseMissing;
}
