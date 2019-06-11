export enum Role {
  User = 'User',
  Admin = 'Admin'
}

export class User {
  addressline1: string;
  addressline2: string;
  addressline3: string;
  countryid: string;
  countryname: string;
  email: string;
  firstname: string;
  fullname: string;
  lastname: string;
  middlename: string;
  password: string;
  pin: string;
  usercol: string;
  username: string;
  validenddate: string;
  validstartdata: string;
}

export class BOMHeader {
  bomId: number;
  bomGroupDesc: string;
  bomGroupId: number;
  bomType: string;
  bomUsage: string;
  plantid: number;
  plantDesc: string;
  startDate: Date;
  endDate: Date;

}

export class BomDetails {
  bomId: string;
  componentDesc: string;
  componentId: string;
  detailId: string;
  hasInnerBOM: string;
  materialDesc: string;
  materialId: string;
  quantity: string;
  unitOfQuantity: number;
}
