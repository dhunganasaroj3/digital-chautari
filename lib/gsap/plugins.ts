import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

/**
 * Single registration point for every GSAP plugin used on the site.
 * All client-side motion code imports from here — never from "gsap/*"
 * directly — so registration happens exactly once, before any ease or
 * plugin is referenced (eases.ts depends on this side effect).
 */
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, CustomEase, useGSAP);

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, CustomEase, useGSAP };
