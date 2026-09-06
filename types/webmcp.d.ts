type ModelContextTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: Record<string, boolean>;
  execute: (input: unknown) => unknown;
};

interface Document {
  modelContext?: {
    registerTool: (tool: ModelContextTool, options?: { signal?: AbortSignal }) => void;
  };
}
