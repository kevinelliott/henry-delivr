export const DEMO_DELIVERABLES = [
  {
    id: "demo-1",
    title: "Homepage Redesign v2",
    description: "Updated homepage with new hero section and improved CTA placement",
    url: "https://example.com",
    status: "reviewing",
    token: "demo-token-1",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    agency_id: "demo-agency",
    client_email: "client@example.com",
  },
  {
    id: "demo-2",
    title: "Brand Logo Package",
    description: "Final logo files in SVG, PNG, and PDF formats",
    url: "https://example.com/logo",
    status: "approved",
    token: "demo-token-2",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    agency_id: "demo-agency",
    client_email: "brand@example.com",
  },
  {
    id: "demo-3",
    title: "Q4 Marketing Campaign",
    description: "Social media assets and email templates for Q4 launch",
    url: "https://example.com/campaign",
    status: "changes_requested",
    token: "demo-token-3",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    agency_id: "demo-agency",
    client_email: "marketing@example.com",
  },
];

export const DEMO_COMMENTS = [
  {
    id: "comment-1",
    deliverable_id: "demo-1",
    author: "Sarah (Client)",
    text: "The hero image looks great! Can we tweak the CTA button color?",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "comment-2",
    deliverable_id: "demo-1",
    author: "You",
    text: "Sure! We can try a warmer orange. Will update shortly.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
];
