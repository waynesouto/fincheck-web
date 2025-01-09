import { JSX } from "react";
import { BankAccountType } from "../../../../app/utils/models";
import { CashIcon } from "./CashIcon";
import { CheckingIcon } from "./CheckingIcon";

export const iconsMap: Record<BankAccountType, () => JSX.Element> = {
  checking: CheckingIcon,
  savings: CashIcon
};
