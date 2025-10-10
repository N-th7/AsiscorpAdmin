import react from 'react';
export default function SectionTitle({ children }) {
  const words = children.split(" ");

  return (
    <h2 className="text-[40px] font-sans font-bold text-center my-10 md:my-15">
      {words.map((word, index) => (
        <span
          key={index}
          className={index % 2 === 0 ? "text-black" : "text-[#133C63]"} 
        >
          {word}{" "}
        </span>
      ))}
    </h2>
  );
}
