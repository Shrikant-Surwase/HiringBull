import express from 'express';
import { requireAuth, requirePayment, requireApiKey } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import * as outreachValidation from '../validations/outreachValidation.js';
import {
    createOutreachRequest,
    getMyOutreachRequests,
    getOutreachById,
    getPendingOutreachRequests,
    updateOutreachStatus,
} from '../controllers/outreachController.js';

const router = express.Router();

// Create outreach request (max 3/month enforced in controller)
router.post( '/', requireAuth, requirePayment, validate(outreachValidation.createOutreach), createOutreachRequest );

// Get logged-in user's outreach requests
router.get( '/me', requireAuth, requirePayment, getMyOutreachRequests );

// Get single outreach request by id
router.get( '/:id', requireAuth, requirePayment, validate(outreachValidation.getOutreachById), getOutreachById );

// Get all pending outreach requests
router.get( '/admin/pending', requireApiKey, getPendingOutreachRequests );

// Approve / Reject / Mark Sent
router.patch( '/admin/:id/status', requireApiKey, validate(outreachValidation.updateOutreachStatus), updateOutreachStatus );

export default router;
