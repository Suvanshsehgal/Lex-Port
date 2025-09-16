import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendConsultationEmail = async (consultationData) => {
  const { name, phoneNumber, lawyerName, lawyerSpecialization } = consultationData;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'suvanshsehgal@gmail.com',
    subject: 'New Consultation Request',
    html: `
      <h1>New Consultation Request</h1>
      <h2>Client Details:</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone Number:</strong> ${phoneNumber}</p>
      <h2>Lawyer Details:</h2>
      <p><strong>Lawyer Name:</strong> ${lawyerName}</p>
      <p><strong>Specialization:</strong> ${lawyerSpecialization}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Consultation email sent successfully');
  } catch (error) {
    console.error('Error sending consultation email:', error);
    throw error;
  }
};

export default { sendConsultationEmail };