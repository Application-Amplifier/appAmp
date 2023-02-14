export default interface Application {
  _id: number;
  userId: number;
  date: Date;
  companyName: string;
  positionTitle: string;
  positionLocation: string;
  jobPostingLink: string;
  resumeLink: string;
  applied: boolean;
  typeOfApplied: string;
  status: string;
  pointOfContact: string;
  followUpEmail: boolean;
  tailoredResume: boolean;
  coverLetter: boolean;
  referral: number;
  notes: string;
}
