import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Tech Sections
  const frontendSection = await prisma.section.upsert({
    where: { name: "Frontend" },
    update: {},
    create: { name: "Frontend" },
  });

  const backendSection = await prisma.section.upsert({
    where: { name: "Backend" },
    update: {},
    create: { name: "Backend" },
  });

  const mathSection = await prisma.section.upsert({
    where: { name: "Maths" },
    update: {},
    create: { name: "Maths" },
  });

  const dsaSection = await prisma.section.upsert({
    where: { name: "Data Structures & Algorithms" },
    update: {},
    create: { name: "Data Structures & Algorithms" },
  });

  const systemDesignSection = await prisma.section.upsert({
    where: { name: "System Design" },
    update: {},
    create: { name: "System Design" },
  });

  const devopsSection = await prisma.section.upsert({
    where: { name: "DevOps" },
    update: {},
    create: { name: "DevOps" },
  });

  // Academic/General Sections
  const scienceSection = await prisma.section.upsert({
    where: { name: "Science" },
    update: {},
    create: { name: "Science" },
  });

  const sstSection = await prisma.section.upsert({
    where: { name: "Social Science" },
    update: {},
    create: { name: "Social Science" },
  });

  const gkSection = await prisma.section.upsert({
    where: { name: "General Knowledge" },
    update: {},
    create: { name: "General Knowledge" },
  });

  const englishSection = await prisma.section.upsert({
    where: { name: "English" },
    update: {},
    create: { name: "English" },
  });

  const reasoningSection = await prisma.section.upsert({
    where: { name: "Reasoning" },
    update: {},
    create: { name: "Reasoning" },
  });

  const computerSection = await prisma.section.upsert({
    where: { name: "Computer Basics" },
    update: {},
    create: { name: "Computer Basics" },
  });

  // Subsections
  await prisma.subSection.createMany({
    data: [
      // Frontend
      { name: "React", sectionId: frontendSection.id },
      { name: "CSS", sectionId: frontendSection.id },
      { name: "JavaScript", sectionId: frontendSection.id },

      // Backend
      { name: "Node.js", sectionId: backendSection.id },
      { name: "Databases", sectionId: backendSection.id },
      { name: "Authentication", sectionId: backendSection.id },

      // Maths
      { name: "Algebra", sectionId: mathSection.id },
      { name: "Geometry", sectionId: mathSection.id },
      { name: "Trigonometry", sectionId: mathSection.id },
      { name: "Probability", sectionId: mathSection.id },
      { name: "Statistics", sectionId: mathSection.id },

      // DSA
      { name: "Arrays", sectionId: dsaSection.id },
      { name: "Linked Lists", sectionId: dsaSection.id },
      { name: "Trees", sectionId: dsaSection.id },
      { name: "Graphs", sectionId: dsaSection.id },
      { name: "Dynamic Programming", sectionId: dsaSection.id },

      // System Design
      { name: "High-Level Design", sectionId: systemDesignSection.id },
      { name: "Low-Level Design", sectionId: systemDesignSection.id },

      // DevOps
      { name: "CI/CD", sectionId: devopsSection.id },
      { name: "Docker", sectionId: devopsSection.id },
      { name: "Kubernetes", sectionId: devopsSection.id },

      // Science
      { name: "Physics", sectionId: scienceSection.id },
      { name: "Chemistry", sectionId: scienceSection.id },
      { name: "Biology", sectionId: scienceSection.id },

      // SST
      { name: "History", sectionId: sstSection.id },
      { name: "Geography", sectionId: sstSection.id },
      { name: "Civics", sectionId: sstSection.id },
      { name: "Economics", sectionId: sstSection.id },

      // General Knowledge
      { name: "Current Affairs", sectionId: gkSection.id },
      { name: "Static GK", sectionId: gkSection.id },

      // English
      { name: "Grammar", sectionId: englishSection.id },
      { name: "Vocabulary", sectionId: englishSection.id },
      { name: "Comprehension", sectionId: englishSection.id },

      // Reasoning
      { name: "Logical Reasoning", sectionId: reasoningSection.id },
      { name: "Verbal Reasoning", sectionId: reasoningSection.id },
      { name: "Non-Verbal Reasoning", sectionId: reasoningSection.id },

      // Computer Basics
      { name: "Internet", sectionId: computerSection.id },
      { name: "MS Office", sectionId: computerSection.id },
      { name: "Operating Systems", sectionId: computerSection.id },
    ],
    skipDuplicates: true,
  });

  console.log("✅ All seed data inserted successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Error inserting seed data", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
