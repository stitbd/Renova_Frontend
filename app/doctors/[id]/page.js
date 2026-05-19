import { notFound } from "next/navigation";
import { doctors } from "@/constants/siteData";
import DoctorProfileClient from "../DoctorProfileClient";

// Generate static paths for all doctors at build time
export async function generateStaticParams() {
  return doctors.map((doctor) => ({
    id: doctor.id.toString(),
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { id } = await params;
  const doctorId = Number(id);
  const doctor = doctors.find((d) => d.id === doctorId);
  
  if (!doctor) {
    return {
      title: "Doctor Not Found | Renova Life Care Ltd.",
    };
  }

  return {
    title: `Dr. ${doctor.name} - ${doctor.specialty} | Renova Life Care Ltd.`,
    description: `Book appointment with Dr. ${doctor.name}, ${doctor.specialty} at Renova Life Care Ltd. ${doctor.experience} of experience, ${doctor.rating}★ rating.`,
    openGraph: {
      title: `Dr. ${doctor.name} - ${doctor.specialty}`,
      description: `Consult with Dr. ${doctor.name} at Renova Life Care Ltd.`,
      images: [doctor.image],
    },
  };
}

// Main page component
export default async function DoctorProfilePage({ params }) {
  const { id } = await params;
  // Convert string param to number for proper ID matching
  const doctorId = Number(id);
  
  // Find the doctor from our data
  const doctor = doctors.find((d) => d.id === doctorId);

  // If doctor not found, show 404 page
  if (!doctor) {
    notFound();
  }

  // Render the client component with doctor data
  return <DoctorProfileClient doctor={doctor} />;
}