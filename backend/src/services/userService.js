const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
// const { PrismaClient } = require('@prisma/client');
const logger = require('../utils/logger');

const prisma = require('../utils/prismaClient')

const {sendSecurityCodeEmail}=require("../utils/sendSecurityCodeEmail");
/**
 * Register a new user
 */
const registerUser = async (userData) => {
  const { email, password, fingerprint,name } = userData;
  console.log("fingerprint",fingerprint);
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword,name },
  });
  console.log(user.id);
  
  await prisma.userFingerprint.create({
    data: {
      userId: user.id,
      fingerprint, // Save the user's browser fingerprint
    },
  });

  // Log activity
  // await logger.logActivity({
  //   userId: user.id,
  //   action: 'REGISTER_USER',
  //   details: `Registered a new user with email ${email}`,
  // });

  return user;
};

/**
 * Login a user
 */
// const loginUser = async (email, password) => {
//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     throw new Error('Invalid credentials');
//   }

//   const token = jwt.generateToken(user.id, user.role);

//   // Log activity
//   await logger.logActivity({
//     userId: user.id,
//     action: 'LOGIN_USER',
//     details: `User with email ${email} logged in`,
//   });

//   return token;
// };

// const loginUser = async (email, password,fingerprint) => {
  
//   try{const user = await prisma.user.findUnique({ where: { email } });

//   if (!user) {
//     console.log("User not found");
//     // return res.status(400).json({ success: false, message: "User not found!" });
//     return { success: false, message:"User not found!" };

//   }

//   console.log("Stored hash: ", user.password); // Log stored hash
//   console.log("Plain password: ", password); // Log input password

//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   console.log("Password valid: ", isPasswordValid); // Check the result of bcrypt comparison

//   if (!isPasswordValid) {
//     // return res.status(400).json({ success: false, message: "Invalid password!" });
//     // throw new Error("Invalid password");
//     return { success: false, message:"Invalid password" };
//   }

//   const storedFingerprint = await prisma.userFingerprint.findFirst({
//     where: {
//       userId: user.id,
//       fingerprint,
//     },
//   });

//   if (storedFingerprint) {
//     // Fingerprint is valid, proceed with login and generate token
//     console.log("Yes, found!!");
    
//     const token = jwt.generateToken(user);
//     // return res.status(200).json({ success: true, token });
//     return { success: true, token,
//       IsCode:false,};
//   }

//   const reply=await sendSecurityCodeEmail(user.email, fingerprint)
//   // return {
//   //   success: false,
//   //   message: "New device detected. A security code has been sent to your email.",
//   // };
//   if (reply.success) {
//     return {
//         success: true,
//         IsCode:true,
//         message: "New device detected. A security code has been sent to your email.",
//     };
// } else {
//     return {
//         success: false,
//         message: "Failed to send security code. Please try again.",
//         error: reply.error,  // Optional: Include this if you want to debug further
//     };
// }
// } catch (error) {
//   console.error(error);
//   throw error;
// }

//   // Log activity
//   // await logger.logActivity({
//   //   userId: user.id,
//   //   action: 'LOGIN_USER',
//   //   details: `User with email ${email} logged in`,
//   // });
// };

const loginUser = async (email, password, fingerprint) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { success: false, message: "User not found!" };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return { success: false, message: "Invalid password" };

    const storedFingerprint = await prisma.userFingerprint.findFirst({
      where: { userId: user.id, fingerprint },
    });

    if (storedFingerprint) {
      console.log("Fingerprint recognized, generating token...");
      const token = jwt.generateToken(user);
      return { success: true, token, IsCode: false };
    }

    console.log("New device detected, sending security code...");

    // Use a timeout wrapper to prevent long API wait times
    const sendEmailWithTimeout = new Promise((resolve) => {
      setTimeout(() => resolve({ success: false, message: "Email service timeout" }), 5000); // 5s timeout
    });

    const reply = await Promise.race([sendSecurityCodeEmail(user.email, fingerprint), sendEmailWithTimeout]);

    if (reply.success) {
      return { success: true, IsCode: true, message: "Security code sent to your email." };
    } else {
      return { success: false, message: "Failed to send security code. Try again.", error: reply.message };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Internal server error" };
  }
};

/**
 * Get all users
 */
const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

/**
 * Delete a user
 */
const deleteUser = async (userId) => {
  await prisma.user.delete({ where: { id: userId } });

  // Log activity
  await logger.logActivity({
    userId: userId,
    action: 'DELETE_USER',
    details: `Deleted user with ID ${userId}`,
  });
};

/**
 * Update user details
 */
const updateUserDetails = async (userId, updateData) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });

  // Log activity
  await logger.logActivity({
    userId: userId,
    action: 'UPDATE_USER',
    details: `Updated user with ID ${userId}`,
  });

  return user;
};

/**
 * Change user password
 */
const changePassword = async (userId, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const user = await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  // Log activity
  await logger.logActivity({
    userId: userId,
    action: 'CHANGE_PASSWORD',
    details: `Changed password for user with ID ${userId}`,
  });

  return user;
};

