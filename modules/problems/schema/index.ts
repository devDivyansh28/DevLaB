import { title } from "process";
import {z} from "zod";

export const problemSchema = z.object({
  title: z.string().min(3, "Title Must be at least of 3 characters"),

  description: z.string().min(10, "Description must be atleast 10 characters"),

  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),

  tags: z.array(z.string()).min(1, "At least one tag is required"),

  constraints: z.string().min(1, "Constraints are required"),
  hints: z.string().optional(),

  editorial: z.string().optional,

  testCases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Input is required"),
      }),
    )
    .min(1, "At leat one test case is required"),

  examples: z.object({
    JAVASCRIPT: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    PYTHON: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    JAVA: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
  }),

  codeSnippets: z.object({
    JAVASCRIPT: z.string().min(1, "Javascript code snippet is required"),
    PYTHON: z.string().min(1, "Python code snippet is required"),
    JAVA: z.string().min(1, "Java solution is required"),
  }),

  referenceSolutions: z.object({
    JAVASCRIPT: z.string().min(1, "Javascript code snippet is required"),
    PYTHON: z.string().min(1, "Python code snippet is required"),
    JAVA: z.string().min(1, "Java solution is required"),
  }),

  
});