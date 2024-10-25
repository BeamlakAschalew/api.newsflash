export const removeHtmlTags = (input: string): string => {
  return input.replace(/<[^>]*>/g, "").trim();
};
