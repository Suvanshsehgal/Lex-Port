import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import emailService from '../utils/emailService.js';

const bookConsultation = asyncHandler(async (req, res) => {
  const { name, phoneNumber, lawyerName, lawyerSpecialization } = req.body;

  if (!name || !phoneNumber || !lawyerName || !lawyerSpecialization) {
    throw new ApiError(400, 'All fields are required');
  }

  try {
    await emailService.sendConsultationEmail({
      name,
      phoneNumber,
      lawyerName,
      lawyerSpecialization
    });

    return res.json(
      new ApiResponse(
        200,
        { message: 'Consultation request sent successfully' },
        'Your consultation request has been received'
      )
    );
  } catch (error) {
    throw new ApiError(500, 'Failed to send consultation request');
  }
});

export { bookConsultation };