export interface StepItem {
  id: string;
  label: string;
  feedback: string;
}

/**
 * Checklist steps shown inside each level.
 * Learners mark each step as done; simple levels complete when all steps are done.
 */
const LEVEL_STEPS: Record<string, StepItem[]> = {
  "0-1": [
    { id: "step_1", label: "Choose one AI coding assistant", feedback: "Done." },
    { id: "step_2", label: "Sign in and open the app", feedback: "Looks good." },
    { id: "step_3", label: "Send a test message", feedback: "Step complete." }
  ],
  "0-2": [
    { id: "step_1", label: "Create a project folder", feedback: "Done." },
    { id: "step_2", label: "Ask AI to create the page", feedback: "Looks good." },
    { id: "step_3", label: "Open the file in your browser", feedback: "Step complete." },
    { id: "step_4", label: "Ask for one refinement", feedback: "Ready for the next step." }
  ],
  "1-1": [
    { id: "step_1", label: "Create a new project", feedback: "Done." },
    { id: "step_2", label: "Start the local server", feedback: "Looks good." },
    { id: "step_3", label: "Inspect the project structure", feedback: "Step complete." }
  ],
  "1-2": [
    { id: "step_1", label: "Create the listing page", feedback: "Done." },
    { id: "step_2", label: "Add navigation", feedback: "Looks good." },
    { id: "step_3", label: "Test the layout", feedback: "Step complete." }
  ],
  "1-3": [
    { id: "step_1", label: "Create a detail page", feedback: "Done." },
    { id: "step_2", label: "Connect the cards", feedback: "Looks good." },
    { id: "step_3", label: "Test the full path", feedback: "Step complete." }
  ],
  "1-4": [
    { id: "step_1", label: "Prepare the files", feedback: "Done." },
    { id: "step_2", label: "Create a Cloudflare Pages project", feedback: "Looks good." },
    { id: "step_3", label: "Open the live URL", feedback: "Step complete." },
    { id: "step_4", label: "Submit the URL", feedback: "Ready for the next step." }
  ],
  "1-5": [
    { id: "step_1", label: "Add search", feedback: "Done." },
    { id: "step_2", label: "Add a map embed", feedback: "Looks good." },
    { id: "step_3", label: "Add share actions", feedback: "Step complete." }
  ],
  "2-1": [
    { id: "step_1", label: "Create a Vite React TypeScript project with AI.", feedback: "Done." },
    { id: "step_2", label: "Run the dev server and open the local URL.", feedback: "Looks good." },
    { id: "step_3", label: "Ask AI to explain the files you will touch most often.", feedback: "Step complete." }
  ],
  "2-2": [
    { id: "step_1", label: "Ask AI to create Header, ProjectCard, and Layout components.", feedback: "Done." },
    { id: "step_2", label: "Create Home, Projects, and About views.", feedback: "Looks good." },
    { id: "step_3", label: "Check that navigation and repeated sections stay consistent.", feedback: "Step complete." }
  ],
  "2-3": [
    { id: "step_1", label: "Ask AI to install or configure Tailwind CSS if needed.", feedback: "Done." },
    { id: "step_2", label: "Choose a clear visual direction: minimal, editorial, product-like, or portfolio-focused.", feedback: "Looks good." },
    { id: "step_3", label: "Ask AI to polish all pages with consistent spacing, typography, and colors.", feedback: "Step complete." }
  ],
  "2-4": [
    { id: "step_1", label: "Add entrance animation for key sections.", feedback: "Done." },
    { id: "step_2", label: "Add hover states for cards and buttons.", feedback: "Looks good." },
    { id: "step_3", label: "Test that motion is smooth and does not break mobile usability.", feedback: "Step complete." }
  ],
  "2-5": [
    { id: "step_1", label: "Create a GitHub repository and push your code.", feedback: "Done." },
    { id: "step_2", label: "Import the repository into Vercel.", feedback: "Looks good." },
    { id: "step_3", label: "Open the live URL and test all pages.", feedback: "Step complete." }
  ],
  "3-1": [
    { id: "step_1", label: "Ask AI to add a theme toggle.", feedback: "Done." },
    { id: "step_2", label: "Support light mode, dark mode, and system preference if possible.", feedback: "Looks good." },
    { id: "step_3", label: "Refresh the page and confirm the chosen theme persists.", feedback: "Step complete." }
  ],
  "3-2": [
    { id: "step_1", label: "Add a search input to the projects page.", feedback: "Done." },
    { id: "step_2", label: "Filter cards as the user types.", feedback: "Looks good." },
    { id: "step_3", label: "Add tag or category filters if your content has clear categories.", feedback: "Step complete." }
  ],
  "3-3": [
    { id: "step_1", label: "Create a Contact page or section.", feedback: "Done." },
    { id: "step_2", label: "Add fields for name, email, and message.", feedback: "Looks good." },
    { id: "step_3", label: "Add validation, loading state, success state, and error handling.", feedback: "Step complete." }
  ],
  "3-4": [
    { id: "step_1", label: "Test the site at mobile width.", feedback: "Done." },
    { id: "step_2", label: "Ask AI to fix cramped text, overflowing cards, and hard-to-tap buttons.", feedback: "Looks good." },
    { id: "step_3", label: "Add a mobile navigation pattern if the header no longer fits.", feedback: "Step complete." }
  ],
  "3-5": [
    { id: "step_1", label: "Run a final local check.", feedback: "Done." },
    { id: "step_2", label: "Push the code to GitHub.", feedback: "Looks good." },
    { id: "step_3", label: "Confirm Vercel deployed and test the live URL on mobile.", feedback: "Step complete." }
  ],
  "4-1": [
    { id: "step_1", label: "Create a simple `/api/hello` endpoint.", feedback: "Done." },
    { id: "step_2", label: "Connect the contact form to an API route.", feedback: "Looks good." },
    { id: "step_3", label: "Add friendly error handling for missing configuration or invalid input.", feedback: "Step complete." }
  ],
  "4-2": [
    { id: "step_1", label: "Create a Supabase project.", feedback: "Done." },
    { id: "step_2", label: "Create a table for portfolio projects or content items.", feedback: "Looks good." },
    { id: "step_3", label: "Load the data from Supabase and render it in the app.", feedback: "Step complete." }
  ],
  "4-3": [
    { id: "step_1", label: "Create an admin list page.", feedback: "Done." },
    { id: "step_2", label: "Add a form for creating new items.", feedback: "Looks good." },
    { id: "step_3", label: "Add edit and delete actions with clear confirmation or feedback.", feedback: "Step complete." }
  ],
  "4-4": [
    { id: "step_1", label: "Record a view when a project detail page opens.", feedback: "Done." },
    { id: "step_2", label: "Store the view in the database.", feedback: "Looks good." },
    { id: "step_3", label: "Show view counts or a small dashboard in the admin area.", feedback: "Step complete." }
  ],
  "4-5": [
    { id: "step_1", label: "Add Supabase environment variables in Vercel.", feedback: "Done." },
    { id: "step_2", label: "Deploy the app.", feedback: "Looks good." },
    { id: "step_3", label: "Test database-backed pages and admin workflows on the live URL.", feedback: "Step complete." }
  ],
  "4-6": [
    { id: "step_1", label: "Choose an AI provider and create an API key.", feedback: "Done." },
    { id: "step_2", label: "Build a small AI chat or generation feature.", feedback: "Looks good." },
    { id: "step_3", label: "Add loading states, error handling, and basic rate limits.", feedback: "Step complete." }
  ],
  "5-1": [
    { id: "step_1", label: "Enable authentication in your chosen backend or auth provider.", feedback: "Done." },
    { id: "step_2", label: "Create a login page.", feedback: "Looks good." },
    { id: "step_3", label: "Protect the admin route and redirect anonymous users.", feedback: "Step complete." }
  ],
  "5-2": [
    { id: "step_1", label: "Add a chat button or assistant panel.", feedback: "Done." },
    { id: "step_2", label: "Connect it to an AI API route.", feedback: "Looks good." },
    { id: "step_3", label: "Give it context about your projects, services, or product.", feedback: "Step complete." }
  ],
  "5-3": [
    { id: "step_1", label: "Create Stripe test keys.", feedback: "Done." },
    { id: "step_2", label: "Create a checkout API route.", feedback: "Looks good." },
    { id: "step_3", label: "Add a paid call-to-action and test with Stripe's test card.", feedback: "Step complete." }
  ],
  "5-4": [
    { id: "step_1", label: "Review all environment variables.", feedback: "Done." },
    { id: "step_2", label: "Push and deploy the final version.", feedback: "Looks good." },
    { id: "step_3", label: "Test login, AI, payment, mobile layout, and core pages on production.", feedback: "Step complete." }
  ],
};

export function getStepsByLevelId(levelId: string): StepItem[] | null {
  return LEVEL_STEPS[levelId] || null;
}
