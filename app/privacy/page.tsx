import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const PARAGRAPHS = [
  'Digital Chautari ("we", "us") is a creative technology company based in Kathmandu, Nepal. This policy explains what personal information we collect on this website and what we do with it.',
  "We collect only what you type into our contact form: your name, email address, subject, selected project types, and your message. We do not run advertising trackers or sell data on this site.",
  "We use your message to reply to your enquiry and, if we continue the conversation, to prepare a proposal. Your details are shared only with the tools that host this site and deliver our email — never with anyone else.",
  "You can ask us to correct or delete anything you have sent us at any time. Email hello@digitalchautari.com.np and we will take care of it.",
  "We may update this page as the site grows. The effective date below always reflects the current version.",
  "Questions about this policy? Email hello@digitalchautari.com.np or reach us through the contact page.",
];

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" updated="26 September 2026" paragraphs={PARAGRAPHS} />;
}
