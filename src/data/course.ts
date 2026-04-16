export interface Lesson {
  id: string;
  title: string;
  videoId: string;
  sortOrder: number;
  durationMinutes: number | null;
  description: string;
  moduleId: string;
  moduleName: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  bannerUrl: string | null;
  sortOrder: number;
  lessons: Lesson[];
}

export interface Course {
  title: string;
  description: string;
  bannerUrl: string;
  modules: Module[];
}

export const course: Course = {
  title: "Desafio de 28 Dias de Calistenia Militar",
  description:
    "Transforme seu corpo em 28 dias com treinos militares de calistenia — sem academia, sem equipamentos, sem desculpas.\n\nEste desafio foi criado para quem quer resultados reais usando apenas o peso do próprio corpo. São 28 dias de treinos progressivos inspirados no condicionamento físico militar, projetados para queimar gordura, ganhar força funcional e construir disciplina de ação.",
  bannerUrl:
    "https://tlllkecmsvhdvdmjouer.supabase.co/storage/v1/object/public/banners/190f5e21-65ef-40d2-bee7-001fa2625aa8.jpg",
  modules: [
    {
      id: "475fa05e-5fda-41ca-9263-0afea3fc888c",
      title: "INTRODUÇÃO [IMPORTANTE, NÃO PULE!!!]",
      description: "",
      bannerUrl:
        "https://tlllkecmsvhdvdmjouer.supabase.co/storage/v1/object/public/banners/bd7e66d6-01f9-48e9-a99a-0e4fd9285c23.jpg",
      sortOrder: 0,
      lessons: [
        {
          id: "2255d6fc-8e26-499d-9b42-c6ca239fc793",
          title: "Introdução | Desafio de 28 Dias de Calistenia Militar",
          videoId: "CRmXMrdFg5s",
          sortOrder: 0,
          durationMinutes: 2,
          description: "",
          moduleId: "475fa05e-5fda-41ca-9263-0afea3fc888c",
          moduleName: "INTRODUÇÃO [IMPORTANTE, NÃO PULE!!!]",
        },
      ],
    },
    {
      id: "fbf9477d-da4b-41f5-abbf-86a87a176cb6",
      title: "SEMANA 1",
      description: "",
      bannerUrl:
        "https://tlllkecmsvhdvdmjouer.supabase.co/storage/v1/object/public/banners/d6024726-9f07-42c8-a1e7-66e6398ab7cb.jpg",
      sortOrder: 1,
      lessons: [
        {
          id: "575aca41-9253-4d15-8b2e-4dece8bb2438",
          title: "DIA 1",
          videoId: "3-Z21DpZo8M",
          sortOrder: 0,
          durationMinutes: 20,
          description: "",
          moduleId: "fbf9477d-da4b-41f5-abbf-86a87a176cb6",
          moduleName: "SEMANA 1",
        },
        {
          id: "40512ae0-9974-40fc-8154-fc3d15f01722",
          title: "DIA 2",
          videoId: "cynau0IR3is",
          sortOrder: 1,
          durationMinutes: 20,
          description: "",
          moduleId: "fbf9477d-da4b-41f5-abbf-86a87a176cb6",
          moduleName: "SEMANA 1",
        },
        {
          id: "07ee903a-55af-432a-a90e-39bede14a974",
          title: "DIA 3",
          videoId: "llGHTNVWZI4",
          sortOrder: 2,
          durationMinutes: 20,
          description: "",
          moduleId: "fbf9477d-da4b-41f5-abbf-86a87a176cb6",
          moduleName: "SEMANA 1",
        },
        {
          id: "e99b0c71-557e-4168-aecc-6d8c9354fd7a",
          title: "DIA 4",
          videoId: "urLEMjbkl34",
          sortOrder: 3,
          durationMinutes: 20,
          description: "",
          moduleId: "fbf9477d-da4b-41f5-abbf-86a87a176cb6",
          moduleName: "SEMANA 1",
        },
        {
          id: "62da8309-3833-4b68-9961-40da72a8a2d4",
          title: "DIA 5",
          videoId: "-yMhoupxv5o",
          sortOrder: 4,
          durationMinutes: 20,
          description: "",
          moduleId: "fbf9477d-da4b-41f5-abbf-86a87a176cb6",
          moduleName: "SEMANA 1",
        },
        {
          id: "777284dc-ec11-4c02-96b6-737463d21a15",
          title: "DIA 6",
          videoId: "t9zxOxIC5GA",
          sortOrder: 5,
          durationMinutes: 20,
          description: "",
          moduleId: "fbf9477d-da4b-41f5-abbf-86a87a176cb6",
          moduleName: "SEMANA 1",
        },
        {
          id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          title: "DIA 7",
          videoId: "7F4h4OXcUzk",
          sortOrder: 6,
          durationMinutes: 20,
          description: "",
          moduleId: "fbf9477d-da4b-41f5-abbf-86a87a176cb6",
          moduleName: "SEMANA 1",
        },
      ],
    },
    {
      id: "418fa7bb-74d9-48c8-a95d-960bcf48b621",
      title: "SEMANA 2",
      description: "",
      bannerUrl:
        "https://tlllkecmsvhdvdmjouer.supabase.co/storage/v1/object/public/banners/9274cb88-bb47-45bf-9e95-c4530e8034db.jpg",
      sortOrder: 2,
      lessons: [
        {
          id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
          title: "DIA 8",
          videoId: "EHaxgTLy0vI",
          sortOrder: 0,
          durationMinutes: 20,
          description: "",
          moduleId: "418fa7bb-74d9-48c8-a95d-960bcf48b621",
          moduleName: "SEMANA 2",
        },
        {
          id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
          title: "DIA 9",
          videoId: "vtQ2X8pwhGk",
          sortOrder: 1,
          durationMinutes: 20,
          description: "",
          moduleId: "418fa7bb-74d9-48c8-a95d-960bcf48b621",
          moduleName: "SEMANA 2",
        },
        {
          id: "d4e5f6a7-b8c9-0123-defa-234567890123",
          title: "DIA 10",
          videoId: "lDYXu3sCrb0",
          sortOrder: 2,
          durationMinutes: 20,
          description: "",
          moduleId: "418fa7bb-74d9-48c8-a95d-960bcf48b621",
          moduleName: "SEMANA 2",
        },
        {
          id: "e5f6a7b8-c9d0-1234-efab-345678901234",
          title: "DIA 11",
          videoId: "0rtNDWpFb1Y",
          sortOrder: 3,
          durationMinutes: 20,
          description: "",
          moduleId: "418fa7bb-74d9-48c8-a95d-960bcf48b621",
          moduleName: "SEMANA 2",
        },
        {
          id: "f6a7b8c9-d0e1-2345-fabc-456789012345",
          title: "DIA 12",
          videoId: "2OctPW4PER8",
          sortOrder: 4,
          durationMinutes: 20,
          description: "",
          moduleId: "418fa7bb-74d9-48c8-a95d-960bcf48b621",
          moduleName: "SEMANA 2",
        },
        {
          id: "a7b8c9d0-e1f2-3456-abcd-567890123456",
          title: "DIA 13",
          videoId: "grNt0gTVgCE",
          sortOrder: 5,
          durationMinutes: 20,
          description: "",
          moduleId: "418fa7bb-74d9-48c8-a95d-960bcf48b621",
          moduleName: "SEMANA 2",
        },
      ],
    },
    {
      id: "1a03dea3-aa3f-449c-9873-f5c6f8baaa87",
      title: "SEMANA 3",
      description: "",
      bannerUrl:
        "https://tlllkecmsvhdvdmjouer.supabase.co/storage/v1/object/public/banners/5feba461-543a-4926-b698-173791003ed0.jpg",
      sortOrder: 3,
      lessons: [],
    },
    {
      id: "df8ea0b1-9374-42c3-b855-bb691e4286a0",
      title: "SEMANA 4",
      description: "",
      bannerUrl:
        "https://tlllkecmsvhdvdmjouer.supabase.co/storage/v1/object/public/banners/65dc98b1-2f41-4563-b974-1359917fa213.jpg",
      sortOrder: 4,
      lessons: [],
    },
  ],
};

// Helper: get all lessons in order
export function getAllLessons(): Lesson[] {
  return course.modules
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .flatMap((m) => m.lessons.sort((a, b) => a.sortOrder - b.sortOrder));
}

// Helper: find a lesson by id
export function getLessonById(id: string): Lesson | undefined {
  return getAllLessons().find((l) => l.id === id);
}

// Helper: get prev/next lesson
export function getLessonNavigation(id: string) {
  const all = getAllLessons();
  const idx = all.findIndex((l) => l.id === id);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
    current: all[idx] ?? null,
    index: idx,
    total: all.length,
  };
}
