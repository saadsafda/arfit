import React from "react";
import Navbar from "../../components/navBar/navbar";
import Footer from "../../components/footer";
import { baseUrl } from "../../utils/constants/URLS";
import { Button, Container, Typography, Box, Step, StepLabel, Stepper, Paper } from "@mui/material";
import AndroidIcon from '@mui/icons-material/Android';
import GetAppIcon from '@mui/icons-material/GetApp';
import SettingsIcon from '@mui/icons-material/Settings';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';

const steps = [
    {
        label: 'Download APK',
        description: 'Click the button above to download the ARFitt APK file to your Android device.',
        icon: <GetAppIcon />,
    },
    {
        label: 'Open File',
        description: 'Once downloaded, open the APK file from your notifications or file manager.',
        icon: <InstallMobileIcon />,
    },
    {
        label: 'Allow Permissions',
        description: 'If prompted, go to Settings and allow installation from "Unknown Sources" for your browser.',
        icon: <SettingsIcon />,
    },
    {
        label: 'Install & Enjoy',
        description: 'Tap "Install" and wait for the process to complete. Then open the app and sign in!',
        icon: <AndroidIcon />,
    },
];

const DownloadApp = () => {
    const downloadUrl = `${baseUrl}/downloads/ARFitt.apk`;

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'ARFitt.apk';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />

            <Container maxWidth="md" className="flex-grow py-12 pt-24">
                <Box className="text-center mb-12">
                    <Typography variant="h3" component="h1" className="font-bold text-gray-800 mb-4" sx={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Get ARFitt for Android
                    </Typography>


                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<AndroidIcon />}
                        onClick={handleDownload}
                        sx={{
                            backgroundColor: '#000',
                            color: '#fff',
                            padding: '12px 32px',
                            fontSize: '1.1rem',
                            borderRadius: '50px',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#333'
                            }
                        }}
                    >
                        Download APK (Android)
                    </Button>
                    <Typography variant="caption" display="block" className="mt-2 text-gray-500">
                        Version 1.0.0 • Free Download
                    </Typography>
                </Box>

                <Paper elevation={0} className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm">
                    <Typography variant="h5" className="mb-6 font-semibold text-gray-800 text-center" sx={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Installation Guide
                    </Typography>
                    <Stepper alternativeLabel activeStep={-1} connector={null} className="flex flex-col md:flex-row gap-4">
                        {steps.map((step, index) => (
                            <div key={step.label} className="flex-1 flex flex-col items-center text-center p-4">
                                <Box className="w-16 h-16 rounded-full bg-primarySaturated/10 flex items-center justify-center mb-4 text-primarySaturated">
                                    {React.cloneElement(step.icon as React.ReactElement, { fontSize: 'large' })}
                                </Box>
                                <Typography variant="h6" className="mb-2 font-medium" sx={{ fontSize: '1.1rem' }}>
                                    {index + 1}. {step.label}
                                </Typography>
                                <Typography variant="body2" className="text-gray-500 leading-relaxed">
                                    {step.description}
                                </Typography>
                            </div>
                        ))}
                    </Stepper>
                </Paper>
            </Container>

            <Footer />
        </div>
    );
};

export default DownloadApp;
