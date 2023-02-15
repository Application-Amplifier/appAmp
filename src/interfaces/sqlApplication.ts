export default interface SqlApplication {
  _id: number;
  userid: number;
  date: Date;
  companyname: string;
  positiontitle: string;
  positionlocation: string;
  jobpostinglink: string;
  resumelink: string;
  applied: boolean;
  typeofapplied: string;
  status: string;
  pointofcontact: string;
  followupemail: boolean;
  tailoredresume: boolean;
  coverletter: boolean;
  referral: boolean;
  notes: string;
}