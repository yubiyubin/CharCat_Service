const commonBox =
  "w-full border border-border-input dark:neon-border rounded-xl text-text-primary/70 transition-premium";

export const styles = {
  page: "min-h-screen bg-surface text-text-primary/70",
  title: "text-3xl font-bold text-center pt-10 dark:neon-text",
  container: "max-w-5xl mx-auto px-4 py-9 md:px-6 lg:px-8",
  textareaContainer: `${commonBox} flex flex-col focus-within:ring-2 focus-within:ring-primary/30 dark:focus-within:shadow-[0_0_20px_rgba(168,85,247,0.1)]`,
  flexContainer:
    "flex justify-center gap-2 mt-2 text-lg text-text-primary/60 font-bold items-center",
  w20TextCenter: "w-auto text-center",
  convertButton:
    "flex items-center justify-center w-16 h-10 py-1 mx-2 bg-primary/15 text-text-primary/60 font-bold rounded-3xl hover:bg-primary/30 hover:text-text-primary dark:neon-border dark:neon-border-hover active:scale-[0.97] transition-premium",
  textarea: `${commonBox} min-h-64 p-8 h-64 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 dark:glass-card dark:focus:shadow-[0_0_20px_rgba(168,85,247,0.1)]`,
  noneBorderTextarea:
    "w-full min-h-64 overflow-y-auto flex-1 p-6 mt-2 border-none focus:outline-none rounded-xl text-text-primary/70 resize-none",
  resultTextarea: `${commonBox} min-h-64 h-auto max-h-100 p-6 bg-surface-muted/80 dark:glass-card dark:neon-glow-subtle border-none pt-10 flex flex-col justify-between`,
  resultTextareaContent:
    "flex-1 overflow-y-auto whitespace-pre-wrap break-words",
  resultTextareaPlaceholder: "text-text-secondary/60 mt-24",
  buttonContainer: "grid gap-7 mt-4",
  actionButtonContainer: "flex gap-3 mt-4 self-end shrink-0",
  section: "mt-16 mb-12 grid gap-6 text-text-secondary font-medium",
  sectionBackground: "bg-primary/10 dark:glass-card dark:neon-border rounded-xl p-6",
  sectionTitle: "text-lg font-bold text-text-base",
  grid: "grid grid-cols-1 lg:grid-cols-2 gap-4",
};
