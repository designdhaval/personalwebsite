import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/app/components/RootLayout";
import { HomePage } from "@/app/components/HomePage";
import { PayrollPage } from "@/app/components/PayrollPage";
import { CompliancePage } from "@/app/components/CompliancePage";
import { EmployeeSelfServicePage } from "@/app/components/EmployeeSelfServicePage";
import { TimeAbsencePage } from "@/app/components/TimeAbsencePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "work/payroll", element: <PayrollPage /> },
      { path: "work/compliance", element: <CompliancePage /> },
      { path: "work/employee-self-service", element: <EmployeeSelfServicePage /> },
      { path: "work/time-absence", element: <TimeAbsencePage /> },
    ],
  },
]);