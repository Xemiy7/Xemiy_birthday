export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "xemiy transformed our brand with a level of restraint and sophistication we didn't know was possible. Every detail feels intentional.",
    author: "Amara Okonkwo",
    role: "Creative Director",
    company: "Noir Atelier",
  },
  {
    id: "2",
    quote:
      "The editorial work was extraordinary — typographic, cinematic, and unmistakably premium. Our publication has never looked this refined.",
    author: "James Whitfield",
    role: "Editor-in-Chief",
    company: "Monolith Magazine",
  },
  {
    id: "3",
    quote:
      "Working with xemiy felt like collaborating with an artist who truly understands luxury. The results exceeded every expectation.",
    author: "Elena Vasquez",
    role: "Founder",
    company: "Form Studio",
  },
];
