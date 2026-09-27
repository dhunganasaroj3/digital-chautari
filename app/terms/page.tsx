import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
};

const PARAGRAPHS = [
  "Digital Chautari provides digital marketing, content creation, and software development services from Kathmandu, Nepal. The material on this site is general information, provided as-is — it is not a quote and not a binding offer.",
  "Every engagement is governed by the agreement we sign with that client. Prices shown on the site are starting points; final pricing is always quoted upfront in writing.",
  "Unless stated otherwise, the text, design, and marks on this site belong to Digital Chautari. Work we produce for a client remains that client's property under the terms of their agreement with us.",
  "To the extent permitted by law, we are not liable for decisions made solely on the basis of this site's content. Please talk to us before acting on anything you read here.",
  "These terms are governed by the laws of Nepal, and any dispute falls under the courts of Kathmandu.",
  "Questions about these terms? Email hello@digitalchautari.com.np.",
];

export default function TermsPage() {
  return <LegalPage title="Terms of Service" updated="26 September 2026" paragraphs={PARAGRAPHS} />;
}
