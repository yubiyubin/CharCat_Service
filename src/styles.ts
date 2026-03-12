const commonBox =
  "w-full border border-border-input rounded-lg text-text-primary/70";

export const styles = {
  page: "min-h-screen bg-surface text-text-primary/70",
  title: "text-3xl font-bold text-center pt-10 ",
  container: "max-w-5xl mx-auto px-4 py-9 md:px-6 lg:px-8",
  textareaContainer: `${commonBox} min-h-80 h-auto max-h-100 overflow-y-auto flex flex-col focus-within:ring-2 focus-within:ring-primary/30`,
  flexContainer:
    "flex justify-center gap-2 mt-2 text-lg text-text-primary/60 font-bold items-center",
  w20TextCenter: "w-20 text-center",
  convertButton:
    "flex items-center justify-center w-16 h-10 py-1 mx-2 bg-primary/15 text-text-primary/60 font-bold rounded-3xl hover:bg-primary/30 hover:text-text-primary transition-colors",
  textarea: `${commonBox} min-h-64 p-8 h-64 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30`,
  noneBorderTextarea:
    "w-full h-auto flex-1 p-6 mt-2 border-none focus:outline-none rounded-lg text-text-primary/70 resize-none",
  resultTextarea: `${commonBox} min-h-64 h-auto max-h-100 p-6 bg-surface-muted/80 border-none pt-10 flex flex-col justify-between`,
  resultTextareaContent:
    "flex-1 overflow-y-auto whitespace-pre-wrap break-words",
  resultTextareaPlaceholder: "text-text-secondary/60 mt-24",
  buttonContainer: "grid gap-7 mt-4 ",
  actionButtonContainer: "flex gap-3 mt-4 self-end shrink-0",
  section: "mt-16 mb-12 grid gap-6 text-text-secondary font-medium",
  sectionBackground: "bg-primary/10 rounded-lg p-6",
  sectionTitle: "text-lg font-bold text-text-base",
  grid: "grid grid-cols-1 lg:grid-cols-2 gap-4",
};
