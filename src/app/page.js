'use client';

import PresentationSection from "./components/templates/PresentationSection";
import ValuesSection from "./components/templates/ValuesSection";

export default function Home() {


  return (
    <div className=" md:p-20 p-10 md:px-30" >
      <PresentationSection/>
      <ValuesSection/>
</div>
  );
}
