import { AiDiagram } from "./ai-diagram";
import { AutomationDiagram } from "./automation-diagram";
import { RulesDiagram } from "./rules-diagram";

/**
 * Concept-block interactive diagrams (design-system v3 diagram language).
 * Keyed by the published block's content id so the visuals stay in code while
 * the copy stays in versioned records; unknown blocks render nothing.
 */
const DIAGRAMS: Record<string, () => React.JSX.Element> = {
  "p1-lesson-002": RulesDiagram,
  "p1-lesson-003": AutomationDiagram,
  "p1-lesson-004": AiDiagram,
};

export function ConceptDiagram({ blockId }: { blockId: string }) {
  const Diagram = DIAGRAMS[blockId.toLowerCase()];
  return Diagram ? <Diagram /> : null;
}
