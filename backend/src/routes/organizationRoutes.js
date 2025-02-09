const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { addProjectToOrganization } = require('../controllers/projectController');
const { checkOrganizationMembership } = require('../middlewares/membershipMiddleware');

//done
// Add a user to an organization (only admin can add a user)
router.post('/:organizationId/add-member', authMiddleware, roleMiddleware('ADMIN'), organizationController.addUserToOrganization);


router.post('/:organizationId/invite', authMiddleware, roleMiddleware('ADMIN'), organizationController.inviteUserToOrganization);

router.post('/accept-invite/:token', organizationController.acceptInvite);

router.post('/', authMiddleware, organizationController.createOrganization);
router.post('/:organizationId/projects',authMiddleware,  roleMiddleware('ADMIN'),addProjectToOrganization);
// Get all organizations (accessible to all authenticated users)
router.get('/', authMiddleware, organizationController.getAllOrganizations);

router.get('/:organizationId', authMiddleware,checkOrganizationMembership, organizationController.getOrganizationById);


router.delete('/:organizationId/members/:userId', authMiddleware,roleMiddleware('ADMIN'), organizationController.deleteOrganizationMember);


router.get('/:organizationId/stats',authMiddleware,roleMiddleware('ADMIN'), organizationController.getOrganizationStats);

router.get('/:orgId/user', authMiddleware, organizationController.getOrgUserProjects);



//  ------------------------------

//done






module.exports = router;
