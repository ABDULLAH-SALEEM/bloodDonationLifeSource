import React from 'react'
import { Routes as AppRoutes, Route } from "react-router-dom";
import AddBloodBanks from '../Admin/AddBloodBanks/AddBloodBanks';
import AdminDashboard from '../Admin/AdminDashboard/Dashboard/AdminDashboard';
import AdminLogin from '../Admin/AdminLogin/AdminLogin';
import DonorApplication from '../Admin/DonorApplication/DonorApplication';
import DonorFullApplication from '../Admin/DonorFullApplication/DonorFullApplication';
import RecipientsApplication from '../Admin/RecipientsApplication/RecipientsApplication';
import RecipientFullApplication from '../Admin/RecipinetFullApplication/RecipientFullApplication';
import ReportedProblem from '../Admin/ReportedProblem/ReportedProblem';
import BloodBanks from '../BloodBanks/BloodBanks';
import BloodCompatibility from '../BloodCompatibility/BloodCompatibility';
import History from '../History/History';
import Home from '../Home/Home';
import Login from '../Login/Login';
import ModeratorDashboard from '../Moderator/ModeratorDashboard/ModeratorDashboard';
import ModeratorLogin from '../Moderator/ModeratorLogin/ModeratorLogin';
import ReportAProb from '../ReportAProb/ReportAProb';
import Settings from '../Settings/Settings';
import Signup from '../Signup/Signup';
import DonationStatus from '../Status/DonationStatus/DonationStatus';
import RecipientStatus from '../Status/RecipientStatus/RecipientStatus';
import VarifiedDonors from '../VarifiedDonors/VarifiedDonors';
import VarifiedRecipients from '../VarifiedRecipients/VarifiedRecipients';

const Routes = () => {
    return (
        <AppRoutes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/dashboard/donarApplication" element={<DonorApplication />} /> 
            <Route path="/admin/dashboard/recipientApplication" element={<RecipientsApplication />} /> 
            <Route path="/admin/dashboard/recipientApplication/:id" element={<RecipientFullApplication />} />
            <Route path="/admin/dashboard/donorApplication/:id" element={<DonorFullApplication />} />
            <Route path="varifiedRecipients" element={<VarifiedRecipients />} />
            <Route path="varifiedDonors" element={<VarifiedDonors />} />  
            <Route path="bloodCompatibility" element={<BloodCompatibility />} /> 
            <Route path="/admin/dashboard/bloodBanks" element={<AddBloodBanks />} /> 
            <Route path="/admin/dashboard/reportedProblem" element={<ReportedProblem />} />   
            <Route path="bloodBanks" element={<BloodBanks />} />
            <Route path="donationStatus" element={<DonationStatus />} />
            <Route path="recipientStatus" element={<RecipientStatus />} />    
            <Route path="/moderator" element={<ModeratorLogin />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Settings />} />
            <Route path="/moderator/dashboard" element={<ModeratorDashboard />} />
            <Route path="/reportProblem" element={<ReportAProb />} />
        </AppRoutes>
    )
}

export default Routes
