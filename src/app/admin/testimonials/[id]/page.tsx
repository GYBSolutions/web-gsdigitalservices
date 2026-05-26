import { notFound } from "next/navigation";
import { getTestimonials } from "@/lib/content";
import { TestimonialForm } from "../../_components/TestimonialForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditTestimonialPage({ params }: Props) {
  const { id } = await params;
  const testimonials = await getTestimonials();
  const testimonial = testimonials.find((t) => t.id === id);
  if (!testimonial) notFound();
  return <TestimonialForm testimonial={testimonial} />;
}
