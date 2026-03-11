import { createBrowserRouter } from "react-router";
import { HomePage } from "./components/home-page";
import { PatternDetailPage } from "./components/pattern-detail-page";
import { DiagramSystemPage } from "./components/diagram-system-page";
import { CategoriesPage } from "./components/categories-page";
import { TimelinePage } from "./components/timeline-page";
import { DecisionGuidePage } from "./components/decision-guide-page";
import { AboutPage } from "./components/about-page";
import { ScrollToTop } from "./components/scroll-to-top";

export const router = createBrowserRouter([
  {
    Component: ScrollToTop,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/pattern/:id",
        Component: PatternDetailPage,
      },
      {
        path: "/diagram-system",
        Component: DiagramSystemPage,
      },
      {
        path: "/categories",
        Component: CategoriesPage,
      },
      {
        path: "/timeline",
        Component: TimelinePage,
      },
      {
        path: "/decision-guide",
        Component: DecisionGuidePage,
      },
      {
        path: "/about",
        Component: AboutPage,
      },
    ],
  },
]);