/**
 * Update user role
 */
const updateUserRole = async (userId, role) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  // Log activity
  await logger.logActivity({
    userId: userId,
    action: 'UPDATE_ROLE',
    details: `Updated role for user with ID ${userId} to ${role}`,
  });

  return user;
};
// const getLoggedInUserDetails = async (userId) => {
  
  
//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//     include: {
//       projects: {
//         select: {
//           projectId: true,
//           // name: true,
//           role: true, // Assuming there's a role field in the relation
//         },
//       },
//       organizations: {
//         select: {
//           organizationId: true,
//           // name: true,
//           role: true, // Assuming there's a role field in the relation
//         },
//       },
//     },
//   });

//   if (!user) {
//     throw new Error('User not found');
//   }

//   return {
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//     projects: user.projects,
//     organizations: user.organizations,
//   };
// };

const getLoggedInUserDetails = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      projects: {
        select: {
          projectId: true,
          role: true,
        },
      },
      organizations: {
        select: {
          organizationId: true,
          role: true,
          addedAt: true,
          organization: {
            select: {
              name: true,
              _count: {
                select: {
                  members: true, // Count of all members in the organization
                  projects: true, // Count of all projects in the organization
                },
              },
              projects: {
                where: {
                  members: {
                    some: {
                      userId, // Filter to count only projects this user is part of
                    },
                  },
                },
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Process organizations to structure the data properly
  const organizations = user.organizations.map((org) => ({
    organizationId: org.organizationId,
    role: org.role,
    addedAt: org.addedAt,
    name: org.organization.name,
    memberCount: org.organization._count.members,
    totalProjects: org.organization._count.projects,
    userProjectsCount: org.organization.projects.length,
  }));

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    projects: user.projects,
    organizations,
  };
};

const getUserProjects = async (userId) => {
  return await prisma.project.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      organization: true, // Optional: include organization details if needed
    },
  });
};

const getOrgUserProjects = async (orgId, userId) => {
  return await prisma.project.findMany({
    where: {
      organizationId: orgId, // Matches projects in the given organization
      members: {
        some: {
          userId, // Ensures the user is a member of the project
        },
      },
    },
    include: {
      organization: true, // Include organization details if needed
    },
  });
};

const verifyCodeCaller = require('../utils/verifyCode');

// const verifyCode = async (email, code,saveFingerprint,fingerprint) => {
//     try {
//         const response = await verifyCodeCaller.callGoLangService(email, code);
//         // If the user wants to save fingerprint, update the database
//       if (response.success){
//         const user = await prisma.user.findUnique({ where: { email } });

//   if (!user) {
//     console.log("User not found");
//     // return res.status(400).json({ success: false, message: "User not found!" });
//     return { success: false, message:"User not found!" };

//   }
//         const token = jwt.generateToken(user);

//         if(saveFingerprint && fingerprint) {
//           // const user = await prisma.user.findUnique({
//           //   where: { email }
//           // });
          
//           // if (!user) {
//           //   return res.status(404).json({ error: "User not found." });
//           // }
          
//           createdResponse=await prisma.userFingerprint.create({
//             data: {
//               userId: user.id,
//               fingerprint,
//                 // Save the user's browser fingerprint
//             },
//           });
//         }
//         // if(createdResponse){
          
//           return {
//             success: true,
//             response,
//             token
//           };
//         // }
//         // return {
//         //   success: true,
//         //   response
//         // };
//       }

//     } catch (error) {
//         console.error("Error in verifyService:", error);
//         return { success: false };
//     }
// };

const verifyCode = async (email, code, saveFingerprint, fingerprint) => {
  try {
      const response = await verifyCodeCaller.callGoLangService(email, code);

      if (response.success) {
          const user = await prisma.user.findUnique({ where: { email } });

          if (!user) {
              console.log("User not found");
              return { success: false, message: "User not found!" };
          }

          const token = jwt.generateToken(user);

          // Handle fingerprint saving
          if (saveFingerprint && fingerprint) {
              // Check if the fingerprint already exists for this user
              const existingFingerprint = await prisma.userFingerprint.findFirst({
                  where: {
                      userId: user.id,
                      fingerprint: fingerprint
                  }
              });

              if (existingFingerprint) {
                  console.log("Fingerprint already exists for this user.");
              } else {
                  // Save the new fingerprint if it doesn't exist
                  await prisma.userFingerprint.create({
                      data: {
                          userId: user.id,
                          fingerprint,
                      },
                  });
                  console.log("Fingerprint saved successfully.");
              }
          }

          return {
              success: true,
              response,
              token
          };
      }

      return { success: false, message: "Verification failed." };

  } catch (error) {
      console.error("Error in verifyService:", error);
      return { success: false, message: "Internal server error." };
  }
};



module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUserDetails,
  changePassword,
  updateUserRole,
  getLoggedInUserDetails,
  getUserProjects,
  verifyCode
};
