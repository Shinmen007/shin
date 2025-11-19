import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  className?: string;
}

export function FAQ({ items, className }: FAQProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className={className}>
      {items.map((item, index) => {
        const isExpanded = expandedItems.has(index);

        return (
          <div
            key={index}
            className="group overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm transition-all duration-300 hover:border-slate-600/50 hover:bg-slate-800/50"
          >
            <button
              onClick={() => toggleItem(index)}
              className="flex w-full items-center justify-between p-6 text-left transition-colors group-hover:text-cyan-400"
              aria-expanded={isExpanded}
            >
              <h3 className="pr-4 font-semibold text-white transition-colors group-hover:text-cyan-400">
                {item.question}
              </h3>
              <div className="flex-shrink-0">
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-slate-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                )}
              </div>
            </button>

            {isExpanded && (
              <div className="px-6 pb-6">
                <p className="text-sm leading-relaxed text-slate-400">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
