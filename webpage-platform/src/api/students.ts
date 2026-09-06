import { apiClient } from "./client";
import type { CourseData } from "../components/types";

export interface DashboardResponse {
    status: "enrolled" | "unenrolled";
    course?: CourseData;
    message?: string;
}

export const StudentAPI = {
    getDashboardData: () => {
        return apiClient<DashboardResponse>("/v1/dashboard");
    },
};