import { InvestmentAsset } from "./investimentAsset";

export class UserInvestiments{
    id?: number;
    email = "";
    fullName = ";"
    bankBalance?: number;
    amount?: number;
    investimentAssets?: InvestmentAsset[];
}