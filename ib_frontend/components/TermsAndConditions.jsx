import { Box, Typography } from '@mui/material';
import React from 'react';
import Layout from '../components/Layout/Layout';

const TermsAndConditions = () => {
  return (
    <Layout>
      <Box sx={{ p: 4, lineHeight: 1.8 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
          Terms and Conditions
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Welcome to Idea Bridge! By accessing or using our platform, you agree to be bound by the following terms and conditions. Please read them carefully before proceeding.
        </Typography>
        <ul>
          <li>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              1. Account Registration
            </Typography>
            <Typography variant="body1">
              Users must provide accurate and complete information during registration. You are responsible for maintaining the confidentiality of your account and password.
            </Typography>
          </li>
          <li>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              2. User Content
            </Typography>
            <Typography variant="body1">
              You retain ownership of your ideas and comments submitted to the platform. However, by posting content, you grant Idea Bridge a non-exclusive license to use, display, and distribute the content within the platform.
            </Typography>
          </li>
          <li>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              3. Idea Sharing and Collaboration
            </Typography>
            <Typography variant="body1">
              Collaborations initiated on Idea Bridge are at the discretion of the involved users. We encourage respectful and constructive exchanges to foster innovation.
            </Typography>
          </li>
          <li>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              4. Intellectual Property Rights
            </Typography>
            <Typography variant="body1">
              All platform design, features, and branding are owned by Idea Bridge. Users must not copy, modify, or distribute any part of the platform without prior permission.
            </Typography>
          </li>
          <li>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              5. Prohibited Activities
            </Typography>
            <Typography variant="body1">
              Users shall not post offensive, harmful, or illegal content. Misuse of the platform for spam, harassment, or unauthorized data access is strictly prohibited.
            </Typography>
          </li>
          <li>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              6. Privacy Policy
            </Typography>
            <Typography variant="body1">
              We are committed to protecting your privacy. Your personal information is handled in accordance with our Privacy Policy.
            </Typography>
          </li>
          <li>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              7. Termination of Use
            </Typography>
            <Typography variant="body1">
              Idea Bridge reserves the right to suspend or terminate accounts that violate these terms or engage in harmful conduct on the platform.
            </Typography>
          </li>
          <li>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              8. Modifications to Terms
            </Typography>
            <Typography variant="body1">
              We may revise these terms from time to time. Continued use of the platform after changes are posted indicates your acceptance of the new terms.
            </Typography>
          </li>
          <li>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              9. Liability Disclaimer
            </Typography>
            <Typography variant="body1">
              Idea Bridge is not liable for any damages resulting from the use or inability to use the platform, including lost data or collaboration disputes.
            </Typography>
          </li>
          <li>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              10. Contact Us
            </Typography>
            <Typography variant="body1">
              For any queries or concerns, please contact us at support@ideabridge.com or call +91-987-654-3210.
            </Typography>
          </li>
        </ul>
      </Box>
    </Layout>
  );
};

export default TermsAndConditions;
