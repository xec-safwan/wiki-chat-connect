
export const generateAIResponse = (query: string, context: string): string => {
  // Simple rule-based responses
  if (query.toLowerCase().includes('acronym') || query.toLowerCase().includes('abbreviation')) {
    return `I can help explain acronyms used in our company. For example, NCS stands for Neighborly Customer Solutions, and NSS means Neighborly Service Solutions.`;
  } else if (query.toLowerCase().includes('hello') || query.toLowerCase().includes('hi')) {
    return `Hello! I'm your Wiki Assistant. How can I help you with ${context} today?`;
  } else if (query.toLowerCase().includes('help')) {
    return `I can help you with information about company terminology, acronyms, and wiki content. Just ask me anything about ${context}!`;
  } else {
    return `Thanks for your question about ${context}. In a real implementation, I'd use a GenAI model to provide accurate information from your knowledge base. For now, I'm simulating responses.`;
  }
};
