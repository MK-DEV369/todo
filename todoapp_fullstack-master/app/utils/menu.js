import {SquareCheck, ClipboardList, RefreshCcwDot, CircleX} from "lucide-react";

const menu = [
  {
    id: 1,
    title: "All Tasks",
    icon: <ClipboardList />,
    link: "/",
  },
  {
    id: 2,
    title: "Incomplete Tasks",
    icon: <CircleX />,
    link: "/incomplete",
  },
  {
    id: 3,
    title: "In-Progress Tasks",
    icon: <RefreshCcwDot />,
    link: "/inprogress",
  },  
  {
    id: 4,
    title: "Completed Tasks",
    icon: <SquareCheck />,
    link: "/completed",
  },
];

export default menu;
