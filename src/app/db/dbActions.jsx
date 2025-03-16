"use server";

import prisma from "../utils/prisma/prisma";

export async function createUser(name, email, role) {
  const newUser = {
    name,
    email,
    role,
  };

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return await prisma.user.create({
      data: newUser,
    });
  }

  return;
}

export async function postProblem(
  problem,
  solution,
  estimateTime,
  classification,
  email
) {
  const newProblem = {
    problem,
    solution,
    estimateTime,
    classification,
    user: {
      connect: { email }, // Link an existing user
    },
  };

  return await prisma.problems.create({
    data: newProblem,
  });
}


export async function getUserRole(email) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    return user.role;
  }

  return null;
} 

export async function getAllStaff() {
  return await prisma.user.findMany({
    where: { role: "staff" },
    include: {
      sections: true, // This will include the related section data for each user
    },
  });
}

export async function setUserSection(email, section) {
  // Check if the user already has a section by the user's email
  const existingSection = await prisma.section.findFirst({
    where: {
      user: {
        email: email, // Look for the section of a user with the given email
      },
    },
  });

  if (existingSection) {
    // Update the existing section if it exists
    return await prisma.section.update({
      where: {
        id: existingSection.id, // Update the existing section by its id
      },
      data: {
        name: section,
      },
    });
  } else {
    // Create a new section if the user doesn't have one
    return await prisma.section.create({
      data: {
        name: section,
        user: {
          connect: { email }, // Link an existing user
        },
      },
    });
  }
}

export async function getAllProblems(){
  return await prisma.problems.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });
} 



export async function getProblemsForClassification(section) {
  return await prisma.problems.findMany({
    where: {
      classification: section, 
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
}



export async function updateProblemStatus(problemId, Status, classification) {
  return await prisma.problems.update({
    where: { id: problemId },
    data: { Status, classification },
  });
}


export async function getUserSections(userEmail) {
  try {
    const sections = await prisma.section.findMany({
      where: { userEmail },
    });

    return sections;
  } catch (error) {
    console.error("Error fetching user sections:", error);
    throw new Error("Could not fetch user sections");
  } finally {
    await prisma.$disconnect();
  }
}

