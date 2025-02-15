import { CircleUser, LayoutDashboard, BookOpenText, Plus, ExternalLink, ShoppingBag } from "lucide-react"
export const sidebar = [
    {
        id:1,
        name: "My Profile",
        path: "/dashboard/profile",
        icon: <CircleUser />
    },
    {
        id:2,
        name: "Dashboard",
        path: "/dashboard/instructor",
        type:"Instructor",
        icon:<LayoutDashboard />
    },
    {
        id:3,
        name: "My Courses",
        path: "/dashboard/my-courses",
        type:"Instructor",
        icon: <BookOpenText />
    },
    {
        id:4,
        name: "Add Course",
        path: "/dashboard/add-course",
        type:"Instructor",
        icon: <Plus />
    },
    {
        id:5,
        name: "Enrolled Courses",
        path: "/dashboard/enrolled-courses",
        type:"Student",
        icon: <ExternalLink />
    },
    {
        id:6,
        name: "Purchase History",
        path: "/dashboard/purchase-history",
        type:"Student",
        icon: <ShoppingBag />
    },
]