// // // // const prisma = require('../prisma'); // Adjust the path to your Prisma client

// // // const prisma = require("../utils/prismaClient");


// // // /**
// // //  * Middleware to check if the user has the required role in the organization.
// // //  * @param {string} requiredRole - The required role (e.g., 'ADMIN').
// // //  */
// // // const roleMiddleware = (requiredRole) => {
// // //   return async (req, res, next) => {
// // //     try {
// // //       const userId = req.user.userId; // Extract authenticated user ID from request
// // //       const { organizationId } = req.params; // Assuming organizationId is passed in route parameters

// // //       if (!organizationId) {
// // //         return res.status(400).json({ error: 'Organization ID is required' });
// // //       }
// // //       console.log(userId);
// // //       console.log(organizationId);
      
      
// // //       // Find the user's role in the organization
// // //       const member = await prisma.organizationMember.findFirst({
// // //         where: {
// // //           organizationId,
// // //           userId,
// // //         },
// // //       });
// // //       console.log(member);
      
// // //       if (!member) {
// // //         return res.status(403).json({ error: 'Access denied. You are not a member of this organization.' });
// // //       }

// // //       // Check if the user's role matches the required role
// // //       if (member.role !== requiredRole) {
// // //         return res.status(403).json({ error: `Access denied. You must be an ${requiredRole} to perform this action.` });
// // //       }

// // //       // Role is valid; proceed to the next middleware or route handler
// // //       next();
// // //     } catch (error) {
// // //       console.error('Error in roleMiddleware:', error);
// // //       res.status(500).json({ error: 'Internal server error' });
// // //     }
// // //   };
// // // };

// // // module.exports = roleMiddleware;

// // const prisma = require("../utils/prismaClient");

// // /**
// //  * Middleware to check if the user has the required role in the organization or project.
// //  * @param {Array<string>} requiredRoles - An array of required roles (e.g., ['ADMIN', 'PROJECT_MANAGER']).
// //  */
// // const roleMiddleware = (requiredRoles) => {
// //   return async (req, res, next) => {
// //     try {
// //       const userId = req.user.userId; // Extract authenticated user ID from request
// //       const { organizationId, projectId } = req.params; // Assuming organizationId and projectId are passed in route parameters

// //       if (!organizationId) {
// //         return res.status(400).json({ error: 'Organization ID is required' });
// //       }

// //       // Case 1: If it's organization-level access (no projectId passed)
// //       if (!projectId) {
// //         // Find the user's role in the organization
// //         const member = await prisma.organizationMember.findFirst({
// //           where: {
// //             organizationId,
// //             userId,
// //           },
// //         });

// //         if (!member) {
// //           return res.status(403).json({ error: 'Access denied. You are not a member of this organization.' });
// //         }
// //         console.log(member);
        

// //         // If user is an admin of the organization, grant access
// //         if (member.role === 'ADMIN' && requiredRoles.includes('ADMIN')) {
// //           return next(); // Proceed to the next middleware or route handler
// //         }

// //         // If user doesn't have required role in the organization, deny access
// //         return res.status(403).json({ error: 'Access denied. You do not have the required role.' });
// //       }

// //       // Case 2: If it's project-level access (projectId is passed)
// //       if (projectId) {
// //         // Check if the user is a project manager for the specified project
// //         const projectMember = await prisma.projectMember.findFirst({
// //           where: {
// //             projectId,
// //             userId,
// //             role: 'project-manager', // Check if the user is a project manager for this project
// //           },
// //         });

// //         if (projectMember && requiredRoles.includes('project-manager')) {
// //           return next(); // User is a project manager, grant access
// //         }

// //         // Also check if the user is an admin in the organization (for broader access)
// //         const organizationMember = await prisma.organizationMember.findFirst({
// //           where: {
// //             organizationId,
// //             userId,
// //           },
// //         });

// //         if (organizationMember && organizationMember.role === 'admin' && requiredRoles.includes('admin')) {
// //           return next(); // Proceed to the next middleware or route handler
// //         }

// //         // If neither condition matches, deny access
// //         return res.status(403).json({ error: 'Access denied. You do not have the required role.' });
// //       }

// //     } catch (error) {
// //       console.error('Error in roleMiddleware:', error);
// //       res.status(500).json({ error: 'Internal server error' });
// //     }
// //   };
// // };

// // module.exports = roleMiddleware;


// const prisma = require("../utils/prismaClient");

// /**
//  * Middleware to check if the user has the required role in the organization or project.
//  * @param {Array<string>} requiredRoles - An array of required roles (e.g., ['ADMIN', 'PROJECT_MANAGER']).
//  */
// const roleMiddleware = (requiredRoles) => {
//   return async (req, res, next) => {
//     try {
//       const userId = req.user.userId; // Extract authenticated user ID from request
//       const { organizationId, projectId } = req.params; // Assuming organizationId and projectId are passed in route parameters

//       if (!organizationId) {
//         return res.status(400).json({ error: 'Organization ID is required' });
//       }

//       // Case 1: If it's organization-level access (no projectId passed)
//       if (!projectId) {
//         // Find the user's role in the organization
//         const member = await prisma.organizationMember.findFirst({
//           where: {
//             organizationId,
//             userId,
//           },
//         });

