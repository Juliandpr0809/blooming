import AboutClient from "./AboutClient";
import { getFirstTwoProductUrls } from "@/lib/product-images";

export default function About() {
  const { main, secondary } = getFirstTwoProductUrls();
  return <AboutClient mainSrc={main} secondarySrc={secondary} />;
}