//         if (!member) {
//           return res.status(403).json({ error: 'Access denied. You are not a member of this organization.' });
//         }

//         // If user is an admin of the organization, grant access
//         if (member.role === 'ADMIN' && requiredRoles.includes('ADMIN')) {
//           return next(); // Proceed to the next middleware or route handler
//         }

//         // If user doesn't have required role in the organization, deny access
//         return res.status(403).json({ error: 'Access denied. You do not have the required role in this organization.' });
//       }

//       // Case 2: If it's project-level access (projectId is passed)
//       if (projectId) {
//         // Check if the user is a project manager for the specified project
//         const projectMember = await prisma.projectMember.findFirst({
//           where: {
//             projectId,
//             userId,
//             role: 'PROJECT_MANAGER', // Check if the user is a project manager for this project
//           },
//         });

//         // If user is a project manager and requiredRoles includes 'PROJECT_MANAGER'
//         if (projectMember && requiredRoles.includes('PROJECT_MANAGER')) {
//           return next(); // User is a project manager, grant access
//         }

//         // Also check if the user is an admin in the organization (for broader access)
//         const organizationMember = await prisma.organizationMember.findFirst({
//           where: {
//             organizationId,
//             userId,
//           },
//         });

//         // If user is an admin in the organization and requiredRoles includes 'ADMIN'
//         if (organizationMember && organizationMember.role === 'ADMIN' && requiredRoles.includes('ADMIN')) {
//           return next(); // Proceed to the next middleware or route handler
//         }

//         // If neither condition matches, deny access
//         return res.status(403).json({ error: 'Access denied. You do not have the required role.' });
//       }

//     } catch (error) {
//       console.error('Error in roleMiddleware:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };
// };

// module.exports = roleMiddleware;


const prisma = require("../utils/prismaClient");

/**
 * Middleware to check if the user has the required role in the organization or project.
 * @param {Array<string>} requiredRoles - An array of required roles (e.g., ['ADMIN', 'PROJECT_MANAGER']).
 */
const roleMiddleware = (requiredRoles) => {
  console.log("Role middle 1");
  console.log("Role middle 2");
  
  return async (req, res, next) => {
    try {
      const userId = req.user.userId; // Extract authenticated user ID from request
      const { organizationId, projectId } = req.params; // Assuming organizationId and projectId are passed in route parameters

      // Case 1: If organizationId is provided (organization-level access)
      if (organizationId) {
        // Find the user's role in the organization
        const member = await prisma.organizationMember.findFirst({
          where: {
            organizationId,
            userId,
          },
        });

        console.log("role middle", member);
        

        if (!member) {
          return res.status(403).json({ error: 'Access denied. You are not a member of this organization.' });
        }

        // If user is an admin of the organization, grant access
        if (member.role === 'ADMIN' && requiredRoles.includes('ADMIN')) {
          console.log("Yes");
          
          return next(); // Proceed to the next middleware or route handler
        }

        // If user doesn't have required role in the organization, deny access
        return res.status(403).json({ error: 'Access denied. You do not have the required role in this organization.' });
      }

      // Case 2: If projectId is provided (project-level access)
      if (projectId) {

        console.log("checking projectId , ");
        
        // Check if the user is a project manager for the specified project
        const projectMember = await prisma.projectMember.findFirst({
          where: {
            projectId,
            userId,
            role: 'PROJECT_MANAGER', // Check if the user is a project manager for this project
          },
        });

        console.log("projectMember",projectMember);
        

        // If user is a project manager and requiredRoles includes 'PROJECT_MANAGER'
        if (projectMember && requiredRoles.includes('PROJECT_MANAGER')) {
          return next(); // User is a project manager, grant access
        }

        //
        const projectMemberOrgOwner = await prisma.projectMember.findFirst({
          where: {
            projectId,
            userId,
            role: 'ADMIN', // Check if the user is a project manager for this project
          },
        });

        console.log("projectMemberOrgOwner",projectMemberOrgOwner);
        

        // If user is a project manager and requiredRoles includes 'PROJECT_MANAGER'
        if (projectMemberOrgOwner && requiredRoles.includes('ADMIN')) {
          return next(); // User is a project manager, grant access
        }

        // Also check if the user is an admin in the organization (for broader access)
        // const organizationMember = await prisma.organizationMember.findFirst({
        //   where: {
        //     userId,
        //   },
        // });

        const organizationMember = await prisma.organizationMember.findFirst({
          where: {
            userId,
          },
          include: {
            organization: { // Fetch related Organization
              select: {
                createdBy: true, // Include only the createdBy field
              },
            },
          },
        });
        
        console.log("admin check" , organizationMember);
        
        // If user is an admin in the organization and requiredRoles includes 'ADMIN'
        if (organizationMember && organizationMember.role === 'ADMIN' && requiredRoles.includes('ADMIN')) {
          return next(); // Proceed to the next middleware or route handler
        }

        // If neither condition matches, deny access
        return res.status(403).json({ error: 'Access denied. You do not have the required role.' });
      }

      // If neither organizationId nor projectId are provided, deny access
      return res.status(400).json({ error: 'Organization ID or Project ID is required.' });

    } catch (error) {
      console.error('Error in roleMiddleware:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
};

module.exports = roleMiddleware;
